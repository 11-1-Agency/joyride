import { gsap } from 'gsap';

/**
 * Animation for the preloader
 */
export function preloaderAnimation() {
    const timeline = gsap.timeline({})

    // Move the logo filter to its final position
    timeline
        .to(
            '.preloader_logo-filter',
            { height: "0%", duration: 1.5, ease: 'power3.inOut', },
        )

    // Move the logo to its final position
    timeline
        .to(
            '.preloader_logo',
            { yPercent: -100, duration: 1.0, ease: 'power3.inOut', }
        )

    // Reveal the preloader section
    timeline
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power3.inOut' },
            '-=0.9',
        )

    // Reveal the hero content
    timeline
        .from(
            '.hero_content > *',
            { y: '2rem', opacity: 0, duration: 0.8, ease: "power4.out", stagger: 0.2 },
            '-=0.4',
        )

    // Reveal the navbar section
    timeline
        .from(
            '.navbar_section',
            { yPercent: -100, duration: 0.8, ease: "power4.out" },
            '-=0.8',
        )
}

