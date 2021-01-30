//Calling all necessary packages and libraries
import React, { useState, useEffect } from 'react';
import '../Assets/css/Modal.css';
const { ipcRenderer } = window.require('electron');

export default function EditAttendeeModal(props) {
    //declaration of state variables
    const showEditModal = props.show ? 'modal display-block' : 'modal display-none';
    const [invalidDetails, setInvalidDetails] = useState(false);
    const [editId, setEditId] = useState("");
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const [editContactNumber, setEditContactNumber] = useState("");
    const [editEmailAddress, setEditEmailAddress] = useState("");
    const [isNewAttendee, setIsNewAttendee] = useState(false);

    //react hook that starts first when component mounts or any of the varibales in the array changes
    useEffect(() => {
        var isSubscribed = true;
        if (isSubscribed) {
            setEditId(props.cId);
            setEditFirstName(props.cFirstName);
            setEditLastName(props.cLastName);
            setEditGender(props.cGender);
            setEditLocation(props.cLocation);
            setEditContactNumber(props.cContactNumber);
            setEditEmailAddress(props.cEmailAddress);
            setIsNewAttendee(props.newAttendeeAdd);
            setInvalidDetails(false);
        }
        return () => isSubscribed = false;
    }, [props.cId, props.cContactNumber, props.cGender, props.cEmailAddress, props.cFirstName, props.cLastName, props.cLocation, showEditModal, props.newAttendeeAdd])

    //expression to handle sending edited attendee detail(s) to backend
    const handleEditDetails = () => {
        if (editFirstName.length === 0 || editLastName.length === 0 || editGender.length === 0 || editLocation.length === 0 || editContactNumber.length === 0 || editEmailAddress.length === 0) {
            setInvalidDetails(true);
        }
        else {
            if (isNewAttendee) {
                const attendeeData = {
                    editId,
                    editFirstName,
                    editLastName,
                    editGender,
                    editLocation,
                    editContactNumber,
                    editEmailAddress
                }
                ipcRenderer.send('add-attendee-details', attendeeData);
                setIsNewAttendee(false);
                return props.handleClose();
            }
            else {
                const attendeeData = {
                    editId,
                    editFirstName,
                    editLastName,
                    editGender,
                    editLocation,
                    editContactNumber,
                    editEmailAddress
                }
                ipcRenderer.send('edit-attendee-details', attendeeData);
                setIsNewAttendee(false);
                return props.handleClose();
            }
        }
    }

    //expressions to monitor input values during the editing
    const editFirstNameFunc = (e) => {
        setEditFirstName(e.target.value);
        setInvalidDetails(false);
    }
    const editLastNameFunc = (e) => {
        setEditLastName(e.target.value);
        setInvalidDetails(false);
    }
    const editGenderFunc = (e) => {
        setEditGender(e.target.value);
        setInvalidDetails(false);
    }
    const editLocationFunc = (e) => {
        setEditLocation(e.target.value);
        setInvalidDetails(false);
    }
    const editContactNumberFunc = (e) => {
        setEditContactNumber(e.target.value);
        setInvalidDetails(false);
    }
    const editEmailAddressFunc = (e) => {
        setEditEmailAddress(e.target.value);
        setInvalidDetails(false);
    }

    const handleCloseModal = () => {
        setInvalidDetails(false);
        setIsNewAttendee(false);
        return props.handleClose();
    }

    return (
        <div className={showEditModal}>
            <div className="modal-main">
                <div className="record-temperature-div">Edit Details</div>
                {/**check if all inputs are correct */
                    invalidDetails ?
                        <div className="record-temp-error">Oops! <span role="img" aria-label="EyesGlass">🧐</span> Make sure all inputs are correct</div>
                        :
                        <div></div>
                }
                {/**form inputs and labels */}
                <div className="attendee-info-div">
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-firstName" className="label-span">First Name: </label>
                        <input type="text" id="attendee-label-for-firstName" className="edit-attendee-input-text" placeholder="First Name" value={editFirstName} onChange={editFirstNameFunc} />
                    </div>
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-lastName" className="label-span">Last Name: </label>
                        <input type="text" id="attendee-label-for-lastName" className="edit-attendee-input-text" placeholder="Last Name" value={editLastName} onChange={editLastNameFunc} />
                    </div>
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-gender" className="label-span">Gender: </label>
                        <select id="attendee-label-for-gender" className="edit-attendee-input-text" placeholder="Gender" value={editGender} onChange={editGenderFunc}>
                            <option value="">Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-location" className="label-span">Location: </label>
                        <input type="text" id="attendee-label-for-location" className="edit-attendee-input-text" placeholder="Location" value={editLocation} onChange={editLocationFunc} />
                    </div>
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-contact" className="label-span">Contact Number: </label>
                        <input type="text" id="attendee-label-for-contact" className="edit-attendee-input-text" placeholder="Contact Number" value={editContactNumber} onChange={editContactNumberFunc} />
                    </div>
                    <div className="details-div">
                        <label htmlFor="attendee-label-for-email" className="label-span">Email Address: </label>
                        <input type="text" id="attendee-label-for-email" className="edit-attendee-input-text" placeholder="Email Address" value={editEmailAddress} onChange={editEmailAddressFunc} />
                    </div>
                </div>
                <div className="buttons-div">
                    {/**"Save" and "Close" buttons for the modal */}
                    <span className="save-button" onClick={() => handleEditDetails()}>Save</span><span className="close-button" onClick={() => handleCloseModal()}>Close</span>
                </div>
            </div>

        </div>
    );
}