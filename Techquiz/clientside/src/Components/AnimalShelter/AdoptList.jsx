import { toast, ToastContainer } from "react-toastify";
import Shelterlayout from "./Shelterlayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdoptList = () => {
  // 🔹 Token se shelter_id nikalna (safe check)
  const userToken = sessionStorage.getItem("animalsehlterLogined");
  let s = null;
  if (userToken) {
    try {
      const tokenParts = userToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      s = payload.id;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const [user, setUserData] = useState([]);
  const [query, setQuery] = useState("");

  // 🔹 Fetch adoption requests
  function userFetch() {
    if (!s) {
      toast.error("User not logged in or token invalid", { position: "top-right" });
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/adoption-requests`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to fetch requests", {
          position: "top-right",
        });
      });
  }

  // 🔹 Delete adoption request
  function userDelete(id) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/deladopt/${id}`)
      .then(() => {
        toast.error("The adopt request is deleted now", { position: "top-right" });
        userFetch(); // refresh after delete
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Delete failed", {
          position: "top-right",
        });
      });
  }

  // 🔹 Search adoption requests
  async function search_user() {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/search_adopt/search?q=${query}`
      );
      const data = await resp.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // 🔹 Approve adoption request
  function statusUpdate(id) {
    axios
      .put(`${import.meta.env.VITE_API_URL}/updateadopt/${id}`, { status: "approved" })
      .then(() => {
        toast.success("The adoption request is approved now!", {
          position: "top-right",
        });
        userFetch(); // refresh after update
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Status update failed", {
          position: "top-right",
        });
      });
  }

  // 🔹 UseEffect for fetching/searching
  useEffect(() => {
    if (query.length === 0) {
      userFetch();
    } else {
      search_user();
    }
  }, [query]);

  return (
    <div>
      <Shelterlayout />
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header d-flex justify-content-between align-items-center mb-3">
          <h2>Adoption Requests</h2>
          <input
            type="text"
            placeholder="Search ..."
            className="search-input form-control"
            style={{ maxWidth: "250px" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="users-table table table-bordered table-hover">
            <thead className="table-dark">
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
                user.map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.pet_name}</td>
                    <td>{u.age}</td>
                    <td>{u.status === "pending" ? "Available" : "Adopted"}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => statusUpdate(u._id)}
                        disabled={u.status !== "pending"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => userDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No adoption requests found for "{query}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdoptList;
