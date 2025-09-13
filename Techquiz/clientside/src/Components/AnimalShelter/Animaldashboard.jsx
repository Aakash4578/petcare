import React, { useEffect, useState } from "react";
import Shelterlayout from "./Shelterlayout";
import axios from "axios";

const Animaldashboard = () => {
  // 🔹 Token se shelter id nikalna (safe check ke sath)
  const userToken = sessionStorage.getItem("animalsehlterLogined");
  let id = "";
  if (userToken) {
    try {
      const tokenParts = userToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      id = payload.id;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // 🔹 States
  const [user, setUserData] = useState([]); // adoption requests
  const [shelter, setShelterData] = useState([]); // pets of this shelter

  // 🔹 Fetch adoption requests
  const userFetch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/adoption-requests`
      );
      setUserData(res.data);
    } catch (err) {
      console.error("Error fetching adoption requests:", err);
    }
  };

  // 🔹 Fetch shelter pets
  const setShelterDataFetch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/shelterpet/${id}`
      );
      setShelterData(res.data);
    } catch (err) {
      console.error("Error fetching shelter pets:", err);
    }
  };

  // 🔹 Run on mount
  useEffect(() => {
    if (id) {
      userFetch();
      setShelterDataFetch();
    }
  }, [id]);

  return (
    <div>
      <Shelterlayout />

      <div className="container my-5">
        <h2 className="mb-4">Animal Shelter Dashboard</h2>

        <div className="row g-4">
          {/* Adoption Requests Count */}
          <div className="col-md-6">
            <div className="card shadow text-center p-4">
              <h5>Total Adoption Requests</h5>
              <h2>{user.length}</h2>
            </div>
          </div>

          {/* Shelter Pets Count */}
          <div className="col-md-6">
            <div className="card shadow text-center p-4">
              <h5>Total Pets in Shelter</h5>
              <h2>{shelter.length}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animaldashboard;
