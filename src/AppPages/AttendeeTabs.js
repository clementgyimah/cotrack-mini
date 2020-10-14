import React, { useState, useEffect } from 'react';
import '../Assets/css/AttendeeTabs.css';
import NewAttendee from './NewAttendee';
import OldAttendee from './OldAttendee';
const { ipcRenderer } = window.require('electron');

function AttendeeTabs() {
  const [oldAttendeeTab, setOldAttendeeTab] = useState("old-attendee-tab-active-div");
  const [newAttendeeTab, setNewAttendeeTab] = useState("new-attendee-tab-div");
  const [sessionAvailable, setSessionAvailable] = useState(false);

  useEffect(() => {
    var isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send('verify-session-availability');
      ipcRenderer.on('verify-session-availability-reply', (event, arg) => {
        setSessionAvailable(arg);
      })
    }
    return () => isSubscribed = false;
  }, [])

  const oldAttendeeTabFunc = () => {
    setOldAttendeeTab("old-attendee-tab-active-div");
    setNewAttendeeTab("new-attendee-tab-div")
  }
  const newAttendeeTabFunc = () => {
    setOldAttendeeTab("old-attendee-tab-div");
    setNewAttendeeTab("new-attendee-tab-active-div");
  }

  return (
    <div className="tabs-container">
      {
        sessionAvailable ?
          (
            <div>
              <header className="tabs-div">
                <div onClick={() => oldAttendeeTabFunc()} className={oldAttendeeTab}>
                  Old Attendee
        </div>
                <div onClick={() => newAttendeeTabFunc()} className={newAttendeeTab}>
                  New Attendee
        </div>
              </header>
              <div className="body-div">
                {
                  oldAttendeeTab === "old-attendee-tab-active-div" ?
                    <OldAttendee />
                    :
                    <NewAttendee />
                }
              </div>
            </div>
          )
          :
          (
            <div className="session-unavailable-div">
              <div className="session-unavailable-text"> <span role="img" aria-label="EyesDown">😔</span> Sorry, no session started for today</div>
            </div>
          )
      }
    </div>
  )
}

export default AttendeeTabs
