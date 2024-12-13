'use client';

import Script from "next/script";
import { useEffect, useState } from "react";

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export default function GSAP() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true);

		function main() {
			if (typeof gsap === 'undefined') {
				document.querySelector("#gsapScript")?.addEventListener("load", () => {
					main();
				});
				return;
			}

			if (typeof ScrollTrigger === 'undefined') {
				document.querySelector("#scrollTriggerScript")?.addEventListener("load", () => {
					main();
				});
				return;
			}

			gsap.registerPlugin(ScrollTrigger);

			// Welcome animation
			gsap.to(".heading-wel", {
				scrollTrigger: {
					trigger: ".title-container",
					start: "top top",
					end: "center top",
					scrub: 1
				},
				y: 100,
				opacity: 0,
				duration: 1
			});

			gsap.to(".heading-come", {
				scrollTrigger: {
					trigger: ".title-container",
					start: "top top",
					end: "center top",
					scrub: 1
				},
				y: -100,
				opacity: 0,
				duration: 1
			});


			// Title animation
			gsap.fromTo(".heading-tetra", {
				y: -100,
			}, {
				scrollTrigger: {
					trigger: ".title-container",
					start: "top top",
					end: "center top",
					scrub: 1
				},
				y: 0,
				opacity: 1,
				duration: 1

			});

			gsap.fromTo(".heading-zero", {
				y: 100,
			}, {
				scrollTrigger: {
					trigger: ".title-container",
					start: "top top",
					end: "center top",
					scrub: 1
				},
				y: 0,
				opacity: 1,
				duration: 1
			});

			// Scroll down animation
			let hasScrolled = false;
			addEventListener("scroll", (event) => {
				hasScrolled = true;
			}, { once: true });

			let scrollHelpTween = gsap.fromTo(".scroll-help", {
				y: 60,
			}, {
				opacity: 1,
				y: 0,
				duration: 1
			});
			scrollHelpTween.pause();

			sleep(2000).then(() => {
				if (!hasScrolled) {
					scrollHelpTween.play();
					addEventListener("scroll", (event) => {
						scrollHelpTween.reverse();
					}, { once: true });
				}
			});

			// Carousel

			let cont = document.querySelector(".carousel");
			if (cont) {
				function correctHeight(event = null) {
					let target = cont.parentElement.parentElement.parentElement.parentElement;

					target.style.height = cont.clientWidth - cont.parentElement.clientWidth + cont.parentElement.parentElement.clientHeight + "px";
				}


				window.addEventListener('resize', correctHeight, true);
				correctHeight();

				gsap.to(".carousel_slide", {
					ease: "none",
					x: () => -(cont.scrollWidth - cont.parentElement.clientWidth),
					scrollTrigger: {
						trigger: cont,
						// pin: cont.parentElement.parentElement,
						start: "center center",
						end: () => "+=" + (cont.scrollWidth - cont.parentElement.clientWidth),
						scrub: true,
						invalidateOnRefresh: true,
						snap: {
							snapTo: 1 / (document.querySelectorAll('.carousel_slide').length - 1),
							delay: 0
						}
						// markers: true,
					}
				});
			}
			// Fake link animation

			var fakeLinkAnim = gsap.fromTo(".fake-link-text", {
				y: -10,
				opacity: 0,
				duration: 1,
				repeat: 1,
				yoyo: true
			}, {
				y: 0,
				opacity: 1,
				duration: 1,
				repeat: 1,
				yoyo: true,
			});

			fakeLinkAnim.pause();

			if (typeof window.fakeLinkAnim === 'undefined') {
				window.fakeLinkAnim = fakeLinkAnim;
				document.querySelector(".fake-link")?.addEventListener("click", (event) => {
					event.preventDefault();

					var fakeLinkTexts = ["THE CAKE IS A LIE", "I'M NOT A LINK", "CLICK ME!", "42!", "BOO!", "HI!"];
					let text = fakeLinkTexts[Math.floor(Math.random() * fakeLinkTexts.length)];
					console.log(text);
					document.querySelector(".fake-link-text").textContent = text;

					fakeLinkAnim.seek(0);
					fakeLinkAnim.play();
				});
			}

			// Mobile nav menu
			document.querySelector(".menu-button")?.addEventListener("click", (event) => {
				var node = document.querySelector(".nav-menu");
				var newParent = document.querySelector(".w-nav-overlay");
				if (newParent == null) {
					newParent = document.createElement("div");
					// newParent.style = "transition: all, transform 400ms; transform: translateY(0px) translateX(0px)";
					newParent.className = "w-nav-overlay";
					newParent.setAttribute("data-wf-ignore", "");
					newParent.style.height = "7488px";
					newParent.style.display = "block";
					document.querySelector(".navbar")?.appendChild(newParent);
					newParent.appendChild(node);
					node.setAttribute("data-nav-menu-open", "");
					node.querySelectorAll('a').forEach(child => {
						child.className = "nav-link w-nav-link w--nav-link-open";
					});
				} else {
					var root = document.querySelector(".container-2");
					if (root && node) {
						root.appendChild(node);
						node.removeAttribute("data-nav-menu-open");
						node.querySelectorAll('a').forEach(child => {
							child.className = "nav-link w-nav-link";
						});
						newParent.remove();
					}
				}
			});
		}

		main();
	}, [])

	return (
		<>
			{/* GSAP stuff */}
			<Script src="/gsap.min.js" id="gsapScript" />
			<Script src="/ScrollTrigger.min.js" id="scrollTriggerScript" />

		</>
	);
}