import React, { useState } from 'react'
import Sheltersidebar from './Sheltersidebar'
import Shelternav from './Shelternav'
import { ToastContainer } from 'react-toastify';
import ShelterTops from "./ShelterTops"
const Shelterlayout = () => {
     const [isOpen, setIsOpen] = useState(true);
        const toggleSidebar = () => setIsOpen(!isOpen);
  return (
       <div>   <div>
      <Sheltersidebar isOpen={isOpen} />
      <div
        style={{
          marginLeft: isOpen ? "230px" : "70px",
          transition: "margin-left 0.3s",
        }}
      >
        <ShelterTops toggleSidebar={toggleSidebar} />
        <div style={{ padding: "20px" }}></div>
      </div>
      <ToastContainer/>
    </div></div>
  )
}

export default Shelterlayout