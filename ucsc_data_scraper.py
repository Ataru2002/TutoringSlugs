# to scrape class data from ucsc
import importlib

# Installs the required libraries if user doesnt have them
libraries = ['urllib3', 'bs4']

for lib in libraries:
    try:
        importlib.import_module(lib)
    except ImportError:
        print(f"{lib} is not installed, installing now...")

        import subprocess
        subprocess.check_call(['pip', 'install', lib])


from typing import Any
import json, os
from copy import deepcopy
import urllib3
from bs4 import BeautifulSoup


# If you want to call the scraper from a separate program, remove the main at the bottom
# and call CourseScraper with no parameters


class CourseScraper:
    def __init__(self) -> None:

        self.url = "https://catalog.ucsc.edu/en/current/general-catalog/courses/"

        self.soup_data = None   # contains the html data from the catalog url
        self.major_data = dict() # contains the names and links of every major {name: link}
        self.course_data = list() # contains every course name and url <- eventual json
        self.get_html()    

        self.find_element()  
        
        index = 0   # gets the index of the list to be modified

        for major in self.major_data:
            self.url = "https://catalog.ucsc.edu/"
            self.course_data.append({
                "course_name": major if '&amp;' not in major else major.replace('&amp;', '&'),
                "course_url": self.url+self.major_data[major]
            }) 
            self.url = "https://catalog.ucsc.edu/"+self.major_data[major]
            self.get_html()
                    
            # remove this once we can parse
            self.course_data[index]["classes"] = self.find_course(major)

            index += 1

        # get the cwd and print to a file there
        with open(os.path.dirname(__file__) + "/all_classes.json", 'w') as json_file:
            json.dump(self.course_data,json_file,indent=4)


    
    # gets the html data from a given webpage url
    def get_html(self) -> None:
        # create new urllib3 instance as PoolManager
        http = urllib3.PoolManager()
        response = http.request('GET', self.url)

        self.soup_data = BeautifulSoup(response.data, 'html.parser')
    
    # to find a specific element in the html data, then returns the parsed version
    def find_element(self) -> None:
        data = self.soup_data.find_all('a')
        new_data = [x for x in data if 'a href="/en/current/general-catalog/courses/' in str(x)]
        new_data = list(set(new_data))

        for major in new_data:
            # splitting the obj to access the url and names separately
            parsed = str(major).split('>')

            link, name = parsed[0][10:-1], parsed[1][:-3]

            temp_parsing_list = [i.strip() for i in name.split('-')]

            self.major_data.update({' - '.join(temp_parsing_list): link})

    
    # gets all the courses 
    def find_course(self, major_name: str):
        data = self.soup_data.find_all("a")

        # course_name = None
        temp_course_dict = dict()
        # separates the name of the major and its courses from the rest of the elements
        list_courses = [str(x) for x in data if str(x).split('>')[0][10:-1] not in self.major_data.values() and "/en/current/general-catalog/courses/" in str(x)]
        list_courses_dc = deepcopy(list_courses)

        # removes the Upper-Division, Lower-Division, and Graduate urls
        for item in ["Lower-Division", "Upper-Division", "Graduate", "class=\"sc-courselink\""]:
            for piece in list_courses_dc:
                if item in str(piece):
                    list_courses.remove(piece)

        # gets the abbreviation of the major e.g. cse for computer science and engineering
        major_abbrev = major_name.split('-')[0].strip().lower()
        print(f"Current Major: {major_name if '&amp;' not in major_name else major_name.replace('&amp;', '&')}")
        # actually parses the courses
        for element in range(len(list_courses)):
            temp_list = list_courses[element].split('>')

            # gets the name of the course, converts it to lower case, and adds a hyphen
            # e.g. UCDC 199 -> ucdc-199
            class_name = "-".join(temp_list[2][:-6].lower().split())
            class_url = temp_list[0][10:-1]

            if class_name.split('-')[0] == major_abbrev:
                temp_course_dict.update({class_name: class_url})

        return temp_course_dict




if __name__  == '__main__':
    obj = CourseScraper()