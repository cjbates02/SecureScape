/** GLOBAL VARIABLES */

let currentIndex = 0;

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

  /** VULNERBILITY PAGE EVENT LISTENERS */

  if (document.getElementById("vulnerability-page")) {
    // Refreshes vulnerbilities
    document
      .getElementById("vulner-test")
      .addEventListener("click", async () => {
        document.getElementById("load-more-vulner").disabled = false;
        try {
          vulners = await getVulnerbilities();
          renderVulnerbilities(vulners, currentIndex);
          alertSuccess("Vulnerbilities Refreshed Successfully!");
        } catch (error) {
          alertError(
            "Vulnerability Refresh Failed. Check your internet connection."
          );
          console.log(error);
        }
      });

    // Renders the next 10 vulnerbilities
    document
      .getElementById("load-more-vulner")
      .addEventListener("click", async () => {
        vulners = await getVulnerbilities();
        currentIndex = currentIndex + 10;
        renderVulnerbilities(vulners, currentIndex);
      });

    // Renders previous 10 vulnerbilities
    document
      .getElementById("go-back-vulner")
      .addEventListener("click", async () => {
        vulners = await getVulnerbilities();
        currentIndex = currentIndex - 10;
        renderVulnerbilities(vulners, currentIndex);
      });
  }

  /** ENDPOINT PAGE EVENT LISTENERS */

  // Renders the root password div if the users clicks  hte refresh endpoints buttin
  if (document.getElementById("endpoints-page")) {
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
    document.getElementById("root-submit").addEventListener("click", () => {
      const password = document.getElementById("sudo-pw").value;
      document.getElementById("sudo-pw").value = "";
      document.getElementById("root-pw-form").style.display = "none";
      getEndpoints(password);
    });
  }
});

/** EEL BACKEND FUNCTIONS */

// Returns all endpoints on a network
const getEndpoints = async (password) => {
  document.getElementById("sudo-pw").value = ""; // Removes the password input
  if (password === null) { 
    alertError("Scan cancelled password empty.");
  } else {
    document.getElementById("loading-icon").hidden = false; // Renders loading icon
    const endpoints = await eel.get_endpoints_data(password)(); // Call backend for endpoint information
    if (endpoints !== 1) { // If there were no errors in the backend
      const parsedEndpoints = JSON.parse(endpoints); // Parse the json file into  a js object
      console.log(parsedEndpoints); 
      document.getElementById("loading-icon").hidden = true; // Hide the loading icon
      alertSuccess("Completed network scan!"); // Notify user of success
    } else { // If password was incorrect
      document.getElementById("loading-icon").hidden = true;
      alertError("Incorrect root password.");
    }
  }
};

// Returns all vulnerbilities from python
const getVulnerbilities = async () => {
  const jsonVulnerbilities = await eel.get_vulnerbility_data()(); // call python function to retrieve vulnerbility data
  const parsedVulner = JSON.parse(jsonVulnerbilities); // converts string to JS object
  return parsedVulner;
};

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

// Renders vulnerbilities to user
const renderVulnerbilities = (vulnerbilities, index) => {
  const vulnContainer = document.getElementById("vulnerbility-container"); // store the div that will hold vulnerbilities
  vulnContainer.innerHTML = ""; // clear the current content
  limit = index + 10; // render 10 more

  // Limit check to disable buttons if vulnerbility index is out of range
  if (index >= vulners.length - 10) {
    limit = vulnerbilities.length - index + index;
    document.getElementById("load-more-vulner").disabled = true;
  } else {
    document.getElementById("load-more-vulner").disabled = false;
  }

  if (index === 0) {
    document.getElementById("go-back-vulner").disabled = true;
  } else {
    document.getElementById("go-back-vulner").disabled = false;
  }

  // iterate through each vulnerbility rendering the data
  for (let i = index; i < limit; i++) {
    const currentVuln = vulnerbilities[i];

    const idDiv = document.createElement("div");
    idDiv.className = "vulnerability-attribute";
    idDiv.innerHTML = `<div>${currentVuln.cveID}</div>`;

    const nameDiv = document.createElement("div");
    nameDiv.className = "vulnerability-attribute";
    nameDiv.innerHTML = `<div>${currentVuln.vulnerabilityName}</div>`;

    const dateDiv = document.createElement("div");
    dateDiv.className = "vulnerability-attribute";
    dateDiv.innerHTML = `<div>${currentVuln.dateAdded}</div>`;

    vulnContainer.appendChild(idDiv);
    vulnContainer.appendChild(nameDiv);
    vulnContainer.appendChild(dateDiv);
  }
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
