
import { toast, ToastContainer } from "react-toastify";
import Shelterlayout from "./Shelterlayout";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const AdoptList = () => {
  var [user, SetUserData] = useState([]);
          function userFetch() {
            axios.get(`${import.meta.env.VITE_API_URL}/api/adoption-requests`).then((res) => {
              SetUserData(res.data);
            });
          }
        
        
          function userDelete(id) {
            axios.delete(`${import.meta.env.VITE_API_URL}/deladopt/${id}`).then(() => {
              toast.error("The adopt request  is deleted now ", { position: "top-right" });
            });
          }
          var [query, Setquery] = useState("");
          var search_user = async () => {
            try {
              const resp = await fetch(
                `${import.meta.env.VITE_API_URL}/search_adopt/search?q=${query}`
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
             var statusUpdate=(id)=>{
           axios.put(`${import.meta.env.VITE_API_URL}/${id}`).then(() => {
              toast.success("The appointment status is updated now !", {
                position: "top-right",
              });
            });
          
         } 
  return (
    <div>
      <Shelterlayout/>
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

                     
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
           
                <tr>
                  <th>#</th>
  
  <th>Name</th>
  <th>Email</th>
  <th>Pet name</th>
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
                    <td>{user.email}</td>

                    <td>{user.pet_name}</td>
                   
                    <td>
                      {user.age}
                    </td>
                    <td>
                      {user.status=="pending"? "Available":"adopted"}
                    </td>
                   
                  
                 
                    <td>
                       <button
                        className="btn btn-primary"
                        onClick={() => statusUpdate(user._id)}
                      >
                        Approve
                      </button>
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

export default AdoptList