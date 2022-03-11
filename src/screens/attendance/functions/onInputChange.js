// expressions to set inputs to their respective state variables
export const onInputChange = (props) => {
  const {
    value,
    setValue,
    resetError,
    setAttendeeAlreadyExist,
    setInvalidAdd,
    setInvalidEmail,
  } = props;
  setValue(value);
  resetError({
    setAttendeeAlreadyExist,
    setInvalidAdd,
    setInvalidEmail,
  });
};
