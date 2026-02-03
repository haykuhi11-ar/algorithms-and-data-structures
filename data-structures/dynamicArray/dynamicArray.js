class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap = 0, fill = 0) {
        if (cap < 0) {
            throw new Error("Capacity must be non-negative");
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

        return this.#arr[i];
    }

    set(i, value) {
        if (i < 0 || i >= this.#size) {
            throw new Error("Index out of bounds");
        }

        if (typeof value !== "number") {
            throw new Error("Value must be a number");
        }

        this.#arr[i] = value;
    }

    front() {
        return this.at(0);
    }

    back() {
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
        if (typeof value !== "number") {
            throw new Error("Value must be a number");
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

        if (this.#size === this.#capacity) {
            this.#resize(this.#capacity * this.#GROWTH);
        }

        const array = new Array(this.#size + 1);
        
        for (let i = 0; i < pos; i++){
            array[i] = this.#arr[i];
        }

        array[pos] = value;

        for (let j = pos + 1; j < array.length; j++){
            array[j] = this.#arr[j];
        }

        this.#arr = array;
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
        const newArr = new Array(n);

        if (this.#size > n) {
            this.#size = n;
            
            for (let i = 0; i < this.#size; i++) {
            newArr[i] = this.#arr[i];
            }
        } else {

            for (let i = 0; i < this.#size; i++) {
            newArr[i] = this.#arr[i];
            }
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
        for (let i = 0; i < this.#size; i++) {
            fn(this.#arr[i], i, this);
        }
    }

    map(fn) {
        const newArr = new DynamicArray(this.#size);

        for (let i = 0; i < this.#size; i++) {
           newArr.set(i, fn(this.#arr[i], i, this));
        }

        return newArr;
    }

    filter(fn) {
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
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return true;
            }
        }
        return false;
    }

    every(fn) {
        for (let j = 0; j < this.#size; j++) {
            if (!(fn(this.#arr[j], j, this))) {
                return false;
            }
        }
        return true;
    }

    find(fn) {
        for (let i = 0; i < this.#size; i++) {
            if (fn(this.#arr[i], i, this)) {
                return this.#arr[i];
            }
        }
        return undefined;
    }

    findIndex(fn) {
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
            [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
        }
    }

    sort(compareFn) {
        if (this.#size <= 1) return;
        
        for (let i = 0; i < this.#size - 1; i++) {
            let flag = false;
            for (let j = 0; j < this.#size - i - 1; j++) {
                if (compareFn(this.#arr[j], this.#arr[j + 1]) > 0) {
                    [this.#arr[j], this.#arr[j + 1]] = [this.#arr[j + 1], this.#arr[j]];
                    flag = true;
                }
            }
            if (!flag) break;
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