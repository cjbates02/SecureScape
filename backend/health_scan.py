import json

# Health report if statements
def analyze_port(port):
    state = port["state"]
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
        "health": port_health,
        "description": port_description,
        "threat": threat
    }

# goes through all the hosts
def analyze_host(host):
    ports_analysis = {}
    for port in host["ports"]:
        port_id = port["portid"]
        ports_analysis[port_id] = analyze_port(port)

    return ports_analysis

def main():
    input_file = "output.json"
    output_file = "output_analysis.json"

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

    with open(output_file, "w") as f:
        json.dump(analysis, f, indent=4)

    print("Report completed and saved to", output_file)

if __name__ == "__main__":
    main()
