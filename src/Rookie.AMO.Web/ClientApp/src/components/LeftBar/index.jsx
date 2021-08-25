import React from 'react';
import { useState } from 'react';
import logo from './Logo.png';
import './LeftBar.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
function LeftBar(props) {
  const tranferActiveFunction = (content) => {
    props.tranferActive(content);
  };
  return (
    <div className="left-bar">
      <div className="left-bar__header">
        <Link to="/" className="hover_logo">
          <img className="left-bar__logo" src={logo} alt="" />
        </Link>
        <Link to="/" className="hover_logo">
          <h5 className="left-bar__title">Online Asset Management</h5>
        </Link>
      </div>
      <div className="left-bar__menu">
        <Menu tranferActive={tranferActiveFunction} />
      </div>
    </div>
  );
}

export default LeftBar;
