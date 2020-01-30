from bs4 import BeautifulSoup
from selenium import webdriver
import re
import json
driver = webdriver.Chrome('C:\Program Files\chromedriver\chromedriver.exe')
data = {}
data['workouts'] = []

URL_BASE = 'https://www.muscleandstrength.com/exercises'
URL_ABDUCTORS = 'https://www.muscleandstrength.com/exercises/abductors.html'
URL_ABS = 'https://www.muscleandstrength.com/exercises/abs'
URL_ADDUCTORS = 'https://www.muscleandstrength.com/exercises/adductors.html'
URL_BICEPS = 'https://www.muscleandstrength.com/exercises/biceps'
URL_CALVES = 'https://www.muscleandstrength.com/exercises/calves'
URL_CHEST = 'https://www.muscleandstrength.com/exercises/chest'
URL_FOREARMS = 'https://www.muscleandstrength.com/exercises/forearms'
URL_GLUTES = 'https://www.muscleandstrength.com/exercises/glutes'
URL_HAMSTRINGS = 'https://www.muscleandstrength.com/exercises/hamstrings'
URL_LATS = 'https://www.muscleandstrength.com/exercises/lats'
URL_LOWERBACK = 'https://www.muscleandstrength.com/exercises/lower-back'
URL_UPPERBACK = 'https://www.muscleandstrength.com/exercises/middle-back'
URL_NECK = 'https://www.muscleandstrength.com/exercises/neck.html'
#URL_OBLIQUES = ''
URL_QUADS = 'https://www.muscleandstrength.com/exercises/quads'
URL_SHOULDERS = 'https://www.muscleandstrength.com/exercises/shoulders'
URL_TRAPS = 'https://www.muscleandstrength.com/exercises/traps'
URL_TRICEPS = 'https://www.muscleandstrength.com/exercises/triceps'
# Need to add the rest of the URLs

URLs = [URL_ABDUCTORS, URL_ABS, URL_ADDUCTORS, URL_BICEPS, URL_CALVES, URL_CHEST, URL_FOREARMS, URL_GLUTES, URL_HAMSTRINGS, URL_LATS, URL_LOWERBACK, URL_UPPERBACK, URL_NECK, URL_QUADS, URL_SHOULDERS, URL_TRAPS, URL_TRICEPS]

def GetData(url):
    driver.get(url)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    exercises = soup.find_all('div', attrs={'class':'exerciseBlocks'})
    for exercise in exercises:
        if (exercise is not None) and (exercise != '\n'):
            try:
                data_entry = {"name": "", "hyperlink": "", "type": "", "target-muscle": "", "difficulty": ""} 
                link = re.findall("\/(?:[-\w.]|(?:%[\da-fA-F]{2}))+", str(exercise.find_all('a')[1]))
                driver.get(URL_BASE + str(link[1]))

                if(url == URL_CALVES) or (url == URL_HAMSTRINGS) or (url == URL_GLUTES) or (url == URL_ABDUCTORS) or (url == URL_ADDUCTORS) or (url == URL_QUADS):
                    data_entry["type"] = "Lower Body"
                else:
                    data_entry["type"] = "Upper Body"
                    
                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                title = re.findall('<h1 class="no-header">([\w \(\)\/]*) Video Guide</h1>',str(soup.find_all('h1', attrs={'class':'no-header'})[0]))[0]
                data_entry["name"] = title
                data_entry["hyperlink"] = driver.current_url
                target_muscle = re.findall('<div class="field-item even"><a href="/exercises/[a-z\. ]*">([\w ]*)</a></div>',str(soup.find_all('div', attrs={'class':'field-item even'})[0]))[0]
                data_entry["target-muscle"] = target_muscle
                difficulty = re.findall('</label>\n([\w]*) </div>',str(soup.find_all('li', attrs={'class':'qg-half wide'})[5]))[0]
                data_entry['difficulty'] = difficulty
                data['workouts'].append(data_entry)
            except:
                print("Couldn't get info correctly from: ")
                print(driver.current_url)
            

for url in URLs:
    GetData(url)
driver.close()

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)

          