import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function scrollytelling() {
    const heroAnimation = gsap.timeline({});
    // const uspsAnimation = gsap.timeline({});
    // const brandsAnimation = gsap.timeline({});
    const closeAnimation = gsap.timeline({});
    // const projectsAnimation = gsap.timeline({});


    openTransition(heroAnimation);
    closeTransition(closeAnimation);

    if (window.innerWidth > 992) {
        // brandsTransition(brandsAnimation);
        // uspsTransition(uspsAnimation);
        // projectTransition(projectsAnimation);
    }
}

// @ts-ignore
function heroTransition(timeline: gsap.core.Timeline) {
    // get the section
    const section = document.querySelector<HTMLElement>(".hero_section");

    if (!section) return;

    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // set the styles for the section and the wrapper
    gsap.set(wrapper, { height: "100vh", position: "relative" });
    gsap.set(section, { position: "sticky", top: 0 });

    // initiate the timeline
    const path = {
        element: document.getElementById("hero-transition-path"),
        start: "M0 99.9998V99.9766C25 99.9767 75 99.9646 100 99.9648V99.9998",
        end: "M0 100V70C25 51 75 51 100 70V100",
    };

    // add the animations to the timeline
    timeline
        .set(".usp_section", { overflow: "hidden" })
        .fromTo(
            path.element,
            { attr: { d: path.start } },
            { attr: { d: path.end } }
        )
        .set(".hero-transition-shape", { color: "var(--surface--green)" })
        .set(".usp_heading", { position: "relative" })
        .set(".usp_section", { overflow: "visible" });

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "top top",
        end: "bottom center",
        scrub: true,
    });
}

// @ts-ignore
function uspsTransition(timeline: gsap.core.Timeline) {
    // get the section
    const section = document.querySelector<HTMLElement>(".usp_section");

    if (!section) return;


    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // set the styles for the section and the wrapper
    gsap.set(wrapper, { height: "800vh", position: "relative" });

    // add the animations to the timeline
    const properties = dotScale();

    if (!properties) return;

    const container = document
        .querySelector<HTMLElement>(".usp_section")
        ?.getBoundingClientRect();
    const icon = document
        .querySelector<HTMLElement>(".usp_bottom-icon")
        ?.getBoundingClientRect();

    // const path = {
    //     element: document.getElementById('usp-transition-path'),
    //     start: 'M50.0005 99.9883C50.0005 99.9925 72.3914 99.9958 100 99.9958V100H0V99.9959C27.5311 99.9958 50.0005 99.9924 50.0005 99.9883Z',
    //     end: 'M50.001 -0.000840373C50.001 27.6819 72.3921 43.4215 100.001 43.4215V100H4.21733e-06V43.5039C27.5314 43.402 50.001 27.6096 50.001 -0.000840373Z',
    // }

    const path = {
        element: document.getElementById("usp-transition-path"),
        start:
            "M50.0002 99.8877C50.0002 99.9868 51.0446 100 51.4314 100L48.6383 100C49.2054 100 50.0002 99.9729 50.0002 99.8877Z",
        mid: "M50.0002 0.0670931C50.0002 27.7499 72.3913 100 100 100L0.188965 99.9996C27.7204 99.8976 50.0002 27.6776 50.0002 0.0670931Z",
        end: "M49.9997 0.0668945C49.9997 27.7497 99.9997 0.0668945 99.9997 99.9998L0.188477 99.9994C0.188477 0.067337 49.9997 27.6774 49.9997 0.0668945Z",
    };

    // add the animations to the timeline
    timeline
        .set(section, { position: "sticky", top: 0 })
        .set(".usp_heading", {
            transformOrigin: properties.transformOrigin,
            position: "relative",
        })
        .fromTo(
            ".usp_heading",
            {
                transform: `translate(${properties.x}%, ${properties.y}%) scale(${properties.scale}, ${properties.scale})`,
            },
            { transform: `translate(0%, 0%) scale(1, 1)`, duration: 3 }
        )
        .from(
            ".usp_heading-fade",
            { opacity: 0 }
        )
        .from(
            ".usp_header .usp_paragraph",
            { opacity: 0, y: "2rem" }
        )
        .addLabel("icon-01")
        .from(
            ".usp_bottom",
            { opacity: 0, y: "2rem" }, "-=0.4"
        )
        .addLabel("icon-02")
        .to(
            ".usp_bottom > div > div",
            { yPercent: -100 * (2 / 5) }, "+=0.3"
        )
        .addLabel("icon-03")
        .to(
            ".usp_bottom > div > div",
            { yPercent: -100 * (4 / 5) }, "+=0.3"
        )
        .addLabel("icon-04")
        .to(
            ".usp_bottom-icon",
            { y: -1 * ((icon?.top ?? 0) - (container?.top ?? 0) - 100 + 128), duration: 1, },
            "+=0.3"
        )
        .fromTo(
            path.element,
            { attr: { d: path.start } },
            { attr: { d: path.mid }, duration: 1 },
            "<"
        );

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "top center",
        end: "bottom center",
        scrub: true,
        snap: {
            snapTo: "labels",
            duration: { min: 0.25, max: 0.75 },
            delay: 0.1,
            ease: "power1.inOut",
        },
    });
}

