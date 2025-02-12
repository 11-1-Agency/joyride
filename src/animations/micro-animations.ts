import { gsap } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
// @ts-ignore
import '@splidejs/splide/css/core';

export function splideCarousel() {
    const carousel = document.querySelectorAll<HTMLElement>(".splide");

    carousel.forEach((slider) => {
        const speed = Number.parseFloat(slider.dataset.speed || '1.2');

        var splide = new Splide(slider, {
            type: 'loop',
            drag: 'free',
            direction: speed > 0 ? 'ltr' : 'rtl',
            speed: speed,
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
    const elements = gsap.utils.toArray<HTMLElement>('[data-fade-in="stagger"]');

    if (!elements.length) {
        return;
    }

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

export function singleFadeIn() {
    const elements = gsap.utils.toArray<HTMLElement>('[data-fade-in="true"]');

    if (!elements.length) {
        return;
    }

    gsap.set(elements, { opacity: 0, y: '2rem' });

    elements.forEach((element) => {
        gsap.to(
            element,
            {
                opacity: 1,
                y: '0rem',
                duration: 1.5,
                ease: "back.out(3)",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                }
            }
        );
    });
}

export function shuffleAndAnimatePair() {
    const wrappers = document.querySelectorAll<HTMLElement>(".face_wrap");

    wrappers.forEach((wrapper) => {
        run(wrapper)
    })

    function run(wrapper: HTMLElement) {
        const duration = Number.parseFloat(wrapper.dataset.duration || '1.0');
        const delayBetweenSlides = Number.parseFloat(wrapper.dataset.delay || '2.0');
        const ease = "power2.inOut";

        const faceList = wrapper.querySelector<HTMLElement>(".face_list");
        const iconList = wrapper.querySelector<HTMLElement>(".face_icon-list");

        if (!faceList || !iconList) {
            console.warn("Wrapper must contain both .face_list and .face_icon-list.");
            return;
        }

        // Get the items from each list
        let faceItems = Array.from(faceList.children) as HTMLElement[];
        let iconItems = Array.from(iconList.children) as HTMLElement[];

        // Make sure both have the same count
        const itemCount = faceItems.length;
        if (itemCount === 0 || iconItems.length !== itemCount) {
            console.warn("face_list and face_icon-list must have the same number of items, and not be empty.");
            return;
        }

        // STEP 1: Create a SINGLE shuffled array of indices [0..(n-1)]
        // This ensures both lists will be reordered in the exact same sequence.
        const indices = shuffleIndices(itemCount);
        // e.g. [2, 0, 3, 1] if itemCount=4

        // STEP 2: Reorder both faceList and iconList DOMs based on these indices
        reorderListByIndices(faceList, faceItems, indices);
        reorderListByIndices(iconList, iconItems, indices);

        // Update references to items after reordering
        faceItems = Array.from(faceList.children) as HTMLElement[];
        iconItems = Array.from(iconList.children) as HTMLElement[];

        // STEP 3: Duplicate the first item in each list and append at the end
        const faceFirstClone = faceItems[0].cloneNode(true) as HTMLElement;
        faceList.appendChild(faceFirstClone);

        const iconFirstClone = iconItems[0].cloneNode(true) as HTMLElement;
        iconList.appendChild(iconFirstClone);

        // Re-get items after cloning
        faceItems = Array.from(faceList.children) as HTMLElement[];
        iconItems = Array.from(iconList.children) as HTMLElement[];

        // totalItems = original count + 1 (because of the cloned item)
        const totalItems = faceItems.length;

        // STEP 4: Build a single GSAP timeline that animates BOTH lists in sync We'll move from item0 to item1, then item1 to item2, etc. Each step is a shift of -100% * (index + 1) in the y direction.

        // We'll repeat infinitely; on repeat, GSAP will reset yPercent to 0 instantly
        // which aligns with item0 being visually the same as the last cloned item.
        const faceTimeline = gsap.timeline({ repeat: -1, delay: delayBetweenSlides });

        // For each item in the list, shift it up by 100% * (index+1) / totalItems
        // At the end, jump back to the top instantly (GSAP will reset yPercent to 0)
        faceItems.forEach((_, i) => {
            if (i < totalItems - 1) {
                faceTimeline
                    .to(
                        [faceList, iconList],
                        {
                            yPercent: (-100 * (i + 1)) / totalItems,
                            duration,
                            ease,
                            delay: delayBetweenSlides,
                        },
                    )
            }
        });
    }

    /* ============================================================================
       Utility Functions
       ============================================================================
    */

    /**
     * Returns an array of shuffled indices [0..(n-1)] using Fisher-Yates.
     */
    function shuffleIndices(n: number): number[] {
        const arr = Array.from({ length: n }, (_, i) => i);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Reorders a list’s children based on the given indices array.
     * e.g. if indices=[2,0,1], then list’s child(2) becomes new first, etc.
     */
    function reorderListByIndices(
        list: HTMLElement,
        items: HTMLElement[],
        indices: number[]
    ) {
        const fragment = document.createDocumentFragment();

        indices.forEach((idx) => {
            fragment.appendChild(items[idx]);
        });
        list.appendChild(fragment);
    }
}

export function rotateArrow() {
    const scroller = document.querySelector<HTMLElement>("#scroller");

    if (!scroller) return;


    const heroSection = document.querySelector<HTMLElement>(".hero_section");

    if (!heroSection) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: "bottom top",
            toggleActions: "play none none reverse",
        },
    });

    tl
        .set(scroller, { zIndex: 99 })
        .fromTo(
            scroller.querySelector<HTMLElement>(".scroller_icon"),
            { transform: "rotate(-90deg)" },
            { transform: "rotate(-270deg)", ease: "power4.inOut" }
        );
}

export function landingAnimation() {
    const timeline = gsap.timeline({});

    timeline
        .fromTo(
            '[data-intro="true"]',
            { y: '10rem', opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
        )
        .fromTo(
            '.navbar_section',
            { yPercent: -100 },
            { yPercent: 0, duration: 0.8, ease: "power4.out" },
            '-=0.8'
        )
}