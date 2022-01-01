// Just for alias
class Deque {
  #dataArray;

  constructor() {
    this.#dataArray = [];
  }

  push_back(val) {
    return this.#dataArray.push(val);
  }

  pop_back() {
    return this.#dataArray.pop() ?? null;
  }

  push_front(val) {
    return this.#dataArray.unshift(val);
  }

  pop_front() {
    return this.#dataArray.shift() ?? null;
  }

  peek_front() {
    return this.#dataArray[0] ?? null;
  }

  peek_back() {
    const lastIndex = this.size - 1;
    if (lastIndex === -1) return null;
    return this.#dataArray[lastIndex];
  }

  get size() {
    return this.#dataArray.length;
  }
}

export default Deque;
