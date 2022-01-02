import PaintApp from './CanvasLayers/PaintApp.js';
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

const toolBoxClassName = 'tool-box';

const paintApp = new PaintApp(backgroundCanvas, canvas);
paintApp.startApp(toolBoxClassName);
