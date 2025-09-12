import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ForgetPassword = () => {
  var [forgetPassword, ForgetpassSet] = useState({
    email: "",
    hash_password: "",
  });

  var [error, SetError] = useState({
    email: "",
    hash_password: "",
  });
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputHandle = (e) => {
    ForgetpassSet({ ...forgetPassword, [e.target.name]: e.target.value });
  };
  var forget_pass = async (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      hash_password: "",
    };

    if (!forgetPassword.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(forgetPassword.email)) {
      newError.email = "Invalid email address **";
    }
    if (!forgetPassword.hash_password.trim()) {
      newError.hash_password = "password is required  **";
    }
    if (newError.email || newError.hash_password) {
      SetError(newError);
    } else {
      try {
        const response = await axios.put(
          "http://localhost:4000/forgetPassword",
          forgetPassword
        );
        toast.success("Your password has been updated successfully!", {
          position: "top-right",
        });
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.response.data, { position: "top-right" });
          } else {
            toast.error(
              `An error occurred: ${error.response.status} - ${error.response.data}`,
              { position: "top-right" }
            );
          }
        } else {
          toast.error("An unknown error occurred", { position: "top-right" });
        }
      }
    }
  };
  return (
    <>
   <section
      className="login-register d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../public/emailvrifybgimage.jpg')",

      }}
    >
      <div className="container">
        <div className="log-main blog-full log-reg w-50 mx-auto">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h3 className="text-center fw-bold mb-4 pb-2 border-bottom">
                🐾 Forget Password
              </h3>

              <form onSubmit={forget_pass}>
                {/* Email */}
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill"
                    placeholder="Enter your email address"
                    onChange={inputHandle}
                  />
                  {error.email && (
                    <span className="text-danger small">{error.email}</span>
                  )}
                </div>

                {/* New Password */}
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="hash_password"
                    className="form-control rounded-pill"
                    placeholder="Enter your new password"
                    onChange={inputHandle}
                  />
                  {error.hash_password && (
                    <span className="text-danger small">
                      {error.hash_password}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-danger w-100 rounded-pill fw-bold"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* Toast Notification */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default ForgetPassword;
    