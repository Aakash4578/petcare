import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
const About = () => {
  return (
    <div>
     <Navbar/> 
    <>
    <div class="page-title-area">
				<div class="breadcrumb-wrapper" data-background="assets/img/page-title/page-title-bg.jpg">
					<div class="container">
						<div class="breadcrumb-content text-lg-start text-center">
							<h2 class="breadcrumb-title">About Us</h2>
							<ul class="breadcumb-menu">
								<li><a href="index.html">Home</a></li>
								<li><a href="#">Pages</a></li>
								<li><a href="#">About US</a></li>
							</ul>
							<img class="breadcumb-img-shape" src="assets/img/page-title/page-title-img.png" alt="Media"/>
						</div>
					</div>
					<img class="breadcrumb-shape" src="assets/img/shape/bg-shape-9.png" alt="shape"/>
				</div>
			</div>

      <section class="about-section pt-140 pb-95 pt-lg-100 pb-lg-15">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-lg-6">
							<div class="img-wrapper-six mb-45">
								<div class="main-img-1">
									<img class="img-fluid" src="assets/img/media/media-36.jpg" alt="media"/>
								</div>
								<div class="main-img-2 d-none d-md-inline-block">
									<img src="assets/img/media/media-37.jpg" alt="media"/>
								</div>
								<div class="float-content-4 position-absolute z-2 d-none d-xl-inline-flex">
									<div class="float-media">
										<img src="assets/img/media/media-38.jpg" alt="media"/>
									</div>
									<h4 class="float-title">24 Support<br />
										for Virtual Clinic</h4>
								</div>
							</div>
						</div>
						<div class="col-lg-6 ps-xxl-5">
							<div class="ps-xxl-5 mb-45">
								<div class="title-one mb-45">
									<h2 class="title">Reliable pet care provider</h2>
									<p>The top agency offering exceptional services to cater to every aspect of your
										pet’s
										care and comfort.</p>
								</div>

								<div class="counter-list mb-60">
									<div class="counter-wrap-1 d-md-flex align-items-center mb-50">
										<h3 class="number"><span class="counter">98</span>%</h3>
										<p class="counter-title">Customer satisfaction</p>
									</div>
									<div class="counter-wrap-1 d-md-flex align-items-center mb-50">
										<h3 class="number"><span class="counter">7</span>k+</h3>
										<p class="counter-title">Adopted Pets</p>
									</div>
								</div>

								<a class="ht-btn style-4" href="about.html">About Us</a>
							</div>
						</div>
					</div>
				</div>
			</section>

<section class="chose-us-section pt-140 pt-lg-30 pb-95 pb-lg-15">
				<div class="container">
					<div class="row align-items-center justify-content-lg-between justify-content-center">
						<div class="col-lg-6 mb-45 fadeInUp">
							<div class="pe-xxl-5 me-xxl-2">
								<div class="title-two mb-45 pe-xxl-4">
									<h2 class="title">Why trust Petzo
										for pets</h2>
									<p>Petzo guarantees a safe and loving environment, ensuring your
										pet thrives under expert care.</p>
								</div>
								<div class="row row-cols-md-2 row-cols-1 mb-1">
									<div class="col d-flex justify-content-xl-start justify-content-center">
										<div class="feature-wrap-4">
											<div class="icon">
												<img src="assets/img/icon/icon-10.svg" alt="icon"/>
											</div>
											<h4 class="feature-title">Expert Team</h4>
											<p class="description">Trusted experts offering top-notch pet care services.
											</p>
										</div>
									</div>
									<div class="col d-flex justify-content-xl-end justify-content-center">
										<div class="feature-wrap-4">
											<div class="icon">
												<img src="assets/img/icon/icon-11.svg" alt="icon"/>
											</div>
											<h4 class="feature-title">Support 24/7</h4>
											<p class="description">Trusted experts offering top-notch pet care services.
											</p>
										</div>
									</div>
								</div>

								<a class="ht-btn style-16" href="about.html">explore all details</a>
							</div>
						</div>
						<div class="col-xxl-5 col-lg-6 fadeInUp">
							<div class="img-wrapper-seven text-lg-end text-center mb-45">
								<div class="main-img-1">
									<img class="img-fluid" src="assets/img/media/media-39.jpg" alt="media"/>
								</div>
								<div class="main-img-2 d-none d-xl-inline-block">
									<img src="assets/img/media/media-40.jpg" alt="media"/>
								</div>
								<div class="main-img-3 d-none d-md-inline-block">
									<img src="assets/img/shape/shape-31.png" alt="shape"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
<section class="theme-bg cta-section position-relative z-1 pt-100 pb-40">
				<img class="shape-1 position-absolute top-0 start-0" src="assets/img/shape/bg-shape-10.png" alt="shape"/>
				<div class="container">
					<div class="row align-items-center">
						<div class="col-lg-8">
							<div class="title-two text-lg-start text-center mb-30">
								<h2 class="title">Questions? We’re always here to assist.</h2>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="right-btn text-lg-end text-center mb-30">
								<a href="contact.html" class="ht-btn style-17">contact us</a>
							</div>
						</div>
					</div>
				</div>
			</section>

    </>
      <Footer/>
      
      </div>
  )
}

export default About