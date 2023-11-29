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

# the 2 scrapers
from scraperMajors import MajorScraper
from scraperDeptsCourses import CourseScraper


if __name__ == '__main__':
    # gets all the departments and courses offered
    departmentsAndCourses = CourseScraper()

    # gets all the majors
    majors = MajorScraper()
