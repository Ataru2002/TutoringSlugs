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

import scraperMajors
import scraperDeptsCourses


if __name__ == '__main__':
    # gets all the departments and courses offered
    departmentsAndCourses = scraperDeptsCourses.CourseScraper()
    majors = scraperMajors
