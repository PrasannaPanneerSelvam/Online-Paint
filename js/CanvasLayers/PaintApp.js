import OperationQueue from './OperationQueue.js';
import { mergeTwoLayers } from './Utils.js';
import { setDefaultColor, colorChanged } from '../Tools/colorPicker.js';

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
} from './../Tools/Tools.js';

function IdToolsMap() {
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

  return { ids, toolIdMap };
}

class PaintApp {
  #activeCanvas;
  #activeCtx;
  #storeCanvas;
  #storeCtx;

  #operationQueue;
  #selectedTool;

  constructor(storeCanvas, activeCanvas) {
    this.#storeCanvas = storeCanvas;
    this.#activeCanvas = activeCanvas;

    this.#storeCtx = this.#storeCanvas.getContext('2d');
    this.#activeCtx = this.#activeCanvas.getContext('2d');
    this.#selectedTool = null; // TODO :: Preset to some tool

    const height = this.#activeCanvas.height,
      width = this.#activeCanvas.width;
    this.#operationQueue = new OperationQueue({
      height,
      width,
      maxCapacity: 10,
    });
  }

  #storeDataToBackgroundCanvas() {
    console.log('hi da');
    const height = this.#activeCanvas.height,
      width = this.#activeCanvas.width;

    const newData = this.#activeCtx.getImageData(0, 0, width, height).data;

    const existingData = this.#storeCtx.getImageData(0, 0, width, height).data;

    const mergedNumericData = mergeTwoLayers({
      existingData,
      newData,
      height,
      width,
    });

    function copyNumericDataToNewImageData(dataTobeWritten) {
      const mergedImageData = this.#activeCtx.createImageData(width, height),
        boardToCopy = mergedImageData.data;

      for (let i = 0; i < dataTobeWritten.length; i++) {
        boardToCopy[i] = dataTobeWritten[i];
      }

      return mergedImageData;
    }

    const mergedImageData = copyNumericDataToNewImageData.call(
      this,
      mergedNumericData
    );

    this.#storeCtx.putImageData(mergedImageData, 0, 0);
    this.#activeCtx.clearRect(0, 0, width, height);

    this.#operationQueue.addLayer(mergedImageData);
  }

  #undo() {
    const latestCanvasData = this.#operationQueue.undo();
    console.log('undo', latestCanvasData);

    if (latestCanvasData !== null) {
      this.#storeCtx.putImageData(latestCanvasData, 0, 0);
    } else {
      const height = this.#activeCanvas.height,
        width = this.#activeCanvas.width;
      this.#storeCtx.clearRect(0, 0, width, height);
    }
  }

  #redo() {
    const latestCanvasData = this.#operationQueue.redo();
    console.log('redo', latestCanvasData);

    if (latestCanvasData !== null)
      this.#storeCtx.putImageData(latestCanvasData, 0, 0);
  }

  startApp(toolBoxClassName) {
    const toolBoxes = document.getElementsByClassName(toolBoxClassName);

    const redoButton = document.getElementById('redo'),
      undoButton = document.getElementById('undo');
    const colorPicker = document.getElementById('colorPicker');

    const drawingCompletionCallback =
        this.#storeDataToBackgroundCanvas.bind(this),
      { ids, toolIdMap } = IdToolsMap();

    for (let idx = 0; idx < ids.length; idx++) {
      const toolButton = toolBoxes[idx];

      if (!toolButton) {
        console.error('Insufficient tool boxes');
        break;
      }

      toolButton.id = ids[idx];
      toolButton.addEventListener('click', () => {
        this.#selectedTool?.stopOperation();
        this.#selectedTool = new toolIdMap[toolButton.id](
          drawingCompletionCallback
        );
        this.#selectedTool.startNewOperation(
          this.#activeCanvas,
          drawingCompletionCallback
        );
      });
    }

    undoButton.addEventListener('click', this.#undo.bind(this));
    redoButton.addEventListener('click', this.#redo.bind(this));

    setDefaultColor(colorPicker);
    colorPicker.addEventListener('change', colorChanged);
  }
}

export default PaintApp;
