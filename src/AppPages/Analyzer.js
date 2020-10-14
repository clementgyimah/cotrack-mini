import React, { useEffect, useState } from 'react';
import "../Assets/css/OldAttendee.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditServiceModal from './EditServiceModal';
const { ipcRenderer } = window.require('electron');

export default function Analyzer() {
    const [allData, setAllData] = useState([]);
    /*const [genderData, setGenderData] = useState([]);*/
    const [searchActive, setSearchActive] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const [analysisDataAvailable, setAnalysisDataAvailable] = useState(false);
    const [editDate, setEditDate] = useState("");
    const [editStartTime, setEditStartTime] = useState("");
    const [editEndTime, setEditEndTime] = useState("");
    const [editAttendeeNumber, setEditAttendeeNumber] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        var isSubscribed = true
        if (isSubscribed) {
            ipcRenderer.send('analysis-data');
            ipcRenderer.on('analysis-data-available-reply', async (event, arg) => {
                await setAnalysisDataAvailable(arg);
            })
            /*
            ipcRenderer.on('analysis-data-gender-reply', async (event, arg) => {
                await setGenderData(arg)
            })
            */
            ipcRenderer.on('analysis-data-reply', async (event, arg) => {
                await setAllData(arg);
            })
        }
        return () => isSubscribed = false
    }, [])

    const searchChange = searchObject => {
        const searchName = searchObject.target.value;

        if (searchName.length !== 0) {
            ipcRenderer.send('analysis-data-search', searchName);
            ipcRenderer.on('analysis-data-search-reply', (event, arg) => {
                setGroupData(arg);
            })
            setSearchActive(true)
        }
        else {
            setSearchActive(false)
        }

    }

    const handleEditService = (date, startTime, endTime, attendeeNumber) => {
        setEditDate(date);
        setEditStartTime(startTime);
        setEditEndTime(endTime);
        setEditAttendeeNumber(attendeeNumber);
        setShowModal(true);
    }

    const handleDeleteService = (date) => {
        ipcRenderer.send('delete-service', date)
    }

    const handleServiceClose = () => {
        setShowModal(false);
    }

    return (
        <div className="old-attendee-container">
            <EditServiceModal show={showModal} handleClose={() => handleServiceClose()} cDate={editDate} cStartTime={editStartTime} cEndTime={editEndTime} cAttendeeNumner={editAttendeeNumber} />
            <div className="edit-header">Analysis</div>
            {
                analysisDataAvailable ?
                    (
                        <div>
                            <div className="search-input-div">
                                <input className="search-input" type="text"
                                    placeholder="Type something to search list items"
                                    onChange={searchChange} />
                            </div>
                            <div className="old-attendee-table-div">
                                <table className="old-attendee-table" rules="all">
                                    <thead className="old-attendee-table-thread">
                                        <tr className="old-attendee-table-thread-tr">
                                            <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Date</div></th>
                                            <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Start Time</div></th>
                                            <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">End Time</div></th>
                                            <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Number of Attendees</div></th>
                                            {
                                                /** 
                                                * <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Male</div></th>
                                                * <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Female</div></th>
                                                */
                                            }
                                            <th className="old-attendee-table-thread-tr-th" scope="col"><div className="table-cells-div">Action</div></th>
                                        </tr>
                                    </thead>
                                    <tbody className="old-attendee-table-tbody">
                                        {
                                            searchActive ? (
                                                groupData ?
                                                    groupData.map(function (data) {
                                                        return (
                                                            <tr className="old-attendee-table-tbody-tr" key={data._id}>
                                                                <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data._id}</div></td>
                                                                <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.start}</div></td>
                                                                <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.end}</div></td>
                                                                <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.attendee.length}</div></td>
                                                                <td className="old-attendee-table-tbody-tr-td">
                                                                    <div className="edit-table-cells-div">
                                                                        <span className="action-icon-span" onClick={() => handleEditService(data._id, data.session.start, data.session.end, data.session.attendee.length)}><FaEdit /></span>
                                                                        <span className="action-icon-span" onClick={() => handleDeleteService(data._id)}><FaTrashAlt /></span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    console.log("No attendee is gotten from the search")
                                            )
                                                :
                                                (
                                                    allData ?
                                                        allData.map(function (data) {
                                                            return (
                                                                <tr className="old-attendee-table-tbody-tr" key={data._id}>
                                                                    <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data._id}</div></td>
                                                                    <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.start}</div></td>
                                                                    <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.end}</div></td>
                                                                    <td className="old-attendee-table-tbody-tr-td"><div className="table-cells-div">{data.session.attendee.length}</div></td>
                                                                    <td className="old-attendee-table-tbody-tr-td" >
                                                                        <div className="edit-table-cells-div">
                                                                            <span className="action-icon-span" onClick={() => handleEditService(data._id, data.session.start, data.session.end, data.session.attendee.length)}><FaEdit /></span>
                                                                            <span className="action-icon-span" onClick={() => handleDeleteService(data._id)}><FaTrashAlt /></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        :
                                                        console.log("No attendee is registered in the database")
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="no-data-available-div">
                            <div className="no-data-available-text"> <span role="img" aria-label="EyesDown">😔</span> Sorry, there is no service recorded in the database</div>
                        </div>
                    )
            }

        </div>
    )
}