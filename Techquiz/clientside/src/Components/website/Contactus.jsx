import React, { useState } from "react";
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
function Contactus() {
  var [contactData, SetcontactData] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });

  var [error, SetError] = useState({
    name: "",
    email: "",
    contact_number: "",
    message: "",
  });
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputHandleLogin = (e) => {
    SetcontactData({ ...contactData, [e.target.name]: e.target.value });
  };
  function Add_contact(e) {
    e.preventDefault();
    var newError = {
      name: "",
      email: "",
      contact_number: "",
      message: "",
    };
    if (!contactData.name.trim()) {
      newError.name = "the name is required **";
    } else if (contactData.name.length < 3) {
      newError.name = "the name is must be long then 3 aphabelt !";
    }
    if (!contactData.email.trim()) {
      newError.email = "the email is required !";
    } else if (!emailRegex.test(contactData.email)) {
      newError.email = "Invalid email address **";
    } 
    if (!contactData.contact_number.trim()) {
      newError.contact_number = " the contact number is required**";
    } else if (
    contactData.contact_number.length < 11 ||
      contactData.contact_number.length > 11
    ) {
      newError.contact_number = "The contact Number must be 11 digit long !";
    } else if (!/^[0-9+()\- ]+$/.test(contactData.contact_number)) {
      newError.contact_number =
        "The contact number should only contain numbers and special characters**";
    }
    if (!contactData.message.trim()) {
      newError.message = " the  mmassage is required**";
    }
    if (newError.name || newError.email || newError.contact_number||newError.message) {
      SetError(newError);
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/addcontact`, contactData).then(() => {
        toast.success("Thankyou for contact us we response as soon as possible !", {
          position: "top-right",
        });
        SetError({
          name: "",
          email: "",
          contact_number: "",
          message: "",
        });

        SetcontactData({
          name: "",
          email: "",
          contact_number: "",
          message: "",
        });
      });
    }
  }
  return (
    <>
 <Navbar/>
	<main>

			<div class="page-title-area">
				<div class="breadcrumb-wrapper" data-background="assets/img/page-title/page-title-bg.jpg">
					<div class="container">
						<div class="breadcrumb-content text-lg-start text-center">
							<h2 class="breadcrumb-title">Contact</h2>
							<ul class="breadcumb-menu">
								<li><a href="index.html">Home</a></li>
								<li><a href="#">Pages</a></li>
								<li><a href="#">Contact</a></li>
							</ul>
							<img class="breadcumb-img-shape" src="assets/img/page-title/page-title-img.png" alt="Media"/>
						</div>
					</div>
					<img class="breadcrumb-shape" src="assets/img/shape/bg-shape-9.png" alt="shape"/>
				</div>
			</div>
			


		
			<section class="contact-section pt-140 pt-lg-100">
				<div class="container">
					<div class="contact-border-wrapper-2">
						<div class="row align-items-center">
							<div class="col-lg-6">
								<div class="contact-img-box text-lg-start text-center ps-xxl-5 ms-xxl-4">
									<div class="title-two mb-40 mt-30 pe-xxl-5">
										<h2 class="title">Let’s Contact
											with Us.</h2>
									</div>
									<div class="text-center">
										<img class="img-fluid" src="assets/img/shape/shape-20.png" alt="shape"/>
									</div>
								</div>
							</div>
							<div class="col-lg-6">
								<div class="contact-form-wrapper-2">
									                       <form
                                          class="contact-form form-2"
                          method="post"
                          onSubmit={Add_contact}
                          name="contactform2"
                          id="contactform2"
                        >
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="name"
                              onChange={inputHandleLogin}
                              className="form-control"
                              id="fullname"
                              placeholder=" Name"
                              value={contactData.name}
                            />
                          </div>
                          {error.name && (
                            <span className="text-danger">{error.name}</span>
                          )}
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="email"
                              onChange={inputHandleLogin}
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              value={contactData.email}
                            />
                          </div>
                          {error.email && (
                            <span className="text-danger">{error.email}</span>
                          )}
                          <div className="form-group mb-2">
                            <input
                              type="text"
                              name="contact_number"
                              className="form-control"
                              onChange={inputHandleLogin}
                              id="phnumber"
                              placeholder="Phone"
                              value={contactData.contact_number}
                            />
                          </div>
                          {error.contact_number && (
                            <span className="text-danger">
                              {error.contact_number}
                            </span>
                          )}
                          <div className="textarea mb-2">
                            <textarea
                              name="message"
                              placeholder="Enter a message"
                              className="form-control"
                              value={contactData.message}
                              onChange={inputHandleLogin}
                            ></textarea>
                          </div>
                          {error.message && (
                            <span className="text-danger">{error.message}</span>
                          )}

                          <div className="comment-btn text-center">
                            <input
                              type="submit"
                              className="nir-btn"
                              id="submit2"
                              value="Send Message"
                            />
                          </div>
                        </form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<div class="ht-contact-section-info pt-60">
				<div class="container">
					<div class="row align-items-center justify-content-center">
						<div class="col-xl-4 col-lg-6">
							<div class="info-box2">
								<div class="icon">
									<i class="bi bi-headphones"></i>
								</div>
								<div class="info-content">
									<h3 class="info-title">Office Address</h3>
									<address class="mb-0">
										2118 Thornridge Cir. Syracuse, Connecticut 35624, Thailand
									</address>
								</div>
							</div>
						</div>
						<div class="col-xl-4 col-lg-6">
							<div class="info-box2 py-4">
								<div class="icon">
									<i class="bi bi-telephone-x"></i>
								</div>
								<div class="info-content">
									<h3 class="info-title">Phone Number</h3>
									<p>+(406) 555-0120</p>
									<p class="pb-4">(406) 555-0120</p>
								</div>
							</div>
						</div>
						<div class="col-xl-4 col-lg-6">
							<div class="info-box2">
								<div class="icon">
									<i class="bi bi-envelope"></i>
								</div>
								<div class="info-content">
									<h3 class="info-title">Email Address</h3>
									<p>chambers@example.com</p>
									<p>tanya.hill@example.com</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


		</main>
    
   
      <ToastContainer></ToastContainer>
  <Footer/>
    </>
  );
}

export default Contactus;
