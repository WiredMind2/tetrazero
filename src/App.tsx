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
import { ThemeProvider, ThemeToggle } from "./components/ThemeToggle";

function App() {
	return (
		<ThemeProvider>
			<Navbar />
			<ThemeToggle />
			<main className="main-content">
				<ParticleJS />
				<Hero />
				<About />
				<Projects />
				<Experience />
				<Skills />
				<Contact />
			</main>
			<Footer />
			<AnimationController />
		</ThemeProvider>
	);
}

export default App;