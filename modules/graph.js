import { context, RADIUS, drawArrowhead, drawArrowheadSimple } from './canvas.js';
import { sidebar } from './sidebar.js';

class Graph {
    #idCounter;
    #capacity;
    #edgesCapacity;
    #nIdx;
    #nodes;
    #eIdx;
    #edges;
    #selection;
    tmpEdge;

    constructor(nodeCapacity, edgeLimit) {
        if (nodeCapacity <= 0) {
            throw new Error('Graph nodeCapacity must be grater than ZERO.');
        }
        this.#capacity = nodeCapacity;
        this.#idCounter = 0;
        this.#selection = undefined;
        this.tmpEdge = undefined;

        this.#nodes = new Array(nodeCapacity);
        this.#nodes.fill(null, 0, nodeCapacity);
        this.#nIdx = -1;

        this.#edgesCapacity = nodeCapacity * (nodeCapacity - 1);
        if (this.#edgesCapacity > edgeLimit) {
            this.#edgesCapacity = edgeLimit;
        }
        this.#edges = new Array(this.#edgesCapacity);
        this.#edges.fill(null, 0, this.#edgesCapacity);
        this.#eIdx = -1;
    }

    addNode(x, y) {
        if (this.#nIdx + 1 >= this.#capacity) {
            return false;
        }
        this.#nodes[++this.#nIdx] = { id: this.#idCounter++, x, y };
        return true;
    }

    removeNode(nodeId) {
        if (nodeId < 0 || nodeId > this.#idCounter) {
            return false;
        }
        const size = this.#nIdx + 1;
        const nodes = this.#nodes;
        for (let i = 0; i < size; ++i) {
            if (nodes[i].id === nodeId) {
                this.removeEdgesByNode(nodes[i]);
                nodes[i] = nodes[this.#nIdx];
                nodes[this.#nIdx] = null;
                --this.#nIdx;
                return true;
            }
        }
        return false;
    }

    getNodeWithin(x, y) {
        const size = this.#nIdx + 1;
        const nodes = this.#nodes;
        for (let i = 0; i < size; ++i) {
            const n = nodes[i];
            if (x > (n.x - RADIUS) && y > (n.y - RADIUS)
                && x < (n.x + RADIUS) && y < (n.y + RADIUS))
            {
                return nodes[i];
            }
        }
        return null;
    }

    newSelection(node) {
        if (!node) { return }
        this.#selection = node;
        sidebar.addEdgesByNode(node);
    }

    getSelection() {
        return this.#selection;
    }

    resetSelection() {
        this.#selection = undefined;
        sidebar.clear();
    }

    drawNodes() {
        const size = this.#nIdx + 1;
        const nodes = this.#nodes;
        context.save();
        context.font = "25px consolas";
        for (let i = 0; i < size; ++i) {
            const node = nodes[i];
            context.beginPath();
            context.strokeStyle = '#009999';
            context.fillStyle = node === this.#selection ? '#88aaaa' : '#22cccc';
            context.arc(node.x, node.y, RADIUS, 0, Math.PI * 2, true);
            context.fill();
            context.stroke();
            context.fillStyle = '#000000';
            context.fillText(node.id, node.x-7, node.y+8);
        }
        context.restore();
    }

    drawTmpEdge() {
        if (!this.tmpEdge) {
            return;
        }
        let { from, to } = this.tmpEdge;
        context.save();
        context.strokeStyle = '#ccaf56';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        drawArrowheadSimple(from.x, from.y, to.x, to.y);
        context.stroke();
        context.restore();
    }

    drawEdges() {
        const edges = this.#edges;
        let i = 0;
        context.save();
        context.strokeStyle = '#ccaf56';
        context.lineWidth = 2;
        while (edges[i] !== null) {
            let { from, to } = edges[i]
            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            drawArrowhead(from.x, from.y, to.x, to.y);
            context.stroke();
            ++i;
        }
        context.restore();
    }

    addEdge(from, to) {
        if (this.#eIdx + 1 >= this.#edgesCapacity
            || from === to) {
            return false;
        }
        const edges = this.#edges;
        let i = 0, edge;
        while ((edge = edges[i++]) !== null) {
            if (edge.from === from && edge.to === to) {
                return false;
            }
        }
        this.#edges[++this.#eIdx] = { from, to };
        return true;
    }

    getEdgesByNode(node) {
        const edges = this.#edges;
        let i = 0;
        const nodeEdges = [];
        while (edges[i] !== null) {
            if (edges[i].from === node) {
                nodeEdges.push(edges[i]);
            }
            ++i;
        }
        return nodeEdges;
    }

    removeEdge(edge) {
        const edges = this.#edges;
        let i = 0;
        while (edges[i] !== null) {
            if (edges[i].from === edge.from && edges[i].to === edge.to) {
                edges[i] = edges[this.#eIdx];
                edges[this.#eIdx] = null;
                --this.#eIdx;
                return true;
            }
            ++i;
        }
        return false;
    }

    removeEdgesByNode(node) {
        const edges = this.#edges;
        let i = 0;
        while (edges[i] !== null) {
            if (edges[i].from === node || edges[i].to === node) {
                edges[i] = edges[this.#eIdx];
                edges[this.#eIdx] = null;
                --this.#eIdx;
            }
            else { ++i; }
        }
    }

    exportToJson() {
        return JSON.stringify({
            nodes: this.#nodes,
            edges: this.#edges.map(e => {
                if (e) {
                    return {from: e.from.id, to: e.to.id}
                }
                return null;
            }),
            idCounter: this.#idCounter
        });
    } 
}

export const graph = new Graph(50, 100);
