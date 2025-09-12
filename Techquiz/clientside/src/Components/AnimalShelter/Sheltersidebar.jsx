
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import "../../assets/css/style.css";
import { FaPhoneFlip ,FaUserDoctor} from "react-icons/fa6";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineAddHomeWork ,MdOutlineShoppingCart} from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";

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
          <Link to="/" className="menu-link">
            <FaTachometerAlt className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
         
     <li>
          <Link to="/vetes/app" className="menu-link">
            <FaUserDoctor  className="menu-icon" />
            {isOpen && <span>Appointments</span>}
          </Link>
          
        </li>
         <li>
          <Link to="/vetes/healthReacord" className="menu-link">
            <MdOutlineHealthAndSafety  className="menu-icon" />
            {isOpen && <span>Health Record</span>}
          </Link>
          
        </li>
      </ul>
    </div>
  )
}

export default Sheltersidebar