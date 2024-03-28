import eel
import eel.browsers
import os
import csv
import json
import platform
import subprocess
import asyncio
import tracemalloc

# Enable tracemalloc
tracemalloc.start()

from backend import cvescraper, nmap_scan, arp_scan


eel.init('web')


""" BEGIN BACKEND FUNCTIONALITY HERE """

# Update vulnerbility CSV file periodically
# Read the csv file and pass values to javaScript function
# Render csv file to vulnerbilities HTML file

@eel.expose
def get_vulnerbility_data():
    cvescraper.initialScrape()
    data = []
    os.rename('newdata.csv', 'data.csv')

    with open('data.csv', 'r', errors='ignore') as csv_vulnerbilities:
        csv_reader = csv.DictReader(csv_vulnerbilities)
        for row in csv_reader:
            data.append(row)


    return json.dumps(data[::-1])

@eel.expose
def get_endpoints_data(password):
    if platform.system() == 'Windows':
        try:
            arp_scan.arp_main()
        except Exception as e:
            return 1
    else:
        try:
            command = ['sudo', '-S', '-k', 'python', './backend/arp_scan.py']
            # Pass the password to sudo through stdin
            subprocess.run(command, input=password.encode(), check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        except Exception as e:
            return 1
        
    
    # Call the asynchronous function 'arp_scan_and_nmap'
    nmap_scan.arp_scan_and_nmap()

    # Load data from 'output.json' file
    with open('output.json', 'r') as f:
        data = json.load(f)
    
    os.remove('output.json')
    os.remove('ip_addresses.json')

    # Return the JSON data as a string
    return json.dumps(data)


# TODO 
# - STORE ENDPOINTS IN SQL DATABASE
# - VISUALIZE ENDPOINTS, IMPLEMENT ENDPOINT FUNCTIONS
# - GET MAC ADDRESSES
# - DOCUMENT CODE SO FAR
# - TEST ON WINDOWS
# - GENERATE NETWORK DIAGRAM

        



if platform.system() == 'Windows':
    eel.browsers.set_path('electron', 'node_modules\electron\dist\electron.exe')
else:
    eel.browsers.set_path('electron', 'node_modules/.bin/electron')

eel.start('index.html', mode='electron') # start up the desktop application using electron


