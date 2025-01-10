import { canvas, draw } from './canvas.js';
import { graph } from './graph.js';

const contextMenuStyle = document.getElementById('contextMenu').style;
const newNodeBtn = document.getElementById('new-node-btn');
const newEdgeBtn = document.getElementById('new-edge-btn');
const deleteNodeBtn = document.getElementById('delete-node-btn');
let ctxMenuX = 0;
let ctxMenuY = 0;

canvas.addEventListener('contextmenu', ev => {
    ev.preventDefault();
    ctxMenuX = ev.x;
    ctxMenuY = ev.y;
    contextMenuStyle.left = ctxMenuX + 'px';
    contextMenuStyle.top =  ctxMenuY + 'px';
    contextMenuStyle.visibility = 'visible';
});

newNodeBtn.addEventListener('click', () => {
    const targetNode = graph.getNodeWithin(ctxMenuX, ctxMenuY);
    closeContextMenu();
    if (!targetNode) {
        graph.addNode(ctxMenuX, ctxMenuY);
        draw();
    }
});

newEdgeBtn.addEventListener('click', ev => {
    const targetNode = graph.getNodeWithin(ctxMenuX, ctxMenuY);
    closeContextMenu();
    if (targetNode) {
        graph.tmpEdge = { from: targetNode, to: ev }
        draw();
    }
});

deleteNodeBtn.addEventListener('click', () => {
    const targetNode = graph.getNodeWithin(ctxMenuX, ctxMenuY);
    closeContextMenu();
    if (targetNode) {
        graph.removeNode(targetNode.id);
        graph.resetSelection();
        draw();
    }
});

export function closeContextMenu() {
    contextMenuStyle.visibility = 'hidden';
}