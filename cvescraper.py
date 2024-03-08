import csv
import requests
import schedule
import datetime


def initialScrape():
    url = 'https://www.cisa.gov/sites/default/files/csv/known_exploited_vulnerabilities.csv'

    response = requests.get(url)

    if response.status_code == 200:


        with open("data.csv", "wb") as f:
            f.write(response.content)
        print("File downloaded successfully.")

    else:
        print(f"Error: Failed to download file. Status code: {response.status_code}")

def timedScraper():
    url = 'https://www.cisa.gov/sites/default/files/csv/known_exploited_vulnerabilities.csv'

    save_path = 'data.csv'

    try:
        response = requests.get(url)

        if response.status_code == 200:

            with open(save_path, "a", newline="") as f:
                writer = csv.writer(f)
                writer.writerow([datetime.datetime.now(), response.text])
                print(f"File updated successfully at {datetime.datetime.now()}.")

        else:
            print(f"Error: Failed to download file. Status code: {response.status_code}")
    except:
        print(f"An error occurred: {Exception}")


'''For debugging'''
schedule.every(3).minutes.do(timedScraper)

'''For daily scheduled downloads'''
'''schedule.every().day.at("12:00").do(timedScraper)'''

