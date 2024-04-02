import json
import nmap3 # pip install python-3-nmap
import os
import logging
import platform
import socket


# disable warning messages
logging.getLogger("scapy").setLevel(logging.CRITICAL) 

from scapy.all import get_if_addr, conf, get_if_hwaddr

def read_ip_addresses_from_json(json_file):
    # Reads in JSON file containing IP addresses
    with open(json_file, 'r') as f:
        data = json.load(f)
        return data

def get_host_name(ip):
    try:
        hostname = socket.gethostbyaddr(ip)
        return hostname
    except Exception as e:
        return 'Hostname not found'


def arp_scan_and_nmap():
    # Read IP addresses from the generated JSON file
    data = read_ip_addresses_from_json("ip_addresses.json")

    if not data:
        print("No IP addresses found in the JSON file.")
        exit(1)

    # Perform Nmap scan
    nm = nmap3.Nmap()
    results = []
    temp_res = {}
    for v in data:
        ip = v[0]
        mac = v[1]
        hostname = get_host_name(ip)
        result = nm.scan_top_ports(ip) # NOT SCANNING ALL PORTS
        # if result[ip]['ports']:
        temp_res['ip'] = ip
        temp_res['mac'] = mac
        temp_res['hostname'] = hostname
        temp_res['ports'] = result[ip]['ports']
            

        results.append(temp_res)
        temp_res = {}
            
 
    # Save scan results to output JSON file
    with open("output.json", 'w') as f:
        json.dump(results, f, indent=4)

    print("Nmap scan results saved to output.json")

if __name__ == "__main__":
    arp_scan_and_nmap()

    """
    Dependencies:
    pip install python3-nmap
    nmap.org - nmap download
    """
    """
    Nmap scan results:
    protocol: The protocol used by the port, such as TCP or UDP.
    portid: The port number.
    state: The state of the port, which can be "open" or "closed".
    reason: The reason for the port's state, such as "syn-ack" or "reset".
    reason_ttl: The time to live value of the packet used to determine the port's state.
    service: Information about the service running on the port, including its name and configuration.
    name: The name of the service, such as "http" for HTTP or "ssh" for SSH.
    method: The method used to detect the service.
    conf: The confidence level of the service detection.
    cpe: Common Platform Enumeration (CPE) entries associated with the service.
    scripts: Any scripts executed or associated with the service.
    """