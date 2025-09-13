import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Admin_Index from "./Admin_Index";
import { toast } from "react-toastify";
const EditProduct = () => {
  var nav = useNavigate();
  var [productData, SetProduct] = useState([]);
  var { id } = useParams();

  var product_Data = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/product_data/${id}`).then((resp) => {
      SetProduct(resp.data);
      console.log(resp.data);
    });
  };
  var [categories, SetCategory] = useState([]);
  var fetch_data = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/fetchCategory`).then((resp) => {
      SetCategory(resp.data);
    });
  };
  useEffect(() => {
    product_Data();
    fetch_data();
  }, []);

  var UpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/updateProduct/${id}`, productData)
      .then((resp) => {
        console.log(resp.data);
      });
    toast.success("The product is updated successfully ! ");
  };
  var inputHandle = (e) => {
    SetProduct({ ...productData, [e.target.name]: e.target.value });
  };
  var uploadImage = (e) => {
  e.preventDefault();
    axios
      .put(`http://localhost:4000/update_ProductImage/${id}`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        resp.data;
      });
 toast.success("The product Images is updated successfully ! ");
  };

  const [values, setValues] = useState({
    Image: null,
  });
  const handleChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input

    setValues(() => ({
      ...values,
      Image: file,
    }));
  };
  return (
    <>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className={""}>
          <h1>Update Product</h1>
          <div>
            <div>
              <form onSubmit={UpdateProduct}>
                <div className="form-row">
                  <div className="col">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="hidden"
                      name="Image"
                      id="formFile"
                      value={productData.Image}
                      onChange={inputHandle}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={productData.name}
                      onChange={inputHandle}
                      id="exampleFormControlInput1"
                      placeholder="Enter Name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      value={productData.quantity}
                      id="exampleFormControlInput1"
                      placeholder="Enter Quantity"
                      onChange={inputHandle}
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Status
                    </label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      name="Status"
                      onChange={inputHandle}
                    >
                      <option selected value={2}>
                        Please select the stock status
                      </option>
                      <option value={1}>In Stock</option>
                      <option value={0}>Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Price"
                      value={productData.Price}
                      onChange={inputHandle}
                      id="exampleFormControlInput1"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Category
                    </label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      name="category"
                      onChange={inputHandle}
                      value={productData.category}
                    >
                      {categories.map((key) => (
                        <option key={key.name} value={key.name}>
                          {key.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    name="des"
                    onChange={inputHandle}
                    value={productData.des}
                    rows="3"
                  ></textarea>
                </div>
                <div className="col">
                  <input
                    type="submit"
                    value={"Send"}
                    className="btn btn-primary w-100"
                  />
                </div>
              </form>
            </div>
            <div className={"text-center mt-5"}>
              <img src={`/images/productImages/${productData.Image}`} alt="" width={400} />
              <form onSubmit={uploadImage}>
                <div className="form-row">
                  <div className="col mb-2">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="Image"
                      onChange={handleChange}
                      id="exampleFormControlInput1"
                    />
                  </div>
                </div>
                <div className="col mt-1">
                  <input
                    type="submit"
                    value={"Upload Picture"}
                    className="btn btn-primary w-100"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
