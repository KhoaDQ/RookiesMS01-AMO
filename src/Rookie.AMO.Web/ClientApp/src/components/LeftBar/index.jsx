import React from 'react'
import logo from './Logo.png'
import './LeftBar.css'
import { Link } from 'react-router-dom'
import Menu from '../Menu'
function LeftBar() {
    return (
        <div className='left-bar'>
            <div className='left-bar__header'>
                <img className='left-bar__logo' src={logo} alt='' />
                <h5 className='left-bar__title'>Online Asset Management</h5>
            </div>
            <div className='left-bar__menu'>
                <Menu />
            </div>
        </div>
    )
}

export default LeftBar
