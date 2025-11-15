import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimationController from "./components/AnimationController";
import ParticleJS from "./particleJS";
import { ThemeToggle } from "./components/ThemeToggle";

export default function LandPage() {
	return (
		<>
			<Navbar />
			<main className="main-content">
				<ParticleJS />
				<Hero />
				<About />
				<Skills />
				<Projects />
				<Experience />
				<Contact />
			</main>
			<Footer />
			<AnimationController />
			<ThemeToggle />
		</>
	);
}