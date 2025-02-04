import * as rive from "@rive-app/canvas";

export class JoyrideRiveAnimation {
    private target: string;

    constructor(target: string) {
        this.target = target;
    }

    init() {
        const canvases = document.querySelectorAll<HTMLCanvasElement>(this.target);

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
        switch (functionName) {
            case 'scroll-runner':
                this.scrollRunner(rive, canvas);
                break;
            case 'cursor-tracking':
                this.cursorTracking(rive, canvas);
                break;
            case 'view-play':
                this.viewPlay(rive, canvas);
                break;
            default:
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
                input.value = true;
            }

            isScrolling = true;

            // Clear previous timeout
            clearTimeout(timeout);

            // Set a timeout to detect when scrolling stops
            timeout = setTimeout(() => {
                isScrolling = false;

                input.value = false;
            }, 1); // Adjust delay as needed
        });
    }

    private cursorTracking(rive: rive.Rive, canvas: HTMLCanvasElement) {
        // Resize the Rive drawing surface to match the canvas size.
        rive.resizeDrawingSurfaceToCanvas();
    
        // Retrieve the inputs for the specified state machine.
        const inputs = rive.stateMachineInputs(canvas.dataset.statemachines ?? '');
    
        // Find the x and y axis inputs.
        const xInput = inputs.find(({ name }) => name === "x-axis");
        const yInput = inputs.find((input) => input.name === "y-axis");
    
        if (!xInput || !yInput) {
            console.warn("Input not found");
            return;
        }
    
        // Listen for mouse movements over the entire document.
        document.addEventListener("mousemove", function (e) {
            // Get the canvas's position and dimensions.
            const rect = canvas.getBoundingClientRect();
    
            // Calculate the mouse position relative to the canvas.
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            // Optional: Clamp values so they don't exceed 0-100 if the mouse is off the canvas.
            const clampedX = Math.max(0, Math.min(rect.width, x));
            const clampedY = Math.max(0, Math.min(rect.height, y));
    
            // Convert the relative coordinates to a percentage (0-100).
            // When the mouse is in the center of the canvas, these will be 50.
            xInput.value = (clampedX / rect.width) * 100;
            yInput.value = (clampedY / rect.height) * 100;
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