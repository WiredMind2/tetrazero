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
import { ThemeProvider } from "./components/ThemeToggle";

function App() {
	return (
		<ThemeProvider>
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
		</ThemeProvider>
	);
}

export default App;