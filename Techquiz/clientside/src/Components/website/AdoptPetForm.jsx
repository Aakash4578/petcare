import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AdoptPetForm = () => {
  const [form, setForm] = useState({
    pet_id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const [pets, setPets] = useState([]);

  // ✅ Pets fetch from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL} /api/adoptionsPET`);
        setPets(res.data);
      } catch (err) {
        console.error("❌ Error fetching pets:", err);
      }
    };
    fetchPets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/adoption-requests`, form);
      toast.success(" Adoption request sent!");
      setForm({
        pet_id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        message: ""
      });
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      {/* ✅ Pet Select */}
      <select
        name="pet_id"
        value={form.pet_id}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Pet --</option>
        {pets.map((pet) => (
          <option key={pet._id} value={pet._id}>
            {pet.name} ({pet.species})
          </option>
        ))}
      </select>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message (optional)"
        value={form.message}
        onChange={handleChange}
      ></textarea>
      <br />
      <button type="submit">🐾 Request Adoption</button>
    </form>
    <ToastContainer></ToastContainer>
    </div>
  );
};

export default AdoptPetForm;
