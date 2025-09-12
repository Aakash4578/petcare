import React, { useState } from 'react'
import VetesSidebar from './VetesSidebar';
import VetesNavbars from './VetesNavbars';
import { ToastContainer } from 'react-toastify';
import VetesTopbar from './VetesTopbar';

const VetesLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
      const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div>   <div>
      <VetesSidebar isOpen={isOpen} />
      <div
        style={{
          marginLeft: isOpen ? "230px" : "70px",
          transition: "margin-left 0.3s",
        }}
      >
        <VetesTopbar toggleSidebar={toggleSidebar} />
        <div style={{ padding: "20px" }}></div>
      </div>
      <ToastContainer/>
    </div></div>
  )
}

export default VetesLayout