import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Web_pets = () => {
    
      const [pets, setPets] = useState([]);
      useEffect(() => {
        const fetchPets = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL} /api/adoptionsPET`);
            setPets(res.data);
          } catch (err) {
            console.error("❌ Error fetching pets:", err);
          }
        };
        fetchPets();
      }, []);
    
  return (
   <div>
  {pets.length === 0 ? (
    <p>No pets are found</p>
  ) : (
    pets.map((pet, index) => (
      <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>{pet.name}</h3>
        <img 
          src={pet.image} 
          alt={pet.name} 
          style={{ width: "150px", height: "150px", objectFit: "cover" }} 
        />
        <p>Age: {pet.age}</p>
        <p>Breed: {pet.breed}</p>
      <Link to={'/petform'}> </Link>
      </div>
    ))
  )}
</div>

  )
}

export default Web_pets