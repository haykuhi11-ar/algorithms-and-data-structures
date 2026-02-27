export default class Stack {
    #stack;
    #size;
    #cap;

    constructor(capacity) {
        if (!Number.isInteger(capacity) || capacity < 2) {
            throw new Error('capacity must be an integer >= 2');
        }

        this.#cap = capacity;
        this.#stack = new Array(this.#cap).fill(null);
        this.#size = 0;
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
        return this.#cap === this.#size;
    }

    clear() {
        for (let i = 0; i < this.#size; i++) {
            this.#stack[i] = null;
        }

        this.#size = 0;
    }

    /* ================= Core Stack Operations ================= */

    push(value) {
        if (this.is_full()) {
            throw new Error('stack overflow');
        }
        this.#stack[this.#size] = value;
        this.#size++;
    }

    pop() {
        if (this.is_empty()) {
            throw new Error('stack is empty');
        }

        const value = this.#stack[this.#size - 1];
        this.#stack[this.#size - 1] = null;
        this.#size--;

        return value;
    }

    peek() {
        if (this.is_empty()) {
            throw new Error('stack is empty');
        }
        return this.#stack[this.#size - 1];
    }
}