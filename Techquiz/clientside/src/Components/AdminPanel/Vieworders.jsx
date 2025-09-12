import React, { useEffect, useState } from 'react'
import axios from "axios";
import Admin_Index from './Admin_Index';
import { Link, useNavigate, useParams } from "react-router-dom";
const Vieworders = () => {
    var {id}=useParams()
var[fetchData,SetData]=useState({})
  var fetchOrder=()=>{
    axios.get(`http://localhost:4000/fetchOrderData/${id}`).then((res)=>{
        SetData(res.data)
    })
  }
useEffect(()=>{
    fetchOrder()
  })
  return (
    <div> 
          <Admin_Index></Admin_Index> 
        <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className={""}>
          <h1>Orders Management</h1>

          <div className="card">
            <div className={""}>Orders Information</div>
               <div className="card py-5 px-5">
<div className="">
<h2>Name:{fetchData.name}</h2>
<h5>Email:{fetchData.email}</h5>
</div>
<div className="dataOrder  ">
    
<div className="dataa">
        <div className="left-wrapper">
            <h3>Product Information</h3>
            {fetchData.items && fetchData.items.map((item, index) => (
                <div className="div"><p key={index}>Product Name: {item.name}</p>
                    <p>Product Price : {item.price}</p>
             <p>Product Quanitiy  : {item.quantity}</p>
             <p className="price">Total Price : {item.total}</p></div>
 
))}

             
        </div>
    <div  className="right-wrapper">
  {fetchData && fetchData.address && (
  <div>
    <h3>User Information</h3>
    {/* Optional chaining for safety */}
    <p>State : {fetchData.address.state}</p>
    <p>Street : {fetchData.address.street}</p>
    <p>Post Code : {fetchData.address.postcode}</p>
    <p>Town : {fetchData.address.town}</p>
  </div>
)}

           </div>
</div>
</div>
<div className="divdata">
    <h5 className="">{
fetchData.status}</h5>
</div>
               </div>
         
          </div>
        </div>
      </div></div>
  )
}

export default Vieworders