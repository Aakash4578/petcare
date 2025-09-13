
import Shelterlayout from './Shelterlayout'
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
function ShelterpetsEdit() {
  var {id}=useParams()
 useEffect(() => {
      
        axios.get(`${import.meta.env.VITE_API_URL}/shelterpets_find/${id}`).then((resp) => {
    setForm(resp.data);
        
        });
    
    }, []);
  // 🔹 Form state
  const [form, setForm] = useState({
    name: "",
    shelter_id:"",
    species: "",
    breed: "",
    age: "",
    gender: "",
    pet_img: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 Input change handler
  const handleChange = (e) => {
    if (e.target.name === "pet_img") {
      setForm({ ...form, pet_img: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // 🔹 Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Pet name is required";
    if (!form.species.trim()) newErrors.species = "Species is required";
    if (!form.breed.trim()) newErrors.breed = "Breed is required";

    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(form.age) || Number(form.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!form.gender.trim()) newErrors.gender = "Gender is required";
if (!form.pet_img) {
  newErrors.pet_img = "Pet image is required";
} else {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (!allowedTypes.includes(form.pet_img.type)) {
    newErrors.pet_img = "Only JPG, PNG, or GIF images are allowed";
  }
}
    return newErrors;
  };

  // 🔹 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
  formData.append("name", form.name);
    formData.append("species", form.species);
    formData.append("breed", form.breed);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("pet_img", form.pet_img);

    try {
      await axios.put(`http://localhost:4000/UpdateShelterpet/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("the pet  is update now");
    
    } catch (err) {
      setErrors({ api: err.response?.data?.message || err.message });
    }

    setIsSubmitting(false);
  };

  return (
     <div><Shelterlayout/>
    <div className="container my-5 d-flex justify-content-center" style={{ maxWidth: "600px" }}>
         <div
          className="card shadow p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
        <h2 className="mb-4 text-center">Update Pet</h2>
        <form onSubmit={handleSubmit}>
          {/* Pet Name */}
          <div className="mb-3">
            <label className="form-label">Pet Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Pet Name"
            />
            {errors.name && (
              <div className="text-danger mt-1">{errors.name}</div>
            )}
          </div>

          {/* Species */}
          <div className="mb-3">
            <label className="form-label">Species</label>
            <input
              name="species"
              className="form-control"
              value={form.species}
              onChange={handleChange}
              placeholder="Species"
            />
            {errors.species && (
              <div className="text-danger mt-1">{errors.species}</div>
            )}
          </div>

          {/* Breed */}
          <div className="mb-3">
            <label className="form-label">Breed</label>
            <input
              name="breed"
              className="form-control"
              value={form.breed}
              onChange={handleChange}
              placeholder="Breed"
            />
            {errors.breed && (
              <div className="text-danger mt-1">{errors.breed}</div>
            )}
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              name="age"
              className="form-control"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              type="number"
            />
            {errors.age && (
              <div className="text-danger mt-1">{errors.age}</div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <div className="text-danger mt-1">{errors.gender}</div>
            )}
          </div>

          {/* Pet Image */}
          <div className="mb-3">
            <label className="form-label">Pet Image</label>
            <input
              type="file"
              name="pet_img"
              className="form-control"
              onChange={handleChange}
            />
            {errors.pet_img && (
              <div className="text-danger mt-1">{errors.pet_img}</div>
            )}
          </div>

          {/* Submit */}
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Update"}
            </button>
          </div>

          {/* API error / Success */}
          {errors.api && <div className="text-danger mt-2">{errors.api}</div>}
          {successMessage && (
            <div className="text-success mt-2">{successMessage}</div>
          )}
        </form>
</div>
    </div>
     </div>
  )
}

export default ShelterpetsEdit