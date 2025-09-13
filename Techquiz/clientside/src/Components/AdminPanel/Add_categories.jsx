import React, { useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { toast } from "react-toastify";

const Add_categories = () => {
  var [categoriesInserted, SetCategies] = useState({ name: "", status: "" });
    var [error, Seterror] = useState({ name: "", status: "" });
  var inputHandle = (e) => {
    SetCategies({ ...categoriesInserted, [e.target.name]: e.target.value });
  };
  var insertValues = async (e) => {
    e.preventDefault();
var errors={name: "", status: ""}
 if (!categoriesInserted.name.trim()) {
      errors.name = "The name is required **";
    }
    if (!categoriesInserted.status) {
      errors.status = "The status is required **";
    }
    if( errors.status|| errors.name){
       Seterror(errors); 
    }
    else{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add_category`,
        categoriesInserted
      );
      if (response.data.success) {
        toast.success(response.data.massege);
        SetCategies({
          name: "",
          status: "",
        });
        Seterror({
              name: "",
          status: "",
        })
      } else {
        toast.error(response.data.massege);
      }
    } catch (error) {
      alert("Error: " + error.response?.data?.error || error.message);
    }
  }
}

  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Add New Category</h2>

          <form onSubmit={insertValues}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                onChange={inputHandle}
                value={categoriesInserted.name}
              />
               {error.name && (
                <div className="text-danger mt-1">{error.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>

              <select
                className="form-control form-select"
                placeholder="Enter Subject"
                name="status"
                id=""
                 onChange={inputHandle}
                value={categoriesInserted.status}
              >
                <option  hidden>
                  {" "}
                  Choice a Status
                </option>
                <option value={1}>Activate</option>
                <option value={0}>Deactivate</option>
              </select>
              {error.status && (
                <div className="text-danger mt-1">{error.status}</div>
              )}
            </div>
            
            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_categories;
