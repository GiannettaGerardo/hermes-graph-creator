import { canvas, context, isInRect } from './modules/canvas.js';
import Graph from './modules/graph.js';
import './modules/context-menu.js';

const graph = new Graph(50);
let selection;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    graph.drawEdges();
    graph.drawNodes();
}

function move(e) {
    if (selection && e.buttons && isInRect(e.x, e.y)) {
        selection.x = e.x;
        selection.y = e.y;
        draw();
    }
}

function down(e) {
    let target = graph.getNodeWithin(e.x, e.y);
    if (selection?.selected) {
        selection.selected = false;
    }
    if (target) {
        if (selection && selection !== target) {
            graph.addEdge(selection, target);
        }
        selection = target;
        selection.selected = true;
        draw();
    }
}

function up(e) {
    if (!selection && isInRect(e.x, e.y)) {
        graph.addNode(e);
        draw();
    }
    if (selection && !selection.selected) {
        selection = undefined;
    }
    draw();
}

function deleteNode(e) {
    if (selection && e.key === 'Delete') {
        const id = selection.id;
        graph.removeNode(id);
        selection = undefined;
        draw();
    }
}

window.onresize = resize;
resize();

window.onkeydown = deleteNode;
window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;
