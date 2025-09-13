import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginShelter = () => {
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Separate states for vet and shelter login
  const [vetUser, setVetUser] = useState({ email: "", hash_password: "" });
  const [vetError, setVetError] = useState({ email: "", hash_password: "" });

  const [shelterUser, setShelterUser] = useState({ email: "", hash_password: "" });
  const [shelterError, setShelterError] = useState({ email: "", hash_password: "" });

  // Vet login
  const handleVetLogin = async (e) => {
    e.preventDefault();
    let newError = { email: "", hash_password: "" };

    if (!vetUser.email.trim()) newError.email = "Email is required **";
    else if (!emailRegex.test(vetUser.email)) newError.email = "Invalid email address **";

    if (!vetUser.hash_password.trim()) newError.hash_password = "Password is required **";

    if (newError.email || newError.hash_password) {
      setVetError(newError);
      return;
    }

    setVetError({ email: "", hash_password: "" });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login_vets`, vetUser);
      if (response.data.success) {
        sessionStorage.setItem("vetesLogined", JSON.stringify(response.data.messege));
        navigate("/vetes");
      } else {
        toast.error(response.data.messege);
      }
       toast.error(response.data.messege);
    } catch {
      toast.error("An error occurred");
    }
  };

  // Shelter login
  const handleShelterLogin = async (e) => {
    e.preventDefault();
    let newError = { email: "", hash_password: "" };

    if (!shelterUser.email.trim()) newError.email = "Email is required **";
    else if (!emailRegex.test(shelterUser.email)) newError.email = "Invalid email address **";

    if (!shelterUser.hash_password.trim()) newError.hash_password = "Password is required **";

    if (newError.email || newError.hash_password) {
      setShelterError(newError);
      return;
    }

    setShelterError({ email: "", hash_password: "" });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login_shelteranimal`, shelterUser);
      if (response.data.success) {
        sessionStorage.setItem("animalsehlterLogined", JSON.stringify(response.data.messege));
        navigate("/shelter/index");
      } else {
        toast.error(response.data.messege);
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <section
        className="login-register d-flex align-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../public/emailvrifybgimage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center g-4">

            {/* Vet login card */}
            <div className="col-md-5">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body p-4">
                  <h3 className="text-center fw-bold mb-4">🐾 Login for vetes</h3>
                  <form onSubmit={handleVetLogin}>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-pill"
                        placeholder="Email"
                        value={vetUser.email}
                        onChange={(e) => setVetUser({ ...vetUser, email: e.target.value })}
                      />
                      {vetError.email && <span className="text-danger small">{vetError.email}</span>}
                    </div>

                    <div className="form-group mb-3">
                      <input
                        type="password"
                        name="hash_password"
                        className="form-control rounded-pill"
                        placeholder="Password"
                        value={vetUser.hash_password}
                        onChange={(e) => setVetUser({ ...vetUser, hash_password: e.target.value })}
                      />
                      {vetError.hash_password && <span className="text-danger small">{vetError.hash_password}</span>}
                    </div>

                    <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold">Login</button>
                    <Link to={"/ForgetPassword"} className="d-block text-center mt-3 text-decoration-none">Forgot password?</Link>
                  </form>
                </div>
              </div>
            </div>

            {/* Shelter login card */}
            <div className="col-md-5">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body p-4">
                  <h3 className="text-center fw-bold mb-4">🐾 Login for animal shelter</h3>
                  <form onSubmit={handleShelterLogin}>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-pill"
                        placeholder="Email"
                        value={shelterUser.email}
                        onChange={(e) => setShelterUser({ ...shelterUser, email: e.target.value })}
                      />
                      {shelterError.email && <span className="text-danger small">{shelterError.email}</span>}
                    </div>

                    <div className="form-group mb-3">
                      <input
                        type="password"
                        name="hash_password"
                        className="form-control rounded-pill"
                        placeholder="Password"
                        value={shelterUser.hash_password}
                        onChange={(e) => setShelterUser({ ...shelterUser, hash_password: e.target.value })}
                      />
                      {shelterError.hash_password && <span className="text-danger small">{shelterError.hash_password}</span>}
                    </div>

                    <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold">Login</button>
                    <Link to={"/ForgetPassword"} className="d-block text-center mt-3 text-decoration-none">Forgot password?</Link>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default LoginShelter;
