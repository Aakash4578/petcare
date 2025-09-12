import React, { useEffect, useState } from "react";
import VetesLayout from "./VetesLayout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const EditRecord = () => {
  const { id } = useParams(); // HealthRecord ID from route
  const userToken = sessionStorage.getItem("vetesLogined");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const vetId = payload.id;

  const [user, SetUserData] = useState([]);
  const [formData, setFormData] = useState({
    appointment_id: "",
    diagnosis: "",
    treatment: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch pets/appointments
  const userFetch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/fetchappoint/${vetId}`);
      SetUserData(res.data);
    } catch (error) {
      console.error("Fetch Appointments Error:", error);
    }
  };

  // Fetch existing health record
  const fetchHealthRecord = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/vetes/healthRecord/${id}`);
      if (res.data.success) {
        const record = res.data.data;
        setFormData({
          appointment_id: record.appointment_id || "",
          diagnosis: record.diagnosis || "",
          treatment: record.treatment || "",
        });
      }
    } catch (error) {
      console.error("Fetch Health Record Error:", error);
      toast.error("Failed to fetch health record");
    }
  };

  useEffect(() => {
    userFetch();
    if (id) {
      fetchHealthRecord();
    }
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.appointment_id) newErrors.appointment_id = "Please select a pet";
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

  // Handle submit (update or create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let res;
      if (id) {
        // Update existing record
        res = await axios.put(`http://localhost:4000/vetes/editHealthRecord/${id}`, formData);
      } else {
        // Create new record
        res = await axios.post("http://localhost:4000/vetes/addHealthRecord", formData);
      }

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <VetesLayout />
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="mb-4 text-center">{id ? "Edit Health Record" : "Add New Health Record"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
            </div>

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
                {id ? "Update" : "Save"}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
