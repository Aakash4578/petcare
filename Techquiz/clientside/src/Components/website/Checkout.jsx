import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Checkout = () => {
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken ? userToken.split(".") : [];
  const payload = tokenParts.length > 1 ? JSON.parse(atob(tokenParts[1])) : {};
  const userLogined = payload.id;

  const [cartProduct, SetProduct] = useState([]);
  const [reg, UserReg] = useState({});
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState({
    name: "",
    email: "",
    state: "",
    street: "",
    town: "",
    Postcode: "",
    phone: "",
  });

  const totals = cartProduct.reduce(
    (acc, current) => acc + Number(current.total),
    0
  );

  // fetch cart
  function fetch_cart() {
    axios.get(`http://localhost:4000/cartDetail/${userLogined}`).then((resp) => {
      SetProduct(resp.data);
    });
  }

  useEffect(() => {
    fetch_cart();
    if (userToken) {
      axios
        .get(`http://localhost:4000/profile/${userLogined}`)
        .then((res) => {
          UserReg(res.data);
        });
    }
  }, []);

  // input handle
  const inputHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // place order
  const placeOrder = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!order.state.trim()) newErrors.state = "State is required";
    if (!order.street.trim()) newErrors.street = "Street is required";
    if (!order.town.trim()) newErrors.town = "Town is required";

    const postcodeRegex = /^[0-9]{4,6}$/;
    if (!order.Postcode.trim()) {
      newErrors.Postcode = "Postcode is required";
    } else if (!postcodeRegex.test(order.Postcode)) {
      newErrors.Postcode = "Postcode must be 4-6 digits";
    }

    const phoneRegex = /^03[0-9]{9}$/;
    if (!order.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(order.phone)) {
      newErrors.phone = "Phone must be valid (e.g. 03001234567)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const finalOrder = {
      user_id: userLogined,
      name: reg.first_name,
      email: reg.email,
      
      items: cartProduct.map((p) => ({
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        total: p.total,
      })),
      totalAmount: totals,
      address: {
        state: order.state,
        street: order.street,
        town: order.town,
        postcode: order.Postcode,
        phone: reg.phone,
      },
    };

    try {
      await axios.post("http://localhost:4000/addOrder", finalOrder, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Order placed successfully!");
      setOrder({
        state: "",
        street: "",
        town: "",
        Postcode: "",
      
      });
      fetch_cart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order!");
    }
  };

  return (


  
<>
<Navbar/>

	<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">Checkout</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">Checkout</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>

    <div>
      <form onSubmit={placeOrder}>
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7">
                <div className="billing-form">
                  <h3 className="mb-4 billing-heading">Billing Details</h3>
                  <div className="row align-items-end">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={reg.first_name || ""}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>State / Country</label>
                        <select
                          name="state"
                          className="form-control"
                          onChange={inputHandle}
                          value={order.state}
                        >
                          <option value="">Select</option>
                          <option value="France">France</option>
                          <option value="Italy">Italy</option>
                          <option value="Philippines">Philippines</option>
                          <option value="South Korea">South Korea</option>
                          <option value="Hongkong">Hongkong</option>
                          <option value="Japan">Japan</option>
                        </select>
                        {errors.state && (
                          <span className="text-danger">{errors.state}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Street Address</label>
                        <input
                          name="street"
                          onChange={inputHandle}
                          value={order.street}
                          type="text"
                          className="form-control"
                          placeholder="House number and street name"
                        />
                        {errors.street && (
                          <span className="text-danger">{errors.street}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Town / City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="town"
                          onChange={inputHandle}
                          value={order.town}
                        />
                        {errors.town && (
                          <span className="text-danger">{errors.town}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Postcode / ZIP *</label>
                        <input
                          type="text"
                          name="Postcode"
                          onChange={inputHandle}
                          className="form-control"
                          value={order.Postcode}
                        />
                        {errors.Postcode && (
                          <span className="text-danger">{errors.Postcode}</span>
                        )}
                      </div>
                    </div>

             
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
               <div className="col-xl-5">
                <div className="row mt-5 pt-3">
                  <div className="col-md-12 d-flex mb-5">
                    <div className="cart-detail cart-total p-3 p-md-4">
                      <h3 className="billing-heading mb-4">Cart Total</h3>
                       <p className="d-flex">
                        <span>Subtotal</span>
                        <span>${totals}</span>
                      </p> *
                      <p className="d-flex">
                        <span>Delivery</span>
                        <span>$0.00</span>
                      </p>
                      <p className="d-flex">
                        <span>Discount</span>
                        <span>$3.00</span>
                      </p>
                      <hr />
                      <h3 className="d-flex total-price">
                        <span>Total</span>
                        <span>${totals}</span>
                      </h3>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="cart-detail p-3 p-md-4">
                      <h3 className="billing-heading mb-4">Payment Method</h3>
                      <p>
                        <button
                          type="submit"
                          className="btn btn-primary py-3 px-4"
                        >
                          Place an order
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              {/* End Cart Summary */}
            </div>
          </div>
        </section>
      </form>
       <ToastContainer></ToastContainer>
    </div>

    <Footer/>
</>
  );
};

export default Checkout;
