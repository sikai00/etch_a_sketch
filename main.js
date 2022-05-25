let primaryColor = '#000000';
let rainbowMode = false;

// Main program
function main() {
  createGrid(getGridLength());
  setUpControls();
}

main();

// Main program helper functions
// Set up event listeners for the controls, including the grid erase slider
function setUpControls() {
  // Color picker
  document.querySelector('.color-picker').addEventListener('change', function(e) {
    primaryColor = e.target.value;
  });

  // Rainbow mode button
  document.querySelector('.rainbow-mode-btn').addEventListener('click', toggleRainbowMode);

  // Grid length slider
  document.querySelector('.grid-length-slider').addEventListener('mouseup', function(e) {
    clearGrid();
    createGrid(e.target.value);
    const gridLength = getGridLength();
    document.querySelector('.grid-length').textContent = gridLength + " x " + gridLength;
  })
  const gridLength = getGridLength();
  document.querySelector('.grid-length').textContent = gridLength + " x " + gridLength;

  // Grid erase slider
  document.querySelector('.grid-erase-slider').addEventListener('mousemove', e => gridEraser(e));
}


// Sketchboard related functions
function createGrid(length) {
  const container = document.querySelector('.grid-container');
  container.style.gridTemplateRows = `repeat(${length}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const element = document.createElement('div');
      element.classList.add('grid-element');
      element.classList.add(`col-${j}`);
      element.addEventListener('mousedown', e => sketch(e, primaryColor));
      element.addEventListener('mouseenter', e => sketch(e, primaryColor));
      container.appendChild(element);
    }
  }
}

function sketch(e, color) {
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

function gridEraser(e) {
  if (e.buttons != 0) {
    const eraseSlider = document.querySelector('.grid-erase-slider');
    const step = eraseSlider.getAttribute('max') / getGridLength();
    const currCol = Math.round(eraseSlider.value / step) - 1;

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.querySelectorAll(`.col-${currCol}`).forEach(
      element => element.style.backgroundColor = null
    );
  }
}

// Miscellaneous functions
function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
}

function getGridLength() {
  return document.querySelector('.grid-length-slider').value;
}