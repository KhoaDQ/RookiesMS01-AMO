import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import {
    InputGroupText,
    InputGroupAddon,
    InputGroup,
  } from "reactstrap";
import "./style.css";
import { useState } from "react";
export default function Filter(props) {
    let {options, displayValue, placeholder, handleFilter} = props

    let [optionSelect,setOptionSelect] = useState()
    
    const handleSelect=(e)=>{
        setOptionSelect(e)
    }

    const handleUnSelect=(e)=>{
        setOptionSelect(e)
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
            <InputGroupAddon addonType="append" onClick = {(e)=>handleFilter(optionSelect,e)}>
              <InputGroupText className="right__icon">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
        </InputGroup>     
    )
}