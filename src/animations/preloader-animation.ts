import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";

import Lenis from "lenis";

// @ts-ignore
import barba from '@barba/core';

/**
 * Animation for the preloader
 */

/**
 * Resets the Webflow page id and reinitializes the Webflow runtime.
 * This is necessary because the page transition does not update the
 * Webflow page id and the Webflow runtime is not reinitialized.
 * @param {any} data - The data object passed to the page transition.
 * @returns {Promise<void>} - A promise that resolves when the Webflow
 * runtime is reinitialized.
 */
function resetWebflow(data: any) {
    let parser = new DOMParser();
    let dom = parser.parseFromString(data.next.html, "text/html");
    const webflowPageId = dom.querySelector("html")?.getAttribute("data-wf-page");
    if (webflowPageId) {
        document.documentElement.setAttribute("data-wf-page", webflowPageId);
    }

    // @ts-ignore
    window.Webflow && window.Webflow.destroy();
    // @ts-ignore
    window.Webflow && window.Webflow.ready();
    // @ts-ignore
    window.Webflow && window.Webflow.require("ix2").init();
}

export function pageTransition(lenis: Lenis) {
    const timeline = gsap.timeline({ paused: true, onStart: () => lenis.stop(), onComplete: () => lenis.start() });

    const timelineLeave = gsap.timeline({ paused: true, onStart: () => lenis.stop(), onComplete: () => lenis.start() });

    const timelineEnter = gsap.timeline({ paused: true, onStart: () => lenis.stop(), onComplete: () => lenis.start() });

    const easing = CustomEase.create('superease', '.08,.73,0,1');

    timeline
        .set('.preloader_spinning-logo', { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" })
        .set('.preloader_svg g', { transformOrigin: 'bottom center', yPercent: 400 })
        .to(
            '.preloader_svg g',
            { yPercent: 0, delay: "random(0, 0.5)", duration: 1.5, ease: easing },
        )
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power3.in' },
            '-=0.2',
        )
        // Reveal the navbar section
        .from(
            '.navbar_section',
            { yPercent: -100, duration: 0.8, ease: "power4.out" },
            '-=0.1',
        )
        .set('.preloader_spinning-logo', { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" })

    timelineEnter
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power3.in' },
            '-=0.2',
        )
        // Reveal the navbar section
        .to(
            '.navbar_section',
            { yPercent: 0, duration: 0.8, ease: "power4.out" },
            '-=0.1',
        )
        .set('.preloader_spinning-logo', { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" })


    timelineLeave
        .to(
            '.navbar_section',
            { yPercent: -100, duration: 0.8, ease: "power4.out" },
        )
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.8, ease: 'power3.in' },
            '-=0.5',
        )

    barba.init({
        sync: true,
        transitions: [{
            name: 'default-transition',
            sync: true,
            async once(data: any) {
                if (data.next.namespace === "home") {
                    await timeline.play();
                } else {
                    timelineEnter.play();
                }
            },
            async leave() {
                await timelineLeave.play();
            },
            async enter(data: any) {
                timelineEnter.play();

                
                await resetWebflow(data);

                const url = new URL(window.location.href);
                const id = url.hash.slice(1);
                if (id) {
                    const element = document.getElementById(id);
                    if (element) {
                        window.scrollTo({
                            top: element.offsetTop,
                            behavior: 'smooth',
                        });
                    }
                } else {
                    window.scrollTo(0, 0);
                }
            },
        }]
    });
}

