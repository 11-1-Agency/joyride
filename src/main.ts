import Lenis from "lenis";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ui } from "./animations";
import "./style.css";

// import { pageTransition } from "./animations/preloader-animation";
import { modalAnimation } from "./animations/modal-animation";

import { smoothScroll } from "./animations/smooth-scroll-animation";
import { scrollytelling } from "./animations/scrollytelling-animation";

import { JoyrideRiveAnimation } from "./animations/rive-animations";
import { fadeInAnimation, splideCarousel, shuffleAndAnimatePair, singleFadeIn, rotateArrow, landingAnimation } from "./animations/micro-animations";

/**
 * Initialize the UI by adding event listeners and set up the initial state.
 */
ui();

gsap.registerPlugin(ScrollTrigger, CustomEase);

/**
 * Initialize a new Lenis instance for smooth scrolling.
 * @see https://github.com/darkroomengineering/lenis
 */
const lenis = new Lenis({
    autoResize: false,
    duration: 0.8,
    easing: (x: number) => 1 - Math.pow(1 - x, 3),
});

new JoyrideRiveAnimation('canvas.rive_canvas').init();

// Set up the smooth scroll animation.
smoothScroll(lenis);

// Start the preloader animation.
// pageTransition(lenis);
landingAnimation();

// Start the scrollytelling animation.
scrollytelling();

// Initialize the modal animation for each modal.
modalAnimation(lenis);

// Create an infinite marquee animation for the testimonial cards.
splideCarousel();

// Fade in elements with a 'data-fade-in' attribute.
fadeInAnimation();
singleFadeIn();
rotateArrow();

shuffleAndAnimatePair()