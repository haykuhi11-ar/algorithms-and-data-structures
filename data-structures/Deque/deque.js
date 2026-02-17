class Deque {
  #arr;
  #front;
  #back;
  #size;
  #cap;

  constructor(cap = 8) {
    if (!Number.isInteger(cap)) {
      throw new Error('Capacity must be an integer');
    }
    if (cap < 2) {
      throw new Error('Capacity must be >= 2')
    }

    this.#arr = new Array(cap).fill(undefined);
    this.#front = 0;
    this.#back = -1;
    this.#size = 0;
    this.#cap = cap;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#cap;
  }

  empty() {
    return this.#size === 0;
  }

  full() {
    return this.#size === this.#cap;
  }

  /* ================= Internal Helpers ================= */

  #mod(i) {
    return i % this.#cap;
  }

  #index(i) {
    return this.#mod(this.#front + i);
  }

  #ensureCapacityForOneMore() {
    if (!this.full()) return;
    
    const newCap = this.#cap * 2;
    const newArray = new Array(newCap).fill(undefined);
      
    for (let i = 0; i < this.#size; i++) {
        newArray[i] = this.#arr[(this.#front + i) % this.#cap];
    }
    
    this.#cap = newCap;
    this.#arr = newArray;
    this.#front = 0;
    this.#back = this.#size - 1;
  }
  
  /* ================= Element Access ================= */

  front() {
    if (this.empty()) {
      throw new Error('Deque is empty');
    }

    return this.#arr[this.#index(this.#front)];    
  }

  back() {
    if (this.empty()) {
      throw new Error('Deque is empty');
    }

    return this.#arr[this.#index(this.#back)];
  }

  at(i) {
    if (i < 0 || i >= this.#size) {
      throw new Error('invalid index');
    }

    return this.#arr[this.#index(i)];
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    this.#ensureCapacityForOneMore();

    this.#back = this.#mod(this.#back + 1);
    this.#arr[this.#back] = value;
    ++this.#size;
  }

  push_front(value) {
    this.#ensureCapacityForOneMore();

    this.#front = this.#mod(this.#front - 1 + this.#cap);
    this.#arr[this.#front] = value;
    ++this.#size;
  }

  pop_back() {
    if (this.empty()) {
      throw new Error('Deque is empty');
    }

    const remove = this.#arr[this.#back];
    this.#arr[this.#back] = undefined;
    this.#back = this.#mod(this.#back - 1 + this.#cap);
    this.#size--;

    return remove;
  }

  pop_front() {
    if (this.empty()) {
      throw new Error('Deque is empty');
    }

    const remove = this.#arr[this.#front];
    this.#arr[this.#front] = undefined;
    this.#front = this.#mod(this.#front + 1);
    this.#size--;
  
    return remove;
  }

  clear() {
    if (this.empty()) return;

    this.#size = 0;
    this.#front = 0;
    this.#back = -1;
  }

  /* ================= Extended Professional Methods ================= */

  reserve(newCapacity) {
    if (newCapacity < this.#cap) return;

     const newArray = new Array(newCapacity).fill(undefined);
      
    for (let i = 0; i < this.#size; i++) {
        newArray[i] = this.#arr[(this.#front + i) % this.#cap];
    }
    
    this.#cap = newCapacity;
    this.#arr = newArray;
    this.#front = 0;
    this.#back = this.#size - 1;
  }

  shrinkToFit() {
    const newCap = this.#size;
    const newArr = new Array(newCap).fill(undefined);

    for (let i = 0; i < this.#size; i++) {
      newArr[i] = this.#arr[this.#index(i)];
    }
    this.#cap = newCap;
    this.#arr = newArr;
    this.#front = 0;
    this.#back = this.#size - 1;
  }

  rotateLeft(k = 1) {
    if (this.empty()) return;

    k %= this.#size;
    if (k === 0) return;
    
    for (let i = 0; i < k; i++) {
      this.push_back(this.pop_front());
    }
  }

  rotateRight(k = 1) {
    if (this.empty()) return;

    k %= this.#size;
    if (k === 0) return;

    for (let i = 0; i < k; i++) {
      this.push_front(this.pop_back());
    }
  }

  swap(i, j) {
    if (i < 0 || i >= this.#size) {
      throw new Error('i is invalid index');
    }
    if (j < 0 || j >= this.#size) {
      throw new Error('j is invalid index');
    }

    [this.#arr[this.#index(i)], this.#arr[this.#index(j)]] = 
    [this.#arr[this.#index(j)], this.#arr[this.#index(i)]];
  }

  /* ================= Search & Utilities ================= */

  find(value) {
    for (let i = 0; i < this.#size; i++) {
      if (value === this.#arr[this.#index(i)]) {
        return this.#index(i);
      }
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; i++) {
      if (value === this.#arr[this.#index(i)]) {
        return true;
      }
    } 
    return false;
  }

  toArray() {
    const arr = new Array(this.#size);

    for (let i = 0; i < this.#size; i++) {
      arr[i] = this.#arr[this.#index(i)];
    }
    return arr;
  }

  clone() {
    const deque = new Deque(this.#cap);

    for (let i = 0; i < this.#size; i++) {
      deque.#arr[i] = this.#arr[this.#index(i)];
    }
    deque.#front = 0;
    deque.#back = this.#size - 1;
    deque.#size = this.#size;

    return deque;
  }

  equals(otherDeque) {
    if (!(otherDeque instanceof Deque)) return false;

    if (otherDeque.#size !== this.#size) return false;
      
    for (let i = 0; i < this.#size; i++) {
      if (otherDeque.#arr[otherDeque.#index(i)] !== this.#arr[this.#index(i)]) {
        return false;
      }
    }
    return true;
  }

  /* ================= Iteration ================= */

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#size; i++) {
      yield this.#arr[this.#index(i)];
    }
  }

  values() {
    return (function*(deque) {
      for (let i = 0; i < deque.#size; i++) {
        yield deque.#arr[deque.#index(i)];
      }
    })(this);
  }

  keys() {
    return (function*(deque) {
      for (let i = 0; i < deque.#size; i++) {
        yield deque.#index(i);
      }
    })(this);
  }

  entries() {
     return (function*(deque) {
      for (let i = 0; i < deque.#size; i++) {
        yield [deque.#index(i), deque.#arr[deque.#index(i)]];
      }
    })(this);
  }

  /* ================= Functional Style ================= */

  forEach(fn) {
    if (typeof fn !== 'function') {
      throw new Error('forEach callback must be a function');
    }
    for (let i = 0; i < this.#size; i++) {
      const val = this.#arr[this.#index(i)];
      fn(val, i, this);
    }
  }

  map(fn) {
    if (typeof fn !== 'function') {
      throw new Error('map callback must be a function');
    }

    const dq = new Deque(this.#size);

    for (let i = 0; i < this.#size; i++) {
      const val = this.#arr[this.#index(i)];
      dq.#arr[i] = fn(val, i, this);
    }
    dq.#size = this.#size;
    dq.#front = 0;
    dq.#back = this.#size - 1;

    return dq;
  }

  filter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('filter callback must be a function');
    }

    const dq = new Deque(this.#size);
    let idx = 0;

    for (let i = 0; i < this.#size; i++) {
      const val = this.#arr[this.#index(i)];
      if (fn(val, i, this)) {
        dq.#arr[idx++] = val;
      }
    }
    dq.#size = idx;
    dq.#front = 0;
    dq.#back = idx - 1;

    return dq;
  }

  reduce(fn, initial) {
    if (typeof fn !== 'function') {
      throw new Error('reduce callback must be a function');
    }
    if (this.empty()) {
      throw new TypeError('Deque is empty');
    }

    let idx;
    let acc;
    if (initial === undefined) {
      acc = this.#arr[this.#index(0)];
      idx = 1;
    } else {
      acc = initial;
    }

    for (let i = idx; i < this.#size; i++) {
      const val = this.#arr[this.#index(i)];
      acc = fn(acc, val, i, this);
    }

    return acc;
  }
}