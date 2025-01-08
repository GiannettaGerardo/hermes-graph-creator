import { canvas } from './canvas.js';

const { mainDiv, dropdownBtn } = createContextMenu();

canvas.addEventListener('contextmenu', ev => {
    ev.preventDefault();
    setPosition(ev.x, ev.y);
    dropdownBtn.update();
    dropdownBtn.show();
})

function setPosition(x, y) {
    mainDiv.style.left = x + 'px';
    mainDiv.style.top =  (y - 20) + 'px';
}

function createContextMenu() {
    /*const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'dropdown');
    mainDiv.setAttribute('id', 'contextMenu');
    mainDiv.style.position = 'absolute';

    const hiddenBtn = document.createElement('button');
    hiddenBtn.setAttribute('data-bs-toggle', 'dropdown');
    hiddenBtn.style.visibility = 'hidden';
  
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'dropdown-menu');
  
    let li = document.createElement('li');
    let h6 = document.createElement('h6');
    h6.setAttribute('class', 'dropdown-header');
    h6.innerText = 'Contextual actions';
    li.appendChild(h6);
    ul.appendChild(li);

    li = document.createElement('li');
    let btn = document.createElement('button');
    btn.setAttribute('class', 'dropdown-item');
    btn.innerText = 'New node';
    li.appendChild(btn);
    ul.appendChild(li);

    li = document.createElement('li');
    btn = document.createElement('button');
    btn.setAttribute('class', 'dropdown-item');
    btn.innerText = 'Delete node';
    li.appendChild(btn);
    ul.appendChild(li);

    mainDiv.appendChild(hiddenBtn);
    mainDiv.appendChild(ul);*/

    const mainDiv = document.getElementById('contextMenu');
    document.body.appendChild(mainDiv);
    return { mainDiv, dropdownBtn: new bootstrap.Dropdown(mainDiv.firstElementChild) };
}