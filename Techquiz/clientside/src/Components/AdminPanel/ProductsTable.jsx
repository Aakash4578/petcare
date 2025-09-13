
import React, { useEffect,useState } from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';
import Admin_Index from "./Admin_Index";
import { toast } from 'react-toastify';

const ProductsTable = () => {
  var [myprodut, SetProduct] = useState([]);
  var lowestTohighest = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/lowestTohigh`).then((res) => {
      SetProduct(res.data);
    });
  };

  var fetchData = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/productDetails`).then((res) => {
      SetProduct(res.data);
    });
  };
  var highestTtlowest = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/highTolowest`).then((res) => {
      SetProduct(res.data);
    });
  };



  var ProductDel = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/productDel/${id}`).then(() => {
      fetchData();
      toast.error("the product is Deleted !")
    });
  };
     var [query, Setquery] = useState("");
    var searchfunationality = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_API_URL}/search_product/search?q=${query}`
        );
        const data = await resp.json();
        SetProduct(data);
    
      } catch (error) {
        console.error(error);
      }
    };
      useEffect(() => {
        if (query.length === 0) {
          fetchData();
          return;
        } else {
          searchfunationality();
        }
      },[query]);
      
  function productStatus(id) {
    axios.put(`${import.meta.env.VITE_API_URL}/statusproducts/${id}`).then(() => {
      toast.success("The user status is upated now ", {
        position: "top-right",
      });
      fetchData();
    });
  }
  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Products</h2>
          <div><input
            type="text"
            placeholder="Search ..."
            className="search-input"
            value={query}
            onChange={(e) => {
              Setquery(e.target.value);
            }}
          />
          <Link to={"/admin/add_product"} className='btn btn-primary m-2'>New</Link>
          <button onClick={()=>highestTtlowest()} className='btn btn-success'>Highest</button>
            <button onClick={()=>lowestTohighest()} className='btn btn-success'>lowest</button></div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category </th>
                <th>Image</th>
                <th>Price</th>
                
                <th>Status</th>
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myprodut.length > 0 ? (
                myprodut.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>
                    {p.name}
                    </td>
                <td>
                    {p.category}
                    </td>   <td>
                   <img src={`/images/productImages/${p.Image}`} alt="a" width={150} />
                    </td>   <td>
                    {p.Price}
                    </td>   <td>
                    {p.Status}
                    </td>
            
                    <td>
<Link to={`/admin/View_product/${p._id}`} className='btn btn-info text-white'>View</Link>
                      <Link to={`/admin/edit_product/${p._id}`} className='btn btn-primary '>Edit</Link>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          productStatus(p._id);
                        }}
                      >
                        Status
                      </button>
                           <button
                        className="btn btn-danger"
                        onClick={() => ProductDel(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Products found for {query}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
