class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(capacity) {
        if (!Number.isInteger(capacity) || capacity < 2) {
            throw new Error('capacity must be an integer >= 2');
        }
        this.#cap = capacity;
        this.#queue = new Array(this.#cap).fill(null);
        this.#front = 0;
        this.#size = 0;
        this.#back = -1;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#cap;
    }

    is_empty() {
        return this.#size === 0;
    }

    is_full() {
        return this.#size === this.#cap;
    }

    clear() {
        this.#queue.fill(null);
        this.#back = -1;
        this.#front = 0;
        this.#size = 0;
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if (this.is_full()) {
            throw new Error('queue overflow');
        }
        this.#back = (this.#back + 1) % this.#cap;
        this.#queue[this.#back] = value;
        this.#size++;
    }

    dequeue() {
        if (this.is_empty()) {
            throw new Error('queue underflow');
        }

        const val = this.#queue[this.#front];
        this.#queue[this.#front] = null;
        this.#front = (this.#front + 1) % this.#cap;
        this.#size--;

        return val;
    }

    peek() {
        if (this.is_empty()) {
            throw new Error('queue is empty');
        }

        return this.#queue[this.#front];
    }

    back() {
        if (this.is_empty()) {
            throw new Error('queue is empty');
        }

        return this.#queue[this.#back];
    }

    print() {
        const q = new Array(this.#size);

        for (let i = 0; i < this.#size; i++) {
            q[i] = this.#queue[(this.#front + i) % this.#cap];
        }

        return q;
    }
}