import BaseTraceOperation from './BaseTraceOperation.js';

class BrushOperation extends BaseTraceOperation {
  constructor() {
    const brushRadius = 5;
    function traceBrushTool({ ctx, x, y }) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.arc(x, y, brushRadius, 0, 2 * Math.PI);
      ctx.fill();
    }

    super(traceBrushTool);
  }
}

export default BrushOperation;
