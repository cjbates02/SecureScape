'''
Create an algorithm to scan for new vulnerabilities from CVE
located on GitHub
Every hour (?)
feature to manually push out a scan
angry ip scanner (maybe used)
establish a connection to API scan
convert known vuln to cvs file
look into postgres
'''

'''
A) view vulnerability report
B) update status of vulnerability (complete, not applicable, ect)
C) manually push vulnerability scan via api
D) notify user if endpoint goes down or offline via text/email
E) automatically scan for new vulnerabilities and check if 
endpoints are affected
F) (low priority) antiviurs scan w/ api
'''

'''
Define the scanner that pulls vulnerabilities from the CVEProject
GitHub, formats the information, and saves these vulnerabilities to
a temporary working database
'''
def scannerA():
    return True

'''
Define the function that takes the endpoints from the nmap and 
saves them to a temporary dictionary
'''

def endpointdict():
    return True

'''
Define the function that scans the endpoints from the network
against the vulnerabilities in the temp working database
'''

def scannerB():
    vulnfound = False
    'scan'
    if (vulnfound != False):
        return True


'''
Define the function that displays any vulnerabilities in a readable
format
'''

def displayreport():
    return True

'''
Define a function that updates the status of the vulnerabilities
'''

def vulnstatus():
    return True

'''
Define a function that allows the user to manually do the 
vulnerability scan via api
'''

def userscanapi():
    return True
