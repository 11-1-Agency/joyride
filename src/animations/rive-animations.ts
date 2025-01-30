import * as rive from "@rive-app/canvas";
import { Artboard } from "@rive-app/canvas/rive_advanced.mjs";

export class JoyrideRiveAnimation {
    private target: string;

    constructor(target: string) {
        this.target = target;
    }

    init() {
        const canvases = document.querySelectorAll<HTMLCanvasElement>(this.target);

        console.clear();

        canvases.forEach((canvas) => {
            if (!canvas.dataset.source) {
                console.warn("No source specified for canvas");
                return;
            }

            const r = new rive.Rive({
                canvas: canvas,
                src: canvas.dataset.source,
                autoplay: canvas.dataset.autoplay === "true",
                artboard: canvas.dataset.artboard,
                stateMachines: canvas.dataset.statemachines,
                onLoad: () => {
                    this.onloadFunction(canvas.dataset.function, r, canvas)
                },
            });
        });
    }

    // ------------------------------------------------------------------------

    private onloadFunction(functionName: string | undefined, rive: rive.Rive, canvas: HTMLCanvasElement) {
        console.debug('function run')

        switch (functionName) {
            case 'scroll-runner':
                console.log('scroll runner')
                this.scrollRunner(rive, canvas);
                break;
            case 'cursor-tracking':
                console.log('cursor tracking')
                this.cursorTracking(rive, canvas);
                break;
            case 'view-play':
                console.log('view play')
                this.viewPlay(rive, canvas);
                break;
            default:
                // console.warn(`id:#${canvas.dataset.artboard} requested function "${functionName}" but it was not found.`);
                rive.resizeDrawingSurfaceToCanvas()
        }
    }


    private scrollRunner(rive: rive.Rive, canvas: HTMLCanvasElement) {

        // Resize the Rive drawing surface to match the canvas size.
        rive.resizeDrawingSurfaceToCanvas();

        // Retrieve the inputs for the specified state machine.
        const inputs = rive.stateMachineInputs(canvas.dataset.statemachines!);

        // Find the input named 'toggle' from the state machine inputs.
        const input = inputs.find(i => i.name === 'toggle');

        // If 'toggle' input is not found, log a warning and exit the function.
        if (!input) {
            console.warn("Input not found");
            return;
        }

        // Add a click event listener to the canvas to toggle the 'toggle' input value.
        canvas?.addEventListener('click', () => {
            input.value = !input.value;
        });

        let isScrolling: boolean = false;
        let timeout: ReturnType<typeof setTimeout>;

        window.addEventListener("scroll", () => {
            if (!isScrolling) {
                console.log(true); // User started scrolling
                input.value = true;
            }

            isScrolling = true;

            // Clear previous timeout
            clearTimeout(timeout);

            // Set a timeout to detect when scrolling stops
            timeout = setTimeout(() => {
                isScrolling = false;
                console.log(false); // User stopped scrolling

                input.value = false;
            }, 200); // Adjust delay as needed
        });
    }

    private cursorTracking(rive: rive.Rive, canvas: HTMLCanvasElement) {
        // Resize the Rive drawing surface to match the canvas size.
        rive.resizeDrawingSurfaceToCanvas();

        // Retrieve the inputs for the specified state machine.
        const inputs = rive.stateMachineInputs(canvas.dataset.statemachines ?? '');

        // Replace xAxis with the name of your x input
        const xInput = inputs.find(({ name }) => name === "x-axis");

        // Replace yAxis with the name of your y input
        const yInput = inputs.find((input) => input.name === "y-axis");

        if (!xInput || !yInput) {
            console.warn("Input not found");
            return;
        }

        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        // This assumes your blend state for x and y axis goes from 0-100
        window.addEventListener("mousemove", function (e) {
            console.log(e);
            xInput.value = (e.x / maxWidth) * 100;
            yInput.value = (e.y / maxHeight) * 100;
        });
    }

    private viewPlay(rive: rive.Rive, canvas: HTMLCanvasElement) {
        // Resize the Rive drawing surface to match the canvas size.
        rive.resizeDrawingSurfaceToCanvas();

        // Retrieve the inputs for the specified state machine.
        const inputs = rive.stateMachineInputs(canvas.dataset.statemachines!);

        const input = inputs.find(({ name }) => name === "play")

        // Create an intersection observer instance to detect when canvas is in view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!input) {
                    console.warn("Input not found");
                } else {

                    // If the canvas element is in view, play the state machine
                    if (entry.isIntersecting) {
                        rive.play(canvas.dataset.statemachines);
                        input.value = true;
                        // Stop observing the canvas element
                        observer.unobserve(entry.target);
                    } else {
                        // Pause the state machine if its out of view again if you want
                        rive.pause(canvas.dataset.statemachines);
                    }
                }

                // when you're done, unobserve the canvas
                observer.unobserve(entry.target);
            });
        });

        observer.observe(canvas);
    }
}