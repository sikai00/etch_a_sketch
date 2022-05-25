let primaryColor = '#000000';
let rainbowMode = false;

function createGrid(length) {
  const container = document.querySelector('.grid-container');
  container.style.gridTemplateRows = `repeat(${length}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const element = document.createElement('div');
      element.classList.add('grid-element');
      element.classList.add(`col-${j}`);
      element.addEventListener('mousedown', e => onClickAndDrag(e, primaryColor));
      element.addEventListener('mouseenter', e => onClickAndDrag(e, primaryColor));
      container.appendChild(element);
    }
  }
}

function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
}

function onClickAndDrag(e, color) {
  if (e.buttons != 0) {
    if (!rainbowMode) {
      e.target.style.backgroundColor = color;
    } else {
      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      console.log(randomColor);
      e.target.style.backgroundColor = "#" + randomColor;
    }
  }
}

function clearGrid() {
  const container = document.querySelector('.grid-container');
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function getGridLength() {
  return document.querySelector('.grid-length-slider').value;
}

function gridEraser(e) {
  if (e.buttons != 0) {
    const eraseSlider = document.querySelector('.grid-erase-slider');
    const gridContainer = document.querySelector('.grid-container');

    const step = eraseSlider.getAttribute('max') / getGridLength();
    const currCol = Math.round(eraseSlider.value / step) - 1;
    gridContainer.querySelectorAll(`.col-${currCol}`).forEach(x => x.style.backgroundColor = 'white');
  }
}

createGrid(getGridLength());
document.querySelector('.color-picker').addEventListener("change", function(e) {
  primaryColor = e.target.value;
});
document.querySelector('.rainbow-mode-btn').addEventListener('click', toggleRainbowMode);
document.querySelector('.grid-length-slider').addEventListener('mouseup', function(e) {
  clearGrid();
  createGrid(e.target.value);
})
document.querySelector('.grid-erase-slider').addEventListener('mousemove', e => gridEraser(e));