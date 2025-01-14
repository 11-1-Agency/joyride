import Splide from '@splidejs/splide';

import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';


export function testimonialCarousel() {
    const carousel = new Splide('#testimonial_carousel-01', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        pagination: false,
        arrows: false,
        fixedWidth: '720px',
        gap: 'var(--spacing--x-bg)',
        autoScroll: { speed: 1 },
    });

    carousel.mount({ AutoScroll });

    const carouselReverse = new Splide('#testimonial_carousel-02', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        pagination: false,
        arrows: false,
        fixedWidth: '720px',
        gap: 'var(--spacing--x-bg)',
        autoScroll: { speed: -1 },
    });

    carouselReverse.mount({ AutoScroll });
}


export function brandCarousel() {
    const carousel = new Splide('#brand_carousel', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        pagination: false,
        arrows: false,
        fixedWidth: '200px',
        gap: 'var(--spacing--x-bg)',
        autoScroll: { speed: -1 },
    });

    carousel.mount({ AutoScroll });
}