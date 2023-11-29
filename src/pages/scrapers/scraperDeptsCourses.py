# Scraper for Course Data
# RUN 'py ucscDataScraper.py' TO GET THE DATA
from typing import Any
import json, os, urllib3
from bs4 import BeautifulSoup


class CourseScraper:
    def __init__(self) -> None:
        departmentListFile = os.path.dirname(__file__) + "/departmentFile.txt"
        courseListFile = os.path.dirname(__file__) + "/allCourses.json"

        self.baseUrl = "https://catalog.ucsc.edu/"
        self.allDepartmentsUrl = self.baseUrl + "en/current/general-catalog/courses/"

        self.soupData = self.getPageData(url = self.allDepartmentsUrl) # parsed beautifulsoup data (html)
        self.departmentDict = self.getDepartments() # Format: `dept abbrev - dept name: dept link`
        self.courseData = list()

        for deptName, deptLink in self.departmentDict.items():
            # the deptlink already contains baseUrl
            self.courseData.append({
               "course_name": deptName,
               "course_link": deptLink
            }) 

            self.soupData = self.getPageData(url = deptLink)
            # we always index -1 as we always aim to modify the latest element of the list
            self.courseData[-1]['classes'] = self.getCourses(deptName = deptName)

        # printing to json file
        with open(courseListFile, 'w') as courseFile:
            json.dump(
                obj = self.courseData,
                fp = courseFile,
                indent = 4
            )

        # printing to text file
        with open(departmentListFile, 'w') as file:
            deptString = ""
            for deptName in self.departmentDict:
                deptString += f"Current Department: {deptName}\n"
            file.write(deptString[:-1])

    # function to get the html data of a webpage using BeautifulSoup
    def getPageData(self, url: str) -> BeautifulSoup:
        http = urllib3.PoolManager()
        response = http.request('GET', url=url)

        pageHtmlData = BeautifulSoup(response.data, 'html.parser')
        return pageHtmlData
    
    # function that gets all the departments upon scraping
    def getDepartments(self) -> dict:
        data = self.soupData.find_all('a')
        objData = {obj for obj in data if 'a href="/en/current/general-catalog/courses/' in str(obj)}
        formattedDeptDict = dict() 

        # loop to extract and format the links and department names
        for dept in objData:
            parsedData = str(dept).split('>')

            # extracts the url from `<a href="/en/current/general-catalog/courses/major-name"`
            # then it attaches each endpoint to the baseUrl
            deptLink = self.baseUrl + parsedData[0][10:-1]
            # extracts the major code and name from `MAJORCODE - Major Name</a`
            # also replaces the html ampersand with the `&`
            deptName = parsedData[1][:-3].replace('&amp;', '&')
            
            # formatting each name the same way (as some of them are slightly different)
            uniformFormatter = [i.strip() for i in deptName.split('-')]
            deptName = ' - '.join(uniformFormatter)

            formattedDeptDict.update({deptName: deptLink})
        
        return formattedDeptDict

    # function to get all the courses within a givin department
    def getCourses(self, deptName: str) -> list: 
        data = self.soupData.find_all('a')
        tempCourseList = list()
        courseList = list()

        # Gets all the elements containing department and course data, then parses it to remove all the department data links
        for element in data:
            if str(element).split('>')[0][10:-1] not in self.departmentDict.values() and "/current/general-catalog/courses/" in str(element):
                courseList.append(str(element))
        
        # filtering out certain terms from the majors
        filterValues = ["Lower-Division", "Upper-Division", "class=\"sc-courselink\""]
        courseList = list(filter(lambda item: all(i not in item for i in filterValues), courseList))

        # gets the dept code: e.g. CSE for Computer Science and Engineering
        deptAbbreviation = deptName.split('-')[0].strip()
        print(f"Current Major: {deptName.replace('&amp;', '&')}")

        # gets all the courses from a department, puts them in dictionaries, and adds the dictionaries to a list
        for element in courseList:
            tempCoursesList = element.split('>')

            # extracts the course name from `course-name</span`
            # then converts the ' ' to '-' e.g. CSE 13S -> CSE-13S
            courseName = tempCoursesList[2][:-6].replace(' ','-')
            # extracts the url from `<a href="/en/current/general-catalog/courses/course-name"` (usually, with some exceptions like PHYS courses)
            courseLink = tempCoursesList[0][10:-1]

            # checks the abbrev. of the class to ensure no repeats in the final json between classes shared across majors
            if courseName.split('-')[0] == deptAbbreviation:
                tempCourseList.append({
                        'class_name': courseName.lower(),
                        'class_link': self.baseUrl + courseLink
                })
                
        return tempCourseList
