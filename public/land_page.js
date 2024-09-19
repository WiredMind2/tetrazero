function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
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
hasScrolled = false;
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
		cont.parentElement.parentElement.parentElement.style.height = cont.clientWidth - cont.parentElement.clientWidth + cont.parentElement.parentElement.clientHeight + "px";
	}

	window.addEventListener('resize', correctHeight, true);
	correctHeight();

	gsap.to(".carousel_slide", {
		ease: "none",
		x: () => -(cont.scrollWidth - cont.parentElement.clientWidth),
		scrollTrigger: {
			trigger: cont,
			pin: cont.parentElement.parentElement,
			start: "center center",
			end: () => "+=" + (cont.scrollWidth - cont.parentElement.clientWidth),
			scrub: true,
			invalidateOnRefresh: true,
			// snap: {
			// 	snapTo: 1 / (document.querySelectorAll('.carousel_slide').length - 1),
			// 	delay: 0
			// }
			// markers: true,
		}
	});
}

// Fake link animation

// var fakeLinkAnim = gsap.from(".fake-link-text", {
// 	y: -10,
// 	opacity: 0,
// 	duration: 1,
// 	repeat: 1,
// 	yoyo: true,
// });
var fakeLinkAnim = gsap.fromTo(".fake-link-text", {
	y: -10,
	opacity: 0,
	duration: 1,
	repeat: 1,
	yoyo: true,
}, {
	y: 0,
	opacity: 1,
	duration: 1,
	repeat: 1,
	yoyo: true,
});

fakeLinkAnim.pause();

document.querySelector(".fake-link").addEventListener("click", (event) => {
	event.preventDefault();
	fakeLinkAnim.seek(0);
	fakeLinkAnim.play();
});