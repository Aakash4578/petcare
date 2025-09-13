
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import "../../assets/css/style.css";
import { FaPhoneFlip ,FaUserDoctor} from "react-icons/fa6";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineAddHomeWork ,MdOutlineShoppingCart} from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";

import { BiCategoryAlt } from "react-icons/bi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
const Sheltersidebar = ({ isOpen }) => {
  return (
   <div className={`sidebar-container ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <h2 className="brand">{isOpen ? "Veterinarian" : "Vt"}</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/shelter/dashboard" className="menu-link">
            <FaTachometerAlt className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
         
     <li>
          <Link to="/shelter/pets" className="menu-link">
            <MdOutlinePets  className="menu-icon" />
            {isOpen && <span>pets</span>}
          </Link>
          
        </li>
         <li>
          <Link to="/shelter/adoplist" className="menu-link">
            <MdOutlineHealthAndSafety  className="menu-icon" />
            {isOpen && <span>Adopt List</span>}
          </Link>
          
        </li>
      </ul>
    </div>
  )
}

export default Sheltersidebar