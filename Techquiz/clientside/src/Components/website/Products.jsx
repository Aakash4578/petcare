import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import Navbar from './Navbar'
import Footer from './Footer'
import { TiArrowSyncOutline } from 'react-icons/ti';
import { toast, ToastContainer } from "react-toastify";

const Products = () => {
	var [myprodut, SetProduct] = useState([]);

	var fetchData = () => {
		axios.get(`${import.meta.env.VITE_API_URL}/website/productDetails`).then((res) => {
			SetProduct(res.data);
		});
	};
	useEffect(() => {
		fetchData();
	}, []);


	var addWisht = async (name, Image) => {
		const userToken = sessionStorage.getItem("userLogin");

		if (!userToken) {
			toast.error('Please login first!', {
				position: "top-right",

				theme: "light",
			});
			
		}
const tokenParts = userToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const id = payload.id;

		const wishList = {
			name: name,
			image: Image,
		
			user_id: id
		};
		 
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/website/addWishList`, wishList);
			if (response.data.success) {
				toast.success(response.data.message);
				const wishList = {
					name: "",
					image: "Image",user_id: ""
				};
			} else {
				toast.error(response.data.message, {
					position: "top-right",
				});
			}
		} catch (error) {
			alert("An error occurred", {
				position: "top-right",
			});
		}

	}

var addToCart = async (name,Image, Price) => {


	
  const userToken = sessionStorage.getItem("userLogin");

  if (!userToken) {
    toast.error("Please login first!", {
      position: "top-right",
      theme: "light",
    });
    return;
  }

  try {
    const tokenParts = userToken.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const user = payload.id;
var quantity=1;
console.log(name);
    const cartItem = {
      user_id: user,
    
      name: name, 
      price: Number(Price), 
	  image :Image ,          

      quantity: 1, 
	   total: quantity * Number(Price)
    };

    const response = await axios.post(
      "http://localhost:4000/addToCart",
      cartItem
    );

    if (response.data.message) {
      toast.success(response.data.message, {
        position: "top-right",
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "An error occurred while adding to cart",
      {
        position: "top-right",
      }
    );
  }
};


	return (
		<div>
			<Navbar />

			<main>


				<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">Shop</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">Shop</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>
<section className="ht-product-section w-100">
  <div className="container">
    <div className="row">
      {/* ✅ Left Section */}
      <div className="col-lg-9 pe-xxl-5">
        {/* Top Row (Showing + Dropdown) */}
        <div className="row align-items-center mb-3">
          <div className="col-sm-6 text-center text-sm-start">
            <p className="show-product-count fw-medium mb-0">
              Showing <b>07</b>/200 results
            </p>
          </div>
          <div className="col-sm-6 text-center text-sm-end">
            <div className="dropdown d-inline-block">
              <span className="me-2 fw-semibold">Sort by</span>
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Default
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Latest
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Newest
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    A to Z
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ Product Grid */}
        <div className="row">
  {myprodut.map((item) => (
    <div key={item._id} className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
      <div className="product-wrapper text-center h-100">
        {/* Product Image */}
        <div className="product-img mb-2">
          <img
            className="w-100"
            src={`/images/productImages/${item.Image}`}
            alt={item.name}
          />
        </div>

        {/* Add To Cart */}
        <button
          className="add-to-cart ht-btn mt-2"
          style={{ border: 0 }}
          onClick={() => addToCart(item.name, item.Image, item.Price)}
        >
          Add To Cart
        </button>

        {/* Icons */}
        <div className="product-icon mt-2">
          <a onClick={() => addWisht(item.name, item.Image)}>
            <i className="bi bi-suit-heart"></i>
          </a>
          <Link
            to={`/website/ProductData/${item._id}`}
            className="text-black ms-2"
          >
            <i className="bi bi-eye"></i>
          </Link>
        </div>

        {/* Rating */}
        <div className="product-rating mt-2">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="bi bi-star-fill text-warning"></i>
          ))}
          <span className="ms-1">5.0</span>
        </div>

        {/* Title + Price */}
        <h5 className="product-title mt-2 mb-1">
          <Link to={`/website/ProductData/${item._id}`}>{item.name}</Link>
        </h5>
        <p className="text-danger fw-bold">${item.Price}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  </div>
</section>



			</main>
			<ToastContainer></ToastContainer>

			<Footer />
		</div>
	)
}

export default Products