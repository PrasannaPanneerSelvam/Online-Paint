import Deque from './Deque.js';
import RedoStack from './RedoStack.js';
import { mergeTwoLayers } from './Utils.js';

class OperationQueue {
  #canvasDataArray;
  #redoStack;
  #maxCapacity;

  #height;
  #width;

  constructor({ height, width, maxCapacity }) {
    this.#canvasDataArray = new Deque();
    this.#redoStack = new RedoStack();
    this.#maxCapacity = maxCapacity;

    // TODO :: Take from the caller function dynamically?
    this.#height = height;
    this.#width = width;
  }

  addLayer(newData) {
    this.#canvasDataArray.push_back(newData);
    this.#redoStack.clear();

    if (this.#canvasDataArray.size <= this.#maxCapacity) return this;

    const firstLayer = this.#canvasDataArray.pop_front(),
      secondLayer = this.#canvasDataArray.pop_front();

    const mergeDetails = {
      existingData: firstLayer,
      newData: secondLayer,
      height: this.#height,
      width: this.#width,
    };

    const mergedLayer = mergeTwoLayers(mergeDetails);
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

export default OperationQueue;
