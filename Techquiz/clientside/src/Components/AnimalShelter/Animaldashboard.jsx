import React, { useEffect, useState } from "react";
import Shelterlayout from "./Shelterlayout";
  const userToken = sessionStorage.getItem("animalsehlterLogined");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const id = payload.id;
const Animaldashboard = () => {
     var [user, SetUserData] = useState([]);
              function userFetch() {
                axios.get(`${import.meta.env.VITE_API_URL}/api/adoption-requests`).then((res) => {
                  SetUserData(res.data);
                });
              }

                useEffect(() => {
                     userFetch() 
                    SetShelterDataFetch() 
                       });
                         var [Shelter, SetShelterData] = useState([]);
        function SetShelterDataFetch() {
          axios.get(`${import.meta.env.VITE_API_URL}/shelterpet/${id}`).then((res) => {
            SetShelterData(res.data);
          });
        }
  return (
    <div>
        <Shelterlayout/>
        {user.length}
        {Shelter.length}
        
    </div>
  )
}

export default Animaldashboard