import React from 'react'
import '../Assets/css/TextInput.css'

const TextInput = ({...inputProps}) => {
    return(
            <input
            disabled={inputProps.disabled && inputProps.disabled}
            type={inputProps.type}
            id={inputProps.id}
            className="text-input"
            placeholder={inputProps.placeholder && inputProps.placeholder}
            value={inputProps.value}
            onChange={inputProps.onChange}
          />
    )
}

export { TextInput }
