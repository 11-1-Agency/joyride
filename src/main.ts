import { createInfiniteMarquee, fadeInAnimation, } from "./animations/micro-animations";
import { preloaderAnimation } from "./animations/preloader-animation";
import { modalAnimation } from "./animations/modal-animation";

import Lenis from "lenis";
import { smoothScroll } from "./animations/smooth-scroll-animation";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scrollytelling } from "./animations/scrollytelling-animation";

import { ui } from "./animations";
import "./style.css";

/**
 * Initialize the UI by adding event listeners and set up the initial state.
 */
ui();

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize a new Lenis instance for smooth scrolling.
 * @see https://github.com/darkroomengineering/lenis
 */
const lenis = new Lenis({
    autoResize: false,
    duration: 0.8,
    easing: (x: number) => 1 - Math.pow(1 - x, 3),
});

// Set up the smooth scroll animation.
smoothScroll(lenis);

// Start the preloader animation.
preloaderAnimation();

// Start the scrollytelling animation.
scrollytelling();

// Initialize the modal animation for each modal.
const modals = ["joyride", "ethics", "team", "about-us"];

modals.forEach((modal) => {
    modalAnimation(modal, lenis);
});

// Create an infinite marquee animation for the testimonial cards.
createInfiniteMarquee(".testimonial_list", ".testimonial-card", 10);

// Fade in elements with a 'data-fade-in' attribute.
fadeInAnimation();
