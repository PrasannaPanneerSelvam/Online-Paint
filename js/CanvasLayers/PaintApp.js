import OperationQueue from './OperationQueue.js';
import { mergeTwoLayers } from './Utils.js';

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
      maxCapacity: 5,
    });
  }

  #storeDataToBackgroundCanvas() {
    console.log('hi da');
    const height = this.#activeCanvas.height,
      width = this.#activeCanvas.width;

    const newData = this.#activeCtx.getImageData(0, 0, width, height);

    const existingData = this.#storeCtx.getImageData(0, 0, width, height);

    const mergedNumericData = mergeTwoLayers({
      existingData,
      newData,
      height,
      width,
    });

    function foo(inpData, boardToCopy) {
      for (let i = 0; i < inpData.length; i++) boardToCopy[i] = inpData[i];
    }

    const newBoard = this.#activeCtx.createImageData(width, height);

    const mergedData = foo(mergedNumericData, newBoard);

    this.#storeCtx.putImageData(mergedData, 0, 0);

    this.#operationQueue.addLayer(mergedData);
  }

  startApp(toolBoxClassName) {
    const toolBoxes = document.getElementsByClassName(toolBoxClassName);

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
  }
}

export default PaintApp;
