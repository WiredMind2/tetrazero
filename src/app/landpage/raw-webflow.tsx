import Carousel from "../components/carousel";
import Image from 'next/image';
export default function RawWebflow() {
return (
<section className="main-section">
	<section className="section-9">
		<div className="w-layout-blockcontainer title-container w-container">
			<div className="div-block-9">
				<h1 className="heading-tetra">TETRA</h1>
				<h1 className="heading-zero">ZERO</h1>
			</div>
			<div className="div-block-10">
				<h1 className="heading-wel">WELC</h1>
				<h1 className="heading-come">OME</h1>
			</div>
			<div className="div-block-11">
				<div className="scroll-help">SCROLL DOWN...</div>
			</div>
		</div>
	</section>
	<section className="section-2">
		<div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
			role="banner" className="navbar w-nav">
			<div className="container-2 w-container">
				<div className="w-layout-blockcontainer container-3 w-container"><a href="https://tetrazero.com"
						className="brand w-nav-brand">
						<Image src="/favicon.webp" loading="lazy" width="50" height="50" alt="" className="icon_img" />
						<h3 className="heading-4">TETRAZERO</h3>
					</a></div>
				<nav role="navigation" className="nav-menu w-nav-menu">
					<a href="https://about.tetrazero.com"
						className="nav-link w-nav-link">About</a>
						{/* <a href="https://anime.tetrazero.com"
						className="nav-link w-nav-link">ANIME</a> */}
						<a href="https://manga.tetrazero.com"
						className="nav-link w-nav-link">MANGA</a>
					<div className="div-block-13"><a href="#" className="nav-link fake-link w-nav-link">Link</a>
						<div className="div-block-12">
							<div className="fake-link-text">THE CAKE IS A LIE</div>
						</div>
					</div>
				</nav>
				<div className="menu-button w-nav-button"><svg className="w-icon-nav-menu"
						xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
						fill="#e8eaed">
						<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
					</svg></div>
			</div>
		</div>
		<section className="section-3">
			<div className="w-layout-blockcontainer container-4 w-container">
				<div className="w-layout-blockcontainer container-7 w-container">
					<div className="div-block-3">
						<div>TIME</div>
					</div>
				</div>
				<div className="w-layout-blockcontainer container-8 w-container">
					<div className="div-block-4">
						<div>FLIES BY!</div>
					</div>
				</div>
				<div className="w-layout-blockcontainer container-9 w-container">
					<div className="div-block-5">
						<div>PRECIOUS</div>
					</div>
				</div>
			</div>
		</section>
		<section className="section-4">
			<div className="w-layout-blockcontainer container-10 w-container">
				<div className="w-layout-blockcontainer container-6 w-container">
					<div className="carousel">
						<Carousel />
					</div>
				</div>
			</div>
		</section>
	</section>
	<section className="footer">
		<div className="div-block-6"><a href="#" className="link-block w-inline-block">
				<Image src="/favicon.webp" loading="lazy" width="50" height="50" alt="" className="icon_img" />
				<h3 className="heading-7">Tetrazero</h3>
			</a>
			<div className="text-block-2">© 2024 Tetrazero</div>
		</div>
	</section>
</section>
)};