import { attachEvents, detachEvents } from './Common.js';

/********************** Spline ************************/

class SplineOperation {
  #canvas;
  #ctx;
  #point1X;
  #point1Y;
  #point2X;
  #point2Y;
  #point3X;
  #point3Y;
  #point4X;
  #point4Y;
  #operation;
  #eventMap;
  #canvasOffset;

  constructor() {
    this.#eventMap = {
      mousedown: this.#startDrawing.bind(this),
      mouseup: this.#endDrawing.bind(this),
      mouseleave: this.#endDrawing.bind(this),
      mousemove: this.#drawSpline.bind(this),
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
    if (this.#operation === 'line') {
      this.#point1X = x;
      this.#point1Y = y;
    } else if (this.#operation === 'control1') {
      this.#point3X = x;
      this.#point3Y = y;
    } else if (this.#operation === 'control2') {
      this.#point4X = x;
      this.#point4Y = y;
    } else {
      this.#operation = '';
      this.stopOperation();
    }
  }

  #endDrawing() {
    if (this.#operation === 'line') {
      this.#operation = 'control1';
    } else if (this.#operation === 'control1') {
      this.#operation = 'control2';
    } else {
      this.#operation = '';
      this.stopOperation();
    }
  }

  #drawSpline({ x, y }) {
    x -= this.#canvasOffset.x;
    y -= this.#canvasOffset.y;

    if (this.#operation === 'line' && this.#point1X !== null) {
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

      this.#point2X = x;
      this.#point2Y = y;

      this.#ctx.beginPath();
      this.#ctx.strokeStyle = 'red';
      this.#ctx.moveTo(this.#point1X, this.#point1Y);
      this.#ctx.lineTo(this.#point2X, this.#point2Y);
      this.#ctx.closePath();
      this.#ctx.stroke();
    } else if (this.#operation === 'control1' && this.#point3X !== null) {
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

      this.#point3X = x;
      this.#point3Y = y;

      this.#ctx.beginPath();
      this.#ctx.strokeStyle = 'red';
      this.#ctx.moveTo(this.#point1X, this.#point1Y);
      this.#ctx.quadraticCurveTo(
        this.#point3X,
        this.#point3Y,
        this.#point2X,
        this.#point2Y
      );
      this.#ctx.stroke();
    } else if (this.#operation === 'control2' && this.#point4X !== null) {
      this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

      this.#point4X = x;
      this.#point4Y = y;

      this.#ctx.beginPath();
      this.#ctx.strokeStyle = 'red';
      this.#ctx.moveTo(this.#point1X, this.#point1Y);
      this.#ctx.bezierCurveTo(
        this.#point3X,
        this.#point3Y,
        this.#point4X,
        this.#point4Y,
        this.#point2X,
        this.#point2Y
      );
      this.#ctx.stroke();
    }
  }

  startNewOperation(inpCanvas) {
    this.#point1X =
      this.#point1Y =
      this.#point2X =
      this.#point2Y =
      this.#point3X =
      this.#point3Y =
      this.#point4X =
      this.#point4Y =
        null;
    this.#operation = 'line';

    this.#setCanvasProps(inpCanvas);
    attachEvents(this.#canvas, this.#eventMap);
  }

  stopOperation() {
    detachEvents(this.#canvas, this.#eventMap);
  }
}

export default SplineOperation;
