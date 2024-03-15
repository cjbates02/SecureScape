import ipaddress
import socket
import platform
import psutil  # Import psutil to get network interface information
import json

# Check the operating system
if platform.system() == "Windows":
    from scapy.all import ARP, Ether, srp
    interface = None  # Use default interface for Windows
elif platform.system() == "Darwin":  # macOS
    try:
        from scapy.layers.l2 import ARP, Ether
        from scapy.sendrecv import srp
    except ImportError:
        print("Scapy is not installed. Please run 'pip install scapy' to install it.")
        exit(1)
    # Find active network interface on macOS
    active_interfaces = [
        interface.name for interface in psutil.net_if_stats().values() if interface.isup
    ]
    if not active_interfaces:
        print("No active network interfaces found.")
        exit(1)
    interface = active_interfaces[0]  # Select the first active interface
else:
    print("Unsupported operating system.")
    exit(1)

def get_local_ip_range():
    # Function that gets IP address and subnet mask of the machine that is running the program
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    network = ipaddress.IPv4Network(f"{local_ip}/24", strict=False)
    return network

def arp_scan(ip, interface=None):
    # Function to perform ARP scan using scapy
    # Scapy creates, sends, captures, and analyzes network packets
    arp_request = ARP(pdst=str(ip))
    ether_frame = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether_frame/arp_request
    if interface is not None:
        result = srp(packet, timeout=3, verbose=0, iface=interface)[0]
    else:
        result = srp(packet, timeout=3, verbose=0)[0]
    
    devices = []
    for sent, received in result:
        devices.append(received.psrc)
    
    return devices

if __name__ == "__main__":
    target_ip_range = get_local_ip_range()

    interface = None  # Use default interface
    devices_list = arp_scan(target_ip_range, interface)
    
    # Write the list of IP addresses to a JSON file
    with open("ip_addresses.json", "w") as f:
        json.dump(devices_list, f)
