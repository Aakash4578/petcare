
import Navbar from './Navbar'
import Footer from './Footer'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Mypet = () => {
  const [pets, setPets] = useState([]);
    const [search, setSearch] = useState(""); 
  const userToken = sessionStorage.getItem("userLogin");
  const tokenParts = userToken.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const ownerId = payload.id;
   useEffect(() => {
      if (ownerId) {
  axios.get(`${import.meta.env.VITE_API_URL}/${ownerId}?q=${search}`)
  
          .then((res) => setPets(res.data))
          .catch((err) => console.error(err));
      }
    }, [ownerId]);
  

      




    // ✅ filter pets on client side
    const filteredPets = pets.filter((pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.species.toLowerCase().includes(search.toLowerCase()) ||
      (pet.breed && pet.breed.toLowerCase().includes(search.toLowerCase()))
    );
    var delProduct = (_id) => {
  
  axios.delete(`${import.meta.env.VITE_API_URL}/${_id}`).then(() => {
    
  });
};
  return (

    <div> 
      <Navbar/>
    	<div class="page-title-area">
					<div class="breadcrumb-wrapper" style={{ backgroundImage: "url(../../../public/assets/img/page-title/page-title-bg.jpg)" }}>
						<div class="container">
							<div class="breadcrumb-content text-lg-start text-center">
								<h2 class="breadcrumb-title">mypets</h2>
								<ul class="breadcumb-menu">
									<li><a href="index.html">Home</a></li>
									<li><a href="#">Pages</a></li>
									<li><a href="#">mypets</a></li>
								</ul>
								<img class="breadcumb-img-shape" src="/assets/img/page-title/page-title-img.png" alt="Media" />
							</div>
						</div>
						<img class="breadcrumb-shape" src="/assets/img/shape/bg-shape-9.png" alt="shape" />
					</div>
				</div>
        <div className="container">
      <div className="text-end">

      <input
        type="text"
        placeholder="Search pets by name, species, or breed..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg focus:ring focus:ring-blue-300 hadow rounded-xl text-end"
      />
      <Link  to="/addpet" className="btn btn-primary mb-3  ms-2">Add New Pet</Link>
      </div>
      </div>
      <div class="cart-section pt-130 pb-130 pt-lg-100 pb-lg-100">
				<div class="container">
					<div class="row">
						<div class="col-xl-8">
							<form action="#" class="cart-list-form">
								<div class="table-responsive">
									<table class="table">
										<thead>
											<tr>
												<th colspan="2">name</th>
												<th>species</th>
												<th>breed</th>
												<th>ACTION</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
                       {
          pets.length==0?(
            <section class="ftco-section ftco-cart text-center">
              <h5 className='text-center'>You don't have any pets</h5>
              </section>
          ):(
          pets.map((con)=>(
                        <tr class="text-center">
      
                          
                          <td class="image-prod"><div class="img" >
                                          <img src={`/images/petsImages/${con.pet_img}`} width={100} height={100} alt="" /></div></td>
                          
                          <td class="product-name">
                            <h3>{con.name}</h3>
                          
                          </td>
                          <td class="price">{con.species}</td>
                         
                                                    <td class="price">{con.breed}</td>

                          
                          
                          <td class="product-remove">
                            <button onClick={()=>{ delProduct(con._id)  }}class="btn btn-danger"><span class="ion-ios-close"></span>delete</button >
                        <Link to={`/findPet/${con._id}`} className="btn btn-primary  ms-2" >edit</Link>
                            <Link to={`/Healthhistory/${con._id}`} className="btn btn-success  ms-2" >History</Link>
                        </td>
                        </tr>
                       )))}
										
										</tbody>
									</table>
								</div>

							
							</form>
						</div>
						
					</div>
				</div> 
			</div>
    <Footer/>
    </div>
  )
}

export default Mypet