const { ipcRenderer } = window.require("electron");

// open websites
const openWebsite = () => {
    ipcRenderer.send("open-website");
  };

export { openWebsite }