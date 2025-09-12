
import React, { useEffect, useState } from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import { MdMargin } from "react-icons/md";
const UserProfile = () => {
 const userToken = sessionStorage.getItem("userLogin");
     const tokenParts = userToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const id = payload.id;
      const [imgError, setImgError] = useState("");
  useEffect(() => {
    if (userToken) {
      axios
        .get(`http://localhost:4000/profile/${id}`)
        .then((res) => {
          UserReg(res.data);
        });
    }
  }, []);
  const inputHandlereg = (e) => {
    UserReg({ ...reg, [e.target.name]: e.target.value });
  };
  var [error, SetError] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    comfirm_password: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      setImgError("Invalid image! Please upload a JPG, JPEG, or PNG file.");
      return;
    }
    setImgError("");
    UserReg((prev) => ({ ...prev, image: file }));
  };

  var userUpdate = (e) => {
    e.preventDefault();
    var newError = {
      email: "",
      password_hash: "",
      first_name: "",
      last_name: "",
      profile_picture: "",
    };
    if (!reg.first_name.trim()) {
      newError.first_name = "first name is required**";
    } else if (!/^[a-zA-Z]+$/.test(reg.first_name)) {
      newError.first_name = "First name should only contain letters**";
    }
    if (!reg.last_name.trim()) {
      newError.last_name = "Last name is required  **";
    } else if (!/^[a-zA-Z]+$/.test(reg.last_name)) {
      newError.last_name = "Last name should only contain letters**";
    }
    if (!reg.email.trim()) {
      newError.email = "Email is required  **";
    } else if (!emailRegex.test(reg.email)) {
      newError.email = "Invalid email address **";
    }
    if (!reg.password_hash.trim()) {
      newError.password_hash = "password is required  **";
    }

    if (
      newError.first_name ||
      newError.last_name ||
      newError.email ||
      newError.password_hash
    ) {
      SetError(newError);
    } else {
      axios
        .put(`http://localhost:4000/updateuser/${id}`, reg, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          SetError({
            email: "",
            first_name: "",
            last_name: "",
          });
          toast.success("Your account  is updated now !", {
            position: "top-right",
          });
          return;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data, { position: "top-right" });
            } else {
              alert(error.response.data);
            }
          } else {
            alert("An unknown error occurred");
          }
        });
    }
  };

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var [reg, UserReg] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    status: null,
    is_admin: null,
  });
  var [password_Data, SetPassword] = useState({
    password_hash: "",
     comfirm_password: "",
  });
  var passwordInputHandle = (e) => {
    SetPassword({ ...password_Data, [e.target.name]: e.target.value });
  };
  var updatePassword = (e) => {
    e.preventDefault();
    var newError = {
      password_hash: "",
      comfirm_password: "",
    };
    if (!password_Data.password_hash.trim()) {
      newError.password_hash = "password is required**";
    }
    if (!password_Data.comfirm_password.trim()) {
      newError.comfirm_password = "comfirm password is required**";
    } else if (password_Data.password_hash != password_Data.comfirm_password) {
      newError.comfirm_password = "comfirm password is incorrect**";
    }
    if (newError.password_hash || newError.comfirm_password) {
      SetError(newError);
    } else {
      SetError({
        password_hash: "",
        comfirm_password: "",
      });
     
      axios
        .put(`http://localhost:4000/updatePassword/${id}`, password_Data);
      
          toast.success("your password is updated now !");
          SetPassword({
            password_hash: "",
            comfirm_password: "",
          });
       
    }
  };
  return (
    <div>
     <Navbar/>

  {/* Banner / Breadcrumb */}
	<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">profile</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">profile</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>


          <div className="d-flex justify-content-center align-items-center  bg-light">
  <div className="form-container p-4 shadow rounded bg-white" style={{ maxWidth: "400px", width: "100%" }}>
    <h2 className="form-title text-center mb-3">Update Profile</h2>

    <div className="text-center mb-3">
      {reg.profile_picture ? (
        <img
          src={`/images/userImages/${reg.profile_picture}`}
          alt="User"
          width={80}
          height={80}
          className="rounded-circle border border-2"
        />
      ) : (
        <img
          src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
          alt="Default"
          width={80}
          height={80}
          className="rounded-circle border border-2"
        />
      )}
    </div>

    <form className="form-content" onSubmit={userUpdate}>
      <div className="form-group mb-2">
        <input
          type="text"
          name="first_name"
          className="form-control"
          placeholder="First Name"
          value={reg.first_name}
          onChange={inputHandlereg}
        />
      </div>
      {error.first_name && <span className="text-danger">{error.first_name}</span>}

      <div className="form-group mb-2">
        <input
          type="text"
          name="last_name"
          className="form-control"
          placeholder="Last Name"
          value={reg.last_name}
          onChange={inputHandlereg}
        />
      </div>
      {error.last_name && <span className="text-danger">{error.last_name}</span>}

      <div className="form-group mb-2">
        <input
          type="text"
          name="email"
          className="form-control"
          placeholder="Email"
          value={reg.email}
          readOnly
          disabled
        />
      </div>
      {error.email && <span className="text-danger">{error.email}</span>}

      <div className="form-group mb-2">
        <input
          type="file"
          name="profile_picture"
          className="form-control"
          onChange={handleFile}
        />
      </div>
      {imgError && <span className="text-danger">{imgError}</span>}

      <button type="submit" className="btn btn-primary w-100 mt-3">
        Save
      </button>
    </form>
  </div>
</div>

      {/* <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <h3> Update Password</h3>
      <form onSubmit={updatePassword}>
        <input
          type="text"
          onChange={passwordInputHandle}
          value={password_Data.password_hash}
          name="password_hash"
          placeholder="password"
        />
        <br />
        {error.password_hash && (
          <span className="text-danger">{error.password_hash}</span>
        )}
        <input
          type="text"
          name="comfirm_password"
          placeholder="comfirm password"
          value={password_Data.comfirm_password}
          onChange={passwordInputHandle}
        />
        {error.comfirm_password && (
          <span className="text-danger">{error.comfirm_password}</span>
        )}

        <br />
        <button>Update Password</button>
      </form> */}
      <ToastContainer></ToastContainer>
       <Footer/>
    </div>

  )
}

export default UserProfile
