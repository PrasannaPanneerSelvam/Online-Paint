import {
  LineOperation,
  RectangleOperation,
  SplineOperation,
  EllipseOperation,
  RightAngledTriangleOperation,
  TriangleOperation,
  DiamondOperation,
  PenOperation,
  BrushOperation,
  EraserOperation,
} from './Tools/Tools.js';

console.log('Hello world');

const canvas = document.getElementById('paint-area-canvas'),
  backgroundCanvas = document.getElementById('drawing-store-canvas');

function setCanvasDimensions() {
  const canvasStyleProps = window.getComputedStyle(canvas);
  canvas.width = canvasStyleProps.width.split('px')[0];
  canvas.height = canvasStyleProps.height.split('px')[0];

  backgroundCanvas.width = canvasStyleProps.width.split('px')[0];
  backgroundCanvas.height = canvasStyleProps.height.split('px')[0];
}

setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

let currentOperation;

const ids = [
  'line-tool',
  'spline-tool',
  'rectangle-tool',
  'ellipse-tool',
  'right-angled-triangle-tool',
  'triangle-tool',
  'diamond-tool',
  'pen-tool',
  'brush-tool',
  'eraser-tool',
];

const toolIdMap = {
  'line-tool': LineOperation,
  'spline-tool': SplineOperation,
  'rectangle-tool': RectangleOperation,
  'ellipse-tool': EllipseOperation,
  'right-angled-triangle-tool': RightAngledTriangleOperation,
  'triangle-tool': TriangleOperation,
  'diamond-tool': DiamondOperation,
  'pen-tool': PenOperation,
  'brush-tool': BrushOperation,
  'eraser-tool': EraserOperation,
};

const toolBoxes = document.getElementsByClassName('tool-box');

for (let idx = 0; idx < ids.length; idx++) {
  const toolButton = toolBoxes[idx];

  if (!toolButton) {
    console.error('Insufficient tool boxes');
    break;
  }

  toolButton.id = ids[idx];
  toolButton.addEventListener('click', () => {
    currentOperation?.stopOperation();
    currentOperation = new toolIdMap[toolButton.id]();
    currentOperation.startNewOperation(canvas);
  });
}
