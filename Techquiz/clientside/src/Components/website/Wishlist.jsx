import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const [wishlistProduct, setProduct] = useState([]);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userLogin");
    const tokenParts = userToken.split(".");
    const payload = JSON.parse(atob(tokenParts[1]));
    const id = payload.id;

    axios.get(`${import.meta.env.VITE_API_URL}/Wishlist/${id}`).then((resp) => {
      setProduct(resp.data);
    });
  }, []);

  const delProduct = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/delWishProduct/${id}`).then(() => {
      const userToken = sessionStorage.getItem("userLogin");
      const tokenParts = userToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.id;

      axios.get(`${import.meta.env.VITE_API_URL}/Wishlist/${userId}`).then((resp) => {
        setProduct(resp.data);
      });
    });
  };

  return (
    <>
      <Navbar />

      {/* Banner / Breadcrumb */}
  	<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">wishlist</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#"> wishlist</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>

      {/* Wishlist Cards */}
      <div className="container py-5">
        {wishlistProduct.length === 0 ? (
          <div className="text-center py-5">
            <img
              src="/assets/img/empty-wishlist.png"
              alt="Empty Wishlist"
              style={{ maxWidth: "250px" }}
            />
            <h4 className="mt-3">Your wishlist is empty</h4>
            <p className="text-muted">
              Start adding some cute pet products 🐶🐱
            </p>
            <Link to="/website/products" className="btn btn-primary mt-2">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row">
            {wishlistProduct.map((con) => (
              <div key={con._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={`/images/productImages/${con.image}`}
                    className="card-img-top"
                    alt={con.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{con.name}</h5>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Link
                        to={`/website/ProductData/${con._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => delProduct(con._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
