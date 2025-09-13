import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoutes = () => {
 var Adminlogined = JSON.parse(sessionStorage.getItem("adminlogined"));
   
 return Adminlogined ?<Outlet/>:<Navigate to={'/login'}></Navigate>
}

export default AdminProtectedRoutes
