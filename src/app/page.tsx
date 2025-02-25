import Script from "next/script";
import RawWebflow from "./landpage/raw-webflow";
import ParticleJS from "./particleJS";
import GSAP from "./gsap";
import React from "react";

export default function LandPage() {

	return (
		<>
			<main className="body">
				<RawWebflow />

				<GSAP />
			</main>
		</>
	);
}