import { bubbleSort } from '../../algorithms/sorting/bubbleSort/bubble-sort.js';
import {quickSort} from '../../algorithms/sorting/quickSort/quick-sort.js';

class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap = 0, fill = 0) {
        if (cap < 0) {
            throw new Error("Capacity must be non-negative");
        }
        if (!Number.isInteger(cap)) {
            throw new Error('cap must be an integer');
        }
        if (!Number.isInteger(fill)) {
            throw new Error('fill must be an integer');
        }

        this.#arr = new Array(cap).fill(fill);
        this.#size = cap;
        this.#capacity = cap;
    }

    /* ================= Capacity ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    empty() {
       return (this.#size === 0);
    }

    reserve(n) {
        if (n > this.#capacity) {
            const newArr = new Array(n);

            for (let i = 0; i < this.#size; i++) {
                newArr[i] = this.#arr[i];
            }

            this.#arr = newArr;
            this.#capacity = n;
        }
    }

    shrinkToFit() {
        const reallocArr = new Array(this.#size);

        for (let j = this.#size - 1; j >= 0; j--) {
            reallocArr[j] = this.#arr[j];
        }

        this.#arr = reallocArr;
        this.#capacity = this.#size;
    }

    clear() {
       for (let i = 0; i < this.#size; i++) {
        this.#arr[i] = 0;
       }

       this.#size = 0;
    }

    /* ================= Element Access ================= */

    at(i) {
        if (i < 0 || i >= this.#size) {
            throw new Error("Index out of bounds");
        }
        if (!Number.isInteger(i)) {
            throw new Error('i must be an integer');
        }

        return this.#arr[i];
    }

    set(i, value) {
        if (i < 0 || i >= this.#size) {
            throw new Error("Index out of bounds");
        }

        if (!Number.isInteger(i)) {
            throw new Error('i must be an integer');
        }
        if (!Number.isInteger(value)) {
            throw new Error('value must be an integer');
        }

        this.#arr[i] = value;
    }

    front() {
        if (this.empty()) {
            throw new Error('array is empty');
        }

        return this.at(0);
    }

    back() {
        if (this.empty()) {
            throw new Error('array is empty');
        }

        return this.at(this.#size - 1);
    }

    toArray() {
        const array = new Array(this.#size);

        for (let i = 0; i < this.#size; i++) {
            array[i] = this.#arr[i];
        }

        return array;
    }

    /* ================= Modifiers ================= */

    pushBack(value) {
        if (!Number.isInteger(value)) {
            throw new Error('value must be an integer');
        }

        if (this.#capacity === 0) {
            this.#capacity = 1;
            const ar = new Array(this.#capacity);
        }

        if (this.#size === this.#capacity) {
            this.#resize(this.#capacity * this.#GROWTH);
        }
        this.#arr[this.#size] = value;
        this.#size++;
    }

    popBack() {
        if (this.empty()) {
            throw new Error("Array is empty");
        }

        const removeElement = this.#arr[this.#size - 1];
        this.#arr[this.#size - 1] = 0;
        this.#size--;

        return removeElement;
    }

    insert(pos, value) {
        if (pos < 0 || pos > this.#size) {
            throw new Error("Inndex out of bounds");
        }
        if (!Number.isInteger(pos)) {
            throw new Error('Index must be an integer');
        }
        if (!Number.isInteger(value)) {
            throw new Error('value must be an integer');
        }

        if (this.#size === this.#capacity) {
            const cap = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.#resize(cap);
        }
        
        for (let i = this.#size; i > pos; i--){
            this.#arr[i] = this.#arr[i - 1];
        }

        this.#arr[pos] = value;
        this.#size++;
    }

    erase(pos) {
        if (pos < 0 || pos >= this.#size) {
            throw new Error("Index out of bounds");
        }

        for (let i = pos; i < this.#size - 1; i++) {
            this.#arr[i] = this.#arr[i + 1];
        }

        this.#arr[this.#size - 1] = 0;
        this.#size--;
    }

    #resize(n) {
        if (n <= 0) {
            throw new Error('n must be >= 0');
        }

        const newArr = new Array(n);

        if (this.#size > n) {
            this.#size = n;
        }
            
            for (let i = 0; i < this.#size; i++) {
            newArr[i] = this.#arr[i];
            }

        this.#arr = newArr;
        this.#capacity = n;
    }

    swap(i, j) {
       if ((i < 0 || i >= this.#size) || (j < 0 || j >= this.#size)) {
        throw new Error("Index out of bounds");
       }

       [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index >= this.#size) {
                    return { done: true };
                }

                return { 
                    value : this.#arr[index++],
                    done: false,
                };
            }
        };
    }

    values() {
       let index = 0;

        return {
            next: () => {
                if (index >= this.#size) {
                    return { done: true };
                }

                return {
                    value: this.#arr[index++],
                    done: false,
                };
            }
        };
    }

    keys() {
        let index = 0;

        return {
            next: () => {
                if (index >= this.#size) {
                    return { done: true };
                }

                return {
                    value: index++,
                    done: false,
                }
            }
        }
    }

    entries() {
        let index = 0;

        return {
            next: () => {
                if (index >= this.#size) {
                    return { done: true };
                }

                return {
                    value: [index, this.#arr[index++]],
                    done: false,
                };
            }
        };
    }

    /* ================= High Order ================= */

    forEach(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('forEach expects a function');
        }

        for (let i = 0; i < this.#size; i++) {
            fn(this.#arr[i], i, this);
        }
    }

    map(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('map expects a function');
        }

        const newArr = new DynamicArray(this.#size);

        for (let i = 0; i < this.#size; i++) {
           newArr.set(i, fn(this.#arr[i], i, this));
        }

        return newArr;
    }

    filter(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('filter expects a function');
        }

        const array = new DynamicArray();
        let j = 0;
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                array.pushBack(this.#arr[i]);
                j++;
            }
        }

        return array;
    }

    reduce(fn, initial) {
        if (typeof fn !== 'function') {
            throw new TypeError('reduce expects a function');
        }

        if (this.empty() && initial === undefined) {
            throw new Error("Cannot reduce empty array without initial value");
        }

        let acc;
        let i;

        if (initial !== undefined) {
           acc = initial;
           i = 0;

        } else {
            acc = this.#arr[0];
            i = 1;
        }

        for (; i < this.#size; i++) {
           acc = fn(acc, this.#arr[i], i, this);
        }

        return acc;
    }

    some(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('some expects a function');
        }

        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return true;
            }
        }

        return false;
    }

    every(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('every expects a function');
        }

        for (let j = 0; j < this.#size; j++) {
            if (!(fn(this.#arr[j], j, this))) {
                return false;
            }
        }

        return true;
    }

    find(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('find expects a function');
        }

        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return this.#arr[i];
            }
        }

        return undefined;
    }

    findIndex(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('findIndex expects a function');
        }

        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return i;
            }
        }

        return -1;
    }

    includes(value) {
        for (let j = 0; j < this.#size; j++) {
            if (value === this.#arr[j]) {
                return true;
            }
        }
        
        return false;
    }

    /* ================= Extensions ================= */

    reverse() {
        for (let i = 0, j = this.#size - 1; i < j; i++, j--) {
            this.swap(i, j);
        }
    }

    sort(compareFn) {
        compareFn = typeof compareFn === 'function' ? compareFn : (a, b) => a - b;
        
        if (this.#size <= 1) return;

        if (this.#size <= 100) {
            bubbleSort(this.#arr, compareFn);
        } else {
            quickSort(this.#arr, 0, this.#size - 1, compareFn);
        }
    }

    clone() {
        const dynamicArray = new DynamicArray(this.#size);

        for (let i = 0; i < this.#size; i++) {
            dynamicArray.#arr[i] = this.#arr[i];
        }

        return dynamicArray;
    }

    equals(other) {
        if (!(other instanceof DynamicArray)) {
            return false;
        }
        if (other.#size !== this.#size) {
            return false;
        }

        for (let i = 0; i < this.#size; i++) {
            if (other.#arr[i] !== this.#arr[i]) {
                return false;
            }
        }

        return true;
    }
}
