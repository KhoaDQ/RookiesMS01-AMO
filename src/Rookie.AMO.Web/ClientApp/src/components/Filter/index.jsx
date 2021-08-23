import React from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { AiFillFilter } from "@react-icons/all-files/ai/AiFillFilter";
import {
    InputGroupText,
    InputGroupAddon,
    InputGroup,
    Col,
    Row
  } from "reactstrap";
import "./style.css";
import { useState } from "react";
export default function Filter(props) {
    let {options, defaultOption, displayValue, placeholder, handleFilter} = props

    var selectAllOption = [{name: "All",value: ""}]

    let [optionSelect,setOptionSelect] = useState(defaultOption!=undefined?defaultOption:selectAllOption)
    
    

    const handleSelect=(e)=>{
      if(optionSelect!=undefined){
        var newSelect = e.filter(o1 => !optionSelect.some(o2 => o2 == o1))
        if(JSON.stringify(newSelect[0]) === JSON.stringify(selectAllOption[0])){
          setOptionSelect(newSelect) 
        }
        else{
          if(e.some(o => o.name == 'All'))
            e.shift()
          setOptionSelect(e) 
        }
        
      }
    }

    const handleUnSelect=(e)=>{
        console.log(e)
        if(e.length == 0)
          setOptionSelect(selectAllOption)
        else
          setOptionSelect(e)
    }
    return(
        <InputGroup className="filter_container">
        <Row>
            <Multiselect
            options={
              (selectAllOption).concat(options)
            }
            displayValue={displayValue}
            showCheckbox={true}
            closeOnSelect={false}
            placeholder={placeholder}
            onSelect={handleSelect}
            onRemove={handleUnSelect}
            selectedValues={optionSelect}
            avoidHighlightFirstOption={true}
            />      
            <InputGroupAddon addonType="append" onClick = {(e)=>handleFilter(optionSelect,e)}>
              <InputGroupText className="right__icon filter_button">
                <AiFillFilter />
              </InputGroupText>
            </InputGroupAddon>
            </Row>
        </InputGroup>     
    )
}