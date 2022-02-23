const { ipcRenderer } = window.require("electron");

const addNewAttendee = (props) => {
  // variables to hold attendee details
  props.setFirstName(props.firstName.split(" ").join(""));
  props.setLastName(props.lastName.split(" ").join(""));
  props.setContactNumber(props.contactNumber.split(" ").join(""));
  props.setEmailAddress(props.emailAddress.split(" ").join(""));
  props.setTemperature(props.temperature.split(" ").join(""));
  props.setGender(props.gender.split(" ").join(""));
  console.log(props.gender);
  /**
   * logic that uses "Exclusive OR" to make sure that each toggle button
   * correlate with it's input before form submission
   */
  if (props.firstName.length === 0 || props.lastName.length === 0 || props.gender.length === 0)
    return props.setInvalidAdd(true);
  else if (props.temperature.length === 0) {
    if (
      (props.temperature.length === 0 && !props.activateTemp) ||
      (!(props.temperature.length === 0) && props.activateTemp)
    ) {
      /**
       * condition to check if a valid email is entered
       * in the email input. Done by checking '@' sign in the input
       */
      if (props.emailAddress.indexOf("@") < 0) props.setInvalidAdd(true);
      else {
        if (props.emailAddress.length > 25) props.setInvalidEmail(true);
        else {
          const attendeeDetails = {
            firstName: props.firstName,
            lastName: props.lastName,
            gender: props.gender,
            location: props.location,
            contactNumber: props.contactNumber,
            emailAddress: props.emailAddress,
            temperature: props.temperature,
          };
          ipcRenderer.send("new-attendee", attendeeDetails);
          ipcRenderer.on("new-attendee-reply", (event, arg) => {
            props.setAttendeeAlreadyExist(arg);
          });
          props.resetAllInputs();
          props.resetAllErrors();
        }
      }
    } else props.setInvalidAdd(true);
  } else if (props.emailAddress.indexOf("@") < 0) {
    props.setInvalidAdd(true);
  } else {
    if (props.emailAddress.length > 25) props.setInvalidEmail(true);
    else {
      const attendeeDetails = {
        firstName: props.firstName,
        lastName: props.lastName,
        gender: props.gender,
        location: props.location,
        contactNumber: props.contactNumber,
        emailAddress: props.emailAddress,
        temperature: props.temperature,
      };
      ipcRenderer.send("new-attendee", attendeeDetails);
      ipcRenderer.on("new-attendee-reply", (event, arg) => {
        props.setAttendeeAlreadyExist(arg);
      });
      props.setFirstName("");
      props.setLastName("");
      props.setLocation("");
      props.setContactNumber("");
      props.setEmailAddress("");
      props.setTemperature("");
    }
  }
};

export { addNewAttendee }
