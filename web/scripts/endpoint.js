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
  let endpointKeys = Object.keys(endpoints);
  let endpointValues = Object.values(endpoints);
  let portElements = ``;
  limit = index + 6;
  endpointContainer = document.getElementById("endpoint-container");
  endpointContainer.innerHTML = "";

  // Limit check to disable buttons if endpoint index is out of range
  if (index >= endpointKeys.length - 6) {
    limit = endpointKeys.length - index + index;
    document.getElementById("load-more-end").disabled = true;
  } else {
    document.getElementById("load-more-end").disabled = false;
  }

  if (index === 0) {
    document.getElementById("load-less-end").disabled = true;
  } else {
    document.getElementById("load-less-end").disabled = false;
  }

  for (let i = index; i < limit; i++) {
    const endpointIp = endpointKeys[i];
    for (let j = 0; j < endpointValues[i].length; j++) {
      const currentEndpointValue = endpointValues[i][j];

      const portNumber = currentEndpointValue.portid;
      const serviceName = currentEndpointValue.service.name;
      const state = currentEndpointValue.state;

      const portElement = `
            <p>${portNumber}</p>
            <p>${serviceName}</p>
            <p class="has-text-right">${state}</p>
        `;
      portElements += portElement;
    }
    // call html template function here
    const endpointElement = elementFromHtml(`
          <div class="endpoint-card">
            <p class="has-text-centered">${endpointIp}</p>
            <div class="port-container">
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
