import VetesLayout from './VetesLayout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Addheathrecord = () => {
  const userToken = sessionStorage.getItem("vetesLogined");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const id = payload.id;

  const [user, SetUserData] = useState([]);
  const [formData, setFormData] = useState({
    appointment_id: "", 
    diagnosis: "",
    treatment: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch pets/appointments
  function userFetch() {
    axios.get(`${import.meta.env.VITE_API_URL}/fetchappoint/${id}`).then((res) => {
      SetUserData(res.data);
    });
  }

  useEffect(() => {
    userFetch();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
const validate = () => {
  const newErrors = {};
  if (!formData.appointment_id)
    newErrors.appointment_id = "Please select a pet"; // appointment_id validation

  if (!formData.diagnosis)
    newErrors.diagnosis = "Diagnosis is required";
  else if (formData.diagnosis.length < 5)
    newErrors.diagnosis = "Diagnosis must be at least 5 characters";

  if (!formData.treatment)
    newErrors.treatment = "Treatment is required";
  else if (formData.treatment.length < 5)
    newErrors.treatment = "Treatment must be at least 5 characters";

  return newErrors;
};

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addHealthRecord`,
        formData
      );

      if (response.data.success) {
        toast.success("Health record saved successfully!");
        setFormData({ pet_id: "", diagnosis: "", treatment: "" });
        setErrors({});
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving!");
    }
  };

  return (
    <div>
      <VetesLayout />
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="mb-4 text-center">Add New Health Record</h2>

          <form onSubmit={handleSubmit}>
         <select
  className={`form-control ${errors.appointment_id ? "is-invalid" : ""}`}
  name="appointment_id"
  value={formData.appointment_id}
  onChange={handleChange}
>
  <option value="" hidden>Select Pet</option>
  {user.map((appoint) => (
    <option key={appoint._id} value={appoint._id}>
      {appoint.pet_name}
    </option>
  ))}
</select>
{errors.appointment_id && <div className="invalid-feedback">{errors.appointment_id}</div>}


            <div className="mb-3">
              <label className="form-label">Diagnosis</label>
              <textarea
                className={`form-control ${errors.diagnosis ? "is-invalid" : ""}`}
                placeholder="Enter Diagnosis"
                name="diagnosis"
                rows="3"
                value={formData.diagnosis}
                onChange={handleChange}
              ></textarea>
              {errors.diagnosis && <div className="invalid-feedback">{errors.diagnosis}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Treatment</label>
              <textarea
                className={`form-control ${errors.treatment ? "is-invalid" : ""}`}
                placeholder="Enter Treatment"
                name="treatment"
                rows="3"
                value={formData.treatment}
                onChange={handleChange}
              ></textarea>
              {errors.treatment && <div className="invalid-feedback">{errors.treatment}</div>}
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4">
                Save
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Addheathrecord;
