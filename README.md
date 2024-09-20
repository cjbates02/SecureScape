# SecureScape: Desktop Application

SecureScape is an Electron.js desktop application designed for network security professionals. It offers multiple features, including dynamic network diagram generation, a CVE report catalog, network and port discovery, and PDF report generation. This application is tailored for users seeking to enhance their network security assessments and reporting capabilities.

## Prerequisites

Make sure you have Node.js and Python installed on your system.

## Installation Instructions

1. **Create a Python Virtual Environment**:
   ```bash
   python -m venv <name_of_venv>
   ```

2. **Clone the Repository**:
   Inside the virtual environment, clone the repository:
   ```bash
   git clone -b master https://github.com/cjbates02/SecureScape.git
   ```

3. **Install Node Modules**:
   Navigate to the cloned directory and run:
   ```bash
   npm install
   ```

4. **Install Python Dependencies**:
   Run the following command to install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

5. **Fix Eel WebSocket Bug**:
   Eel has a known bug with web sockets. After installing the Python dependencies, navigate to `lib/eel/__init__.py` and change:
   ```python
   import bottle.ext.websocket as wbs
   ```
   to:
   ```python
   import bottle_websocket as wbs
   ```

6. **Start the Development Server**:
   Run the application using:
   ```bash
   python main.py
   ```

## Important Notes

- This application is not for commercial use.
- If you encounter an Nmap error, ensure that Nmap is explicitly downloaded from [nmap.org](https://nmap.org) and that the path variable for Nmap is properly set on your Windows machine.

SecureScape is designed to empower users in conducting thorough network security analyses while streamlining the reporting process.
