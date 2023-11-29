from typing import Any
import os, re
import urllib3
from bs4 import BeautifulSoup


class MajorScraper:
    def __init__(self) -> None:
        self.url = "https://registrar.ucsc.edu/enrollment/majors-list.html"
        self.soupData = None
        
        self.getPageData()
        self.findElement()

    def getPageData(self) -> None:
        http = urllib3.PoolManager()
        response = http.request('GET', self.url)

        self.soupData = BeautifulSoup(response.data, 'html.parser')
    
    def findElement(self) -> None:
        data = self.soupData.find_all('table')
        pattern = r'(?<=<p>)(.*?)(?=<\/p>)'
        
        # NEEDS REFACTORING
        majors = set()
        with open(os.path.dirname(__file__) + '/findData.txt', 'w') as file:
            for x in data:
                matches = re.findall(pattern, str(x))

                for item in matches:
                    majors.add(item.replace("<br/>", '')) 
            majors = list(majors)
            majors.remove('Comingfall 2024')
            majors.sort()
            for element in majors: 
                file.write(element + '\n') if not element.isupper() and '<' not in element else None
                    



if __name__ == '__main__':
    obj = MajorScraper()