from scapy.all import ARP, Ether, srp
import ipaddress
import socket

def get_local_ip_range():
    #Function thats gets IP address and subnet mask of the machine that is running the program
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    network = ipaddress.IPv4Network(f"{local_ip}/24", strict=False)
    return network

def arp_scan(ip):
    #Function to perform ARP scan using scapy
    #Scapy creates, sends, captures, and analyzes network packets
    arp_request = ARP(pdst=str(ip))
    ether_frame = Ether(dst="ff:ff:ff:ff:ff:ff")  #Broadcasting to all devices on the local network
    packet = ether_frame/arp_request
    result = srp(packet, timeout=3, verbose=0)[0]
    
    devices = []
    for sent, received in result:
        devices.append({'ip': received.psrc, 'mac': received.hwsrc})
    
    return devices

def print_result(devices):
    #Print IP'S and MAC's
    for device in devices:
        print(f"IP: {device['ip']}\tMAC: {device['mac']}")

if __name__ == "__main__":
    target_ip_range = get_local_ip_range()
    print(f"Scanning the local network: {target_ip_range}")

    devices_list = arp_scan(target_ip_range)
    print_result(devices_list)


