import { gsap } from 'gsap';

export function preloaderAnimation() {
    const timeline = gsap.timeline({})

    timeline
        .to(
            '.preloader_logo-filter',
            { height: "0%", duration: 1.5, ease: 'power3.inOut', },
        )
        .to(
            '.preloader_logo',
            { yPercent: -100, duration: 1.0, ease: 'power3.inOut', }
        )
        .to(
            '.preloader_section',
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', duration: 0.8, ease: 'power3.inOut' },
            '-=0.9',
        )

    timeline
        .from(
            '.hero_content > *',
            { y: '2rem', opacity: 0, duration: 0.8, ease: "power4.out", stagger: 0.2 },
            '-=0.4',
        ).from(
            '.navbar_section',
            { yPercent: -100, duration: 0.8, ease: "power4.out" },
            '-=0.8',
        )
}

