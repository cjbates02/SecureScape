
/** TEST FUNCTIONS HERE TO ENSURE COMMUNICATION BETWEEN PYTHON AND JAVASCRIPT */

// eel.expose(say_hello_js); // Expose this function to Python

// function say_hello_js(x) {
//   console.log("Hello from " + x);
// }

// say_hello_js("JavaScript World"); // calling local javascript function
// eel.say_hello_py("JavaScript World"); // calling python function from backend

/** EVENT LISTENERS */

// Listens for the event that all the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Renders the vulnerbility page
  document
    .getElementById("vulnerbility-page-btn")
    .addEventListener("click", async () => {
      window.location.href = "vulner.html";
    });

  document.getElementById("home-page").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("vulner-test").addEventListener("click", async () => { // ** ADD TOAST NOTIFICATION **
    try {
      const jsonVulnerbilities = await eel.get_vulnerbility_data()(); // call python function to retrieve vulnerbility data
      const parsedVulner = JSON.parse(jsonVulnerbilities); // converts string to JS object
      console.log(parsedVulner.slice(0, 10)); // temporary
      renderVulnerbilities(parsedVulner.slice(0, 10));
      alertSuccess('Vulnerbilities Refreshed Successfully!')
    } catch(error) {
      alertError('Vulnerability Refresh Failed. Check your internet connection.')
      console.log(error)
    }
  });
});

/** Frontend functions */


// diaplays success toast to user
const alertSuccess = (message) => {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center'
    }
  })
}

// displayes error toast to user
const alertError = (message) => {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center'
    }
  })
}

const renderVulnerbilities = (vulnerbilities) => {
  const vulnContainer = document.getElementById("vulnerbility-container"); // store the div that will hold vulnerbilities
  vulnContainer.innerHTML = "" // clear the current content
  for (let i = 0; i < vulnerbilities.length; i++) { // iterate through each vulnerbility rendering the data
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

/** Vulnerbiliter object structure (for reference) */

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
