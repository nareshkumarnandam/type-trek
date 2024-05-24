import React, {useState} from "react";
import Style from "./Navbar.module.css";
import DropDown from "../DropDown/DropDown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  return (
    <div className={Style.navbar}>
      <div>
        <h1 className={Style.logo} onClick={() => navigate('/')}>TypeTrek</h1>
      </div>
      <div className={Style.options}>
        <div  onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        <button  className={Style.dropDownBtn}>Categories</button>
        <div className={Style.dropdownMenu}>
        {isDropdownVisible && <DropDown />}
        </div>
      </div>
      <div>
            <button onClick={() => navigate('/create-post')} className={Style.createPostBtn}>Create Post</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
