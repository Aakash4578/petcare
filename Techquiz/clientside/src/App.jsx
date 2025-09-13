import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/Auth/LoginRegister";
import Emailverify from "./Components/Auth/Emailverify";
import Home from "./Components/website/Home";
import UserProtectedRoute from "./Components/Auth/UserProtectedRoute";
import UserProfile from "./Components/website/UserProfile";
import Contactus from "./Components/website/Contactus";
// import Admin_Index from "./Components/AdminPanel/Admin_Index";
import UserDetails from "./Components/AdminPanel/UserDetails";
import Dashboard from "./Components/AdminPanel/Dashboard";
import ContactTable from "./Components/AdminPanel/ContactTable";
import Add_Faq from "./Components/AdminPanel/Add_Faq";
import EditFaq from "./Components/AdminPanel/EditFaq";
import Faqtable from "./Components/AdminPanel/Faqtable";
import AdminProtectedRoutes from "./Components/AdminPanel/AdminProtectedRoutes";
import AdminProfile from "./Components/AdminPanel/AdminProfile";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Categories from "./Components/AdminPanel/Categories";
import Add_categories from "./Components/AdminPanel/Add_categories";
import EditCategory from "./Components/AdminPanel/EditCategory";
import Add_product from "./Components/AdminPanel/Add_product";
import ProductsTable from "./Components/AdminPanel/ProductsTable";
import Viewproducts from "./Components/AdminPanel/Viewproducts";
import EditProduct from "./Components/AdminPanel/Editproducts";
import Veterinarian from "./Components/AdminPanel/Veterinarian ";
import Add_veterinarians from "./Components/AdminPanel/Add_veterinarians";
import AnimalShelter from "./Components/AdminPanel/AnimalShelter";
import Add_AnimalShelter from "./Components/AdminPanel/Add_AnimalShelter";
import Products from "./Components/website/Products";
import WerbsiteProductData from "./Components/website/WerbsiteProductData";
import Wishlist from "./Components/website/Wishlist";
import Carttable from "./Components/website/Carttable";
import Checkout from "./Components/website/Checkout";
import Order from "./Components/AdminPanel/Order";
import Vieworders from "./Components/AdminPanel/Vieworders";
import Orderdetails from "./Components/website/Orderdetails";
import Mypet from "./Components/website/Mypet";
import Add_pet from "./Components/website/Add_pet";
import Loginforshelterandvetes from "./Components/Auth/Loginforshelterandvetes"
import VetesprotectedRoutes from "./Components/vetesPanels/VetesprotectedRoutes"
import VetesProfile from "./Components/vetesPanels/VetesProfile";
import Veteindex from "./Components/vetesPanels/Veteindex";

 import UpdatePet from "./Components/website/UpdatePet";
import Appointment from "./Components/website/Appointment";
import Vetesappointment from "./Components/vetesPanels/Vetesappointment";
import Healthrecord from "./Components/vetesPanels/Healthrecord";
import Addheathrecord from "./Components/vetesPanels/Addheathrecord";
import EditRecord from "./Components/vetesPanels/EditRecord";
import Animalroutesprotected from "./Components/AnimalShelter/Animalroutesprotected"
import Shelterlayout from "./Components/AnimalShelter/Shelterlayout";
import Shelter from "./Components/AnimalShelter/Shelter";
import Shelterprofile from "./Components/AnimalShelter/Shelterprofile";
import Heathhistory from "./Components/website/Heathhistory";
import MyAppointments from "./Components/website/Myappointment";
import Add_pets from "./Components/AnimalShelter/Add_pets";
import AdoptList from "./Components/AnimalShelter/AdoptList";
import ShelterpetsEdit from "./Components/AnimalShelter/ShelterpetsEdit";
import Animaldashboard from "./Components/AnimalShelter/Animaldashboard";
import Vetesdashboard from "./Components/vetesPanels/Vetesdashboard";

import ListPet from "./components/AnimalShelter/Listpets";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
<Route path="/website/products" element={<Products/>}></Route>
          
      <Route path="website/ProductData/:id" element={<WerbsiteProductData/>}></Route> 
     
        
        <Route path="/login" element={<LoginRegister />}></Route>
        <Route path="/loginforvetesShelter" element={<Loginforshelterandvetes/>}></Route>

        <Route path="/contact" element={<Contactus />}></Route>
        <Route path="/Email-verify" element={<Emailverify />}></Route>
        <Route path="/ForgetPassword" element={<ForgetPassword />}></Route>
