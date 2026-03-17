class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 17, loadFactor = 0.75) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new TypeError("Capacity must be a positive integer");
        }

        if (typeof loadFactor !== 'number' || !(loadFactor > 0 && loadFactor <= 1)) {
            throw new TypeError("LoadFactor must be a number & > 0 && <= 1");
        }
        this.#capacity = capacity;
        this.#table = new Array(this.#capacity).fill(null);
        this.#size = 0;
        this.#loadFactor = loadFactor;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#table = new Array(this.#capacity).fill(null);
        this.#size = 0;
    }

    /* ================= Hashing ================= */

    #hash(key) {
        if (typeof key !== 'string') {
            key = toString(key);
        }
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.#capacity;
    }

    /* ================= Core Operations ================= */

    put(key, value) {
        const hash = this.#hash(key);
        let bucket = this.#table[hash];

        if (!bucket) {
            bucket = [];
            this.#table[hash] = bucket;
        }

        for (let entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        
        bucket.push({key, value});
        this.#size++;

        if (this.loadFactor() >= this.#loadFactor) {
            this.#resize();
        }
    }

    get(key) {
        const hash = this.#hash(key);
        const bucket = this.#table[hash];

        if (!bucket) return;

        for (let entry of bucket) {
            if (key === entry.key) {
                return entry.value;
            }
        }
    }

    remove(key) {
        const hash = this.#hash(key);
        const bucket = this.#table[hash];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                const val = bucket[i].value;
                bucket.splice(i, 1);
                this.#size--;
                return val;
            }
        }
    }

    containsKey(key) {
        for (let bucket of this.#table) {
            if (bucket) {
                for (let entry of bucket) {
                    if (entry.key === key) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    containsValue(value) {
        for (let bucket of this.#table) {
            if (bucket) {
                for (let entry of bucket) {
                    if (entry.value === value) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /* ================= Resize / Rehash ================= */

    #resize() {
        const newCap = this.#nextPrime(this.#capacity * 2);
        const oldTable = this.#table;
        this.#table = new Array(newCap);
        this.#capacity = newCap;
        this.#size = 0;
        
        for (let bucket of oldTable) {
            if (!bucket) continue;

            for (let entry of bucket) {
                this.put(entry.key, entry.value);
            }
        }
    }

    #nextPrime(num) {
        while (!this.#isPrime(num)) {
            num++
        }
        return num;
    }

    #isPrime(num) {
        if (num < 2) return false;
        const n = Math.sqrt(num);
        
        for (let i = 2; i < n; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    loadFactor() {
        return this.#size / this.#capacity;
    }

    /* ================= Entry Views ================= */

    keys() {
        const table = this.#table;
        let idx = 0;
        let innerIdx = 0;

        return {
            next: () => {
                while (idx < table.length) {
                    const bucket = table[idx];
                    if (bucket && innerIdx < bucket.length) {
                        return {
                            value: bucket[innerIdx++].key,
                            done: false
                        };
                    }
                    idx++;
                    innerIdx = 0;
                }
                return {
                    done: true
                };
            },
            [Symbol.iterator] () {return this; }
        };
    }

    values() {
        const table = this.#table;
        let idx = 0;
        let innerIdx = 0;

        return {
            next: () => {
                while (idx < table.length) {
                    const bucket = table[idx];
                    if (bucket && innerIdx < bucket.length) {
                        return {
                            value: bucket[innerIdx++].value,
                            done: false
                        };
                    }
                    idx++;
                    innerIdx = 0;
                }
                return {
                    done: true
                };
            },
            [Symbol.iterator] () {return this; }
        };
    }

    entries() {
        const table = this.#table;
        let idx = 0;
        let innerIdx = 0;

        return {
            next: () => {
                while (idx < table.length) {
                    const bucket = table[idx];
                    if (bucket && innerIdx < bucket.length) {
                        return {
                            value: [bucket[innerIdx++].key, bucket[innerIdx].value],
                            done: false
                        };
                    }
                    idx++;
                    innerIdx = 0;
                }
                return {
                    done: true
                };
            },
            [Symbol.iterator] () {return this; }
        };
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        const table = this.#table;
        let idx = 0;
        let innerIdx = 0;

        return {
            next: () => {
                while (idx < table.length) {
                    const bucket = table[idx];
                    if (bucket && innerIdx < bucket.length) {
                        return {
                            value: bucket[innerIdx++],
                            done: false
                        };
                    }
                    idx++;
                    innerIdx = 0;
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }

    /* ================= Utility Operations ================= */

    toObject() {
        const obj = {};

        for (let bucket of this.#table) {
            if (bucket) {
                for (let entry of bucket) {
                    obj[entry.key] = entry.value;
                }
            }
        }
        return obj;
    }

    clone() {
        const newTable = new HashTable(this.#capacity);
        for (let bucket of this.#table) {
            if (bucket) {
                for (let entry of bucket) {
                    newTable.put(entry.key, entry.value);
                }
            }
        }
        return newTable;
    }

    equals(otherTable) {
        if (otherTable.size() !== this.#size) return false;

        for (let bucket of this.#table) {
            if (bucket) {
                for (let entry of bucket) {
                    const value = otherTable.get(entry.key);
                    if (value !== entry.value) return false;
                }
            }
        }
        return true;
    }

    /* ================= Debug / Visualization ================= */

    bucketSizes() {
        const arr = [];
        for (let i = 0; i < this.#capacity; i++) {
            arr[i] = this.#table[i] ? this.#table[i].length : 0;
        }
        return arr;
    }

    print() {
        for (let i = 0; i < this.#capacity; i++) {
            if (!this.#table[i] || this.#table[i].length === 0) {
                console.log(`${i}: empty`);
            } else {
                for (let j = 0; j < this.#table[i].length; j++) {
                console.log(`
                    ${i}: 
                    key: ${this.#table[i][j].key}
                    -> value: ${this.#table[i][j].value}
                    `);
                }
            }
        }
    }
}