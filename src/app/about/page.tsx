import Script from "next/script";
import RawWebflow from "./raw-webflow";
import GSAP from "../gsap";

export default function About() {
	return (
		<><main className="body">
			<RawWebflow/>


			<GSAP />
			{/* GSAP stuff */}
			{/* <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
			<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script> */}

			{/* <Script src="/land_page.js" strategy="afterInteractive" /> */}
		</main></>
	);
}