import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Emailverify = () => {
  var [verifyData, SetVerifyData] = useState({ email: "", verifyOpt: "" });
  var inputHandle = (e) => {
    SetVerifyData({ ...verifyData, [e.target.name]: e.target.value });
  };
  var [error, SetError] = useState({
    email: "",
    verifyData: "",
  });

  const verifyAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify_Account`, verifyData);
      if (response.data.success) {
        toast.success("Account verified successfully!", {
          position: "top-right",
        });
     SetError({
            email: "",
            verifyOpt: "",
          });
          SetVerifyData({
            email: "",
            verifyOpt: "",
          });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
      });
      console.error(error);
    }
  };

  return (

    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
         backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../public/emailvrifybgimage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4 p-4 bg-white bg-opacity-90">
              <h3 className="text-center mb-4 text-primary">Verify Email</h3>

              <form onSubmit={verifyAccount}>
                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={verifyData.email}
                    onChange={inputHandle}
                  />
                  {error.email && (
                    <span className="text-danger small">{error.email}</span>
                  )}
                </div>

                {/* OTP */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="verifyOpt"
                    placeholder="Enter OTP Code"
                    className="form-control"
                    value={verifyData.verifyOpt}
                    onChange={inputHandle}
                  />
                  {error.verifyOpt && (
                    <span className="text-danger small">{error.verifyOpt}</span>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Verify
                  </button>
                </div>
              </form>

              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Emailverify;


