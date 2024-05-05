document.getElementById("generate-report-btn").addEventListener("click", () => {
  imgData = getImgData();
  deviceData = getDeviceInformation();
  vulnersData = getVulners();
  console.log(vulnersData);
  generatePdf(imgData, deviceData, vulnersData);
});


const generatePdf = (imgData, deviceData, vulnerData) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const doc = new jspdf.jsPDF();
  doc.addFileToVFS("../css/Outfit/static/Outfit-Regular.ttf");
  doc.addFont("../css/Outfit/static/Outfit-Regular.ttf", "Outfit", "normal");

  doc.addFileToVFS("../css/Outfit/static/Outfit-Bold.ttf");
  doc.addFont("../css/Outfit/static/Outfit-Bold.ttf", "OutfitBold", "normal");

  doc.addFileToVFS("../css/Outfit/static/Outfit-Light.ttf");
  doc.addFont("../css/Outfit/static/Outfit-Light.ttf", "OutfitLight", "normal");

  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont('OutfitBold');
  doc.setFontSize(18);
  doc.text("SecureScape Network Analysis Report", 10, 20);
  doc.setFontSize(13);
  doc.setFont('OutfitLight');
  doc.text(`Today's Date is ${month+1}/${day}/${year}`, 10, 30);
  doc.line(10, 40, pageWidth - 10, 40);
  doc.setFont('OutfitBold');
  doc.text("Network Diagram:", 10, 50);
  doc.addImage(imgData, 10, 10, 180, 160);

  doc.setFontSize(13);
  doc.line(10, 140, pageWidth - 10, 140);
  doc.text("Your device information:", 10, 150);
  doc.setFont('Outfit');
  doc.setFontSize(10);
  doc.text(`IP Address: ${deviceData.ip}`, 10, 160);
  doc.text(`Your Mac Address: ${deviceData.mac}`, 10, 170);
  doc.text(`Hostname: ${deviceData.hostname}`, 10, 180);
  const osStatus = deviceData.os_status === false ? 'Your device is not installed with the latest software update.' : 'Your device is up to date!';
  doc.text(osStatus, 10, 190);
  doc.line(10, 200, pageWidth - 10, 200);

  doc.setFontSize(13);
  doc.setFont('OutfitBold');
  doc.text('5 Most Recently Published CVE\'s:', 10, 210);
  doc.setFont('Outfit');
  doc.setFontSize(10);
  let y = 220;
  vulnerData.forEach((vulner) => {
    doc.text(`${vulner.cveID} - ${vulner.vulnerabilityName} - ${vulner.dateAdded}`, 10, y);
    y += 10;
  });

  doc.save(`SecureScape-Report-${currentDate}.pdf`);
};

const getImgData = () => {
  return localStorage.getItem("imgData");
};

const getDeviceInformation = () => {
  return JSON.parse(localStorage.getItem("deviceData"));
}

const getVulners = () => {
  return JSON.parse(localStorage.getItem("vulners")).slice(0, 5);
};
