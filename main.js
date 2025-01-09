import { canvas, isInRect, draw } from './modules/canvas.js';
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
    if (graph.sel && e.buttons && isInRect(e.x, e.y)) {
        graph.sel.x = e.x;
        graph.sel.y = e.y;
        toDraw = true;
    }
    if (toDraw) {
        draw();
    }
}

function down(e) {
    if (e.button !== 0) {
        return;
    }
    let target = graph.getNodeWithin(e.x, e.y);
    if (target) {
        graph.sel = target;
        if (graph.tmpEdge) {
            graph.addEdge(graph.tmpEdge.from, graph.sel);
            graph.tmpEdge = undefined;
        }
        draw();
    } else {
        graph.tmpEdge = undefined;
    }
}

function up() {
    closeContextMenu();
    graph.sel = undefined;
    draw();
}

window.onresize = resize;
resize();

window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;