// Calling all necessary packages and libraries
import React, { useState, useEffect } from "react";
// import "../../assets/css/OldAttendee.css";
import EditAttendeeModal from "./components/EditAttendeeModal";
import { editAttendeeSearchInputStyle } from "../../assets/styles";
import { TableComp, TextInput } from "../../components";
const { ipcRenderer } = window.require("electron");

export default function EditPage() {
  // declaration of state variables
  const [allAttendee, setAllAttendee] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [groupAttendee, setGroupAttendee] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editContactNumber, setEditContactNumber] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [addNewAttendee, setAddNewAttendee] = useState(false);

  // react hook that starts first when component mounts
  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      ipcRenderer.send("old-attendee-all");
      ipcRenderer.on("old-attendee-all-reply", async (event, arg) => {
        await setAllAttendee(arg);
      });
    }
    return () => (isSubscribed = false);
  }, []);

  // expression to handle contacting backend when the search input is active
  const searchChange = (searchObject) => {
    const searchName = searchObject.target.value;

    if (searchName.length !== 0) {
      ipcRenderer.send("old-attendee-name", searchName);
      ipcRenderer.on("old-attendee-name-reply", (event, arg) => {
        setGroupAttendee(arg);
      });
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  // expression to handle setting the state variables to their respective inputs
  const handleEdit = (
    id,
    firstName,
    lastName,
    gender,
    location,
    contactNumber,
    emailAddress
  ) => {
    setEditId(id);
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditGender(gender);
    setEditLocation(location);
    setEditContactNumber(contactNumber);
    setEditEmailAddress(emailAddress);
    setAddNewAttendee(false);
    setShowEditModal(true);
  };

  // expression to handle closing the edit modal
  const closeTempModal = () => {
    setShowEditModal(false);
  };

  // expression to prompt backend to delete a certain attendee
  const handleDelete = (id) => {
    ipcRenderer.send("delete-attendee", id);
  };

  // expression to open Edit Attendee modal and add a new attendee
  const openAddNewAttendeeModal = () => {
    setEditId("");
    setEditFirstName("");
    setEditLastName("");
    setEditGender("");
    setEditLocation("");
    setEditContactNumber("");
    setEditEmailAddress("");
    setAddNewAttendee(true);
    setShowEditModal(true);
  };

  return (
    <div className="old-attendee-container">
      {/** edit attendee modal component call */}
      <EditAttendeeModal
        show={showEditModal}
        newAttendeeAdd={addNewAttendee}
        handleClose={() => closeTempModal()}
        cId={editId}
        cFirstName={editFirstName}
        cLastName={editLastName}
        cGender={editGender}
        cLocation={editLocation}
        cContactNumber={editContactNumber}
        cEmailAddress={editEmailAddress}
      />
      <div className="edit-header">Edit Attendee</div>
      {/** search input div */}
      <div className="search-input-div">
        <TextInput
          type="text"
          placeholder="Type name to search for attendee(s)"
          onChange={searchChange}
          inputStyle={editAttendeeSearchInputStyle}
        />
      </div>
      {/** add new attendee div */}
      <div className="add-new-attendee-button-div">
        <div
          onClick={() => openAddNewAttendeeModal()}
          className="add-new-attendee-button"
        >
          + Add Attendee
        </div>
      </div>
      {/** table div */}
      <TableComp
        searchActive={searchActive}
        groupAttendee={groupAttendee}
        allAttendee={allAttendee}
        handleTemperature={handleEdit}
        type="edit"
        handleDelete={handleDelete}
      />
    </div>
  );
}
