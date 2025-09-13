import VetesLayout from './VetesLayout'
import React, { useEffect, useState } from "react";

import axios from "axios";
import { use } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';
const Healthrecord = () => {
     const userToken = sessionStorage.getItem("vetesLogined");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const id = payload.id;
     var [user, SetUserData] = useState([]);
      function userFetch() {
        axios.get(`${import.meta.env.VITE_API_URL}/vetesrecord/${id}`).then((res) => {
          SetUserData(res.data);
           console.log(res.data);
        });
      }
    
      
      function userDelete(id) {
        axios.delete(`${import.meta.env.VITE_API_URL}/delhealth/${id}`).then(() => {
          toast.error("The  health record is deleted now ", { position: "top-right" });
        });
      }
      var [query, Setquery] = useState("");
      var search_user = async () => {
        try {
          const resp = await fetch(
            `${import.meta.env.VITE_API_URL}/${id}/search?q=${query}`
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
     
  return (
    <div><VetesLayout></VetesLayout>
         <div className="users-container" style={{ marginLeft: "15%" }}>
           <div className="users-header">
             <h2>Pet health record</h2>
            <div> <input
               type="text"
               placeholder="Search ..."
               className="search-input"
               value={query}
               onChange={(e) => {
                 Setquery(e.target.value);
               }}
             /><Link to={"/vets/addhealthrecord"} className='btn btn-primary ms-2'> new</Link></div>
           </div>
   
           <div className="table-responsive">
             <table className="users-table">
               <thead>
                 <tr>
                   <th>#</th>
                   <th>Pet Name</th>
                   <th>diagnosis</th>
                   <th>treatment</th>
                  
                   <th className="action-col">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {user.length > 0 ? (
                   user.map((user, index) => (
                     <tr key={user.id}>
                       <td>{index + 1}</td>
                       
   
                       <td>{user.pet_name}</td>
                                             <td>{user.diagnosis}</td>

 <td>{user.treatment}</td>                      
                      
                       
                     
                    
                       <td>
                        <Link to={`/vetes/edithealthReacord/${user._id}`} className='btn btn-primary'> Edit</Link>
   
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

export default Healthrecord