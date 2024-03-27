
import csv
import requests
from datetime import datetime
import os

'''
SecureScape Vulnerability Scanner API
Liz Aldem
March 12, 2024
'''

def initialScrape():
    '''
    This function is an API that scrapes the CSV information from the CISA Known Exploited
    Vulnerabilities database and saves it into a CSV file
    '''
    url = "https://www.cisa.gov/sites/default/files/csv/known_exploited_vulnerabilities.csv"
    response = requests.get(url)

    '''
    Test for a connection, throws an error if the program can't connect, and writes the csv file
    '''

    if response.status_code == 200:

        with open("data.csv", "wb") as f:
            f.write(response.content)
        
        currentScrape('data.csv')
        # print("File downloaded successfully.")

    else:
        print(f"Error: Failed to download file. Status code: {response.status_code}")
    


def currentScrape(filename):

    '''
    This function takes the saved CSV file from the initialScrape() function and
    parses the data to only have data from the year 2024 in the CSV file
    '''

    check_date = datetime.strptime("2024-01-01", "%Y-%m-%d")

    with open(filename, "r", errors="ignore") as csv_file:
        csv_reader = csv.DictReader(csv_file)

        selected_data = []

        for row in csv_reader:
            row_date = datetime.strptime(row["dateAdded"], "%Y-%m-%d")

            if row_date > check_date:
                selected_data.append(row)

    fieldnames = selected_data[0].keys()

    with open("newdata.csv", "w", newline="") as new_csv:
        writer = csv.DictWriter(new_csv, fieldnames=fieldnames)

        writer.writeheader()

        for row in selected_data:
            writer.writerow(row)
            
        os.remove('data.csv')
        # print("File Parsed!")
