const { ipcRenderer } = window.require("electron");

const addNewAttendee = (props) => {
  const {
    firstName,
    lastName,
    gender,
    location,
    contactNumber,
    emailAddress,
    temperature,
    activateTemp,
    setFirstName,
    setLastName,
    setGender,
    setLocation,
    setContactNumber,
    setEmailAddress,
    setTemperature,
    setAttendeeAlreadyExist,
    setInvalidAdd,
    setInvalidEmail,
    resetInput,
    resetError,
  } = props;
  // variables to hold attendee details
  setFirstName(firstName.split(" ").join(""));
  setLastName(lastName.split(" ").join(""));
  setContactNumber(contactNumber.split(" ").join(""));
  setEmailAddress(emailAddress.split(" ").join(""));
  setTemperature(temperature.split(" ").join(""));
  setGender(gender.split(" ").join(""));
  console.log(gender);
  /**
   * logic that uses "Exclusive OR" to make sure that each toggle button
   * correlate with it's input before form submission
   */
  if (firstName.length === 0 || lastName.length === 0 || gender.length === 0)
    return setInvalidAdd(true);
  else if (temperature.length === 0) {
    if (
      (temperature.length === 0 && !activateTemp) ||
      (!(temperature.length === 0) && activateTemp)
    ) {
      /**
       * condition to check if a valid email is entered
       * in the email input. Done by checking '@' sign in the input
       */
      if (emailAddress.indexOf("@") < 0) setInvalidAdd(true);
      else {
        if (emailAddress.length > 25) setInvalidEmail(true);
        else {
          const attendeeDetails = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            location: location,
            contactNumber: contactNumber,
            emailAddress: emailAddress,
            temperature: temperature,
          };
          ipcRenderer.send("new-attendee", attendeeDetails);
          ipcRenderer.on("new-attendee-reply", (event, arg) => {
            setAttendeeAlreadyExist(arg);
          });
          resetInput({
            setFirstName,
            setLastName,
            setLocation,
            setContactNumber,
            setEmailAddress,
            setTemperature,
          });
          resetError({
            setAttendeeAlreadyExist,
            setInvalidAdd,
            setInvalidEmail,
          });
        }
      }
    } else setInvalidAdd(true);
  } else if (emailAddress.indexOf("@") < 0) {
    setInvalidAdd(true);
  } else {
    if (emailAddress.length > 25) setInvalidEmail(true);
    else {
      const attendeeDetails = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        location: location,
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        temperature: temperature,
      };
      ipcRenderer.send("new-attendee", attendeeDetails);
      ipcRenderer.on("new-attendee-reply", (event, arg) => {
        setAttendeeAlreadyExist(arg);
      });
      resetInput({
        setFirstName,
        setLastName,
        setLocation,
        setContactNumber,
        setEmailAddress,
        setTemperature,
      });
      resetError({
        setAttendeeAlreadyExist,
        setInvalidAdd,
        setInvalidEmail,
      });
    }
  }
};

export { addNewAttendee };
