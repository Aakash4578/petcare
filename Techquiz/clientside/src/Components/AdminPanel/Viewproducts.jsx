import React, { useEffect, useState } from 'react'
import Admin_Index from "./Admin_Index";
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Viewproducts = () => {

    var[productData,SetProduct]=useState({})
var {id}=useParams()

var product_Data=()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/product_data/${id}`).then((resp)=>{
        SetProduct(resp.data);
        console.log(resp.data)
    })
}
useEffect(()=>{
    product_Data();

},[])
  return (
    <div>
      <Admin_Index></Admin_Index>
   <div className="users-container" style={{ marginLeft: "15%" }}>
    <div className="users-header">
        <div className="container-fluid">
            <div>
                <h1>Product Data</h1>
                <div className="card">
                    <div className="card-header">Product Data</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div>
                                    <img src={`/images/productImages/${productData.Image}`} alt="" width={300} />
                                </div>
                            </div>
                            <div className="col">
                                <h3>Name: {productData.name}</h3>
                                <div>
                                    <h5>Price: {productData.Price}</h5>
                                    <h5>Quantity: {productData.quantity}</h5>
                                </div>
                                <div>
                                    <h5>Availability:
                                        {productData.Status === 1 ? (
                                            <span className="bg-success">In Stock</span>
                                        ) : (
                                            <span className="bg-danger">Out of Stock</span>
                                        )}
                                    </h5>
                                    <h5>Category: {productData.category}</h5>
                                </div>
                                <h5>Description</h5>
                                <p>{productData.des}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

      </div>
  )
}

export default Viewproducts
