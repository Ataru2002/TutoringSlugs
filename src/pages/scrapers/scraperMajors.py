# Scraper for Major Data
# RUN 'py ucscDataScraper.py' TO GET THE DATA
from typing import Any
import os, re, urllib3
from bs4 import BeautifulSoup


class MajorScraper:
    def __init__(self) -> None:
        self.url = "https://registrar.ucsc.edu/enrollment/majors-list.html"
        self.soupData = None
        
        self.getPageData()
        self.majors = self.findMajors()

        self.majorDataFile = os.path.dirname(__file__) + '/majorData.txt'

        with open(self.majorDataFile, 'w') as outputFile:
            outputFile.write(self.majors)

    # function to get the html data of the page 
    def getPageData(self) -> None:
        http = urllib3.PoolManager()
        response = http.request('GET', self.url)

        self.soupData = BeautifulSoup(response.data, 'html.parser')
    
    # function to get all the majors from the page
    def findMajors(self) -> str:
        data = self.soupData.find_all('table')
        pattern = r'(?<=<p>)(.*?)(?=<\/p>)' # regex =(
        allMajors = ''
        
        # gets all strings contained within <p> </p> (paragraph element)
        matches = re.findall(
            pattern = pattern, 
            string = str(data)
        )

        majors = {item.replace("<br/>", '') for item in matches}

        # removes the major codes and any </strong> elements
        for element in sorted(majors):
            if '<' not in element and '.' in element:
                allMajors += f"Current Major: {element}\n"
        
        return allMajors[:-1]


if __name__ == '__main__':
    obj = MajorScraper()