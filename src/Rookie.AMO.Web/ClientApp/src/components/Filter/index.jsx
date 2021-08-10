import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import "./style.css";
export default function Filter(props) {
    let {options, displayValue, placeholder} = props
    return(
        <Multiselect
            options={options}
            displayValue={displayValue}
            showCheckbox={true}
            closeOnSelect={false}
            placeholder={placeholder}
        />       
    )
}