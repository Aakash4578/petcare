import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyAppointments = () => {
  
  const [appointments, setAppointments] = useState([]);
const userToken = sessionStorage.getItem("userLogin");
     const tokenParts = userToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const ownerId = payload.id;
  useEffect(() => {
    const fetchAppointments = async () => {
      
        const response = await axios.get(
          `http://localhost:4000/myappointment/${ownerId}`
        );
     
    };

    fetchAppointments();
  }, [ownerId]);


  return (
    <div>
      <h3>My Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((app) => (
            <li key={app._id}>
              Date: {app.date} | Time: {app.time} | Vet: {app.vet_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
