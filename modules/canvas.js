import { graph } from './graph.js';

export const canvas = document.getElementById('myCanvas');
export const context = canvas.getContext('2d');
export const RADIUS = 20;

const MAIN_Y = 48;

export function isInRect(x, y) {
    return y > MAIN_Y && x > 0 && y < canvas.height && x < canvas.width;
}

export function drawArrowhead(x0, y0, x1, y1) {
    const r = 17; // the radius of the arrowhead. This controls how "thick" the arrowhead looks.
    const distance = Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0)));

    const t = RADIUS / distance;
    const xt = ((1 - t) * x1) + (t * x0);
    const yt = ((1 - t) * y1) + (t * y0);

    const angle = Math.atan2(y0 - yt, x0 - xt);
    let delta = Math.PI / 6;

    for (let i = 0; i < 2; ++i) {
        context.moveTo(xt, yt);
        const x = xt + r * Math.cos(angle + delta);
        const y = yt + r * Math.sin(angle + delta);
        context.lineTo(x, y);
        delta *= -1;
    }
}

export function drawArrowheadSimple(x0, y0, x1, y1) {
    const r = 17; // the radius of the arrowhead. This controls how "thick" the arrowhead looks.
    const angle = Math.atan2(y0 - y1, x0 - x1);
    let delta = Math.PI / 6;

    for (let i = 0; i < 2; ++i) {
        context.moveTo(x1, y1);
        const x = x1 + r * Math.cos(angle + delta);
        const y = y1 + r * Math.sin(angle + delta);
        context.lineTo(x, y);
        delta *= -1;
    }
}

export function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    graph.drawEdges();
    graph.drawNodes();
    graph.drawTmpEdge();
}