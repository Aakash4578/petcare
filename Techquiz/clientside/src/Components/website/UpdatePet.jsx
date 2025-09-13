import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UpdatePet = () => {
    const { id } = useParams(); // pet id
  const navigate = useNavigate();
    const handleChange = (e) => {
    if (e.target.name === "pet_img") {
      setForm({ ...form, pet_img: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const [file, setFile] = useState(null); // 👈 new state
  const [form, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "Male",
  });
  
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
      const [successMessage, setSuccessMessage] = useState("");
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Pet name is required";
    if (!form.species.trim()) newErrors.species = "Species is required";
    if (!form.breed.trim()) newErrors.breed = "Breed is required";

    if (!form.age) {
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
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/fetchpet/${id}`)
    .then((res) => {
      console.log(res.data)
      setFormData({
        name: res.data.name,
        species: res.data.species,
        breed: res.data.breed || "",
        age: res.data.age || "",
        gender: res.data.gender,
        pet_img: res.data.pet_img || "",  
      });
    })
    .catch((err) => console.error(err));
}, [id]);

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
      await axios.put("http://localhost:4000/Updatepet/:id", formData, {
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
    <div> 
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
    </div>
  )
}

export default UpdatePet