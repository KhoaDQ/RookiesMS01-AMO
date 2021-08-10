import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import {
    InputGroupText,
    InputGroupAddon,
    InputGroup,
  } from "reactstrap";
import "./style.css";
export default function Filter(props) {
    let {options, displayValue, placeholder} = props

    const handleSelect=(e)=>{
        console.log(e)
    }

    const handleUnSelect=(e)=>{
        console.log(e)
    }
    return(
        <InputGroup >
            <Multiselect
            options={options}
            displayValue={displayValue}
            showCheckbox={true}
            closeOnSelect={false}
            placeholder={placeholder}
            onSelect={handleSelect}
            onRemove={handleUnSelect}
            />      
            <InputGroupAddon addonType="append" onClick = {()=>{console.log('a')}}>
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
        </InputGroup>     
    )
}