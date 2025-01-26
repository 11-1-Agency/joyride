import Lenis from "lenis";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Synchronizes Lenis scrolling with GSAP's ScrollTrigger plugin and adds Lenis's requestAnimationFrame (raf) method to GSAP's ticker.
 * @param {Lenis} lenis - The Lenis instance
 */
export function smoothScroll(lenis: Lenis) {
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    // See https://greensock.com/docs/v3/GSAP/Core/Ticker
    gsap.ticker.lagSmoothing(0);

    // Create a ResizeObserver to trigger Lenis's resize method when the body is resized
    const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
    });

    // Observe the body element
    resizeObserver.observe(document.body);
}
