import platform
import subprocess
import distro
import logging
import nmap3
import json

logging.getLogger("scapy").setLevel(logging.CRITICAL)

from scapy.all import get_if_addr, conf, get_if_hwaddr


def nmap_scan(ip_address):
    scanner = nmap3.Nmap()
    results = scanner.scan_top_ports(ip_address)

    return results

def process_nmap_data(ip_address):
    result = nmap_scan(ip_address) # PERFORM NMAP SCAN
    port_information = [] # VARIABLE TO HOLD PORT INFORMATION
    temp_port = [] # LIST CREATED ON EACH ITERATION OF PORTS
    data = result[ip_address] # MOVE INTO THE IP ADDRESS PAIR
    ports = data['ports'] # MOVE INTO PORTS PAIR
    for p in ports:
        temp_port.append(p['service']['name'])
        temp_port.append(p['portid'])
        temp_port.append(p['state'])
        port_information.append(temp_port)
        temp_port = []

    return port_information


def buildEndpointData(ip, mac, hostname, os_version, os_status, ports):
    current_endpoint_data = {}

    current_endpoint_data['ip'] = ip
    current_endpoint_data['mac'] = mac
    current_endpoint_data['hostname'] = hostname
    current_endpoint_data['os_version'] = os_version
    current_endpoint_data['os_status'] = os_status
    current_endpoint_data['ports'] = ports

    return current_endpoint_data


def getEndpointInformation():

    if platform.system() == 'Darwin':
        ip = get_if_addr(conf.iface) # GET IP ADDRESS
        mac = get_if_hwaddr(conf.iface) # GET MAC ADDRESS
        hostname = platform.node() # COMPUTERS NETWORK NAME ***
        os_version = platform.mac_ver()[0] # CHECK VERSION OF MAC
        os_status = subprocess.check_output(['softwareupdate', '--list'])
        os_status = b'No new software available' in os_status
        ports = process_nmap_data(ip)

    elif platform.system() == 'Windows':
        ip = get_if_addr(conf.iface) # GET IP ADDRESS
        mac = get_if_hwaddr(conf.iface) # GET MAC ADDRESS
        hostname = platform.node() # GET HOST NAME
        os_version = platform.win32_ver()[0]# GET WINDOWS VERSION
        os_status = subprocess.check_output(['powershell.exe', '-command', '(New-Object -ComObject Microsoft.Update.Session).CreateupdateSearcher().Search(“IsHidden=0 and IsInstalled=0”).Updates | Select-Object Title'])
        print(os_status.decode())
        os_status = "Your device is up to date" in os_status.decode()
        ports = process_nmap_data(ip)
        

    elif platform.system() == 'Linux':
        ip = get_if_addr(conf.iface) # GET IP ADDRESS
        mac = get_if_hwaddr(conf.iface) # GET MAC ADDRESS
        hostname = platform.node() # GET HOST NAME
        password = ''
        os_version = distro.name(pretty=True)
        subprocess.check_call(['sudo', 'S', 'k', 'apt-get', 'update'], input=password.encode(), check=True)
        os_status = subprocess.check_output(['sudo', 'S', 'k', 'apt-get', 'upgrade', '--dry-run'])
        os_status = b'0 upgraded, 0 newly installed' in os_version
        ports = process_nmap_data(ip)

    else:
        return 'Unsupported Operating System.'

    endpoint_data = buildEndpointData(ip, mac, hostname, os_version, os_status, ports)
    # print(json.dumps(endpoint_data, indent=4))
    return json.dumps(endpoint_data, indent=4)
    



getEndpointInformation()


    