import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { use } from "react";
import { toast, ToastContainer } from "react-toastify";

const UserDetails = () => {
  var [user, SetUserData] = useState([]);
  function userFetch() {
    axios.get(`${import.meta.env.VITE_API_URL}/fetch_user`).then((res) => {
      SetUserData(res.data);
    });
  }

  function userStatus(id) {
    axios.put(`${import.meta.env.VITE_API_URL}/statususer/${id}`).then(() => {
      toast.success("The user status is upated now ", {
        position: "top-right",
      });
    });
  }
  function userDelete(id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/deluser/${id}`).then(() => {
      toast.error("The user  is deleted now ", { position: "top-right" });
    });
  }
  var [query, Setquery] = useState("");
  var search_user = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}h/search_user/search?q=${query}`
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
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Users</h2>
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
                <th>Verify</th>
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
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>

                    <td>{user.isverify == true ? "Yes" : "Not yet"}</td>
                    <td>
                      {user.status === 1 ? (
                        <span className="text-success">Activate</span>
                      ) : (
                        <span className="text-danger">Deactivate</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          userStatus(user._id);
                        }}
                      >
                        Status
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
  );
};

export default UserDetails;
