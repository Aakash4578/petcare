import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';
import {  useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
const WerbsiteProductData=()=> {
    var[productData,SetProduct]=useState({})
    var {id}=useParams()
    
    var product_Data=()=>{
        axios.get(`http://localhost:4000/product_data/${id}`).then((resp)=>{
            SetProduct(resp.data);
            console.log(resp.data)
        })
    }
	const [quantity, setQuantity] = useState(1);
    useEffect(()=>{
        product_Data();
    
    },[])
 const addToCart = async (e) => {
    e.preventDefault();
console.log(productData.Price,quantity,productData.name,productData.Image);
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

      const cartItem = 
        {
   user_id: user,
  name: productData.name,
  price: Number(productData.Price),   // frontend se Price aata hai, backend me lowercase bhej do
  image: productData.Image,           // frontend se Image aata hai, backend me lowercase bhej do
  quantity: Number(quantity),         // ensure number
  total: Number(quantity) * Number(productData.Price)
}
	
      

      const response = await axios.post("http://localhost:4000/addToCart", cartItem);

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
      console.error(error.message);
      toast.error(
        error.response?.data?.message || "An error occurred while adding to cart",
        {
          position: "top-right",
        }
      );
    }
	    }
  
  return (
<>
 <Navbar/>

<div class="product-details-section pt-100 pb-80 pb-lg-40">
				<div class="container">
					<div class="row align-items-center">
						<div className="col-6">
                            <img src={`/images/productImages/${productData.Image}`} alt="Big Image"  width={"100%"}/> </div>
						<div class="col-lg-6 mb-40">
							<div class="product-details-content pt-lg-4 ps-xl-5">
								<div class="product-details">
									<h3 class="product-title mb-15">{productData.name}</h3>
									<div class="d-md-flex align-items-center">
										<div class="price-list mb-20">
											<span class="new-price">{productData.Price}</span>
										</div>
                                            {/* <div class="product-rating mb-20 ms-2">
                                                <a href="#"><i class="bi bi-star-fill"></i></a>
                                                <a href="#"><i class="bi bi-star-fill"></i></a>
                                                <a href="#"><i class="bi bi-star-fill"></i></a>
                                                <a href="#"><i class="bi bi-star-fill"></i></a>
                                                <a href="#"><i class="bi bi-star-fill"></i></a>
                                                <a href="#">{productData.quantity}</a>
                                            </div> */}
									</div>
								
									<p>{productData.des}</p>
									
									<div class="product-category">
										<p class="text-heding">Category: <span class="fw-semi">{productData.category}</span></p>
										<p class="text-heding">availble: <span class="fw-semi">{productData.Status === 1 ? (
                                            <span className="bg-success">In Stock</span>
                                        ) : (
                                            <span className="bg-danger">Out of Stock</span>
                                        )}</span></p>
									</div>
									<form onSubmit={addToCart}>
									<div class="products_quantity_area d-sm-flex align-items-center mt-40">
										<div class="product-quantity text-center mr-30 mb-30">
											<div class="cart-plus-minus">
												<input type="text" name='quantity'  value={quantity}
                            onChange={(e) => setQuantity((e.target.value))}  />
												<div class="dec qtybutton">-</div>
												<div class="inc qtybutton">+</div>
											</div>
										</div>
										<div class="products_action_area d-flex align-items-center mb-30">
											<button type='submit' class="add-to-cart"  >Add To Cart</button>
										</div>
									</div>
									</form>
																	<div class="social-links-two mt-50 mb-30">
										<span class="text-heding fw-medium pe-1 me-sm-4">Share Now:</span>
										<a href="#">
											<i class="bi bi-facebook"></i>
										</a>
										<a href="#">
											<i class="bi bi-twitter"></i>
										</a>
										<a href="#">
											<i class="bi bi-instagram"></i>
										</a>
										<a href="#" class="me-0">
											<i class="bi bi-youtube"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<ToastContainer></ToastContainer>

  <Footer/>
</>  )
}

export default WerbsiteProductData