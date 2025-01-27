import { gsap } from 'gsap';

// @ts-ignore
import barba from '@barba/core';

/**
 * Animation for the preloader
 */

export function pageTransition() {
    const timeline = gsap.timeline({ paused: true })

    // const easing = CustomEase.create("easeName", "0.68, -0.6, 0.32, 1.6");
    const easing = "elastic.out(0.8,0.3)";

    timeline
        // Move the logo filter to its final position
        .set(
            '.preloader_logo-filter',
            { height: "0%" },
        )
        .fromTo(
            '#joyride-j',
            { yPercent: 100, },
            { yPercent: 0, duration: 3, ease: easing },
            '+=0.5'
        )
        .fromTo(
            '#joyride-o',
            { yPercent: -76 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        .fromTo(
            '#joyride-y',
            { yPercent: 67.5 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        .fromTo(
            '#joyride-r',
            { yPercent: 120.3 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        .fromTo(
            '#joyride-i',
            { yPercent: -100 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        .fromTo(
            '#joyride-d',
            { yPercent: -88 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        .fromTo(
            '#joyride-e',
            { yPercent: -123 },
            { yPercent: 0, duration: 3, ease: easing },
            '<'
        )
        // Move the logo to its final position
        .to(
            '.preloader_logo',
            { yPercent: -100, duration: 1.0, ease: 'power3.inOut', }
        )
        // Reveal the preloader section
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power3.inOut' },
            '-=0.9',
        )
        // Reveal the navbar section
        .from(
            '.navbar_section',
            { yPercent: -100, duration: 0.8, ease: "power4.out" },
            '-=0.2',
        )

    barba.init({
        sync: true,
        debug: true,
        transitions: [{
            name: 'opacity-transition',
            async once() {
                return timeline.play();
            },
            async leave() {
                return timeline.reverse();
            },
            async after() {
                return timeline.play();
            }
        }]
    });
}

