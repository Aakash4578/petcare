import React, { useEffect, useState } from 'react'
import Admin_Index from './Admin_Index';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Veterinarian  = () => {
    var [vetes, SetUservetes] = useState([]);
    function vetesFetch() {
      axios.get(`${import.meta.env.VITE_API_URL}/fetch_vets`).then((res) => {
        SetUservetes(res.data);
      });
    }
  var [query, Setquery] = useState("");
  var search_funtionlity = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/search_vetes/search?q=${query}`
      );
      const data = await resp.json();
      SetUservetes(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (query.length === 0) {
      vetesFetch();
      return;
    } else {
      search_funtionlity();
    }
  });
    function vetsDel(id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/delvetes/${id}`).then(() => {
      toast.error("The Veterinarian  is deleted now ", { position: "top-right" });
    });
  }
    function veteStatus(id) {
    axios.put(`${import.meta.env.VITE_API_URL}/statusvetes/${id}`).then(() => {
      toast.success("The Veterinarian status is upated now ", {
        position: "top-right",
      });
    });
  }
  return (
    <div>
      <Admin_Index></Admin_Index>
       <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Veterinarian</h2>
        <div>  <input
            type="text"
            placeholder="Search ..."
            className="search-input"
            value={query}
            onChange={(e) => {
              Setquery(e.target.value);
            }}
          />
          <Link to={"/admin/add_Veterinarian"} className='btn btn-primary m-2'> new</Link></div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Verify</th>
                <th>Status</th>
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vetes.length > 0 ? (
                vetes.map((vete, index) => (
                  <tr key={vete.id}>
                    <td>{index + 1}</td>
                    <td>
                      {vete.name} 
                    </td>
                    <td>{vete.email}</td>

                    <td>{vete.isverify == true ? "Yes" : "Not yet"}</td>
                    <td>
                      {vete.status === 1 ? (
                        <span className="text-success">Activate</span>
                      ) : (
                        <span className="text-danger">Deactivate</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          veteStatus(vete._id);
                        }}
                      >
                        Status
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => vetsDel(vete._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found
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

export default Veterinarian 
