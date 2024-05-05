
document.addEventListener('DOMContentLoaded', async () => {
    deviceDataDiv = document.getElementById('device-data-container');
    ip = document.getElementById('ip');
    hostname = document.getElementById('hostname');
    os_status = document.getElementById('os_status');
    mac = document.getElementById('mac');
    window.addEventListener('load', async () => {
        if (localStorage.getItem('deviceData') === null) {
            document.getElementById('loading-icon').hidden = false;
            const deviceData = await eel.get_device_data()();
            document.getElementById('loading-icon').hidden = true;
            localStorage.setItem("deviceData", deviceData);

            renderData(deviceData);
            renderPorts(deviceData);
            console.log(deviceData);
        }
        else {
            const deviceData = JSON.parse(localStorage.getItem('deviceData'));
            renderData(deviceData);
            renderPorts(deviceData);
            console.log(deviceData);
        }
        
        
        // if (sessionStorage.getItem('healthReport') === null) {
        //     const deviceData = JSON.parse(sessionStorage.getItem('deviceData'));
        //     const healthReport = JSON.parse(await eel.health_report(deviceData.ports)());
        //     sessionStorage.setItem("healthReport", healthReport);
        // } else {
        //     healthReport = JSON.parse(sessionStorage.getItem('healthReport'));
        //     console.log(healthReport);
        // }
    });
});

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', async () => {
    document.getElementById('loading-icon').hidden = false;
    const deviceData = await eel.get_device_data()();
    document.getElementById('loading-icon').hidden = true;
    localStorage.setItem('deviceData', deviceData);
    renderData(deviceData);
});

const renderData = (deviceData) => {
    ip.innerHTML = `<strong>IP Address:</strong> ${deviceData.ip}`;
    hostname.innerHTML = `<strong>Hostname:</strong> ${deviceData.hostname}`;
    mac.innerHTML = `<strong>Mac Address:</strong> ${deviceData.mac}`;
    os_status.innerHTML = `<strong>Operating System Status:</strong> ${deviceData.os_status === true ? 'Your device is up to date!' : 'Please update your device.'}`;
}

const renderPorts = (deviceData) => {
    const ports = deviceData.ports;
    const portsContainer = document.getElementById('device-data-ports');

    ports.forEach((p) => {
        const serviceName = document.createElement('p');
        serviceName.innerHTML = p[0];

        const portNumber = document.createElement('p');
        portNumber.className = "has-text-centered";
        portNumber.innerHTML = p[1];

        const status = document.createElement('p');
        status.className = "has-text-right"
        status.innerHTML = p[2];

        portsContainer.appendChild(serviceName);
        portsContainer.appendChild(portNumber);
        portsContainer.appendChild(status);
    });
}

