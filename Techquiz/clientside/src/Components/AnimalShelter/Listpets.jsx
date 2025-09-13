

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Shelterlayout from "./AnimalShelter/Shelterlayout";
const Listpets = () => {
      const userToken = sessionStorage.getItem("animalsehlterLogined");
    const tokenParts = userToken.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const id = payload.id;
       var [user, SetUserData] = useState([]);
        function userFetch() {
          axios.get(`${import.meta.env.VITE_API_URL}/shelterpet/${id}`).then((res) => {
            SetUserData(res.data);
          });
        }
      
      
        function userDelete(id) {
          axios.delete(`${import.meta.env.VITE_API_URL}/delShelterpet/${id}`).then(() => {
            toast.error("The pet  is deleted now ", { position: "top-right" });
          });
        }
        var [query, Setquery] = useState("");
        var search_user = async () => {
          try {
            const resp = await fetch(
              `${import.meta.env.VITE_API_URL}/search_pet/${id}/search?q=${query}`
            );
            const data = await resp.json();
            SetUserData(data);
          } catch (error) {
            console.error(error);
          }
        };
        useEffect(() => {
          if (query.length === 0) {
            userFetch();
            return;
          } else {
            search_user();
          }
        });
           var statusUpdate=(id,status)=>{
         axios.put(`http://localhost:4000/app_Status/${id}`,{status:status}).then(() => {
            toast.success("The appointment status is updated now !", {
              position: "top-right",
            });
          });
        
       } 
  return (
    <div><Shelterlayout/>
     <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Pets</h2>
          <div>
          <input
            type="text"
            placeholder="Search ..."
            className="search-input"
            value={query}
            onChange={(e) => {
              Setquery(e.target.value);
            }}
          />
          <Link to={"/shelter/addpets"} className='btn btn-primary ms-2'> new</Link>
                     
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
           
                <tr>
                  <th>#</th>
  
  <th>Name</th>
  <th>Species</th>
  <th>Breed</th>
  <th>Age</th>
  <th>Status</th>
  
  <th>Action</th>
</tr>

               
              
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>
                      {user.name} 
                    </td>
                    <td>{user.species}</td>

                    <td>{user.breed}</td>
                   
                    <td>
                      {user.age}
                    </td>
                    <td>
                      {user.status==0? "Available":"adopted"}
                    </td>
                   
                  
                 
                    <td>
                     
          <Link to={`/shelter/editPet/${user._id}`} className='btn btn-primary ms-2'> Edit</Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => userDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found for {query}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Listpets