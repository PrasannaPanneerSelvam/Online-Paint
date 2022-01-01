import BaseTraceOperation from './BaseTraceOperation.js';

class EraserOperation extends BaseTraceOperation {
  constructor() {
    const eraserSize = 10;
    function traceEraserTool({ ctx, x, y }) {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.rect(x, y, eraserSize, eraserSize);
      ctx.fill();
    }

    super(traceEraserTool);
  }
}

export default EraserOperation;