<Route path="/products" element={<Products />}></Route>
        {/* User Protected-Routes */}
        <Route element={<UserProtectedRoute />}>
<Route path="/orders" element={<Orderdetails />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/website/wishlist" element={<Wishlist />}></Route>
           <Route path="/website/cartList" element={<Carttable />}></Route>
           <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/Mypet" element={< Mypet/>}></Route>
             <Route path="/addpet" element={< Add_pet/>}></Route>
            <Route path="/findPet/:id" element={< UpdatePet/>}></Route>
         <Route path="/appiontment" element={< MyAppointments/>}></Route>
          <Route
            path="/Healthhistory/:petId"
            element={<Heathhistory/>}
          ></Route>
        </Route>
        {/* admin routes */}
        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route
            path="/admin/users"
            element={<UserDetails></UserDetails>}
          ></Route>
          <Route path="/admin/contact" element={<ContactTable />}></Route>
          <Route path="/admin/add_faq" element={<Add_Faq />}></Route>
          <Route path="/admin/fetch_faq" element={<Faqtable />}></Route>
          <Route path="/admin/edit_faq/:id" element={<EditFaq />}></Route>
          <Route path="/admin/Categories" element={<Categories />}></Route>
              <Route path="/admin/order" element={<Order />}></Route>
              
              <Route path="/admin/orderview/:id" element={<Vieworders />}></Route>
          
          <Route
            path="/admin/add_categories"
            element={<Add_categories />}
          ></Route>

          <Route path="/admin/edit_cate/:id" element={<EditCategory />}></Route>
          <Route path="/admin/profile" element={<AdminProfile />}></Route>
          <Route path="/admin/add_product" element={<Add_product />}></Route>
          <Route path="/admin/products" element={<ProductsTable />}></Route>
          <Route
            path="/admin/View_product/:id"
            element={<Viewproducts />}
          ></Route>
          <Route
            path="/admin/edit_product/:id"
            element={<EditProduct />}
          ></Route>
          <Route path="/admin/Veterinarian" element={<Veterinarian />}></Route>
          <Route
            path="/admin/add_Veterinarian"
            element={<Add_veterinarians />}
          ></Route>
          <Route
            path="/admin/Animal_shelter"
            element={<AnimalShelter></AnimalShelter>}
          ></Route>
          <Route
            path="/admin/add_Animalshelter"
            element={<Add_AnimalShelter></Add_AnimalShelter>}
          ></Route>
        
        </Route>
        

<Route  element={<VetesprotectedRoutes/>} >
  <Route
            path="/vetes/dashboard"
            element={<Vetesdashboard/>}
          ></Route>
  <Route
            path="/vetes/profile"
            element={<VetesProfile/>}
          ></Route>
          <Route
            path="/vetes/app"
            element={<Vetesappointment/>}
          ></Route>
          <Route
            path="/vetes/healthReacord"
            element={<Healthrecord/>}
          ></Route>
           <Route
            path="/vetes/edithealthReacord/:id"
            element={<EditRecord/>}
          ></Route>
            <Route
            path="/vets/addhealthrecord"
            element={<Addheathrecord/>}
          ></Route>
</Route>
<Route element={< Animalroutesprotected/>}>
 <Route
            path="/shelter/dashboard"
            element={<Animaldashboard/>}
          ></Route>
 <Route
            path="/shelter/index"
            element={<Shelter/>}
          ></Route>
           <Route
            path="/shelter/profile"
            element={<Shelterprofile/>}
          ></Route>
           <Route
            path="/shelter/pets"
            element={<ListPet/>}
          ></Route>
           <Route
            path="/shelter/addpets"
            element={<Add_pets/>}
          ></Route>
           <Route
            path="/shelter/editPet/:id"
            element={<ShelterpetsEdit/>}
          ></Route>
           <Route
            path="/shelter/adoplist"
            element={<AdoptList/>}
          ></Route>
</Route>
      </Routes>
    </div>
  );
};

export default App;
