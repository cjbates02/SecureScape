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

  document.getElementById("endpoint-data-btn").addEventListener("click", () => {
    window.location.href = "endpoint_data.html";
  });

  document.getElementById("profile").addEventListener("click", () => {
    window.location.href = "profile.html";
  });

  document.getElementById("report-btn").addEventListener('click', () => {
    window.location.href = "report.html";
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
