import ipaddress
import socket
import platform
#import psutil  # Import psutil to get network interface information
import json
import logging

# disable warning messages
logging.getLogger("scapy").setLevel(logging.CRITICAL)

# Check the operating system
if platform.system() == "Windows":
    from scapy.all import *
    interface = None  # Use default interface for Windows
elif platform.system() == "Darwin":  # macOS
    try:
        from scapy.all import *
    except ImportError:
        print("Scapy is not installed. Please run 'pip install scapy' to install it.")
        exit(1)
    # Find active network interface on macOS
    interface = conf.iface # Select the first active interface
else:
    print("Unsupported operating system.")
    exit(1)

def get_local_ip_range():
    # Function that gets IP address and subnet mask of the machine that is running the program
    local_ip = get_if_addr(conf.iface)

    print(local_ip)
    network = ipaddress.IPv4Network(f"{local_ip}/24", strict=False) # assuming everyone's subnet mask is /24
    return network

def arp_scan(ip, interface=None):
    # Function to perform ARP scan using scapy
    # Scapy creates, sends, captures, and analyzes network packets

    arp_request = ARP(pdst=str(ip))
    ether_frame = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether_frame/arp_request
    try:
        if interface is not None:
            result = srp(packet, timeout=3, verbose=0, iface=interface)[0]
        else:
            result = srp(packet, timeout=3, verbose=0)[0]
        devices = []
        for sent, received in result:
            devices.append([received.psrc, received.hwsrc])
        return devices
    

    except Exception as e:
        print(f"Error occurred during ARP scan: {e}")
        return []

def arp_main():
    target_ip_range = get_local_ip_range()

    print(target_ip_range)
    devices_list = arp_scan(target_ip_range, interface)
    devices_list.append(get_if_addr(conf.iface))
    print(devices_list)
    
    # Write the list of IP addresses to a JSON file
    with open("ip_addresses.json", "w") as f:
        json.dump(devices_list[:10], f) ### DEV PURPOSES COMMENT OUT ###
        # json.dump(devices_list, f)

if __name__ == '__main__':
    target_ip_range = get_local_ip_range()

    print(target_ip_range)
    devices_list = arp_scan(target_ip_range, interface)
    devices_list.append(get_if_addr(conf.iface))
    print(devices_list)
    
    # Write the list of IP addresses to a JSON file
    with open("ip_addresses.json", "w") as f:
        json.dump(devices_list[:10], f) ### DEV PURPOSES COMMENT OUT ###
        # json.dump(devices_list, f)
