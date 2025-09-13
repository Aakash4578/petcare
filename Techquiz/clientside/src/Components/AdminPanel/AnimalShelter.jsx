import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AnimalShelter = () => {
  var [shelter, Setshelter] = useState([]);
  function shelterFetch() {
    axios.get(`${import.meta.env.VITE_API_URL}/fetch_shelter`).then((res) => {
      Setshelter(res.data);
    });
  }
  var [query, Setquery] = useState("");
  var search_funtionlity = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/search_shelter/search?q=${query}`
      );
      const data = await resp.json();
      Setshelter(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (query.length === 0) {
      shelterFetch();
      return;
    } else {
      search_funtionlity();
    }
  });
  function shelterDel(id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/delShelter/${id}`).then(() => {
      toast.error("The  Animal shelter  is deleted now ", {
        position: "top-right",
      });
    });
  }
  function shelterStatus(id) {
    axios.put(`${import.meta.env.VITE_API_URL}/statusShelter/${id}`).then(() => {
      toast.success("The Animal shelter status is upated now ", {
        position: "top-right",
      });
    });
  }
  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Animals Shelter</h2>
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
          <Link to={"/admin/add_Animalshelter"} className="btn btn-primary m-2">New</Link>
       </div>
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
              {shelter.length > 0 ? (
                shelter.map((shelt_home, index) => (
                  <tr key={shelt_home.id}>
                    <td>{index + 1}</td>
                    <td>{shelt_home.Sheltername}</td>
                    <td>{shelt_home.email}</td>

                    <td>{shelt_home.isverify == true ? "Yes" : "Not yet"}</td>
                    <td>
                      {shelt_home.status === 1 ? (
                        <span className="text-success">Activate</span>
                      ) : (
                        <span className="text-danger">Deactivate</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          shelterStatus(shelt_home._id);
                        }}
                      >
                        Status
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => shelterDel(shelt_home._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Animal Shelter found for {query}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnimalShelter;
