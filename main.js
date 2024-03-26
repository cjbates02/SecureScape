const { app, BrowserWindow } = require("electron");
const path = require("node:path");

// creates home page browser window assigning window size as parameter
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:8000/index.html");
};

// listens to the event that an app is loaded, then it fires the create window function
app.whenReady().then(() => {
  createWindow();

  // open a window if none are open for mac os
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      // checks if no windows are open
      createWindow();
    }
  });
});

// listen for event that all windows are closed and terminates application
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // check if platform is windows
    app.quit();
  }
});
