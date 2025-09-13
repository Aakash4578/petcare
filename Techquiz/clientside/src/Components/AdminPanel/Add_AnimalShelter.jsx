import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import axios from "axios";
import { toast } from "react-toastify";

const Add_AnimalShelter = () => {
  var [animal, Add_animalData] = useState({
    Sheltername: "",
    contactpersonName: "",
    email: "",
    address: "",
    contactNumber: "",
    hash_password: "",
  });
  var [error, SetError] = useState({
    name: "",
    email: "",
    address: "",
    Sheltername: "",
    contactpersonName: "",
    contactNumber: "",
    hash_password: "",
  });
  var inputHanlde = (e) => {
    Add_animalData({ ...animal, [e.target.name]: e.target.value });
  };

  var add_shelter = async (e) => {
    e.preventDefault();
    const newError = {
      email: "",
      Sheltername: "",
      contactpersonName: "",
      address: "",
      hash_password: "",
      contactNumber: "",
    };
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(animal.email)
    ) {
      newError.email = "Invalid email address";
    } else if (!animal.email.trim()) {
      newError.email = "Email is required";
    }

    if (!animal.Sheltername.trim()) {
      newError.Sheltername = "Shelter name is required";
    }
    if (!animal.contactpersonName.trim()) {
      newError.contactpersonName = "contact Person name is required";
    }

    if (!animal.contactNumber.trim()) {
      newError.contactNumber = "Phone number is required";
    } else if (!/^\d+$/.test(animal.contactNumber)) {
      newError.contactNumber = "Phone number must be in digits";
    } else if (animal.contactNumber.length !== 11) {
      newError.contactNumber = "Phone number must be 11 digits long";
    }
    if (!animal.hash_password.trim()) {
      newError.hash_password = "password name is required";
    }
    if (!animal.address.trim()) {
      newError.address = "address name is required";
    }
    if (
      newError.contactpersonName ||
      newError.Sheltername ||
      newError.email ||
      newError.hash_password ||
      newError.contactNumber
    ) {
      SetError(newError);
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/register_shelter`,
          animal
        );

        if (response.data.success) {
          toast.success(response.data.massege);
          SetError({
            name: "",
            email: "",
            address: "",
            Sheltername: "",
            contactpersonName: "",
            contactNumber: "",
            hash_password: "",
          });
          Add_animalData({
            name: "",
            email: "",
            address: "",
            Sheltername: "",
            contactpersonName: "",
            contactNumber: "",
            hash_password: "",
          });
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
          <h2 className="mb-4 text-center">Add New Aminal Shelter</h2>

          <form onSubmit={add_shelter}>
            <div className="mb-3">
              <label className="form-label">Shelter Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="Sheltername"
                value={animal.Sheltername}
                onChange={inputHanlde}
              />
              {error.Sheltername && (
                <span className="text-danger">{error.Sheltername}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Contact Person Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="contactpersonName"
                value={animal.contactpersonName}
                onChange={inputHanlde}
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                value={animal.email}
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
                value={animal.contactNumber}
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
                value={animal.hash_password}
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
                value={animal.address}
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

export default Add_AnimalShelter;
