import Lenis from "lenis";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ui } from "./animations";
import "./style.css";

// import { pageTransition } from "./animations/preloader-animation";
import { modalAnimation } from "./animations/modal-animation";

import { smoothScroll } from "./animations/smooth-scroll-animation";
// import { scrollytelling } from "./animations/scrollytelling-animation";

import { JoyrideRiveAnimation } from "./animations/rive-animations";
// import { runCarousel, fadeInAnimation, flashSVGs, initSplide, } from "./animations/micro-animations";
import { runCarousel, fadeInAnimation} from "./animations/micro-animations";

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

// Start the scrollytelling animation.
// scrollytelling();

// Initialize the modal animation for each modal.
modalAnimation(["joyride", "ethics", "team", "about-us"], lenis);

// Create an infinite marquee animation for the testimonial cards.
runCarousel();

// Fade in elements with a 'data-fade-in' attribute.
fadeInAnimation();

// initSplide();

// flashSVGs("#team-faces", 0.8);