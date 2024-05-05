if (document.getElementById("main-page")) {
  document.getElementById("network-map-btn").addEventListener("click", () => {
    rootPasswordDiv = document.getElementById("root-pw-form");
    rootPasswordDiv.style.display = "grid";
  });

  window.addEventListener("load", () => {
    if (localStorage.getItem("storedEndpoints") !== null) {
      let endpoints = JSON.parse(localStorage.getItem("storedEndpoints"));
      generateDiagram(endpoints);
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
      generateDiagram(endpoints);
    }
  });
}

nodeModal = document.getElementById("node-modal");
closeModalBtn = document.getElementById("close-modal");

const generateDiagram = (networkData) => {
  let nodes = [];
  let edges = [];

  nodes.push(
    {
      id: 0,
      label: "WAN",
      image: "/img/cloud-service.png",
      shape: "image",
      size: 45,
    },
    {
      id: 1,
      label: networkData[0].ip,
      image: "/img/router.png",
      shape: "image",
      size: 30,
    }
  );

  edges.push({
    from: 0,
    to: 1,
    color: { color: "#CCC" },
    length: 50,
    smooth: {
      type: "vertical",
      forceDirection: "none",
      roundness: 0,
    },
  });

  let nodeId = 2;

  for (i = 1; i < networkData.length; i++) {
    currentNode = networkData[i];
    const gatewayId = 1;
    nodes.push({
      id: nodeId,
      label: currentNode.ip,
      image: "/img/user.png",
      shape: "image",
      size: 30,
      data: currentNode,
    });
    edges.push({
      from: gatewayId,
      to: nodeId,
    });
    parentId = nodeId;
    nodeId += 1;
    currentNode.ports.forEach((port) => {
      if (port.state === "open") {
        nodes.push({
          id: nodeId,
          label: port.service.name,
          image: "/img/port.png",
          shape: "image",
          size: 20,
        });
        edges.push({
          from: parentId,
          to: nodeId,
        });
        nodeId += 1;
      }
    });
    nodeId += 1;
  }

  // nodes[1].image = "/img/router.png";

  // create a network
  const container = document.getElementById("network-diagram");
  const data = {
    nodes: nodes,
    edges: edges,
  };

  var options = {
    layout: {
      hierarchical: {
        direction: "UD",
      },
    },
    edges: {
      smooth: true,
      color: { color: "#adadad" },
      width: 2,
    },
    nodes: {
      font: {
        size: 18,
        color: "black",
        face: "Outfit",
      },
    },
    interaction: {
      hover: true,
    },
  };

  const network = new vis.Network(container, data, options);

  network.on("click", (event) => {
    const { nodes } = event;

    if (nodes.length > 0) {
      const nodeId = nodes[0];
      const clickedNode = getNode(nodeId, data.nodes);
      if (clickedNode.data !== undefined) {
        // modal elements
        const ip = document.getElementById("ip");
        const hostname = document.getElementById("hostname");
        const mac = document.getElementById("mac");
        const portContainer = document.getElementById("port-information");

        nodeModal.style.display = "block";
        closeModalBtn.addEventListener("click", () => {
          nodeModal.style.display = "none";
          ip.innerHTML = "";
          hostname.innerHTML = "";
          mac.innerHTML = "";
          portContainer.innerHTML = "";
        });

        ip.innerHTML = clickedNode.data.ip;
        hostname.innerHTML = clickedNode.data.hostname;
        mac.innerHTML = clickedNode.data.mac;

        clickedNode.data.ports.forEach((port) => {
          serviceNameEl = document.createElement("p");
          portNumberEl = document.createElement("p");
          statusEl = document.createElement("p");

          serviceNameEl.innerHTML = port.service.name;
          portNumberEl.innerHTML = port.portid;
          statusEl.innerHTML = port.state;

          portContainer.appendChild(serviceNameEl);
          portContainer.appendChild(portNumberEl);
          portContainer.appendChild(statusEl);
        });
      }
    }
  });
  network.once("afterDrawing", () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    const imgData = canvas.toDataURL("img/png");
    localStorage.setItem("imgData", imgData);
  });
};

const getNode = (nodeId, nodes) => {
  const clickedNode = nodes.find((node) => node.id === nodeId);
  return clickedNode;
};
