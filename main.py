import eel
import eel.browsers
import os
import csv
import json
from backend import arp_scan, cvescraper

eel.init('web')


""" BEGIN BACKEND FUNCTIONALITY HERE """

# Update vulnerbility CSV file periodically
# Read the csv file and pass values to javaScript function
# Render csv file to vulnerbilities HTML file

@eel.expose
def get_vulnerbility_data():
    cvescraper.initialScrape()
    data = []

    with open('data.csv', 'r') as csv_vulnerbilities:
        csv_reader = csv.DictReader(csv_vulnerbilities)
        for row in csv_reader:
            data.append(row)

    print(len(data))
    return json.dumps(data[::-1])





eel.browsers.set_path('electron', 'node_modules/.bin/electron') # set browser path for electron mode in eel to the binary executable due to permissions issue on mac

eel.start('index.html', mode='electron') # start up the desktop application using electron


