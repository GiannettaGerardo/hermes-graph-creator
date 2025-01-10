import { graph } from './graph.js';
import { draw } from './canvas.js';

class Sidebar {
    #sidebar;

    constructor() {
        this.#sidebar = document.getElementById('sidebar');
    }

    addEdgesByNode(node) {
        const edges = graph.getEdgesByNode(node);
        const size = edges.length;
        for (let i = 0; i < size; ++i) {
            const div = document.createElement('div');
            div.setAttribute('class', 'bar-item');
            div.style.display = 'inline-flex';
            div.style.alignItems = 'center';
            div.style.width = '100%';

            const btnDelete = document.createElement('button');
            btnDelete.setAttribute('class', 'button');
            btnDelete.innerText = "X";
            btnDelete.style.backgroundColor = 'red';
            btnDelete.style.color = 'white';
            btnDelete.style.paddingLeft = '10px';
            btnDelete.style.paddingRight = '10px';
            btnDelete.style.borderRadius = '7px';
            btnDelete.addEventListener('click', () => {
                graph.removeEdge(edges[i]);
                div.remove();
                draw();
            })
            div.appendChild(btnDelete);

            const btnEdit = document.createElement('button');
            btnEdit.setAttribute('class', 'button');
            btnEdit.style.width = '100%';
            btnEdit.style.marginLeft = '14px';
            btnEdit.style.marginRight = '24px';
            btnEdit.style.fontSize = '14px';
            btnEdit.innerText = 'edge { from: ' + edges[i].from.id + ', to: ' + edges[i].to.id + ' }';
            div.appendChild(btnEdit);
            
            this.#sidebar.appendChild(div);
        }
    }
    
    clear() {
        const nodes = this.#sidebar.childNodes;
        while (nodes.length > 2) {
            this.#sidebar.removeChild(nodes[nodes.length - 1])
        }
    }
}

export const sidebar = new Sidebar();

const exportBtn = document.getElementById('export-btn');

exportBtn.addEventListener('click', () => {
    console.log(graph.exportToJson());
});