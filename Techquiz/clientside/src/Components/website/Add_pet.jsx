import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Add_pet = () => {
  // 🔹 Token se owner_id nikalna
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const s = payload.id;

  // 🔹 Form state
  const [form, setForm] = useState({
    name: "",
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
    formData.append("owner_id", s); // JWT se owner_id
    formData.append("name", form.name);
    formData.append("species", form.species);
    formData.append("breed", form.breed);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("pet_img", form.pet_img);

    try {
      await axios.post("http://localhost:4000/api/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("the pet  is added now");
      setForm({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        pet_img: null,
      });
    } catch (err) {
      setErrors({ api: err.response?.data?.message || err.message });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Pet Name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <input
          name="species"
          value={form.species}
          onChange={handleChange}
          placeholder="Species"
        />
        {errors.species && <p style={{ color: "red" }}>{errors.species}</p>}

        <input
          name="breed"
          value={form.breed}
          onChange={handleChange}
          placeholder="Breed"
        />
        {errors.breed && <p style={{ color: "red" }}>{errors.breed}</p>}

        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

        <input type="file" name="pet_img" onChange={handleChange} />
        {errors.pet_img && <p style={{ color: "red" }}>{errors.pet_img}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Pet"}
        </button>

        {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>.
      <ToastContainer/>
    </div>
  );
};

export default Add_pet;
