/**
 * Physics.js - The Jelly Simulation
 */

const { Engine, Render, Runner, Bodies, Composite, Composites, Constraint, MouseConstraint, Mouse, Events } = Matter;

// 1. Setup the Engine & World
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 0; // Floating jellies

// 2. Setup the Canvas
const canvas = document.getElementById('jelly-canvas');
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Set to false for solid colors
        background: 'transparent'
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// 3. The Jelly Creator Function
function createJellySquare(x, y, size) {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    
    // Create a 4x4 grid of particles for each box
    const jelly = Composites.stack(x, y, 4, 4, 0, 0, (x, y) => {
        return Bodies.circle(x, y, 5, {
            frictionAir: 0.08,
            render: { fillStyle: color }
        });
    });

    // Link particles with "Springs" (Mesh) to make them act like jelly
    Composites.mesh(jelly, 4, 4, false, {
        stiffness: 0.05, // Lower = more viscous/jiggle
        render: { strokeStyle: color, lineWidth: 1 }
    });

    Composite.add(world, jelly);
}

// 4. Create the 3x3 Grid
const spacing = window.innerWidth / 4;
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        createJellySquare(i * spacing - 50, j * spacing - 50, 60);
    }
}

// 5. Interaction (Touching/Dragging)
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.1,
        render: { visible: false }
    }
});

Composite.add(world, mouseConstraint);
render.mouse = mouse; // Required for iPhone touch

// 6. Real-time Color Sync
// This ensures that when you change the color in Settings, the jellies update
Events.on(engine, 'beforeUpdate', () => {
    const newColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const glowColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    
    Composite.allBodies(world).forEach(body => {
        if (body.render) {
            body.render.fillStyle = newColor;
            // Add a slight glow effect to the particles
            body.render.shadowBlur = 15;
            body.render.shadowColor = glowColor;
        }
    });
});

// 7. Handle Window Resize
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});