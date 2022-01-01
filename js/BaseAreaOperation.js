import { attachEvents, detachEvents } from './Common.js';

/********************** Base Area ************************/

class BaseAreaOperation {
  #canvas;
  #ctx;
  #startX;
  #startY;
  #drawShapeCallback;
  #eventMap;

  constructor(drawShapeCallback) {
    this.#drawShapeCallback = drawShapeCallback;
    this.#eventMap = {
      mousedown: this.#startDrawing.bind(this),
      mouseup: this.#endDrawing.bind(this),
      mouseleave: this.#endDrawing.bind(this),
      mousemove: this.#drawLine.bind(this),
    };
  }

  #setCanvasProps(inpCanvas) {
    this.#canvas = inpCanvas;
    this.#ctx = this.#canvas.getContext('2d');
  }

  #startDrawing({ x, y }) {
    this.#startX = x;
    this.#startY = y;
  }

  #endDrawing({ x, y }) {
    this.#startX = null;
    this.#startY = null;
  }

  #drawLine({ x, y }) {
    if (this.#startX === null) return;

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    const callBackInputInfo = {
      ctx: this.#ctx,
      startX: this.#startX,
      startY: this.#startY,
      endX: x,
      endY: y,
    };

    this.#drawShapeCallback(callBackInputInfo);
  }

  startNewOperation(inpCanvas) {
    this.#startX = this.#startY = null;
    this.#setCanvasProps(inpCanvas);
    attachEvents(this.#canvas, this.#eventMap);
  }

  stopOperation() {
    detachEvents(this.#canvas, this.#eventMap);
  }
}

export default BaseAreaOperation;
