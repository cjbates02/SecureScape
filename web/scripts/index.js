/** INDEX PAGE EVENT LISTENERS */

if (document.getElementById("main-page")) {
  document.getElementById("network-map-btn").addEventListener("click", () => {
    rootPasswordDiv = document.getElementById("root-pw-form");
    rootPasswordDiv.style.display = "grid";
  });

  window.addEventListener("load", () => {
    if (localStorage.getItem("storedEndpoints") !== null) {
      let endpoints = JSON.parse(localStorage.getItem("storedEndpoints"));
      const nodes = processNetworkData(endpoints);
      const links = generateLinks(nodes);
      positionNodes(nodes, links);
    }
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
    endpoints = await getEndpoints(password);
    localStorage.setItem("storedEndpoints", JSON.stringify(endpoints));
    if (endpoints) {
      const nodes = processNetworkData(endpoints);
      const links = generateLinks(nodes);
      positionNodes(nodes, links);
    }
  });
}

// Process endpoint data to visualize in network map
const processNetworkData = (endpoints) => {
  let endpointKeys = Object.keys(endpoints);
  let endpointValues = Object.values(endpoints);

  const endpointNodes = [];

  for (let i = 0; i < endpointKeys.length; i++) {
    const endpointIp = endpointKeys[i];
    for (let j = 0; j < endpointValues[i].length; j++) {
      const currentEndpointValue = endpointValues[i][j];

      const portNumber = currentEndpointValue.portid;
      const serviceName = currentEndpointValue.service.name;
      const state = currentEndpointValue.state;
    }

    const endpointObj = { ip: endpointIp };
    endpointNodes.push(endpointObj);
  }
  return endpointNodes;
};

const generateLinks = (nodes) => {
  const gatewayNode = nodes[0];
  const links = [];
  nodes.slice(1).forEach((node, i, arr) => {
    const sourceNode = node;
    const targetNode = gatewayNode; // Connect to the next node, or the first node if it's the last one
    links.push({ source: sourceNode, target: targetNode });
  });
  return links;
};

const positionNodes = (nodes, links) => {
  const width = 700;
  const height = 700;

  const svg = d3
    .select(".network-diagram")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force("center", d3.forceCenter(width / 2, height / 2).strength(0.5))
    //.force("collide", d3.forceCollide().radius(100).strength(0.1))
    .force("charge", d3.forceManyBody().distanceMin(2))
    .on("tick", () => {
      drawNetwork(svg, nodes, links);
    });
};

const drawNetwork = (svg, nodes, links) => {
  svg.selectAll("*").remove(); // Clear existing content

  // Draw the links first
  svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y)
    .attr("stroke", "black");

  // Draw the nodes
  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 10)
    .attr("fill", "white");
};
