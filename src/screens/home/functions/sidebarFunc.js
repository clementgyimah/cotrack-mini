const { ipcRenderer } = window.require("electron");

// expressions to handle hovering over any of the sidebar menu items
const currentServiceHoverFunc = (props) => {
  if (props.cond === "ON") props.setCurrentServiceHover(true);
  else if (props.cond === "OFF") props.setCurrentServiceHover(false);
};

const editHoverFunc = (props) => {
  if (props.cond === "ON") props.setEditHover(true);
  else if (props.cond === "OFF") props.setEditHover(false);
};

const sessionAnalyzerHoverFunc = (props) => {
  if (props.cond === "ON") props.setAnalyzerHover(true);
  else if (props.cond === "OFF") props.setAnalyzerHover(false);
};

const settingsHoverFunc = (props) => {
  if (props.cond === "ON") props.setSettingsHover(true);
  else if (props.cond === "OFF") props.setSettingsHover(false);
};

// expression to prompt backend to open the current session window
const sidebarMenuCurrentService = () => {
  ipcRenderer.send("open-current-session");
};

// expression to prompt backend to open the edit attendee window
const sidebarMenuEdit = () => {
  ipcRenderer.send("open-edit-window");
};

// expression to prompt backend to open the session analyzer window
const sidebarMenuSessionAnalyzer = () => {
  ipcRenderer.send("open-analysis-window");
};

// expression to prompt backend to open the settings window
const sidebarMenuSettings = () => {
  ipcRenderer.send("open-settings-window");
};

export {
  currentServiceHoverFunc,
  editHoverFunc,
  sessionAnalyzerHoverFunc,
  settingsHoverFunc,
  sidebarMenuCurrentService,
  sidebarMenuEdit,
  sidebarMenuSessionAnalyzer,
  sidebarMenuSettings
};