// @ts-ignore
function brandsTransition(timeline: gsap.core.Timeline) {
    // get the section
    const section = document.querySelector<HTMLElement>(".brands_section");
    const icon = section?.querySelector<HTMLElement>(".rive_frame");

    if (!section) return;

    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // set the styles for the section and the wrapper
    gsap.set(wrapper, { height: "500vh", position: "relative", zIndex: 2 });
    gsap.set(section, { position: "sticky", top: 0 });

    const brandsList = document.querySelector<HTMLElement>(".brands_list");

    const offset = window.innerWidth * 0.5 + (brandsList?.offsetWidth ?? 0) * 0.5;

    // add the animations to the timeline
    timeline
        .fromTo(
            brandsList,
            { x: offset * -1 - (icon?.offsetWidth ?? 0) },
            { x: offset + (icon?.offsetWidth ?? 0) }
        )
        .fromTo(
            ".brands-transition-shape",
            { transform: "translate(-100%)" },
            { transform: "translate(0%)" },
            "-=0.33"
        )
        .set(
            section.querySelectorAll(".features_heading span"),
            { width: 'fit-content', margin: '0px auto', display: 'inline-block' },
            '<'
        )
        .fromTo(
            section.querySelector('.features_heading .line-01'),
            { xPercent: -30 },
            { xPercent: 0 },
            '-=0.3'
        )
        .fromTo(
            section.querySelector('.features_heading .line-02'),
            { xPercent: -70 },
            { xPercent: 0 },
            '<'
        )
        .set(wrapper, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: section,
        pinSpacing: false,
    });

    const secondTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top center",
            end: "top top",
            scrub: true,
        }
    })

    secondTimeline
        .fromTo(
            '.brands_header',
            { opacity: 0, y: '2rem' },
            { opacity: 1, y: '0rem' },
        )
        .fromTo(
            '.brands_buttons',
            { opacity: 0, y: '2rem' },
            { opacity: 1, y: '0rem' },
        )
}

function openTransition(timeline: gsap.core.Timeline) {
    // get the section
    const section = document.querySelector<HTMLElement>('[data-transition="opening"]');

    if (!section) return;

    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // set the styles for the section and the wrapper
    gsap.set(wrapper, { height: "100vh", position: "relative" });
    gsap.set(section, { position: "sticky", top: 0 });

    // initiate the timeline
    const path = {
        element: section.querySelector("#hero-transition-path"),
        start: "M0 99.9998V99.9766C25 99.9767 75 99.9646 100 99.9648V99.9998",
        end: "M0 100V70C25 51 75 51 100 70V100",
    };

    // add the animations to the timeline
    timeline
        .set(section.querySelector("svg"), { height: "100%", width: "100%" })
        .fromTo(
            path.element,
            { attr: { d: path.start } },
            { attr: { d: path.end } }
        )

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "top top",
        end: "bottom center",
        scrub: true,
    });
}

