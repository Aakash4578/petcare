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
				
	<section class="about-section border-rad space-20 mt-20 mb-20 pt-180 pb-120 pt-lg-60 pb-lg-10"
				data-bg-color="#E7D8FF">
				<div class="container custom-container">
					<div class="row align-items-center">
						<div class="col-lg-6 mb-45">
							<div class="img-wrapper-eight pe-xxl-5 me-xxl-4 position-relative">
								<img class="main-img img-fluid" src="assets/img/media/media-50.png" alt="About"/>
								<div class="float-content-5 jump d-none d-md-inline-block">
									<img class="img-shape-2 position-relative img-fluid"
										src="assets/img/shape/shape-27.png" alt="shape"/>
									<div class="call-box d-flex align-items-center position-absolute">
										<div class="icon">
											<img src="assets/img/icon/icon-5.svg" alt="icon"/>
										</div>
										<div class="call-content">
											<h4 class="call-title">Call Us Anytime</h4>
											<h4 class="call-number"><a href="#">+86-085-550-1539</a></h4>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-6 ps-xxl-4 wow fadeInRight mb-45">
							<div class="title-two mb-20">
								<h2 class="title">Trusted provider of pet care</h2>
								<p>The top agency offering exceptional services to cater to every aspect of your pet’s
									care and comfort.</p>
							</div>
							<div class="faq-que-list faq-style-3 mb-90">
								<div class="accordion accordion-one" id="accordion5">
									<div class="accordion-item">
										<h2 class="accordion-header" id="heading5s">
											<button class="accordion-button collapsed" type="button"
												data-bs-toggle="collapse" data-bs-target="#collapse5s"
												aria-expanded="false" aria-controls="collapse5s">
												Who We Are
											</button>
										</h2>
										<div id="collapse5s" class="accordion-collapse collapse"
											aria-labelledby="heading5s" data-bs-parent="#accordion5">
											<div class="accordion-body">
												<p>We are passionate pet caregivers, providing love, safety, and expert
													care to ensure your pets stay happy, healthy, and comfortable.</p>
											</div>
										</div>
									</div>
									<div class="accordion-item">
										<h2 class="accordion-header" id="headingTwo5s">
											<button class="accordion-button collapsed" type="button"
												data-bs-toggle="collapse" data-bs-target="#collapseTwo5s"
												aria-expanded="false" aria-controls="collapseTwo5s">
												Customize Attention & care
											</button>
										</h2>
										<div id="collapseTwo5s" class="accordion-collapse collapse"
											aria-labelledby="headingTwo5s" data-bs-parent="#accordion5">
											<div class="accordion-body">
												<p>We are passionate pet caregivers, providing love, safety, and expert
													care to ensure your pets stay happy, healthy, and comfortable.</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<a class="ht-btn style-13" href="about.html">more About Us <span class="btn-icon"><img
										src="assets/img/icon/arrow-8.svg" alt="arrow"/></span></a>
						</div>
					</div>
					<div class="mt-65 row row-cols-lg-3 row-cols-md-3 row-cols-1">
						<div class="col">
							<div class="counter-wrap-4 text-md-start text-center">
								<h3 class="number"><span class="counter">15</span>+</h3>
								<p class="counter-title">Years of experience</p>
							</div>
						</div>
						<div class="col d-md-flex justify-content-center text-center">
							<div class="counter-wrap-4">
								<h3 class="number"><span class="counter">75</span>k+</h3>
								<p class="counter-title">Adopted Animals</p>
							</div>
						</div>
						<div class="col d-md-flex justify-content-md-end justify-content-center">
							<div class="counter-wrap-4">
								<h3 class="number"><span class="counter">150</span>+</h3>
								<p class="counter-title">Total Professional Experts</p>
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