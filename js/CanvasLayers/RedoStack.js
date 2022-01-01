class RedoStack {
  #dataArray;

  constructor() {
    this.#dataArray = [];
  }

  push(val) {
    return this.#dataArray.push(val);
  }

  pop() {
    return this.#dataArray.pop() ?? null;
  }

  // TODO :: Remove if not needed
  peek() {
    const lastIndex = this.size - 1;
    if (lastIndex === -1) return null;
    return this.#dataArray[lastIndex];
  }

  clear() {
    this.#dataArray = [];
  }

  get size() {
    return this.#dataArray.length;
  }
}

export default RedoStack;
