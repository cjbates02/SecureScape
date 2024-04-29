import json

# Health report if statements
def analyze_port(port):
    state = port[2]
    if state == "open":
        port_health = "Warning"
        port_description = "Port is open and accessible."
        threat = "An open port can potentially expose the system to unauthorized access or exploitation if there are unsecured services running. Ensure only necessary services are exposed, and apply proper authentication, access control, and encryption measures."
    elif state == "closed":
        port_health = "Warning"
        port_description = "Port is closed which may indicate a lack of service running."
        threat = "While closed ports may not pose an immediate threat, they could still be subject to reconnaissance attempts by attackers. Ensure ports are properly monitored and closed ports do not inadvertently open to external access."
    elif state == "filtered":
        port_health = "Good"
        port_description = "Port is filtered, possibly indicating a firewall or security measure."
        threat = "Filtered ports may indicate the presence of a firewall or security appliance blocking access to the port. However, it's essential to verify that the filtering is intentional and configured correctly to prevent bypassing security measures."
    else:
        port_health = "Warning"
        port_description = "Port state is unknown."
        threat = "An unknown port state could indicate potential issues with network scanning or misconfiguration. Further investigation is required to determine the cause."

    return {
        "port number": port[1],
        "health": port_health,
        "description": port_description,
        "threat": threat
    }

# goes through all the hosts
def analyze_host(ports):
    ports_analysis = {}
    for port in ports:
        port_id = port[0]
        ports_analysis[port_id] = analyze_port(port)

    return ports_analysis

def main():
    input_file = "output.json"

    with open(input_file, "r") as f:
        data = json.load(f)

    analysis = []
    for host in data:
        host_analysis = {
            "ip": host["ip"],
            "mac": host["mac"],
            "hostname": host["hostname"],
            "ports": analyze_host(host)
        }
        analysis.append(host_analysis)

    
    return json.dumps(analysis, f, indent=4)

