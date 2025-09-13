import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
 var userlogined = JSON.parse(sessionStorage.getItem("userLogin"));
   
 return userlogined ?<Outlet/>:<Navigate to={'/login'}></Navigate>
  
  
}

export default UserProtectedRoute

