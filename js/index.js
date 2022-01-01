import LineOperation from './Line.js';
import RectangleOperation from './Rectangle.js';
import SplineOperation from './Spline.js';
import EllipseOperation from './Ellipse.js';

console.log('Hello world');

const canvas = document.getElementById('paint-area-canvas');

function setCanvasDimensions() {
  const canvasStyleProps = window.getComputedStyle(canvas);
  canvas.width = canvasStyleProps.width.split('px')[0];
  canvas.height = canvasStyleProps.height.split('px')[0];
}

setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

let currentOperation;

const toolIdMap = {
  'line-tool': LineOperation,
  'spline-tool': SplineOperation,
  'rectangle-tool': RectangleOperation,
  'ellipse-tool': EllipseOperation,
};

for (const [id, toolConstructor] of Object.entries(toolIdMap)) {
  const toolButton = document.getElementById(id);
  toolButton.addEventListener('click', () => {
    currentOperation?.stopOperation();
    currentOperation = new toolConstructor();
    currentOperation.startNewOperation(canvas);
  });
}
