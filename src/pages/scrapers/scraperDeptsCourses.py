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

        # to print out a txt file with the data from the scraper
        new_filepath = os.path.dirname(__file__) + "/major_and_links.txt"
 

        self.soupData = None   # contains the html data from the catalog url
        self.majorData = dict() # contains the names and links of every major {name: link}
        self.course_data = list() # contains every course name and url <- eventual json
        self.get_html()    

        self.find_element()  

        
        index = 0   # gets the index of the list to be modified
        

        for major in self.majorData:
            self.url = "https://catalog.ucsc.edu/"
            self.course_data.append({
                "course_name": major if '&amp;' not in major else major.replace('&amp;', '&'),
                "course_url": self.url+self.majorData[major]
            }) 
            self.url = "https://catalog.ucsc.edu/"+self.majorData[major]
            self.get_html()
                    
            # remove this once we can parse
            self.course_data[index]["classes"] = self.find_course(major)

            index += 1
        
        # makes a textfile with all the majors and their links
        with open(new_filepath, 'w') as txtfile:
            for i in self.course_data:
                txtfile.write(f"{i['course_name']}: {i['course_url']}\n")

        # get the cwd and print to a file there
        with open(os.path.dirname(__file__) + "/all_classes.json", 'w') as json_file:
            json.dump(self.course_data,json_file,indent=4)


    
    # gets the html data from a given webpage url
    def get_html(self) -> None:
        # create new urllib3 instance as PoolManager
        http = urllib3.PoolManager()
        response = http.request('GET', self.url)

        self.soupData = BeautifulSoup(response.data, 'html.parser')
    
    # to find a specific element in the html data, then returns the parsed version
    def find_element(self) -> None:
        data = self.soupData.find_all('a')
        new_data = [x for x in data if 'a href="/en/current/general-catalog/courses/' in str(x)]
        new_data = list(set(new_data))


        for major in new_data:
            # splitting the obj to access the url and names separately
            parsed = str(major).split('>')

            link, name = parsed[0][10:-1], parsed[1][:-3]

            temp_parsing_list = [i.strip() for i in name.split('-')]

            self.majorData.update({' - '.join(temp_parsing_list): link})

    
    # gets all the courses 
    def find_course(self, major_name: str) -> list:
        data = self.soupData.find_all("a")

        # course_name = None
        temp_course_list = list()
        # separates the name of the major and its courses from the rest of the elements
        list_courses = [str(x) for x in data if str(x).split('>')[0][10:-1] not in self.majorData.values() and "/en/current/general-catalog/courses/" in str(x)]
        list_courses_dc = deepcopy(list_courses)

        # removes the Upper-Division, Lower-Division, and Graduate urls
        for item in ["Lower-Division", "Upper-Division", "Graduate", "class=\"sc-courselink\""]:
            for piece in list_courses_dc:
                if item in str(piece):
                    list_courses.remove(piece)
        
        basic_url = "https://catalog.ucsc.edu/"

        # gets the abbreviation of the major e.g. cse for computer science and engineering
        major_abbrev = major_name.split('-')[0].strip().lower()
        print(f"Current Major: {major_name if '&amp;' not in major_name else major_name.replace('&amp;', '&')}")
        

        # actually parses the courses
        for element in range(len(list_courses)):
            class_dict = dict()
            temp_list = list_courses[element].split('>')

            # gets the name of the course, converts it to lower case, and adds a hyphen
            # e.g. UCDC 199 -> ucdc-199
            class_name = "-".join(temp_list[2][:-6].lower().split())
            class_url = temp_list[0][10:-1]

            # saves the courses in a subdictionary
            if class_name.split('-')[0] == major_abbrev:
                class_dict.update({
                    'class_name': class_name,
                    'class_link': basic_url + class_url
                })
                temp_course_list.append(class_dict)

        return temp_course_list
