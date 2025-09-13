import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
function Navbar() {
	  const nav = useNavigate();
  const userToken = sessionStorage.getItem("userLogin");
  const [user, setUserData] = useState({}); // Initialize user as null

  useEffect(() => {
    const fetchProfile = async () => {
      if (userToken) {
        const tokenParts = userToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const id = payload.id;

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile/${id}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserData(null);
      }
    };

    fetchProfile();
  }, [userToken]);

  function logout() {
    sessionStorage.removeItem("userLogin");
    axios.get(`${import.meta.env.VITE_API_URL}/logout`);
    nav("/");
  }
  return (
<>

		<header class="theme-main-menu theme-menu-five">
			<div class="container-fluid">
				<div class="main-header-area">
					<div class="row align-items-center justify-content-between">
						<div class="col-md-auto col-6">
							<div class="logo-area">
								<a href="index.html"><img src="/assets/img/logo/logo-2.svg" alt="Header-logo"/></a>
							</div>
						</div>
						<div class="col-md-auto d-flex align-items-center justify-content-end d-lg-inline-block d-none">
							<div class="main-menu d-none d-lg-block">
								<nav id="mobile-menu">
									<ul class="menu-list">
										<li><Link to={"/appiontment"}>Appointment</Link></li>
										<li><Link to={"/contact"}>Contact us </Link></li>
										<li><Link to={"/abutus"}>ABOUTS </Link></li>

									</ul>
								</nav>
							</div>
						</div>
						<div class="col-md-auto col-6">
							<div class="right-nav d-flex align-items-center justify-content-end">
								{/* <div class="cart-menu">
									<a class="shopping-cart mr-20" href="#">
										<i class="bi bi-bag"></i>
										<span class="badge">0</span>
									</a>
								</div> */}
								{/* <div class="quote-btn d-lg-inline-block d-none">
									<a href="contact.html" class="ht-btn bs-btn">APPOINTMENT</a>
								</div> */}
								<div class="search-area ms-1 d-none">
									<a class="search-input" href="#" data-bs-toggle="offcanvas"
										data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
										<i class="bi bi-search"></i>
									</a>
								</div>
								<div class="hamburger-menu ms-0 d-lg-none d-md-inline-flex">
									<div class="bar-wrap">
										<div class="bar-1"></div>
										<div class="bar-2"></div>
										<div class="bar-3"></div>
									</div>
								</div>
							</div>


		    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user ? user.first_name : "Menu"}
      </button>

      <div className="dropdown-menu">
        {user ? (
          <>
            <Link className="dropdown-item" to="/profile">Profile</Link>
            <Link className="dropdown-item" to="/website/cartList">Cart</Link>
            <Link className="dropdown-item" to="/website/wishlist">Wishlist</Link>
            <Link className="dropdown-item" to="/orders">Orders</Link>
			
			<Link className="dropdown-item" to="/Mypet">pets</Link>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item text-danger" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link className="dropdown-item" to="/login">Login</Link>
        )}
      </div>
    </div>
		</div>
					</div>
				</div>
			</div>
		</header>
{/* 
		<div class="ht-menu-wrapper">
			<div class="ht-menu-area">
				<button class="ht-menu-toggle"><i class="bi bi-x-lg"></i></button>
				<div class="mobile-logo">
					<a href="index.html">
						<img src="assets/img/logo/logo-3.svg" alt="logo"/>
					</a>
				</div>
				<div class="mobile-menu-wrapper d-lg-none d-inline-block">
					<div class="mobile-menu"></div>
				</div>
				<div class="offset-widget mb-40">
					<div class="info-widget">
						<h4 class="offset-title mb-20">About Us</h4>
						<p class="mb-30">
							But I must explain to you how all this mistaken idea of denouncing pleasure and
							praising pain was born and will give you a complete account of the system and
							expound the actual teachings of the great explore
						</p>
					</div>
				</div>
				<div class="offset-widget mb-30 pr-10">
					<div class="info-widget info-widget2">
						<h4 class="offset-title mb-20">Contact Info</h4>
						<p>
							<i class="fal fa-address-book"></i>
							23/A, Miranda City Likaoli Prikano, Dope
						</p>
						<p>
							<i class="fal fa-phone"></i>
							+0989 7876 9865 9
						</p>
						<p>
							<i class="fal fa-envelope-open"></i>
							info@example.com
						</p>
					</div>
				</div>
				<div class="login-btn text-center">
					<a class="ht-btn w-100" href="login.html">Login</a>
				</div>

			</div>
		</div> */}

</>  )
}

export default Navbar