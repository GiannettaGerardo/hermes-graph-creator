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

    addEditorByNode(node) {
        const div = document.createElement('div');
        div.setAttribute('class', 'bar-item');

        Sidebar.addNodeNameEditor(div, node);
        Sidebar.addDoubleNewLine(div);
        Sidebar.addNodeDescEditor(div, node);
        Sidebar.addDoubleNewLine(div);
        Sidebar.addNodeTypeEditor(div, node);

        this.#sidebar.appendChild(div);
    }

    static addDoubleNewLine(div) {
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('br'));
    }

    static addNodeNameEditor(div, node) {
        const id = 'enn' + node.id; // Edit Node Name (enn)
        
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = 'Node name: ';
        label.style.fontWeight = 'bold';
        div.appendChild(label);
        div.appendChild(document.createElement('br'));

        const input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.value = node.name;
        input.style.width = '100%';
        input.addEventListener('input', () => {
            node.name = input.value;
        });
        div.appendChild(input);
    }

    static addNodeDescEditor(div, node) {
        const id = 'end' + node.id; // Edit Node Description (end)
        
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = 'Node description: ';
        label.style.fontWeight = 'bold';
        div.appendChild(label);

        const input = document.createElement('textarea');
        input.id = id;
        input.value = node.description;
        input.style.width = '100%';
        input.addEventListener('input', () => {
            node.description = input.value;
        });
        div.appendChild(input);
    }

    static addNodeTypeEditor(div, node) {
        const label = document.createElement('div');
        label.innerText = 'Node type:';
        label.style.fontWeight = 'bold';
        label.style.marginBottom = '3px';
        div.appendChild(label);

        const nodeTypes = graph.nodeTypes;
        const size = nodeTypes.length;
        for (let i = 0; i < size; ++i) {
            const type = nodeTypes[i]

            const input = document.createElement('input');
            input.type = 'radio';
            input.id = type;
            input.value = type;
            input.name = 'nodetype';
            input.checked = node.type === type;
            input.style.width = '20px';
            input.style.height = '20px';
            input.style.verticalAlign = 'middle';
            input.addEventListener('input', () => {
                node.type = input.value;
            });
            div.appendChild(input);

            const label = document.createElement('label');
            label.htmlFor = type;
            label.innerText = ' ' + type;
            label.style.fontSize = '14px';
            label.style.verticalAlign = 'middle';
            div.appendChild(label);

            if (i < size - 1) {
                div.appendChild(document.createElement('br'));
            }
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