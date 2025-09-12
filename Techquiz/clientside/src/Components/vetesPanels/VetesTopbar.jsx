import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import axios from 'axios';
const VetesTopbar = ({ toggleSidebar }) => {
     const [user, setUserData] =useState({}); 
    var nav=useNavigate();
        const userToken = sessionStorage.getItem("vetesLogined");
         const tokenParts = userToken.split(".");
            const payload = JSON.parse(atob(tokenParts[1]));
            const id = payload.id;
             useEffect(() => {
                const fetchProfile = async () => {
                  if (userToken) {
                    const tokenParts = userToken.split(".");
                    const payload = JSON.parse(atob(tokenParts[1]));
                    const id = payload.id;
            
                    try {
                      const response = await axios.get(`http://localhost:4000/profileVetes/${id}`);
                      setUserData(response.data);
                    
                    } catch (error) {
                      console.error(error);
                    }
                  } else {
                    setUserData(null);
                  }
                };
            
                fetchProfile()
              }, [userToken]);
    
                function logout() {
        sessionStorage.removeItem("vetesLogined");
        axios.get("http://localhost:4000/logout");
        nav("/");
      }
  return (
    <div>  <div className="topbar">
      {/* Left */}
      <div className="topbar-left">
        <FaBars size={22} className="toggle-icon" onClick={toggleSidebar} />
        <h3 className="topbar-title">Veterinarian Panel</h3>
      </div>

      {/* Right - Bootstrap Dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle d-flex align-items-center"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        
          <span className="profile-name">{user.name}</span>

        </button>

        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li><Link className="dropdown-item" to="/vetes/profile">Profile</Link></li>
 
          <li><a className="dropdown-item text-danger" href="#" onClick={()=>logout()}>Logout</a></li>
        </ul>
      </div>
    </div></div>
  )
}

export default VetesTopbar