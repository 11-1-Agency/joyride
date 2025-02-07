import { gsap } from 'gsap';
import Lenis from 'lenis';

/**
 * Modal animation
 * @param {string} name - The name of the modal element
 * @param {Lenis} lenis - The Lenis instance
 */

export function modalAnimation(modals: string[], lenis: Lenis) {
    modals.forEach((modal) => init(modal, lenis));
}

function init(name: string, lenis: Lenis) {
    const timeline = gsap.timeline({ paused: true })

    // Get the trigger, target and close elements
    const trigger = document.querySelector<HTMLElement>(`[data-modal-trigger="${name}"]`)
    const target = document.querySelector<HTMLElement>(`[data-modal-target="${name}"]`)
    const close = document.querySelector<HTMLElement>(`[data-modal-target="${name}"] .modal_close-button`)

    if (!trigger || !target || !close) return;

    // Get the navbar content element
    const navbarContent = document.querySelector<HTMLElement>('.navbar_content');

    // Calculate the offset of the navbar content
    const offset = navbarContent ? navbarContent.offsetHeight : 0;


    // Animate the opening of the modal
    timeline
        // Move the navbar content down
        .to(
            '.navbar_content > *',
            { y: offset, duration: 0.4, ease: "power4.inOut" },
        )
        // Show the modal
        .set(
            target,
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        )
        // Hide the navbar content
        .set(
            '.navbar_content',
            { display: 'none' },
        )
        // Set the height of the modal topbar
        .set(
            target.querySelector('.modal_topbar'),
            { height: navbarContent ? navbarContent.offsetHeight - 4 : 'auto', duration: 0.4, ease: "power4.in" },
        )
        // Animate the topbar elements
        .from(
            target.querySelector('.modal_topbar > *'),
            { y: -offset, duration: 0.2, ease: "linear" },
        )
        // Animate the content of the modal
        .from(
            target.querySelector('.modal_content'),
            { height: '0rem', duration: 0.4, ease: "power2.out" },
            '-=0.1'
        )
        // Animate the portion of the modal
        .from(
            target.querySelector('.modal_portion'),
            { y: '-2rem', opacity: 0, duration: 0.4, ease: "power1.out" },
            '-=0.1'
        )

    // Add event listeners to the trigger and close elements
    trigger.addEventListener('click', () => {
        timeline.play();

        // Stop the smooth scrolling
        lenis.stop();
        document.body.style.setProperty('overflow', 'hidden');
    })

    close.addEventListener('click', () => {
        timeline.reverse();

        // Start the smooth scrolling
        lenis.start();
        document.body.style.setProperty('overflow', 'auto');
    })
}
