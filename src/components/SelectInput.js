import React from "react";
import "../Assets/css/SelectInput.css";

const SelectInput = ({ ...selectProps }) => {
  return (
    <select
      id={selectProps.id}
      className="select-input"
      placeholder={selectProps.placeholder && selectProps.placeholder}
      value={selectProps.value}
      onChange={selectProps.onChange}
    >
      {selectProps.intro && <option value="">{selectProps.intro}</option>}
      {selectProps.options.map((eachOption) => (
        <option value={eachOption.value}>{eachOption.displayName}</option>
      ))}
    </select>
  );
};

export { SelectInput };
