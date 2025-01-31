import { gsap } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
// @ts-ignore
import '@splidejs/splide/css/core';


/**
 * Creates an infinite marquee animation. The animation will scroll the given items in the container in an infinite loop.
 * @param containerSelector The selector for the container element that contains the items
 * @param itemSelector The selector for the items to be scrolled
 * @param speed Optional. The speed of the animation in pixels per second. Default is 50. A negative value will scroll the items from right to left.
 */
export function createInfiniteMarquee(containerSelector: string, itemSelector: string, speed: number = 50): void {
    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
        console.warn(`No container found for selector: ${containerSelector}`);
        return;
    }

    // Collect all items
    const items = Array.from(
        container.querySelectorAll<HTMLElement>(itemSelector)
    );

    if (items.length === 0) {
        console.warn(`No marquee items found for selector: ${itemSelector}`);
        return;
    }

    const itemWidths = items.map(item => item.offsetWidth);

    // Duplicate the items in the container
    const clones = items.map(item => {
        const clone = item.cloneNode(true) as HTMLElement;
        container.appendChild(clone);
        return clone;
    });

    items.push(...clones);

    const translation = (itemWidths.reduce((a, c) => a + c, 0) + (itemWidths.length - 1) * 32);

    /**
     * Creates a GSAP timeline that will be repeated in an infinite loop.
     * @param duration The duration of the animation in seconds
     * @param ease The easing function to be used for the animation
     */
    gsap.timeline({ repeat: -1, defaults: { ease: "none" } })
        .to(
            items,
            {
                x: (speed > 0 ? 0.5 : -0.5) * translation,
                duration: Math.abs(speed),
                ease: "linear",
                /**
                 * Custom modifier function for the x property.
                 * @param value The current value of the x property
                 */
                modifiers: {
                    x: (value) => {
                        const xPos = parseFloat(value);
                        const totalWidth = 0.5 * translation;
                        return gsap.utils.wrap(-totalWidth, 1, xPos) + 'px';
                    }
                }
            }
        );
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

export function initSplide() {
    const slider = document.getElementById('team-slide');

    if (!slider) {
        console.warn('Splide not found');
        return;
    }

    var splide = new Splide(slider, {
        mediaQuery: 'min',
        type: 'loop',
        drag: 'free',
        speed: 1.2,
        easingFunc: (x: number) => 1 - Math.pow(1 - x, 3),
        fixedWidth: '20rem',
        // gap: 'var(--spacing--x-bg)',
        arrows: false,
        pagination: false,
        breakpoints: {
            640: {
                destroy: true,

            },
        }

    });

    splide.on('updated', () => {
        slider.querySelector<HTMLElement>('.splide__track')?.style.setProperty('overflow', 'visible');

        slider.querySelector<HTMLElement>('.team_list')?.style.setProperty('display', window.innerWidth > 640 ? 'grid' : 'flex');
    })

    splide.on('mounted', () => {
        slider.querySelector<HTMLElement>('.splide__track')?.style.setProperty('overflow', 'visible');

        slider.querySelector<HTMLElement>('.team_list')?.style.setProperty('display', window.innerWidth > 640 ? 'grid' : 'flex');
    });

    splide.on('destroy', () => {
        slider.querySelector<HTMLElement>('.team_list')?.style.setProperty('display', window.innerWidth > 640 ? 'grid' : 'flex');
    });

    splide.mount({ AutoScroll });
}