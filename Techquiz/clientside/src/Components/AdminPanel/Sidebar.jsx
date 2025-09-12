import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBox, FaCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import "../../assets/css/style.css";
import { FaPhoneFlip ,FaUserDoctor} from "react-icons/fa6";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineAddHomeWork ,MdOutlineShoppingCart} from "react-icons/md";


import { BiCategoryAlt } from "react-icons/bi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <h2 className="brand">{isOpen ? "Nexus Admin" : "NA"}</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="menu-link">
            <FaTachometerAlt className="menu-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="menu-link">
            < FaUsers className="menu-icon" />
            {isOpen && <span>Users</span>}
          </Link>
        </li>
         <li>
          <Link to="/admin/categories" className="menu-link">
            <BiCategoryAlt className="menu-icon" />
            {isOpen && <span>Categories</span>}
          </Link>
        </li>
           <li>
          <Link to="/admin/products" className="menu-link">
            <BsBoxes  className="menu-icon" />
            {isOpen && <span>Products</span>}
          </Link>
        </li>


     <li>
          <Link to="/admin/Veterinarian" className="menu-link">
            <FaUserDoctor  className="menu-icon" />
            {isOpen && <span>Veterinarian</span>}
          </Link>
        </li>
        
     <li>
          <Link to="/admin/Animal_shelter" className="menu-link">
            <MdOutlineAddHomeWork   className="menu-icon" />
            {isOpen && <span>Animal Shelter</span>}
          
          </Link>
        </li>
          <li>
     
          <Link to="/admin/order" className="menu-link">
            <MdOutlineShoppingCart  className="menu-icon" />
            {isOpen && <span>Orders</span>}
          </Link>
        </li>
         <li>
     
          <Link to="/admin/contact" className="menu-link">
            <FaPhoneFlip className="menu-icon" />
            {isOpen && <span>Contact</span>}
          </Link>
        </li>
           <li>
     
          <Link to="/admin/fetch_faq" className="menu-link">
            <TfiHeadphoneAlt  className="menu-icon" />
            {isOpen && <span>FAQ</span>}
          </Link>
        </li>
       
        <li className="logout">
          <Link to="/logout" className="menu-link">
            <MdLogout className="menu-icon" />
            {isOpen && <span>Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