function closeTransition(timeline: gsap.core.Timeline) {
    const selector = '[data-transition="closing"]';

    // get the section
    const section = document.querySelector<HTMLElement>(selector);

    if (!section) return;

    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // set the styles for the section and the wrapper
    gsap.set(wrapper, { height: "100vh", position: "relative" });
    gsap.set(section, { position: "sticky", top: 0 });

    const path = {
        element: section.querySelector("#closing-transition-path"),
        start:
            "M100 0L100 100C66.6667 100 33.3333 100 0 100L8.74228e-06 -8.74228e-06L100 0Z",
        // start: 'M5.39545e-05 75L0 0H100L100 75C100 75 91.5 100 50 100C8.49999 100 5.39545e-05 75 5.39545e-05 75Z',
        end: "M100 0L100 75C66.6667 108.333 33.3333 108.333 2.18557e-06 75L8.74228e-06 -8.74228e-06L100 0Z",
    };

    // add the animations to the timeline
    timeline
        .set(section.querySelector("svg"), { height: "100%", width: "100%" })
        .set(section, { backgroundColor: section.dataset.properties ?? "var(--surface--pink)" })
        // Transitions
        .fromTo(
            path.element,
            { attr: { d: path.start } },
            { attr: { d: path.end } }
        );

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "top top",
        end: "bottom top",
        scrub: true,
    });
}

// @ts-ignore
function projectTransition(timeline: gsap.core.Timeline) {
    // get the section
    const section = document.querySelector<HTMLElement>(".expertise_section");
    const projects = document.querySelector<HTMLElement>(".projects_section");

    if (!section || !projects) return;

    // create a wrapper for the section
    const wrapper = document.createElement("div");
    section.parentNode?.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // const projectsWrapper = document.createElement("div");
    // projects.parentNode?.insertBefore(projectsWrapper, projects);
    // projectsWrapper.appendChild(section);

    // set the styles for the section and the wrapper
    // gsap.set(wrapper, { height: "fit-content", position: "sticky", bottom: 0 });
    // gsap.set(section, { position: "sticky", top: 0 });

    // gsap.set(projectsWrapper, { paddingTop: "100vh", position: "relative" });

    // initiate the timeline
    // const path = {
    //     element: document.getElementById("expertise-transition-path"),
    //     start: "M100 50.5C100 78.1142 77.6142 100 50 100C22.3858 100 0 77.1142 0 49.5C0 21.8858 22.3858 0 50 0C77.6142 0 100 22.8858 100 50.5Z",
    //     end: "M100 100H0V0H49.5H100V100Z",
    // };

    // add the animations to the timeline
    // timeline
    //     .set(
    //         path.element,
    //         { attr: { d: path.start } },
    //     )
    //     .fromTo(
    //         path.element,
    //         { scale: 0, rotation: 0, transformOrigin: "center center" },
    //         { scale: 1.5, rotation: (360 * 2), transformOrigin: "center center", ease: "power4.inOut", }
    //     )

    // set the scroll trigger
    ScrollTrigger.create({
        animation: timeline,
        trigger: wrapper,
        start: "bottom 200%",
        end: "bottom 100%",
        scrub: true,
        markers: true,
        // pin: true,
    });

}

// Helper functions

/**
 * Calculates the scale and transformation properties for the dot element relative to the heading.
 * @returns An object containing scale, x, y, and transformOrigin properties.
 */
function dotScale() {
    // Get references to the section, heading, and dot elements
    const section = document.querySelector<HTMLElement>(".usp_section");
    const heading = document.getElementById("problem_heading");
    const dot = document.getElementById("dot");

    // Return early if any of the elements are not found
    if (!dot || !heading || !section) return;

    // Calculate the transform origin for the dot element
    const transformOrigin = {
        x: dot.getBoundingClientRect().left - heading.getBoundingClientRect().left + dot.offsetWidth * 0.5,
        y: dot.getBoundingClientRect().top - heading.getBoundingClientRect().top + dot.offsetHeight * 0.215,
    };

    // Calculate the transformation ratio based on the window size and element positions
    const ratio = {
        x: window.innerWidth * 0.5 - dot.getBoundingClientRect().left - dot.offsetWidth * 0.9,
        y: window.innerHeight * 0.5 - heading.offsetTop - dot.offsetHeight * 0.199,
    };

    // Calculate the percentage transformation for the x and y axes
    const transform = {
        x: (ratio.x / heading.clientWidth) * 100,
        y: (ratio.y / heading.clientHeight) * 100,
    };

    // Calculate the diagonal distance of the window
    const d = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));

    // Calculate the scale factor for the dot element
    const scale = d / dot.offsetWidth;

    // Return the calculated scale and transformation properties
    return {
        scale: scale * 2.5,
        x: transform.x,
        y: transform.y,
        transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`,
    };
}
