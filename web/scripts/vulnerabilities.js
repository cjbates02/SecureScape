/** VULNERBILITY PAGE EVENT LISTENERS */

if (document.getElementById("vulnerability-page")) {
  window.addEventListener("load", () => {
    if (localStorage.getItem("storedEndpoints") !== null) {
      let vulners = JSON.parse(localStorage.getItem("vulners"));
      renderVulnerbilities(vulners, currentIndex);
      renderModal();
    }
  });

  // Refreshes vulnerbilities
  document.getElementById("vulner-test").addEventListener("click", async () => {
    document.getElementById("load-more-vulner").disabled = false;
    try {
      vulners = await getVulnerbilities();
      localStorage.setItem("vulners", JSON.stringify(vulners));
      renderVulnerbilities(vulners, currentIndex);
      renderModal();
      if (vulners.length > 10) {
        document.getElementById("load-more-vulner").disabled = false;
      }
      alertSuccess("Vulnerbilities Refreshed Successfully!");
    } catch (error) {
      alertError(
        "Vulnerability Refresh Failed. Check your internet connection."
      );
      console.log(error);
    }
  });

  // Renders the next 10 vulnerbilities
  document.getElementById("load-more-vulner").addEventListener("click", () => {
    vulners = JSON.parse(localStorage.getItem("vulners"));
    currentIndex = currentIndex + 10;
    renderVulnerbilities(vulners, currentIndex);
    renderModal();
  });

  // Renders previous 10 vulnerbilities
  document.getElementById("go-back-vulner").addEventListener("click", () => {
    vulners = JSON.parse(localStorage.getItem("vulners"));
    currentIndex = currentIndex - 10;
    renderVulnerbilities(vulners, currentIndex);
    renderModal();
  });
}

// Returns all vulnerbilities from python
const getVulnerbilities = async () => {
  const jsonVulnerbilities = await eel.get_vulnerbility_data()(); // call python function to retrieve vulnerbility data
  const parsedVulner = JSON.parse(jsonVulnerbilities); // converts string to JS object
  console.log(parsedVulner);
  return parsedVulner;
};

// Renders vulnerbilities to user
const renderVulnerbilities = (vulnerbilities, index) => {
  const vulnContainer = document.getElementById("vulnerbility-container"); // store the div that will hold vulnerbilities
  vulnContainer.innerHTML = ""; // clear the current content
  limit = index + 10; // render 10 more

  // Limit check to disable buttons if vulnerbility index is out of range
  if (index >= vulnerbilities.length - 10) {
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
    idDiv.className = "vulnerability-attribute cve-id";
    idDiv.innerHTML = `<div>${currentVuln.cveID}</div>`;
    idDiv.value = JSON.stringify(currentVuln);

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

const renderModal = () => {
  vulnerModal = document.getElementById("vulner-modal");
  closeBtn = document.getElementById("close-modal");
  vulnerElements = document.querySelectorAll(".cve-id");

  closeBtn.addEventListener("click", () => {
    vulnerModal.style.display = "none";
  });

  vulnerElements.forEach((el) => {
    el.addEventListener("click", () => {
      vulner = JSON.parse(el.value);
      console.log(vulner);
      vulnerModal.style.display = "block";

      id = document.getElementById('id');
      vulnerName = document.getElementById('vulner-name');
      dateAdded = document.getElementById('date-added');
      dueDate = document.getElementById('due-date');
      knownRans = document.getElementById('known-rans');
      product = document.getElementById('product');
      requiredAction = document.getElementById('required-action');
      desc = document.getElementById('desc');

      id.innerHTML = vulner.cveID;
      vulnerName.innerHTML = vulner.vulnerabilityName;
      dateAdded.innerHTML = vulner.dateAdded;
      dueDate.innerHTML = vulner.dueDate;
      knownRans.innerHTML = vulner.knownRansomwareCampaignUse;
      product.innerHTML = vulner.product;
      requiredAction.innerHTML = vulner.requiredAction;
      desc.innerHTML = vulner.shortDescription;
    });
  });
};
