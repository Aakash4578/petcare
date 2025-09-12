import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Animalroutesprotected = () => {
  var animalsehlterLogined = JSON.parse(sessionStorage.getItem("animalsehlterLogined"));
     
   return animalsehlterLogined ?<Outlet/>:<Navigate to={'/login'}></Navigate>
}

export default Animalroutesprotected