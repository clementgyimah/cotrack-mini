import React, { useState, useEffect } from 'react';
import '../Assets/css/Settings.css';
const { ipcRenderer } = window.require('electron');

export default function SettingsPage() {
  const [churchName, setChurchName] = useState("");
  const [currentSession, setCurrentSession] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [invalidSet, setInvalidSet] = useState(false);

  useEffect(() => {
    var isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send('get-church-name')
      ipcRenderer.on('get-church-name-reply', async (event, arg) => {
        await setChurchName(arg)
      });
      ipcRenderer.send('current-session')
      ipcRenderer.on('current-session-reply', async (event, arg) => {
        await setCurrentSession(arg)
        console.log(arg);
      });
    }
    return () => isSubscribed = false;
  }, [])

  const churchNameFunc = (e) => {
    setChurchName(e.target.value);
    setInvalidInput(false);
    setInvalidSet(false);
  }
  const currentSessionFunc = (e) => {
    setCurrentSession(e.target.value);
    setInvalidInput(false);
    setInvalidSet(false);
  }

  const onSubmit = () => {
    if (churchName.length === 0 || churchName.length > 50 || currentSession.length === 0 || parseInt(currentSession, 10) <= 0) {
      setInvalidInput(true);
    }
    else {
      const settingsData = {
        churchName,
        currentSession
      }
      ipcRenderer.send('store-settings', settingsData);
      ipcRenderer.on('store-settings-reply', (event, arg) => {
        setInvalidSet(arg);
      })
    }
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        Settings
        </div>
      <div className="settings-content">
        <div className="settings-content-row-div">
          <label htmlFor="church-name-label" className="settings-details-text">Church Name: </label>
          <input type="text" id="church-name-label" className="details-input-text" placeholder="Enter Church Name" value={churchName} onChange={churchNameFunc} />
        </div>
        <div className="settings-content-row-div">
          <label htmlFor="current-session-label" className="settings-details-text">Current Session: </label>
          <input type="date" id="current-session-label" className="details-input-text" placeholder="2020-09-15" value={currentSession} onChange={currentSessionFunc} />
        </div>
        <div className="settings-button-div">
          <div onClick={() => onSubmit()} className="temperature-button">Save</div>
        </div>
        {
          invalidInput ?
            (<div className="settings-error">Oops! <span role="img" aria-label="EyesUp">🙄</span> Fill all inputs appropriately</div>)
            :
            (
              invalidSet ?
                (
                  <div>
                    <div className="settings-error">Oops! <span role="img" aria-label="Thinking">🤔</span> Something is wrong.</div>
                    <div className="settings-error-hint"><b>Hint: </b></div>
                    <div className="settings-error-hint">1. Make sure there is or was attendance recorded on: <strong> {currentSession}</strong></div>
                  </div>
                )
                :
                <div></div>
            )
        }
      </div>
    </div>
  )
}
