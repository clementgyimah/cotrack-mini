const { ipcRenderer } = window.require("electron");

// close the About window
const closeAboutWindow = () => {
    ipcRenderer.send("close-about-window");
  };

export { closeAboutWindow }
