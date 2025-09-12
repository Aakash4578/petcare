import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Home() {
  return (
<>
<Navbar/>
		<main>
			<section class="theme-banner-five border-rad">
				<img class="card-shape img-fluid d-none d-xxl-inline-block" src="assets/img/hero/hero-shape-2.png"
					alt="shape"/>
				<img class="card-shape-2 img-fluid d-none d-xxl-inline-block" src="assets/img/hero/hero-shape-3.png"
					alt="shape"/>
				<div class="container-fluid px-lg-0">
					<div class="row align-items-center gx-lg-0">
						<div class="col-lg-6 pe-lg-0">
							<h1 class="main-title wow fadeInUp">Quality Service with Heart</h1>
							<p class="hero-description me-xxl-5 pe-xxl-5 wow fadeInUp" data-wow-delay="0.1s">Provide a
								happy, healthy life for your pet by focusing their well-being comfort.</p>

							<div class="d-md-flex align-items-center mb-70 mb-lg-50  wow fadeInUp"
								data-wow-delay="0.4s">
								<a href="contact.html" class="ht-btn bstyle me-xxl-4">Get in touch</a>
								<a href="#" class="ht-btn bstyle-2 d-none d-xl-inline-block">make appointment
									<span class="btn-icon"><img src="assets/img/icon/arrow-5.svg"
											alt="arrow"/></span></a>
							</div>
							<div class="user-content-wrap-1 d-xxl-inline-flex d-none mb-55 wow fadeInUp"
								data-wow-delay="0.3s">
								<ul class="feedback-user-list">
									<li><img src="assets/img/media/media-47.jpg" alt="author"/></li>
									<li><img src="assets/img/media/media-48.jpg" alt="author"/></li>
									<li><img src="assets/img/media/media-49.jpg" alt="author"/></li>
								</ul>
								<div class="user-content ml-15">
									<h3 class="number">1.2m+</h3>
									<h5 class="counter-title">Worldwide Clients</h5>
								</div>
							</div>

						</div>
						<div class="col-lg-6 d-flex justify-content-lg-end">
							<div class="hero-img position-relative d-inline-block">
								<img class="main-img" src="assets/img/hero/hero-img-9.png" alt="Hero"/>
							</div>
						</div>
					</div>
				</div>
			</section>
				

		</main>
<Footer/>

</> 
 )
}

export default Home