import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";

// @ts-ignore
import barba from '@barba/core';

/**
 * Animation for the preloader
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

export function pageTransition() {
    const timeline = gsap.timeline({ paused: true })

    const easing = CustomEase.create('superease', '.08,.73,0,1');

    timeline
        .set('.preloader_svg g', { transformOrigin: 'bottom center', yPercent: 400 })
        .to(
            '.preloader_svg g',
            { yPercent: 0, stagger: 0.1, duration: 1.5, ease: easing },
        )
        // Move the logo to its final position
        // .to(
        //     '.preloader_logo',
        //     { yPercent: -100, opacity: 0, duration: 0.8, ease: 'expo.inOut', }
        // )
        // .to(
        //     '.preloader_svg g',
        //     { yPercent: -100, opacity: 0, duration: 0.8, ease: 'power3.in' },
        // )
        // Reveal the preloader section
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


    const timelineLeave = gsap.timeline({ paused: true })
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
            name: 'opacity-transition',
            async once() {
                return timeline.play();
            },
            async leave() {
                return timelineLeave.play();
            },
            async after() {
                return timeline.play();
            },
            async enter(data: any) {
                resetWebflow(data);

                window.scrollTo(0, 0);
            }
        }]
    });
}

