import React from 'react';
import Style from './DropDown.module.css'

const DropDown = () => {
  return (
    <div className={Style.dropdownMenu}>
        <ul className={Style.dropDownList}>
            <li>Education</li>
            <li>Business</li>
            <li>Technology</li>
            <li>Food</li>
            <li>Sports</li>
            <li>Fashion</li>
        </ul>
    </div>
  )
}

export default DropDown