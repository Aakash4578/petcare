import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from '../website/Navbar'
import Footer from '../website/Footer'

import { Link, useNavigate } from "react-router-dom";
const LoginRegister = () => {
  var navigate = useNavigate();
  var [loginedUser, Setuserlogined] = useState({
    email: "",
    hash_password: "",
  });
  var [errorlogined, SetErrorlogined] = useState({
    email: "",
    hash_password: "",
  });
  var logined = async (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      hash_password: "",
    };
    if (!loginedUser.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(loginedUser.email)) {
      newError.email = "Invalid email address **";
    }
    if (!loginedUser.hash_password.trim()) {
      newError.hash_password = "password is required  **";
    }
    if (newError.email || newError.hash_password) {
      SetErrorlogined(newError);
    } else {
      SetErrorlogined({
        email: "",
        hash_password: "",
      });
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          loginedUser
        );
        if (response.data.success == true) {
      
          navigate("/");
          if (response.data.role === 1) {
            navigate("/admin");
                      sessionStorage.setItem(
            "adminlogined",
            JSON.stringify(response.data.messege)
          );
          } else {
            navigate("/");
    
                sessionStorage.setItem(
            "userLogin",
            JSON.stringify(response.data.messege)
          );
          }
        } else {
          // console.log(response.data)
          toast.error(response.data.messege);
        }
      } catch (error) {
        alert("An error occurred", {
          position: "top-right",
        });
      }
    }
  };

  var inputhandle_Login = (e) => {
    Setuserlogined({ ...loginedUser, [e.target.name]: e.target.value });
  };
  var [register, Setregisiter] = useState({
    email: "",
    hash_password: "",
    first_name: "",
    phone:"",
    last_name: "",
  });
  var inputhandle_register = (e) => {
    Setregisiter({ ...register, [e.target.name]: e.target.value });
  };
  var [error, SetError] = useState({
    email: "",
    hash_password: "",
    first_name: "",
    last_name: "",
    phone:""
  });
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const registerUser = async (e) => {
    e.preventDefault();
    const newError = {
      name: "",
      email: "",
      password: "",
      phone:""
    };
    if (!register.first_name.trim()) {
      newError.first_name = "First Name is required";
    }
    if (!register.last_name.trim()) {
      newError.last_name = "Last Name is required";
    }
    if (!register.email.trim()) {
      newError.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(register.email)
    ) {
      newError.email = "Invalid email address";
    }
    if (!register.hash_password.trim()) {
      newError.hash_password = "Password is required";
    }
 if (!register.phone.trim()) {
    newError.phone = "Phone number is required";
} else if (!/^\d+$/.test(register.phone)) {
    newError.phone = "Phone number must be in digits";
} else if (register.phone.length !== 11) {
    newError.phone = "Phone number must be 11 digits long";
}

    if (newError.name || newError.email || newError.password||newError.phone) {
      SetError(newError);
    } else {
      try {
        var response = await axios.post(
          "http://localhost:4000/register",
          register
        );
        if (response.data.success) {
          toast.success("The account is created !");
          Setregisiter({
            email: "",
            hash_password: "",
            first_name: "",
            last_name: "",
            phone:""
          });
          SetError({
            email: "",
            hash_password: "",
            first_name: "",
            last_name: "",
          });
        } else {
          toast.error(response.data.massege, {
            position: "top-right",
          });
        }
      } catch (error) {
        alert("An error occurred", {
          position: "top-right",
        });
      }
    }
  };

  return (
   <>

   
    {/* <div>
      <Link to={"/Email-verify"}>Verify the Email</Link>
      <h3>login</h3>

      <form onSubmit={logined}>
        <input
          type="text"
          name="email"
          onChange={inputhandle_Login}
          placeholder="Email"
          value={loginedUser.email}
        />
        {errorlogined.email && (
          <span className="text-danger">{errorlogined.email}</span>
        )}
        <input
          type="text"
          name="hash_password"
          value={loginedUser.hash_password}
          onChange={inputhandle_Login}
          placeholder="password"
        />
        {errorlogined.hash_password && (
          <span className="text-danger">{errorlogined.hash_password}</span>
        )}
        <input type="submit" value={"Login"} />
      </form>
      <hr />
      <hr />
      <h3>Register</h3>
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="first_name"
          value={register.first_name}
          onChange={inputhandle_register}
          placeholder="First Name"
        />
        {error.first_name && (
          <span className="text-danger">{error.first_name}</span>
        )}
        <input
          type="text"
          name="last_name"
          value={register.last_name}
          onChange={inputhandle_register}
          placeholder="Last Name"
        />
        {error.last_name && (
          <span className="text-danger">{error.last_name}</span>
        )}
           <input
          type="text"
          name="phone"
          value={register.phone}
          onChange={inputhandle_register}
          placeholder="Phone number"
        />
           {error.phone && <span className="text-danger">{error.phone}</span>}
        <input
          type="text"
          name="email"
          value={register.email}
          onChange={inputhandle_register}
          placeholder="Email"
        />
        {error.email && <span className="text-danger">{error.email}</span>}
        <input
          type="text"
          name="hash_password"
          value={register.hash_password}
          onChange={inputhandle_register}
          placeholder="password"
        />
        {error.hash_password && (
          <span className="text-danger">{error.hash_password}</span>
        )}
        <input type="submit" value={"Register"} />
      </form>
      <hr />
      <hr />
      <ToastContainer></ToastContainer>
    </div> */}
{/* <Navbar></Navbar> */}
    <section
  className="login-register d-flex align-items-center"
  style={{
    minHeight: "100vh",
     backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../public/emailvrifybgimage.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="container">
    <div className="row justify-content-center g-4">
      
      {/* Login Card */}
      <div className="col-md-5">
        <div className="card shadow-lg border-0 rounded-4 h-100">
          <div className="card-body p-4">
            <h3 className="text-center fw-bold mb-4">🐾 Login</h3>
            <form onSubmit={logined}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-pill"
                  placeholder="Email"
                  value={loginedUser.email}
                  onChange={inputhandle_Login}
                />
                {errorlogined.email && (
                  <span className="text-danger small">{errorlogined.email}</span>
                )}
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  name="hash_password"
                  className="form-control rounded-pill"
                  placeholder="Password"
                  value={loginedUser.hash_password}
                  onChange={inputhandle_Login}
                />
                {errorlogined.hash_password && (
                  <span className="text-danger small">{errorlogined.hash_password}</span>
                )}
              </div>

              <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold">
                Login
              </button>
              <Link
          to={"/loginforvetesShelter"}
          className="d-block text-center mt-3 text-decoration-none"
        >
          login for Animal shelter and Veterinarian
        </Link>
              <Link
                to={"/ForgetPassword"}
                className="d-block text-center mt-3 text-decoration-none"
              >
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
      </div>

      {/* Register Card */}
     <div className="col-md-5">
  <div className="card shadow-lg border-0 rounded-4 h-100">
    <div className="card-body p-4">
      <h3 className="text-center fw-bold mb-4">🐾 Register</h3>
      <form onSubmit={registerUser}>

        {/* 🔹 First + Last Name in one row */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="first_name"
              className="form-control rounded-pill"
              placeholder="First Name"
              value={register.first_name}
              onChange={inputhandle_register}
            />
            {error.first_name && (
              <span className="text-danger small">{error.first_name}</span>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="last_name"
              className="form-control rounded-pill"
              placeholder="Last Name"
              value={register.last_name}
              onChange={inputhandle_register}
            />
            {error.last_name && (
              <span className="text-danger small">{error.last_name}</span>
            )}
          </div>
        </div>

        {/* 🔹 Phone + Email in one row */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="phone"
              className="form-control rounded-pill"
              placeholder="Phone Number"
              value={register.phone}
              onChange={inputhandle_register}
            />
            {error.phone && (
              <span className="text-danger small">{error.phone}</span>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control rounded-pill"
              placeholder="Email"
              value={register.email}
              onChange={inputhandle_register}
            />
            {error.email && (
              <span className="text-danger small">{error.email}</span>
            )}
          </div>
        </div>

        {/* 🔹 Password single row */}
        <div className="mb-3">
          <input
            type="password"
            name="hash_password"
            className="form-control rounded-pill"
            placeholder="Password"
            value={register.hash_password}
            onChange={inputhandle_register}
          />
          {error.hash_password && (
            <span className="text-danger small">{error.hash_password}</span>
          )}
        </div>

        <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
          Register
        </button>
        <Link
          to={"/Email-verify"}
          className="d-block text-center mt-3 text-decoration-none"
        >
          Verify your Email
        </Link>
      </form>
    </div>
  </div>
</div>


    </div>
  </div>
</section>
\
    
          <ToastContainer></ToastContainer>
<Footer></Footer> 
   </>
  );
};

export default LoginRegister;
