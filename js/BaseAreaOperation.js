import { attachEvents, detachEvents } from './Common.js';

/********************** Base Area ************************/

class BaseAreaOperation {
  #canvas;
  #ctx;
  #startX;
  #startY;
  #drawShapeCallback;
  #eventMap;
  #canvasOffset;

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

    const { x, y } = this.#canvas.getBoundingClientRect();
    this.#canvasOffset = { x, y };
  }

  #startDrawing({ x, y }) {
    x -= this.#canvasOffset.x;
    y -= this.#canvasOffset.y;
    this.#startX = x;
    this.#startY = y;
  }

  #endDrawing() {
    this.#startX = null;
    this.#startY = null;
  }

  #drawLine({ x, y }) {
    x -= this.#canvasOffset.x;
    y -= this.#canvasOffset.y;

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
