import LineOperation from './Line.js';
import RectangleOperation from './Rectangle.js';
import SplineOperation from './Spline.js';

console.log('Hello world');

const canvas = document.getElementById('paint-area-canvas');

const spline = new SplineOperation(),
  line = new LineOperation(),
  rectangle = new RectangleOperation();
