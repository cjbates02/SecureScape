/** ENDPOINT PAGE EVENT LISTENERS */

// Renders the root password div if the users clicks  hte refresh endpoints buttin
if (document.getElementById("endpoints-page")) {
  window.addEventListener("load", () => {
    if (localStorage.getItem("storedEndpoints") !== null) {
      let endpoints = JSON.parse(localStorage.getItem("storedEndpoints"));
      renderEndpointData(endpoints, currentIndex);
    }
  });

  document
    .getElementById("refresh-endpoints-btn")
    .addEventListener("click", () => {
      document.getElementById("root-pw-form").style.display = "grid";
    });

  // Handles click event of close button on the root pw div
  document.getElementById("cancel-scan").addEventListener("click", () => {
    alertError("Scan cancelled.");
    document.getElementById("sudo-pw").value = "";
    document.getElementById("root-pw-form").style.display = "none";
  });

  // Handles the click event of the root pw submission
  document.getElementById("root-submit").addEventListener("click", async () => {
    const password = document.getElementById("sudo-pw").value;
    document.getElementById("sudo-pw").value = "";
    document.getElementById("root-pw-form").style.display = "none";
    document.getElementById("endpoint-container").innerHTML = "";
    let endpoints = await getEndpoints(password);
    if (endpoints) {
      localStorage.setItem("storedEndpoints", JSON.stringify(endpoints));
      if (endpoints.length > 6) {
        document.getElementById("load-more-end").disabled = false;
      }
      renderEndpointData(endpoints, currentIndex);
    }
  });

  document.getElementById("load-more-end").addEventListener("click", () => {
    currentIndex += 6;
    let endpoints = JSON.parse(localStorage.getItem("storedEndpoints"));
    renderEndpointData(endpoints, currentIndex);
  });

  document.getElementById("load-less-end").addEventListener("click", () => {
    currentIndex -= 6;
    let endpoints = JSON.parse(localStorage.getItem("storedEndpoints"));
    renderEndpointData(endpoints, currentIndex);
  });
}

// Returns all endpoints on a network
const getEndpoints = async (password) => {
  document.getElementById("sudo-pw").value = ""; // Removes the password input
  if (password === null) {
    alertError("Scan cancelled password empty.");
  } else {
    document.getElementById("loading-icon").hidden = false; // Renders loading icon
    const endpoints = await eel.get_endpoints_data(password)(); // Call backend for endpoint information
    if (endpoints !== 1) {
      // If there were no errors in the backend
      const parsedEndpoints = JSON.parse(endpoints); // Parse the json file into  a js object
      //renderEndpointData(parsedEndpoints, currentIndex); // Render endpoints to frontend
      console.log(parsedEndpoints);
      document.getElementById("loading-icon").hidden = true; // Hide the loading icon
      alertSuccess("Completed network scan!"); // Notify user of success

      return parsedEndpoints;
    } else {
      // If password was incorrect
      document.getElementById("loading-icon").hidden = true;
      alertError("Incorrect root password.");
    }
  }
};

const renderEndpointData = (endpoints, index) => {
  let portElements = ``;
  limit = index + 6;
  endpointContainer = document.getElementById("endpoint-container");
  endpointContainer.innerHTML = "";

  // Limit check to disable buttons if endpoint index is out of range
  if (index >= endpoints.length - 6) {
    limit = endpoints.length - index + index;
    document.getElementById("load-more-end").disabled = true;
  } else {
    document.getElementById("load-more-end").disabled = false;
  }

  if (index === 0) {
    document.getElementById("load-less-end").disabled = true;
  } else {
    document.getElementById("load-less-end").disabled = false;
  }

  console.log(typeof endpoints[0]);

  for (i = index; i < limit; i++) {
    const currentEndpoint = endpoints[i];

    const ip = currentEndpoint.ip;
    const mac = currentEndpoint.mac;
    const hostname = currentEndpoint.hostname;
    const ports = currentEndpoint.ports;

    ports.forEach((p) => {
      const portNumber = p.portid;
      const serviceName = p.service.name;
      const state = p.state;

      const portElement = `
            <p>${portNumber}</p>
            <p>${serviceName}</p>
            <div class="tooltip has-text-right">
              ${state}
              <span class=tooltiptext>${getToolTipText(state)}</span>
            </div>
        `;
      portElements += portElement;
    });

    const endpointElement = elementFromHtml(`
    <div class="endpoint-card">
      <p class="has-text-weight-bold has-text-centered">${ip}</p>
      <p class="has-text-centered">${mac}</p>
      <div class="port-container has-text-weight-medium">
        ${portElements}
      </div>
    </div>
    `);

    endpointContainer.appendChild(endpointElement);
    portElements = ``;
  }
};

const elementFromHtml = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

const getToolTipText = (portState) => {
  if (portState === "open") {
    return "An open port can potentially expose the system to unauthorized access or exploitation if there are unsecured services running. Ensure only necessary services are exposed, and apply proper authentication, access control, and encryption measures.";
  } else if (portState === "closed") {
    return "While closed ports may not pose an immediate threat, they could still be subject to reconnaissance attempts by attackers. Ensure ports are properly monitored and closed ports do not inadvertently open to external access.";
  } else if (portState === "filtered") {
    return "Filtered ports may indicate the presence of a firewall or security appliance blocking access to the port. However, its essential to verify that the filtering is intentional and configured correctly to prevent bypassing security measures.";
  } else {
    return "An unknown port state could indicate potential issues with network scanning or misconfiguration. Further investigation is required to determine the cause.";
  }
};
