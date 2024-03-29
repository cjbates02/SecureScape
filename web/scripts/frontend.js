/** GLOBAL VARIABLES */

let currentIndex = 0;

// development puposes delete later
const testEndpoint = {
  "192.168.1.1": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.2": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.35": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.38": [],
  "192.168.1.3": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "filtered",
      reason: "no-response",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.21": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.50": [],
  "192.168.1.29": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.108": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.250": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "open",
      reason: "syn-ack",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
  "192.168.1.148": [],
  "192.168.1.39": [
    {
      protocol: "tcp",
      portid: "21",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ftp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "22",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ssh",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "23",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "telnet",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "25",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "smtp",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "80",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "http",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "110",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "pop3",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "139",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "netbios-ssn",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "443",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "https",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "445",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "microsoft-ds",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
    {
      protocol: "tcp",
      portid: "3389",
      state: "closed",
      reason: "conn-refused",
      reason_ttl: "0",
      service: {
        name: "ms-wbt-server",
        method: "table",
        conf: "3",
      },
      cpe: [],
      scripts: [],
    },
  ],
};

/** EVENT LISTENERS */

/** EVENT LISTNERS TO RENDER NEW HTML PAGES */

// Listens for the event that all the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Renders the vulnerbility page
  document
    .getElementById("vulnerbility-page-btn")
    .addEventListener("click", async () => {
      window.location.href = "vulner.html";
    });

  // Render's index html page
  document.getElementById("home-page").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Render endpoint page
  document.getElementById("endpoint-page-btn").addEventListener("click", () => {
    window.location.href = "endpoints.html";
    
  });
});

/** EEL BACKEND FUNCTIONS */

/** FRONTEND FUNCTIONS */

// displays success toast to user

const alertSuccess = (message) => {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
};

// displayes error toast to user

const alertError = (message) => {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
};

/** Vulnerbiliter object structure (for reference only) */

/**cveID
: 
"CVE-2021-27104"
dateAdded
: 
"2021-11-03"
dueDate
: 
"2021-11-17"
knownRansomwareCampaignUse
: 
"Known"
notes
: 
""
product
: 
"FTA"
requiredAction
: 
"Apply updates per vendor instructions."
shortDescription
: 
"Accellion FTA contains an OS command injection vulnerability exploited via a crafted POST request to various admin endpoints."
vendorProject
: 
"Accellion"
vulnerabilityName
: 
"Accellion FTA OS Command Injection Vulnerability"

*/
