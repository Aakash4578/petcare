import Navbar from './Navbar'
import Footer from './Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Carttable = () => {
  
var [cartProduct,SetProduct]=useState([])
const totals = cartProduct.reduce((acc, current) => acc + Number(current.total), 0);


useEffect(() => {
  fetchCartData();
}, []);

const fetchCartData = () => {
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken.split(".");
  const payload = JSON.parse(atob(tokenParts[1]));
  const userId = payload.id;

  axios.get(`${import.meta.env.VITE_API_URL}/cartDetail/${userId}`).then((resp) => {
    SetProduct(resp.data);
  });
};

var delProduct = (cartItemId) => {
  axios.delete(`${import.meta.env.VITE_API_URL}/cartDel/${cartItemId}`).then(() => {
    fetchCartData(); // ✅ delete ke baad dobara fetch
  });
};

  
  return (
   <>
   <Navbar/>
   <main>

			
				<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">Cart</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">Cart</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>
			<div class="cart-section pt-130 pb-130 pt-lg-100 pb-lg-100">
				<div class="container">
					<div class="row">
						<div class="col-xl-8">
							<form action="#" class="cart-list-form">
								<div class="table-responsive">
									<table class="table">
										<thead>
											<tr>
												<th colspan="2">Product</th>
												<th>Price</th>
												<th>QTY</th>
												<th>Total</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
                       {
          cartProduct.length==0?(
            <section class="ftco-section ftco-cart text-center">
              <h5>You don't have any product in cart</h5>
              </section>
          ):(
          cartProduct.map((con)=>(
                        <tr class="text-center">
      
                          
                          <td class="image-prod"><div class="img" >
                                          <img src={`/images/productImages/${con.image}`} width={100} height={100} alt="" /></div></td>
                          
                          <td class="product-name">
                            <h3>{con.name}</h3>
                          
                          </td>
                          <td class="price">{con.price}</td>
                         
                                                    <td class="price">{con.quantity}</td>

                          <td class="total">${con.total}</td>
                          
                          <td class="product-remove"><button onClick={()=>{
                                          delProduct(con._id)  
                                      }}class="btn btn-danger"><span class="ion-ios-close"></span>delete</button ></td>
                        </tr>
                       )))}
										
										</tbody>
									</table>
								</div>

							
							</form>
						</div>
						<div class="col-xl-4">
							<div class="cart-total-section d-flex flex-column pt-sm-5">
								<table class="cart-total-table">
									<tbody>
										<tr>
					
           					<th>Total</th>
											<td> $ {totals}
           </td>
										</tr>
								
									</tbody>
								</table>
							
                        <p><Link to={"/checkout"} class="checkout-process mt-30">Proceed to Checkout</Link></p>
							</div>
						</div>
					</div>
				</div> 
			</div>
			<section class="theme-bg cta-section position-relative z-1 pt-100 pb-40">
				<img class="shape-1 position-absolute top-0 start-0" src="/assets/img/shape/bg-shape-10.png" alt="shape"/>
				<div class="container">
					<div class="row align-items-center">
						<div class="col-lg-8">
							<div class="title-two text-lg-start text-center mb-30">
								<h2 class="title">Questions? We’re always here to assist.</h2>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="right-btn text-lg-end text-center mb-30">
								<a href="contact.html" class="ht-btn style-17">contact us</a>
							</div>
						</div>
					</div>
				</div>
			</section>


		</main>
    {/* <div>Caerttable

          {
          cartProduct.length==0?(
            <section class="ftco-section ftco-cart text-center">
              <h5>You don't have any product in cart</h5>
              </section>
          ):(
            <section class="ftco-section ftco-cart">
            <div class="container">
              <div class="row">
                <div class="col-md-12 ">
                  <div class="cart-list">
                    <table class="table">
                      <thead class="thead-primary">
                        <tr class="text-center">
                          <th>&nbsp;</th>
                          <th>Product Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                                      {
                                          cartProduct.map((con)=>(
                        <tr class="text-center">
      
                          <td class="product-remove"><button onClick={()=>{
                                          delProduct(con._id)
                                      }}><span class="ion-ios-close"></span>delete</button ></td>
                          
                          <td class="image-prod"><div class="img" >
                                          <img src={`/images/productImages/${con.image}`} width={100} height={100} alt="" /></div></td>
                          
                          <td class="product-name">
                            <h3>{con.name}</h3>
                          
                          </td>
                          <td class="price">{con.price}</td>
                         
                                                    <td class="price">{con.quantity}</td>

                          <td class="total">${con.total}</td>
                        </tr>
                       ))
                                  }
                          
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row justify-content-end">
                
                <div class="col-lg-4 mt-5 cart-wrap ">
                  <div class="cart-total mb-3">
                    <h3>Cart Totals</h3>
                    <p class="d-flex">
                      <span>Subtotal</span>
                      <span>
        
          <p>$ {totals}</p>
           
      </span>
                    </p>
                    <p class="d-flex">
                      <span>Delivery</span>
                      <span>$0.00</span>
                    </p>
                    <p class="d-flex">
                      <span>Discount</span>
                      <span>$3.00</span>
                    </p>
                    <hr/>
                    <p class="d-flex total-price">
                      <span>Total</span>
                      <span>${totals}</span>
                    </p>
                  </div>
                  
                  <p><Link to={"/checkout"} class="btn btn-primary py-3 px-4">Proceed to Checkout</Link></p>
                </div>
              </div>
            </div>
            
          </section>
          )
        }
    </div>
    */}
   
   </> 
  )
}

export default Carttable