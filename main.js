let primaryColor = '#000000';
let rainbowMode = false;
let darkenMode = false;
let lightenMode = false;
let gridlines = true;

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

  // Darken mode button
  document.querySelector('.darken-mode-btn').addEventListener('click', toggleDarkenMode);

  // Lighten mode button
  document.querySelector('.lighten-mode-btn').addEventListener('click', toggleLightenMode);

  // Gridlines button
  document.querySelector('.gridlines-btn').addEventListener('click', toggleGridlines);

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
      element.classList.add(`row-${i}`);
      element.classList.add(`col-${j}`);
      element.style.backgroundColor = 'rgb(255, 255, 255)';
      element.addEventListener('mousedown', e => sketch(e, primaryColor));
      element.addEventListener('mouseenter', e => sketch(e, primaryColor));
      container.appendChild(element);
    }
  }
  if (!gridlines) {
    removeGridlines();
  }
}

function sketch(e, color) {
  if (e.buttons != 0) {
    if (rainbowMode) {
      const randomInt = () => Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(
        ${randomInt()}, ${randomInt()}, ${randomInt()})`;
    } else if (darkenMode) {
      const curr = parseRgb(e.target.style.backgroundColor);
      e.target.style.backgroundColor = `rgb(
        ${curr['r'] - 10}, ${curr['g'] - 10}, ${curr['b'] - 10})`;
    } else if (lightenMode) {
      const curr = parseRgb(e.target.style.backgroundColor);
      e.target.style.backgroundColor = `rgb(
        ${curr['r'] + 10}, ${curr['g'] + 10}, ${curr['b'] + 10})`;
    } else {
      e.target.style.backgroundColor = color;
    }
  }
}

function parseRgb(rgb) {
  let result = /^rgb\((\d{0,3}), *(\d{0,3}), *(\d{0,3})\)$/.exec(rgb);
  return result ? {
    r : parseInt(result[1]),
    g : parseInt(result[2]),
    b : parseInt(result[3])
  } : null;
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
      element => element.style.backgroundColor = 'rgb(255, 255, 255)'
    );
  }
}

// Miscellaneous functions
function resetOtherMode(currentMode) {
  if (currentMode != "rainbowMode") {
    document.querySelector('.rainbow-mode-btn').classList.remove('pressed');
    rainbowMode = false;
  }
  if (currentMode != "darkenMode") {
    document.querySelector('.darken-mode-btn').classList.remove('pressed');
    darkenMode = false;
  }
  if (currentMode != "lightenMode") {
    document.querySelector('.lighten-mode-btn').classList.remove('pressed');
    lightenMode = false;
  }
}

function toggleRainbowMode() {
  resetOtherMode("rainbowMode");
  const btn = document.querySelector('.rainbow-mode-btn');
  btn.classList.toggle('pressed');
  rainbowMode = !rainbowMode;
}

function toggleDarkenMode() {
  resetOtherMode("darkenMode");
  const btn = document.querySelector('.darken-mode-btn');
  btn.classList.toggle('pressed');
  darkenMode = !darkenMode;
}

function toggleLightenMode() {
  resetOtherMode("lightenMode");
  const btn = document.querySelector('.lighten-mode-btn');
  btn.classList.toggle('pressed');
  lightenMode = !lightenMode;
}

function removeGridlines() {
  document.querySelectorAll('.grid-container .grid-element').forEach(element => {
    const isBottomElements = element.className.includes(`row-${getGridLength() - 1}`);
    const isRightElements = element.className.includes(`col-${getGridLength() - 1}`)
    if (!isBottomElements) {
      if (element.style.borderBottom == '0px') {
        element.style.borderBottom = '1px solid black';
      } else {
        element.style.borderBottom = '0px';
      }
    }
    if (!isRightElements) {
      if (element.style.borderRight == '0px') {
        element.style.borderRight = '1px solid black';
      } else {
        element.style.borderRight = '0px';
      }
    }
  });
}

function toggleGridlines() {
  removeGridlines();
  const btn = document.querySelector('.gridlines-btn');
  btn.classList.toggle('pressed');
  gridlines = !gridlines;
}

function getGridLength() {
  return document.querySelector('.grid-length-slider').value;
}