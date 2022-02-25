const { ipcRenderer } = window.require("electron");

// check for updates
const checkUpdates = () => {
    ipcRenderer.send("open-updates");
  };

export { checkUpdates }