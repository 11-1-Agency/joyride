import barba from '@barba/core';
import { before } from '@splidejs/splide/src/js/utils';

import { gsap } from 'gsap';

export function transitionAnimation() {
    console.log('transitionAnimation');

    const timeline = gsap.timeline({ paused: true })

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

    barba.init({
        transitions: [{
            name: 'home',
            leave(data) {
                return gsap.to('.preloader_section', {
                    opacity: 0
                });
            },
            enter(data) {
                return gsap.from('.preloader_section', {
                    opacity: 0
                });
            }
        }]
    });
}