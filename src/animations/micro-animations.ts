import { gsap } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
// @ts-ignore
import '@splidejs/splide/css/core';

export function splideCarousel() {
    const carousel = document.querySelectorAll<HTMLElement>(".splide");

    carousel.forEach((slider) => {
        var splide = new Splide(slider, {
            type: 'loop',
            drag: 'free',
            speed: Number.parseFloat(slider.dataset.speed || '1.2'),
            fixedWidth: slider.dataset.width || 'n/a',
            arrows: false,
            pagination: false,
        });

        splide.mount({ AutoScroll });
    })
}

/**
 * Fade-in animation for elements with a specific attribute.
 * This function targets elements with the attribute `data-fade-in="true"`
 * and applies a fade-in animation when the element enters the viewport.
 */
export function fadeInAnimation() {
    // Select all elements with the 'data-fade-in="true"' attribute
    const elements = gsap.utils.toArray<HTMLElement>('[data-fade-in="true"]');

    // Set initial opacity and vertical position for the elements
    gsap.set(elements, { opacity: 0, y: '2rem' });

    // Use ScrollTrigger to animate elements when they enter the viewport
    ScrollTrigger.batch(elements, {
        start: "top 80%", // Trigger animation when top of element is in the viewport
        onEnter: element => gsap.to(
            element,
            {
                opacity: 1,
                y: '0rem',
                stagger: 0.2, // Stagger the animation for a smoother effect
                duration: 1.5, // Duration of the animation
                ease: "back.out(3)" // Easing function for the animation
            }
        ),
    });
}

export function animateFacesIcons(column: HTMLElement): void {

    const duration = Number.parseFloat(column.dataset.duration || '1.0');
    const delay = Number.parseFloat(column.dataset.delay || '2.0');

    // Grab the face and icon containers.
    const faceContainer = column.querySelector(".face_container");
    const iconContainer = column.querySelector(".face_icon-wrap");

    if (!faceContainer || !iconContainer) {
        console.warn("Column is missing .face_container or .face_icon-wrap.");
        return;
    }

    // Collect the faces and icons. Adjust selectors as needed:
    const faces = Array.from(faceContainer.children) as HTMLElement[];
    const icons = Array.from(iconContainer.children) as HTMLElement[];

    // Make sure the length matches so index i in faces = index i in icons.
    if (faces.length !== icons.length) {
        console.warn("Number of faces and icons differ. Animation aborted.");
        return;
    }

    // For convenience, let’s define a helper to get a random index
    // different from the current one.
    const total = faces.length;
    function getRandomNextIndex(current: number): number {
        let next = current;
        while (next === current && total > 1) {
            next = Math.floor(Math.random() * total);
        }
        return next;
    }

    // Initialize the "current" index to 0 (we'll consider
    // the first pair visible).  You could also randomize initial
    // if you prefer.
    let currentIndex = 0;

    // Set all faces/icons to y=+100% except the current pair (y=0).
    faces.forEach((face, i) => {
        gsap.set(face, { yPercent: i === currentIndex ? 0 : 100 });
    });
    icons.forEach((icon, i) => {
        gsap.set(icon, { yPercent: i === currentIndex ? 0 : 100 });
    });

    /**
     * The core function that transitions the current pair out
     * and a new random pair in, then schedules itself again.
     */
    function doTransition() {
        // Pick the next random index
        const nextIndex = getRandomNextIndex(currentIndex);

        // Place the new pair down at +100% to ensure
        // they come up from below
        gsap.set([faces[nextIndex], icons[nextIndex]], {
            yPercent: 100,
        });

        // Build a timeline for the animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Update the currentIndex and schedule the next transition
                currentIndex = nextIndex;
                gsap.delayedCall(delay, doTransition);
            },
        });

        // Move the current pair up to -100% (out of view)
        tl.to(
            [faces[currentIndex], icons[currentIndex]],
            {
                yPercent: -100,
                duration,
                ease: "power2.inOut",
            },
            0
        );

        // Simultaneously move the new pair from +100% to 0%
        tl.to(
            [faces[nextIndex], icons[nextIndex]],
            {
                yPercent: 0,
                duration,
                ease: "power2.inOut",
            },
            0
        );
    }

    // Start the infinite cycle
    gsap.delayedCall(delay, doTransition);
}