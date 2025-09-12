import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


const VetesprotectedRoutes = () => {
   var vetesLogined = JSON.parse(sessionStorage.getItem("vetesLogined"));
     
   return vetesLogined ?<Outlet/>:<Navigate to={'/login'}></Navigate>
}

export default VetesprotectedRoutes