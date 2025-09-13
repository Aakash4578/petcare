import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const Order = () => {
       const [query, setQuery] = useState("");
          var [cont, listcont] = useState([]);
      function fetchCon() {
        axios.get(`${import.meta.env.VITE_API_URL}/fetchOrder`).then((resp) => {
          listcont(resp.data);
        });
      }
    
     var statusUpdate=(id,status)=>{
       axios.put(`${import.meta.env.VITE_API_URL}/Order_Status/${id}`,{status:status}).then(() => {
          toast.error("The delivery status is updated now !", {
            position: "top-right",
          });
        });
      
     } 
        function delCon(id) {
        axios.delete(`${import.meta.env.VITE_API_URL}/fetchOrderdel/${id}`).then(() => {
          toast.error("The destination is deleted now !", {
            position: "top-right",
          });
        });
      }
      const searchContact = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/search_order/search?q=${query}`);
        listcont(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() => {
      if (query.length !== 0) {
        searchContact();
      } else {
        fetchCon();
      }
    }, [query]);
  return (
    <div> <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Orders list</h2>
       
          <div>
            <input
              type="text"
              placeholder="Search ..."
              className="search-input"
                 value={query}
              onChange={(e) => {
                setQuery(e.target.value);}}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th> Name</th>
                <th> Email</th>
                <th> Phone</th>
                <th> Total </th>
                
                <th> status</th>

                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
               {cont.length > 0 ? (
                cont.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                   <td>{cat.email}</td>
                  <td>{cat.address.phone}</td>
                
                  <td>{cat.totalAmount}</td>
                  <td>     
                      <div class="select-wrap">  
                         <select name="status" id="" class="form-control" 
                          onChange={(e)=>
                            statusUpdate(cat._id,e.target.value)}>
                            <option hidden>{cat.status}</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div></td>
                  
                    <td>
                    
<Link to={`/admin/orderview/${cat._id}`} className='btn btn-info text-white'>View</Link>
              <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          delCon(cat._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No message found for {query}
                  </td>
                </tr>
              )}  
            </tbody>
          </table>
        </div>
      </div>
    </div></div>
  )
}

export default Order