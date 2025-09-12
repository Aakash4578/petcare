import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ToastContainer } from "react-toastify";

const Admin_Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div>
      <Sidebar isOpen={isOpen} />
      <div
        style={{
          marginLeft: isOpen ? "230px" : "70px",
          transition: "margin-left 0.3s",
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} />
        <div style={{ padding: "20px" }}></div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Admin_Index;
