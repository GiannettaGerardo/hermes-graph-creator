import { graph } from './graph.js';
import { draw } from './canvas.js';

class Sidebar {
    static #sidebar;
    static #nodeInfo;
    static #nameInput;
    static #descInput;
    static #taskRadio;
    static #forwardRadio;
    static #joinRadio;
    static #endingRadio;
    #ptr;

    constructor() {
        Sidebar.#sidebar = document.getElementById('sidebar');
        Sidebar.#nodeInfo = document.getElementById('node-info');
        Sidebar.#nameInput = document.getElementById('enn');
        Sidebar.#descInput = document.getElementById('end');
        Sidebar.#taskRadio = document.getElementById('TASK');
        Sidebar.#forwardRadio = document.getElementById('FORWARD');
        Sidebar.#joinRadio = document.getElementById('JOIN');
        Sidebar.#endingRadio = document.getElementById('ENDING');
        
        this.#ptr = { node: undefined };

        Sidebar.#nameInput.oninput = () => this.#ptr.node.name = Sidebar.#nameInput.value;
        Sidebar.#descInput.oninput = () => this.#ptr.node.description = Sidebar.#descInput.value;
        Sidebar.#taskRadio.oninput = () => this.#ptr.node.type = Sidebar.#taskRadio.value;
        Sidebar.#forwardRadio.oninput = () => this.#ptr.node.type = Sidebar.#forwardRadio.value;
        Sidebar.#joinRadio.oninput = () => this.#ptr.node.type = Sidebar.#joinRadio.value;
        Sidebar.#endingRadio.oninput = () => this.#ptr.node.type = Sidebar.#endingRadio.value;
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
            
            Sidebar.#sidebar.appendChild(div);
        }
    }

    addEditorByNode(node) {
        this.#ptr.node = node;
        
        Sidebar.#nameInput.value = node.name;
        Sidebar.#descInput.value = node.description;
        Sidebar.#taskRadio.checked = node.type === 'TASK';
        Sidebar.#forwardRadio.checked = node.type === 'FORWARD';
        Sidebar.#joinRadio.checked = node.type === 'JOIN';
        Sidebar.#endingRadio.checked = node.type === 'ENDING';

        Sidebar.#nodeInfo.style.visibility = 'visible';
    }
    
    clear() {
        Sidebar.#nodeInfo.style.visibility = 'hidden';
        const nodes = Sidebar.#sidebar.childNodes;
        while (nodes.length > 4) {
            Sidebar.#sidebar.removeChild(nodes[nodes.length - 1])
        }
    }
}

export const sidebar = new Sidebar();

const exportBtn = document.getElementById('export-btn');

exportBtn.addEventListener('click', () => {
    console.log(graph.exportToJson());
});