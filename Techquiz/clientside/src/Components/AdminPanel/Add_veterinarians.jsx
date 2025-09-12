import React, { useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { toast } from "react-toastify";

const Add_veterinarians = () => {
  var [vates, Add_vatesData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    hash_password: "",
  });
  var [error, SetError] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    hash_password: "",
  });
  var inputHanlde = (e) => {
    Add_vatesData({ ...vates, [e.target.name]: e.target.value });
  };

  var add_vates = async (e) => {
    e.preventDefault();
    const newError = {
      name: "",
      email: "",
      address: "",
      hash_password: "",
      contactNumber: "",
    };
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(vates.email)) {
      newError.email = "Invalid email address";
    } else if (!vates.email.trim()) {
      newError.email = "Email is required";
    }
    if (!vates.name.trim()) {
      newError.name = "name is required";
    }

    if (!vates.address.trim()) {
      newError.address = "address is required";
    }
    if (!vates.contactNumber.trim()) {
      newError.phone = "Phone number is required";
    } else if (!/^\d+$/.test(vates.contactNumber)) {
      newError.contactNumber = "Phone number must be in digits";
    } else if (vates.contactNumber.length !== 11) {
      newError.contactNumber = "Phone number must be 11 digits long";
    }
    if (
      newError.name ||
      newError.email ||
      newError.hash_password ||
      newError.contactNumber
    ) {
      SetError(newError);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/register_vets",
          vates
        );
        if (response.data.success) {
          toast.success(response.data.massege);

          Add_vatesData({
            name: "",
            email: "",
            address: "",
            contactNumber: "",
            hash_password: "",
          });
          SetError({
            name: "",
            email: "",
            address: "",
            contactNumber: "",
            hash_password: "",
          });
          // console.log(response)
        } else {
          toast.error(response.data.massege);
        }
      } catch (error) {
        console.log("Error: " + error.response?.data?.error || error.massege);
      }
    }
  };

  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Add New Veterinarians</h2>

          <form onSubmit={add_vates}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="name"
                value={vates.name}
                onChange={inputHanlde}
              />
              {error.name && <span className="text-danger">{error.name}</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={vates.email}
                onChange={inputHanlde}
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Phone"
                name="contactNumber"
                value={vates.contactNumber}
                onChange={inputHanlde}
              />
              {error.contactNumber && (
                <span className="text-danger">{error.contactNumber}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Password"
                name="hash_password"
                value={vates.hash_password}
                onChange={inputHanlde}
              />
              {error.hash_password && (
                <span className="text-danger">{error.hash_password}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                id=""
                value={vates.address}
                onChange={inputHanlde}
              ></textarea>
            </div>
            {error.address && (
              <span className="text-danger">{error.address}</span>
            )}
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

export default Add_veterinarians;
