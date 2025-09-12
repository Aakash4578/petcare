import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Appointment = () => {
  const [vetes, setVetes] = useState([]);
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    vet_id: "",
    user_id: "",
    pet_id: "",
    appointment_time: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // 🔹 User ID from session
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken ? userToken.split(".") : [];
  const payload = tokenParts.length > 1 ? JSON.parse(atob(tokenParts[1])) : {};
  const ownerId = payload.id;

  // 🔹 Fetch vets
  const fetchVetes = () => {
    axios
      .get("http://localhost:4000/activate_vets")
      .then((res) => setVetes(res.data))
      .catch((err) => console.error(err));
  };

  // 🔹 Fetch pets for logged-in user
  const fetchPets = () => {
    axios
      .get(`http://localhost:4000/api/pets/${ownerId}`)
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (ownerId) {
      fetchPets();
    }
    fetchVetes();
  }, [ownerId]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.vet_id) newErrors.vet_id = "Please select a veterinarian.";
    if (!formData.pet_id) newErrors.pet_id = "Please select a pet.";
    if (!formData.appointment_time)
      newErrors.appointment_time = "Please select an appointment time.";
    if (!formData.reason) newErrors.reason = "Please provide a reason.";
    return newErrors;
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:4000/website/appointment", {
          ...formData,
          user_id: ownerId,
        });

        if (res.data.success) {
          toast.success(" Appointment scheduled successfully!");
          setFormData({
            vet_id: "",
            pet_id: "",
            appointment_time: "",
            reason: "",
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book Appointment</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Select Veterinarian */}
        <div className="mb-3">
          <label className="form-label">Select Veterinarian</label>
          <select
            className="form-select"
            name="vet_id"
            value={formData.vet_id}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {vetes.map((vet) => (
              <option key={vet._id} value={vet._id}>
                {vet.name}
              </option>
            ))}
          </select>
          {errors.vet_id && <small className="text-danger">{errors.vet_id}</small>}
        </div>

        {/* Select Pet */}
        <div className="mb-3">
          <label className="form-label">Select Pet</label>
          <select
            className="form-select"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {pets.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.pet_id && <small className="text-danger">{errors.pet_id}</small>}
        </div>

        {/* Appointment Time */}
        <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
          />
          {errors.appointment_time && (
            <small className="text-danger">{errors.appointment_time}</small>
          )}
        </div>

        {/* Reason */}
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            name="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
          {errors.reason && <small className="text-danger">{errors.reason}</small>}
        </div>

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Appointment;
