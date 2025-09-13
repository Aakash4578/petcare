import Admin_Index from "./Admin_Index";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Add_product = () => {
  const [errors, setErrors] = useState({
    name: null,
    des: null,
    quantity: null,
    Price: null,
    Status: null,
    Image: null,
  });

  var nav = useNavigate();

  const [values, setValues] = useState({
    name: "",
    des: "",
    quantity: "",
    Price: "",
    Status: 2,
    Image: "",
    category: "",
  });

  const insertedValues = async (e) => {
    e.preventDefault();
    let newErrors = {
      name: null,
      des: null,
      quantity: null,
      Price: null,
      Status: null,
      Image: null,
    };

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!values.des.trim()) {
      newErrors.des = "Description is required";
    }

    if (!values.Price) {
      newErrors.Price = "Price is required";
    }

    if (!values.quantity) {
      newErrors.quantity = "Quantity is required";
    }

    if (!values.Image) {
      newErrors.Image = "Image is required";
    }

    if (
      newErrors.name ||
      newErrors.des ||
      newErrors.Price ||
      newErrors.quantity ||
      newErrors.Image
    ) {
      setErrors(newErrors);
    } else {
      try {
        setErrors({
          name: null,
          des: null,
          Price: null,
          quantity: null,
          Image: null,
        });
        values.Price=Number(values.Price);
        values.quantity=Number(values.quantity);
        var response = await axios.post(
          `${import.meta.env.VITE_API_URL}/add_Product`,
          values,
          { headers: { "Content-Type": "multipart/form-data" }}
        );
        console.log(response.data)
        if (response.data.success) {
          toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        
        }
      } catch (error) {
        console.log("Error: " + error.response?.data?.error || error.messege);
        
      }

    }
  };
  var inputHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  var [error, SetError] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input

    if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
      const imgerror = "Invalid image! Please upload a JPG, JPEG, or PNG file.";
      SetError(imgerror);
      return;
    }

    SetError(null);

    setValues(() => ({
      ...values,
      Image: file,
    }));
  };
  var [categories, SetCategory] = useState([]);
  var fetch_data = () => {
    axios.get("http://localhost:4000/active_Category").then((resp) => {
      SetCategory(resp.data);
    });
  };
  useEffect(() => {
    fetch_data();
  }, []);
  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="container my-2 d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Add New Products</h2>
          <div className="card">
            <form onSubmit={insertedValues}>
              <div className="form-row ">
                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={values.name}
                    onChange={inputHandle}
                    id="exampleFormControlInput1"
                    placeholder="Enter Name"
                  />

                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="quantity"
                    value={values.quantity}
                    id="exampleFormControlInput1"
                    placeholder="Enter Qauntity"
                    onChange={(e) => {
                      setValues({ ...values, quantity: e.target.value });
                    }}
                  />
                  {errors.quantity && (
                    <p style={{ color: "red" }}>{errors.quantity}</p>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="Price"
                    value={values.Price}
                    id="exampleFormControlInput1"
                    placeholder="Enter Price"
                    onChange={(e) => {
                      setValues({ ...values, Price: e.target.value });
                    }}
                  />

                  {errors.Price && (
                    <p style={{ color: "red" }}>{errors.Price}</p>
                  )}
                </div>
                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Status
                  </label>
                  <select
                    class="form-select form-control"
                    aria-label="Default select example"
                    name="Status"
                    onChange={(e) => {
                      setValues({ ...values, Status: e.target.value });
                    }}
                    value={values.Status}
                  >
                    <option selected value={2}>
                      please select the stock status
                    </option>
                    <option value={1}>In Stock</option>
                    <option value={0}>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Image
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    name="Image"
                    id="formFile"
                    onChange={handleChange}
                  ></input>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {errors.Image && (
                    <p style={{ color: "red" }}>{errors.Image}</p>
                  )}
                </div>

                <div class="col" style={{ margin: 15 }}>
                  <label for="exampleFormControlInput1" class="form-label">
                    Category
                  </label>
                  <select
                    class="form-select form-control"
                    aria-label="Default select example"
                    name="category"
                    onChange={(e) => {
                      setValues({ ...values, category: e.target.value });
                    }}
                  >
                    <option hidden value={null}>
                      Open this select menu
                    </option>
                    {categories.map((key) => (
                      <option value={key.name}>{key.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="mb-3" style={{ margin: 15 }}>
                <label for="exampleFormControlTextarea1" class="form-label">
                  Description
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  name="des"
                  onChange={(e) => {
                    setValues({ ...values, des: e.target.value });
                  }}
                  value={values.des}
                  rows="3"
                >
                  {values.des}
                </textarea>
                {errors.des && <p style={{ color: "red" }}>{errors.des}</p>}
              </div>

              <div class="col" style={{ margin: 10 }}>
                <input
                  type="submit"
                  value={"send"}
                  className="btn btn-primary w-100"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_product;
