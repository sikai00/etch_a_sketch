function createGrid(length) {
  const container = document.querySelector('.grid-container');
  container.style.gridTemplateRows = `repeat(${length}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
  for (let i = 0; i < length * length; i++) {
    const element = document.createElement('div');
    element.classList.add('grid-element');
    element.addEventListener('mousedown', e => onClick(e, 'blue'));
    element.addEventListener('mouseenter', e => onClickAndDrag(e, 'blue'));
    container.appendChild(element);
  }
}

function onClickAndDrag(e, color) {
  if (e.buttons != 0) {
    e.target.style.backgroundColor = color;
  }
}

function onClick(e, color) {
  e.target.style.backgroundColor = color;
}

createGrid(10);