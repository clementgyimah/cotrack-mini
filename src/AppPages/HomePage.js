import React, { useState, useEffect } from 'react';
import '../Assets/css/HomePage.css';
import { FaTools, FaBars, FaWindowMaximize, FaEdit, FaMedapps } from 'react-icons/fa';
const { ipcRenderer } = window.require('electron')

function HomePage() {
    const [takeCareOfService, setTakeCareOfService] = useState("");
    const [bigSidebar, setBigSidebar] = useState(false);
    const [sideBarType, setSidebarType] = useState("short-home-content");
    const [startServiceDiv, setStartServiceDiv] = useState("short-start-service-div");
    const [viewServiceDiv, setViewServiceDiv] = useState("short-view-service-div");
    const [serviceStartingTime, setServiceStartingTime] = useState("");
    const [serviceEndingTime, setServiceEndingTime] = useState("");
    const [currentServiceHover, setCurrentServiceHover] = useState(false);
    const [editHover, setEditHover] = useState(false);
    const [analyzerHover, setAnalyzerHover] = useState(false);
    const [settingsHover, setSettingsHover] = useState(false);
    const [invalidStart, setInvalidStart] = useState(false);
    const [invalidView, setInvalidView] = useState(false);
    const [serviceAlreadyStarted, setServiceAlreadyStarted] = useState(false);
    const [churchName, setChurchName] = useState("");

    useEffect(() => {
        var isSubscribed = true;
        if (isSubscribed) {
            ipcRenderer.send('get-church-name')
            ipcRenderer.on('get-church-name-reply', async (event, arg) => {
              await setChurchName(arg)
            })
        }
        return () => isSubscribed = false;
    })

    const startNewService = () => {
        if ( serviceStartingTime.length === 0 || serviceEndingTime.length === 0) {
            setInvalidStart(true);
        }
        else {
            const properties = {
                startingTime: serviceStartingTime,
                endingTime: serviceEndingTime
            }
            ipcRenderer.send("open-tabs", properties);
            ipcRenderer.on("open-tabs-reply", async (event, arg) => {
                await setServiceAlreadyStarted(arg);
            })
            setServiceStartingTime("");
            setServiceEndingTime("");
        }
    }

    const handleViewService = () => {
        if (takeCareOfService.length === 0) setInvalidView(true)
        else {
            ipcRenderer.send('open-session', takeCareOfService);
        }
    }
    const handleInputService = (e) => {
        setTakeCareOfService(e.target.value);
        if (invalidView) setInvalidView(false);
    }

    const sidebarMenuCurrentService = () => {
        ipcRenderer.send("open-current-session");
    }

    const sidebarMenuEdit = () => {
        ipcRenderer.send('open-edit-window');
    }

    const sidebarMenuSessionAnalyzer = () => {
        ipcRenderer.send('open-analysis-window');
    }

    const sidebarMenuSettings = () => {
        ipcRenderer.send('open-settings-window');
    }

    const toggleSidebar = () => {
        setBigSidebar(!bigSidebar);
        if (sideBarType === "short-home-content") {
            setSidebarType("long-home-content");
            setStartServiceDiv("long-start-service-div");
            setViewServiceDiv("long-view-service-div");
        }
        else if (sideBarType === "long-home-content") {
            setSidebarType("short-home-content");
            setStartServiceDiv("short-start-service-div");
            setViewServiceDiv("short-view-service-div");
        }
    }

    const serviceStartingTimeFunc = (e) => {
        setServiceStartingTime(e.target.value);
        if (invalidStart) setInvalidStart(false);
        if (serviceAlreadyStarted) setServiceAlreadyStarted(false);
    }
    const serviceEndingTimeFunc = (e) => {
        setServiceEndingTime(e.target.value);
        if (invalidStart) setInvalidStart(false);
        if (serviceAlreadyStarted) setServiceAlreadyStarted(false);
    }

    const currentServiceHoverFunc = (cond) => {
        if (cond === "on") setCurrentServiceHover(true);
        else if (cond === "off") setCurrentServiceHover(false);
    }
    const editHoverFunc = (cond) => {
        if (cond === "on") setEditHover(true);
        else if (cond === "off") setEditHover(false);
    }
    const sessionAnalyzerHoverFunc = (cond) => {
        if (cond === "on") setAnalyzerHover(true);
        else if (cond === "off") setAnalyzerHover(false);
    }
    const settingsHoverFunc = (cond) => {
        if (cond === "on") setSettingsHover(true);
        else if (cond === "off") setSettingsHover(false);
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <div onClick={() => toggleSidebar()} className="open-sidebar-div">
                    <FaBars color="white" size={30}></FaBars>
                </div>
                <div className="church-title-div">
                    <div className="church-title">
                        {churchName}
                    </div>
                </div>
            </header>
            {
                bigSidebar ?
                    (
                        <div className="sidebar">
                            <div onMouseEnter={() => currentServiceHoverFunc("on")} onMouseLeave={() => currentServiceHoverFunc("off")} onClick={() => sidebarMenuCurrentService()} className="sidebar-element-div"><FaWindowMaximize id="sidebar-icons" color={currentServiceHover ? "#6698FF" : "#387C44"} size={currentServiceHover ? 25 : 20}></FaWindowMaximize><span className={currentServiceHover ? "sidebar-element-div-text-active" : "sidebar-element-div-text"}>Current Service</span></div>
                            <div onMouseEnter={() => editHoverFunc("on")} onMouseLeave={() => editHoverFunc("off")} onClick={() => sidebarMenuEdit()} className="sidebar-element-div"><FaEdit id="sidebar-icons" color={editHover ? "#6698FF" : "#387C44"} size={editHover ? 25 : 20}></FaEdit><span className={editHover ? "sidebar-element-div-text-active" : "sidebar-element-div-text"}>Edit</span></div>
                            <div onMouseEnter={() => sessionAnalyzerHoverFunc("on")} onMouseLeave={() => sessionAnalyzerHoverFunc("off")} onClick={() => sidebarMenuSessionAnalyzer()} className="sidebar-element-div"><FaMedapps id="sidebar-icons" color={analyzerHover ? "#6698FF" : "#387C44"} size={analyzerHover ? 25 : 20}></FaMedapps><span className={analyzerHover ? "sidebar-element-div-text-active" : "sidebar-element-div-text"}>Analyze</span></div>
                            <div onMouseEnter={() => settingsHoverFunc("on")} onMouseLeave={() => settingsHoverFunc("off")} onClick={() => sidebarMenuSettings()} className="sidebar-element-div"><FaTools id="sidebar-icons" color={settingsHover ? "#6698FF" : "#387C44"} size={settingsHover ? 25 : 20}></FaTools><span className={settingsHover ? "sidebar-element-div-text-active" : "sidebar-element-div-text"}>Settings</span></div>
                        </div>
                    ) :
                    (
                        <div className="short-sidebar">
                            <div onMouseEnter={() => currentServiceHoverFunc("on")} onMouseLeave={() => currentServiceHoverFunc("off")} onClick={() => sidebarMenuCurrentService()} className="short-sidebar-element-div"><FaWindowMaximize id="sidebar-icons" color={currentServiceHover ? "#6698FF" : "#387C44"} size={currentServiceHover ? 25 : 20}></FaWindowMaximize></div>
                            <div onMouseEnter={() => editHoverFunc("on")} onMouseLeave={() => editHoverFunc("off")} onClick={() => sidebarMenuEdit()} className="short-sidebar-element-div"><FaEdit id="sidebar-icons" color={editHover ? "#6698FF" : "#387C44"} size={editHover ? 25 : 20}></FaEdit></div>
                            <div onMouseEnter={() => sessionAnalyzerHoverFunc("on")} onMouseLeave={() => sessionAnalyzerHoverFunc("off")} onClick={() => sidebarMenuSessionAnalyzer()} className="short-sidebar-element-div"><FaMedapps id="sidebar-icons" color={analyzerHover ? "#6698FF" : "#387C44"} size={analyzerHover ? 25 : 20}></FaMedapps></div>
                            <div onMouseEnter={() => settingsHoverFunc("on")} onMouseLeave={() => settingsHoverFunc("off")} onClick={() => sidebarMenuSettings()} className="short-sidebar-element-div"><FaTools id="sidebar-icons" color={settingsHover ? "#6698FF" : "#387C44"} size={settingsHover ? 25 : 20}></FaTools></div>
                        </div>
                    )
            }
            <div className={sideBarType}>
                <div className="home-content-background-decoration">
                </div>
                <div className={startServiceDiv}>
                    <div className="start-service-text">Start Service</div>
                    <div>
                        <div className="start-service-elements-div">
                            <label htmlFor="service-start-label" className="service-details-text">Starting Time: </label>
                            <input id="service-start-label" className="service-details-input" onChange={serviceStartingTimeFunc} value={serviceStartingTime} placeholder="09:30:AM" type="time" />
                        </div>
                        <div className="start-service-elements-div">
                            <label htmlFor="service-end-label" className="service-details-text">Ending Time: </label>
                            <input id="service-end-label" className="service-details-input" onChange={serviceEndingTimeFunc} value={serviceEndingTime} placeholder="12:30:PM" type="time" />
                        </div>
                        <div className="start-service-button-div">
                            <div onClick={() => startNewService()} className="start-service-button">Start</div>
                        </div>
                    </div>
                    {
                        serviceAlreadyStarted ?
                            (<div className="start-view-error">Oops! <span role="img" aria-label="Thinking">🤔</span> Service already started</div>)
                            :
                            (invalidStart ?
                                <div className="start-view-error">Oops! <span role="img" aria-label="EyesUp">🙄</span> Fill all inputs appropriately</div>
                                :
                                <div></div>)
                    }
                </div>
                <div className={viewServiceDiv}>
                    <div className="view-service-text">View Service</div>
                    <div className="view-service-elements-div">
                        <label htmlFor="service-date-label" className="view-service-details-text">Date: </label>
                        <input id="service-date-label" className="view-service-details-input" onChange={handleInputService} value={takeCareOfService} placeholder="2020-09-15" type="date" />
                    </div>
                    <div className="view-service-button-div">
                        <div onClick={() => handleViewService()} className="view-service-button">View</div>
                    </div>
                    {
                        invalidView ?
                            <div className="start-view-error">Oops! <span role="img" aria-label="EyesUp">🙄</span> Fill all inputs appropriately</div>
                            :
                            <div></div>
                    }
                </div>
            </div>
        </div>
    )

}

export default HomePage
