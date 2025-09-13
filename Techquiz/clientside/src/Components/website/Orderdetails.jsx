import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Orderdetails = () => {
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const userLogined = payload.id;

  const [order, setOrders] = useState([]);

  const fetchOrders = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/fetchOrderByUser/${userLogined}`)
      .then((res) => {
        setOrders(res.data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  function cancelOrder(id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/fetchOrderdel/${id}`).then(() => {
      fetchOrders();
    });
  }

  return (
 <>
 <Navbar /> 
   {/* Banner / Breadcrumb */}
   	<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">Oder History</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">Oder History</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>

   <div className="container py-5">

      {order.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="No Orders"
            width="120"
            className="mb-3"
          />
          <h5 className="text-muted">You have not placed any orders yet!</h5>
        </div>
      ) : (
        <div className="row justify-content-center">
          {order.map((r, index) => (
            <div
              className="col-md-6 mb-4"
              key={index}
              
              data-aos-delay={index * 100}
            >
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">
                    🛍️ Order #{index + 1}
                  </h5>

                  <ul className="list-group mb-3">
                    {r.items &&
                      r.items.map((item, i) => (
                        <li
                          key={i}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="fw-bold">Rs {item.total}</span>
                        </li>
                      ))}
                  </ul>

                  <h6 className="fw-bold text-success mb-3">
                    Total: Rs {r.totalAmount}
                  </h6>

                  <button
                    className="btn btn-outline-danger w-100 rounded-pill"
                    onClick={() => cancelOrder(r._id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
<Footer  /> 
 </>
  );
};

export default Orderdetails;
