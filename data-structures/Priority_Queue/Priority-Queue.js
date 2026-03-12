class Priority_Queue {
    #heap;
    #cmp;
    #size;

    #max_heap;
    #min_heap;

    constructor(cmp = (a, b) => a - b) {
        if (typeof cmp !== "function") {
            throw new TypeError("cmp must be function");
        }
        this.#heap = [];
        this.#cmp = cmp;
        this.#size = 0;
        if (this.#cmp(1, 2) <= 0) {
            this.#min_heap = true;
            this.#max_heap = false;
        } else {
            this.#max_heap = true;
            this.#min_heap = false;
        }
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    clear() {
       this.#heap = [];
       this.#size = 0;
    }

    comparator() {
       return this.#cmp;
    }

    /* ================= Access Operations ================= */

    peek() {
        if (this.is_empty()) return;
        return this.#heap[0];
    }

    /* ================= Modification Operations ================= */

    add(value) {
        this.#heap.push(value);

        if (this.#min_heap) {
            this.#shift_up_for_min_heap(this.#size);
        } else {
            this.#shift_up_for_max_heap(this.#size);
        }
        this.#size++;
    }

    pop() {
        if (this.is_empty()) return;
        this.#swap(0, this.#size - 1);
        const value = this.#heap.pop();
        this.#size--;

        if (!this.is_empty()) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(0);
            } else {
                this.#shift_down_for_max_heap(0);
            }
        }
        return value;
    }

    remove(value) {
        const idx = this.#indexOf(value);
        if (idx === -1) return;

        this.#swap(idx, 0);
        this.pop();

        if (idx < this.#size) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(idx);
                this.#shift_up_for_min_heap(idx);
            } else {
                this.#shift_down_for_max_heap(idx);
                this.#shift_up_for_min_heap(idx);
            }
        }
    }

    /* ================= Heap Utilities ================= */

    toArray() {
        return [...this.#heap];
    }

    /* ================= Index Helpers ================= */

    #get_parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #get_left_child(index) {
        return 2 * index + 1;
    }

    #get_right_child(index) {
        return 2 * index + 2;
    }

    #swap(i, j) {
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }

    /* ================= Heap Maintenance ================= */

    #shift_up_for_min_heap(index) {
        if (index === 0) return;

        const parent = this.#get_parent(index);
        if (this.#heap[index] < this.#heap[parent]) {
            this.#swap(index, parent);
            this.#shift_up_for_min_heap(parent);
        }
    }

    #shift_up_for_max_heap(index) {
        if (index === 0) return;

        const parent = this.#get_parent(index);
        if (this.#heap[index] > this.#heap[parent]) {
            this.#swap(index, parent);
            this.#shift_up_for_max_heap(parent);
        }
    }

    #shift_down_for_min_heap(index) {
        const leftChild = this.#get_left_child(index);
        const rightChild = this.#get_right_child(index);
        let min = index;

        if (leftChild < this.#size && this.#heap[leftChild] < this.#heap[min]) {
            min = leftChild; 
        }
        if (rightChild < this.#size && this.#heap[rightChild] < this.#heap[min]) {
            min = rightChild;
        }

        if (index !== min) {
            this.#swap(index, min);
            this.#shift_down_for_min_heap(min);
        }
    }

    #shift_down_for_max_heap(index) {
        const leftChild = this.#get_left_child(index);
        const rightChild = this.#get_right_child(index);
        let max = index;

        if (leftChild < this.#size && this.#heap[leftChild] > this.#heap[max]) {
            max = leftChild;
        }
        if (rightChild < this.#size && this.#heap[rightChild] > this.#heap[max]) {
            max = rightChild;
        }

        if (index !== max) {
            this.#swap(index, max);
            this.#shift_down_for_max_heap(max);
        }
    }

    /* ================= Search Utility ================= */

    #indexOf(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.#heap[i] === value) {
                return i;
            }
        }
        return -1;
    }

    /* ================= Advanced Heap Operations ================= */

    heapify(array) {
        this.#heap = [...array];
        this.#size = array.length;
        const parent = this.#get_parent(this.#size - 1);


        for (let i = parent; i >= 0; i--) {
            if (this.#min_heap) {
                this.#shift_down_for_min_heap(i);
            } else {
                this.#shift_down_for_max_heap(i);
            }
        }
    }

    replace(value) {
        const root = this.peek();
        this.#heap[0] = value;
        if (this.#min_heap) {
            this.#shift_down_for_min_heap(0);
        } else {
            this.#shift_down_for_max_heap(0);
        }

        return root;
    }

    contains(value) {
        const index = this.#indexOf(value);
        if (index >= 0) return true;
        return false;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        const heap = this.#heap;
        let i = 0;

        return {
            next: () => {
                if (i < heap.length) {
                    return {
                        value: heap[i],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }

    values() {
        const heap = this.#heap;
        let i = 0;

        return {
            next: () => {
                if (i < heap.length) {
                    return {
                        value: heap[i],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            },
            [Symbol.iterator] () {return this; }
        }
    }

    entries() {
        const heap = this.#heap;
        let i = 0;

        return {
            next: () => {
                if (i < heap.length) {
                    return {
                        value: [i, heap[i]],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            },
            [Symbol.iterator] () {return this; }
        }
    }
}