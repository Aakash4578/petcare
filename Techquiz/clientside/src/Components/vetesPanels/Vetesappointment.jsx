
import VetesLayout from './VetesLayout'
import React, { useEffect, useState } from "react";

import axios from "axios";
import { use } from "react";
import { toast, ToastContainer } from "react-toastify";
const Vetesappointment = () => {
     const userToken = sessionStorage.getItem("vetesLogined");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const id = payload.id;
     var [user, SetUserData] = useState([]);
      function userFetch() {
        axios.get(`${import.meta.env.VITE_API_URL}/fetchappoint/${id}`).then((res) => {
          SetUserData(res.data);
        });
      }
 
      function userDelete(id) {
        axios.delete(`${import.meta.env.VITE_API_URL}/delapp/${id}`).then(() => {
          toast.error("The appointment  is deleted now ", { position: "top-right" });
        });
      }
      var [query, Setquery] = useState("");
      var search_user = async () => {
        try {
          const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/search_app/${id}/search?q=${query}`
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
       axios.put(`${import.meta.env.VITE_API_URL}/app_Status/${id}`,{status:status}).then(() => {
          toast.success("The appointment status is updated now !", {
            position: "top-right",
          });
        });
      
     } 
  return (
    <div><VetesLayout></VetesLayout>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Appointments</h2>
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

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>pet name</th>
                <th>time and date</th>
                <th>Status</th>
                <th className="action-col">Actions</th>
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
                      {user.appointment_time}
                    </td>
                     <td>     
                      <div class="select-wrap">  
                         <select name="status" id="" class="form-control" 
                          onChange={(e)=>
                            statusUpdate(user._id,e.target.value)}>
                            <option hidden>{user.status}</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div></td>
                  
                 
                    <td>
                     

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

export default Vetesappointment