import Script from "next/script";
import RawWebflow from "./landpage/raw-webflow";

export default function LandPage() {
	return (
		<><main className="body">
			<RawWebflow/>

			{/* GSAP stuff */}
			<Script src="/gsap.min.js" id="gsapScript"/>
			<Script src="/ScrollTrigger.min.js" id="scrollTriggerScript"/>

			<Script src="/land_page.js" strategy="afterInteractive" />
		</main></>
	);
}