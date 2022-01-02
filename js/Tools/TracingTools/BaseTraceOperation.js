import { attachEvents, detachEvents } from './../Common.js';

/********************** Base Tracing Logic ************************/

class BaseTraceOperation {
  #canvas;
  #ctx;

  #toolOnBoard;
  #traceCallBack;
  #eventMap;
  #canvasOffset;
  #drawingCompletionCallback;

  constructor(traceCallBack) {
    this.#traceCallBack = traceCallBack;
    this.#eventMap = {
      mousedown: this.#startDrawing.bind(this),
      mouseup: this.#endDrawing.bind(this),
      mouseleave: this.#endDrawing.bind(this),
      mousemove: this.#traceCursor.bind(this),
    };
    this.#drawingCompletionCallback = () => {};
  }

  #setCanvasProps(inpCanvas) {
    this.#canvas = inpCanvas;
    this.#ctx = this.#canvas.getContext('2d');

    const { x, y } = this.#canvas.getBoundingClientRect();
    this.#canvasOffset = { x, y };
  }

  #startDrawing() {
    this.#toolOnBoard = true;
  }

  #endDrawing() {
    this.#toolOnBoard = false;

    this.#drawingCompletionCallback();
    this.startNewOperation(this.#canvas);
  }

  #traceCursor({ x, y }) {
    x -= this.#canvasOffset.x;
    y -= this.#canvasOffset.y;

    if (this.#toolOnBoard === false) return;

    const callBackInputInfo = {
      ctx: this.#ctx,
      x,
      y,
    };

    this.#traceCallBack(callBackInputInfo);
  }

  startNewOperation(inpCanvas, drawingCompletionCallback) {
    this.#toolOnBoard = false;
    this.#setCanvasProps(inpCanvas);
    this.#drawingCompletionCallback =
      drawingCompletionCallback ?? this.#drawingCompletionCallback;
    attachEvents(this.#canvas, this.#eventMap);
  }

  stopOperation() {
    detachEvents(this.#canvas, this.#eventMap);
    this.#drawingCompletionCallback();
  }
}

export default BaseTraceOperation;
