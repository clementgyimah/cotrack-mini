export const activateTempFunc = (props) => {
  const {
    activateTemp,
    setActivateTemp,
    setTemperature,
    resetError,
    setAttendeeAlreadyExist,
    setInvalidAdd,
    setInvalidEmail,
  } = props;
  setActivateTemp(!activateTemp);
  setTemperature("");
  resetError({
    setAttendeeAlreadyExist,
    setInvalidAdd,
    setInvalidEmail,
  });
};
