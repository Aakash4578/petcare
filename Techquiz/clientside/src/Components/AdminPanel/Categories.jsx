import React, { useEffect, useState } from "react";
import Admin_Index from "./Admin_Index";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Categories = () => {
  var [categories, SetCategory] = useState([]);
  var fetch_data = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/fetchCategory`).then((resp) => {
      SetCategory(resp.data);
    });
  };


   function cateStatus(id) {
    axios.put(`${import.meta.env.VITE_API_URL}/statusCate/${id}`).then(() => {
      toast.success("The categories status is upated now ", { position: "top-right"});
 });}
   function cateDelete(id) {
    axios.delete(`${import.meta.env.VITE_API_URL}/category_del/${id}`).then(() => {
      toast.error("The categories  is deleted now ", { position: "top-right"});
 });}
     var [query, Setquery] = useState("");
   var searchFuntionality = async () => {
     try {
       const resp = await fetch(
         `${import.meta.env.VITE_API_URL}/search_Cate/search?q=${query}`
       );
       const data = await resp.json();
       SetCategory(data);
   
     } catch (error) {
       console.error(error);
     }
   };
       useEffect(() => {
       if (query.length === 0) {
             fetch_data();
         return;
       }else{
   searchFuntionality();
       }
     }); 
  return (
    <div>
      <Admin_Index></Admin_Index>
      <div className="users-container" style={{ marginLeft: "15%" }}>
        <div className="users-header">
          <h2>Categories list</h2>
          <div>
            <input
              type="text"
              placeholder="Search ..."
              className="search-input m-2"
                 value={query}
              onChange={(e) => {
                Setquery(e.target.value);}}
            />
            <Link to={"/admin/add_categories"} className="btn btn-primary">
              New
            </Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th> Name</th>
                <th> Status</th>
                <th className="action-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>

                    <td>{cat.status == 1 ? "Activate" : "Deactivate"}</td>
                    <td>
                        <button
                        className="btn btn-success"
                        onClick={() => {
                          cateStatus(cat._id);
                        }}
                      >
                        Status
                      </button>
                      <Link to={`/admin/edit_cate/${cat._id}`} className="btn btn-primary"> Edit</Link>
                      <button
                        className="btn btn-delete btn-danger"
                        onClick={() => {
                          cateDelete(cat._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Category found for {query}
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

export default Categories;
