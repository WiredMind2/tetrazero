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
import { AnimationQualityProvider } from "./components/AnimationQualityProvider";
import PerformanceDebug from "./components/PerformanceDebug";

function App() {
	return (
		<ThemeProvider>
			<AnimationQualityProvider>
				<Navbar />
				<ThemeToggle />
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
				<PerformanceDebug />
			</AnimationQualityProvider>
		</ThemeProvider>
	);
}

export default App;