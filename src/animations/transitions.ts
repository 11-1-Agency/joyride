import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function transitions() {
    rocketTransition();
    scooterTransition('.brands_section');
    scooterTransition('.pricing_section', true);
    showreelTransition();
}

function rocketTransition() {
    const section = document.querySelector<HTMLElement>('.hero_section');

    if (!section) return;

    const icon = section.querySelector('.rive_frame');
    const shape = section.querySelector('.transition_shape')
    const path = section.querySelector('.transition_shape path')

    if (!icon || !shape || !path) return;

    const timeline = gsap.timeline({});

    const iconDistanceFromTop = icon!.getBoundingClientRect().top + icon!.getBoundingClientRect().width;

    const vh = window.innerHeight - iconDistanceFromTop;

    timeline
        .set(
            path,
            { attr: { d: 'M50.0002 0.0670931C50.0002 27.7499 72.3913 100 100 100L0.188965 99.9996C27.7204 99.8976 50.0002 27.6776 50.0002 0.0670931Z' } }
        )
        .to(
            icon,
            { y: -iconDistanceFromTop }
        )
        .fromTo(
            shape,
            { height: vh },
            { height: '100%' },
            '<'
        )
    // TODO: animate the path so as to get that perfect transition


    ScrollTrigger.create({
        animation: timeline,
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
        pin: true,
    });
}

function scooterTransition(tag: string, reverse?: boolean) {
    const section = document.querySelector<HTMLElement>(tag);

    if (!section) return;

    const icon = section.querySelector('.transition_icon');
    const shape = section.querySelector('.transition_shape')
    const path = section.querySelector('.transition_shape path')

    if (!icon || !shape || !path) return;

    const timeline = gsap.timeline({});

    const pathD = {
        start: 'M100 99.9999H0L0.000107765 1.04273C0.000107765 -0.000242472 0.000107765 -0.000242439 0.989553 -0.000244141L100 -8.74667e-05V99.9999Z',
        end: 'M100 100H0L2.55108e-05 99.9453C2.55108e-05 62.1705 55.2961 2.07424e-05 99.7959 2.07424e-05L100 0V100Z'
    }

    timeline
        .set(
            icon,
            {
                yPercent: 18,
                right: reverse ? 0 : 'auto',
                left: reverse ? 'auto' : 0,
                scaleX: reverse ? -1 : 1, transformOrigin: "center" 
            }
        )
        .set(
            shape,
            { scaleX: reverse ? -1 : 1, transformOrigin: "center" }
        )
        .fromTo(
            icon,
            { x: (reverse ? 1 : -1) * icon.getBoundingClientRect().width },
            { x: (reverse ? -1 : 1) * window.innerWidth }
        )
        .fromTo(
            path,
            { attr: { d: pathD.start } },
            { attr: { d: pathD.end } },
            '<'
        )
        .to(
            path,
            { xPercent: 100 },
            // '<'
        )


    ScrollTrigger.create({
        animation: timeline,
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
        // markers: true,
        // pin: true,
        // pinSpacer: false,
        pinSpacing: false,
    });
}

function showreelTransition(){
    const section = document.querySelector<HTMLElement>('.expertise_section');
    const showreel = document.querySelector<HTMLElement>('.projects_section');

    if (!section) return;

    const shape = section.querySelector('.transition_shape')

    // if (!icon || !shape || !path) return;

    const timeline = gsap.timeline({})
    const showreelTimeline = gsap.timeline({})

    timeline
    .fromTo(
        shape,
        {clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)'},
        {clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
    )

    showreelTimeline
    .fromTo(
        showreel,
        {clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'},
        {clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}
    )

    ScrollTrigger.create({
        animation: timeline,
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
        pin: true,
        pinSpacing: false
    });

    ScrollTrigger.create({
        animation: showreelTimeline,
        trigger: showreel,
        start: "top center",
        end: "top top",
        scrub: true,
        // markers: true,
        // pin: true,
        // pinSpacing: false
    });
}