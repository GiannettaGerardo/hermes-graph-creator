import { context, RADIUS, drawArrowhead } from './canvas.js';

export default class Graph {
    #idCounter;
    #capacity;
    #idx;
    #nodes;

    constructor(maxCapacity) {
        if (maxCapacity <= 0) {
            throw new Error('Graph maxCapacity must be grater than ZERO.');
        }
        this.#capacity = maxCapacity;
        this.#idCounter = 0;
        this.#nodes = new Array(maxCapacity);
        this.#nodes.fill(null, 0, this.#nodes.length);
        this.#idx = -1;
    }

    addNode(event) {
        if (this.#idx + 1 >= this.#capacity) {
            return false;
        }
        this.#nodes[++this.#idx] = {
            id: this.#idCounter++,
            x: event.x,
            y: event.y,
            selected: false,
            to: new Array()
        };
        return true;
    }

    removeNode(nodeId) {
        if (nodeId < 0 || nodeId > this.#idCounter) {
            return false;
        }
        const size = this.#idx + 1;
        const nodes = this.#nodes;
        for (let i = 0; i < size; ++i) {
            if (nodes[i].id === nodeId) {
                this.#removeEdgesByNode(nodes[i]);
                nodes[i] = nodes[this.#idx];
                nodes[this.#idx] = null;
                --this.#idx;
                return true;
            }
        }
        return false;
    }

    getNodeWithin(x, y) {
        const size = this.#idx + 1;
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

    drawNodes() {
        const size = this.#idx + 1;
        const nodes = this.#nodes;
        context.save();
        context.strokeStyle = '#009999';
        for (let i = 0; i < size; ++i) {
            const node = nodes[i];
            context.beginPath();
            context.fillStyle = node.selected ? '#88aaaa' : '#22cccc';
            context.arc(node.x, node.y, RADIUS, 0, Math.PI * 2, true);
            context.fill();
            context.stroke();
        }
        context.restore();
    }

    drawEdges() {
        const size = this.#idx + 1;
        const nodes = this.#nodes;
        context.save();
        context.strokeStyle = '#ccaf56';
        context.lineWidth = 2;
        for (let i = 0; i < size; ++i) {
            const node = nodes[i];
            for (const edge of node.to) {
                context.beginPath();
                context.moveTo(node.x, node.y);
                context.lineTo(edge.x, edge.y);
                drawArrowhead(node.x, node.y, edge.x, edge.y);
                context.stroke();
            }
        }
        context.restore();
    }

    addEdge(from, to) {
        const size = this.#idx + 1;
        const nodes = this.#nodes;
        for (let i = 0; i < size; ++i) {
            if (nodes[i] === from) {
                if (nodes[i].to.find(n => n === to)) {
                    return false;
                }
                nodes[i].to.push(to);
                return true;
            }
        }
        return false;
    }

    #removeEdgesByNode(node) {
        let edgeIdx;
        const nodeId = node.id;
        const size = this.#idx + 1;
        const nodes = this.#nodes;
        for (let i = 0; i < size; ++i) {
            if (nodes[i].id !== nodeId 
                && (edgeIdx = nodes[i].to.findIndex(n => n === node)) !== -1) {
                nodes[i].to.splice(edgeIdx, 1);
            }
        }
    }
}

