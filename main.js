import { canvas, draw } from './modules/canvas.js';
import { graph } from './modules/graph.js';
import { closeContextMenu } from './modules/context-menu.js';

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function move(e) {
    let toDraw = false;
    if (graph.tmpEdge) {
        graph.tmpEdge.to = e;
        toDraw = true;
    }
    const selection = graph.getSelection();
    if (selection && e.buttons) {
        selection.x = e.x;
        selection.y = e.y;
        toDraw = true;
    }
    if (toDraw) {
        draw();
    }
}

function down(e) {
    graph.resetSelection();
    if (e.button === 1) {
        return;
    }
    let target = graph.getNodeWithin(e.x, e.y);
    if (target) {
        graph.newSelection(target);
        if (graph.tmpEdge) {
            graph.addEdge(graph.tmpEdge.from, graph.getSelection());
            graph.tmpEdge = undefined;
        }
        draw();
    } else {
        graph.tmpEdge = undefined;
    }
}

function up() {
    closeContextMenu();
    draw();
}

window.onresize = resize;
resize();

canvas.addEventListener('mousemove', move);
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', up);
