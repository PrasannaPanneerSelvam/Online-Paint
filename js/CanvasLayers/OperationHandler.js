import Deque from './Deque.js';
import RedoStack from './RedoStack.js';
import { mergeTwoLayers } from './Utils.js';

class OperationDeque {
  #canvasDataArray;
  #redoStack;
  #maxCapacity;

  constructor() {
    this.#canvasDataArray = new Deque();
    this.#redoStack = new RedoStack();
    this.#maxCapacity = 5;
  }

  addLayer(newData) {
    this.#canvasDataArray.push_back(newData);
    this.#redoStack.clear();

    if (this.#canvasDataArray.size <= this.#maxCapacity) return this;

    const firstLayer = this.#canvasDataArray.pop_front(),
      secondLayer = this.#canvasDataArray.pop_front();

    const mergedLayer = mergeTwoLayers(firstLayer, secondLayer);
    this.#canvasDataArray.push_front(mergedLayer);

    return this;
  }

  undo() {
    const latestLayerData = this.#canvasDataArray.pop_back();

    if (latestLayerData === null) return this;

    this.#redoStack.push(latestLayerData);
    return this;
  }

  redo() {
    const latestLayerData = this.#redoStack.pop();

    if (latestLayerData === null) return this;

    this.#canvasDataArray.push_back(latestLayerData);
    return this;
  }
}

export default OperationDeque;
