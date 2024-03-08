const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

// provides prameter for main window, then renders an index.html file
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "SecureScape",
    width: isDev ? 1000 : 600, // Checking if dev tools are on and displaying a wider screen if so
    height: 800,
  });

  // Open dev tools if in dev envionment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}


function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About Secure Scape',
        width: 300,
        height: 300,
    });

    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"))
}

// when the app is ready a primise will be fulfilled and trigger the main window to open
app.whenReady().then(() => {
  createMainWindow();

  // implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Menu Template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow
            },
          ],
        },
      ]
    : []),
];

// listens for event of all windows closing to occur and then checs if it is a windows machine, if it is it will quit due to windows behavior.
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
