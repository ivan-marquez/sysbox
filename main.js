const { app, BrowserWindow, Tray, Menu } = require("electron");
const { join } = require("path");
const si = require("systeminformation");

// si.cpu()
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

var mainWindow;
var tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    transparent: true,
    focusable: false,
    x: 200,
    y: 120,
  });

  tray = new Tray(join(__dirname, "assets", "icons", "node.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "SysInfoStats",
      enabled: false,
    },
    {
      label: "Settings",
      click() {
        console.log("Clicked on settings");
      },
    },
    {
      label: "Help",
      click() {
        console.log("Clicked on Help");
      },
    },
    {
      label: "Quit",
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Events
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("tick", si.time());
    setInterval(() => mainWindow.webContents.send("tick", si.time()), 5000);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  //https://www.electronjs.org/docs/api/frameless-window#click-through-window
  mainWindow.setIgnoreMouseEvents(true);

  mainWindow.show();
}

app.whenReady().then(createWindow);
