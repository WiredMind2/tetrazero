'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { tsParticles, type Container, type Engine, type ISourceOptions } from "@tsparticles/engine";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import { useAnimationQuality } from "./components/AnimationQualityProvider";

export default function ParticleJS() {
	const [isClient, setIsClient] = useState(false);
	const [init, setInit] = useState(false);
	const { qualityLevel } = useAnimationQuality();


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
		() => {
			// Adjust settings based on quality level
			const getParticleCount = () => {
				if (qualityLevel === 'disabled') return 0;
				if (qualityLevel === 'low') return 20;
				if (qualityLevel === 'medium') return 50;
				return 100; // high
			};

			const getSpeed = () => {
				if (qualityLevel === 'disabled') return 0;
				if (qualityLevel === 'low') return 1;
				if (qualityLevel === 'medium') return 2;
				return 3; // high
			};

			const hasInteractivity = qualityLevel === 'high' || qualityLevel === 'medium';
			const hasLinks = qualityLevel === 'high' || qualityLevel === 'medium';

			return {
				fpsLimit: 60,
				interactivity: {
					events: {
						onClick: {
							enable: hasInteractivity,
							mode: "push",
						},
						onHover: {
							enable: hasInteractivity && qualityLevel === 'high',
							mode: "repulse",
						},
					},
					modes: {
						push: {
							quantity: qualityLevel === 'high' ? 4 : 2,
						},
						repulse: {
							distance: qualityLevel === 'high' ? 200 : 100,
							duration: 0.4,
						},
					},
				},
				particles: {
					color: {
						value: "#6366f1",
					},
					links: {
						color: "#6366f1",
						distance: 150,
						enable: hasLinks,
						opacity: qualityLevel === 'high' ? 0.3 : 0.2,
						width: 1,
					},
					move: {
						direction: "none",
						enable: qualityLevel !== 'disabled',
						outModes: {
							default: "bounce",
						},
						random: false,
						speed: getSpeed(),
						straight: false,
					},
					number: {
						density: {
							enable: true,
							height: 1000,
							width: 1000,
						},
						value: getParticleCount(),
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
				responsive: [
					{
						maxWidth: 768,
						options: {
							particles: {
								number: {
									value: qualityLevel === 'disabled' ? 0 : qualityLevel === 'low' ? 10 : 30,
								},
								links: {
									enable: false,
								},
								move: {
									speed: qualityLevel === 'disabled' ? 0 : 1,
								},
							},
							interactivity: {
								events: {
									onHover: {
										enable: false,
									},
								},
							},
						},
					},
				],
			};
		}, [qualityLevel]);

	if (init && qualityLevel !== 'disabled') {
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