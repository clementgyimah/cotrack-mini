const { ipcRenderer } = window.require("electron");

// expression to monitor changes in the search input
const searchChange = (searchProps) => {
    if (searchProps.viewCurrentSession) {
      if (searchProps.searchName.length !== 0) {
        ipcRenderer.send("old-attendee-current-session-name", searchProps.searchName);
        ipcRenderer.on(
          "old-attendee-current-session-name-reply",
          (event, arg) => {
            searchProps.setGroupAttendee(arg);
          }
        );
        searchProps.setSearchActive(true);
      } else {
        searchProps.setSearchActive(false);
      }
    } else {
      if (searchProps.searchName.length !== 0) {
        ipcRenderer.send("old-attendee-name", searchProps.searchName);
        ipcRenderer.on("old-attendee-name-reply", (event, arg) => {
            searchProps.setGroupAttendee(arg);
        });
        searchProps.setSearchActive(true);
      } else {
        searchProps.setSearchActive(false);
      }
    }
  };

export { searchChange }
