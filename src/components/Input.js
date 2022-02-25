import React from 'react'
import '../assets/css/TextInput.css'
import '../assets/css/SelectInput.css';

const TextInput = ({inputStyle, ...inputProps}) => {
    return(
            <input
            disabled={inputProps.disabled && inputProps.disabled}
            type={inputProps.type}
            id={inputProps.id}
            className="text-input"
            placeholder={inputProps.placeholder && inputProps.placeholder}
            value={inputProps.value}
            onChange={inputProps.onChange}
            style={inputStyle}
          />
    )
}

const SelectInput = ({selectStyle, ...selectProps }) => {
  return (
    <select
      id={selectProps.id}
      className="select-input"
      style={selectStyle}
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

export { TextInput, SelectInput }
