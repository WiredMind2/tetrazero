'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { tsParticles, type Container, type Engine, type ISourceOptions } from "@tsparticles/engine";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function ParticleJS() {
	const [isClient, setIsClient] = useState(false);
	const [init, setInit] = useState(false);


	// this should be run only once per application lifetime
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	function correctHeight() {
		let engine = window.tsParticles;
		if (!engine) {
			return;
		}
		console.log(engine);
		let canvas = engine.domItem(0)?.canvas;
		if (canvas && canvas.element) {
			canvas.element.style.width = '100%';
			canvas.element.style.height = '100%';
			canvas.resize();
		}
	}

	const particlesLoaded = async (container?: Container) => {
		if (container) {
			console.log(container);
		}
		window.addEventListener('resize', correctHeight, true);
	};


	const options: ISourceOptions = useMemo(
		() => ({
			fpsLimit: 120,
			interactivity: {
				events: {
					onClick: {
						enable: true,
						mode: "push",
					},
					onHover: {
						enable: true,
						mode: "repulse",
					},
				},
				modes: {
					push: {
						quantity: 4,
					},
					repulse: {
						distance: 200,
						duration: 0.4,
					},
				},
			},
			particles: {
				color: {
					value: "#ffffff",
				},
				links: {
					color: "#ffffff",
					distance: 150,
					enable: true,
					opacity: 0.5,
					width: 1,
				},
				move: {
					direction: "none",
					enable: true,
					outModes: {
						default: "bounce",
					},
					random: false,
					speed: 5,
					straight: false,
				},
				number: {
					density: {
						enable: true,
						height: 1000,
						width: 1000,
					},
					value: 100,
				},
				opacity: {
					value: 0.5,
				},
				shape: {
					type: "circle",
				},
				size: {
					value: { min: 1, max: 5 },
				},
			},
			detectRetina: true,
			fullScreen: { enable: false },
		}), [],);

	if (init) {
		return (
			<>
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<Particles
						id="tsparticles"
						className="tsparticles"
						particlesLoaded={particlesLoaded}
						options={options}
						style={{ position: 'absolute', width: '100%', height: '100%' }}
					/>
				</div>
			</>
		);
	}

	return <></>;
};