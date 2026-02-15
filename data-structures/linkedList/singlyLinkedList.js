class Node {
    #value;
    #next = null;

    constructor(val = 0) {
        this.value = val;
        this.#next = null;
    }

    get value() {
        return this.#value;
    }

    set value(val) {
        if (val === undefined) {
            throw new TypeError('value cannot be undefined');
        }
        this.#value = val;
    }

    get next() {
        return this.#next;
    }

    set next(new_node) {
        if (new_node !== null && !(new_node instanceof Node)) {
            throw new TypeError('next must be a Node or null');
        }
        this.#next = new_node;
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable) {
        if (iterable === undefined) {
            return;
        }

        if (iterable !== null && typeof iterable[Symbol.iterator] === 'function') {
            for (const val of iterable) {
                this.push_back(val);
            }
            return;
        }
        
        this.push_back(iterable);
    }

    /* ================= Size & State ================= */

    size() {
       return this.#size; 
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.#head = null;
        this.#size = 0;
    }

    /* ================= Front Access ================= */

    front() {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }

        return this.#head.value;
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        let node = new Node(val);
        let currentHead = this.#head;
        this.#head = node;
        node.next = currentHead;
        ++this.#size;
    }

    push_back(val) {
        const node = new Node(val);
        if (this.isEmpty()) {
            this.#head = node;
        } else {
            const last = this.#get_node(this.#size - 1);
            last.next = node;
        }
        ++this.#size;
    }

    pop_front() {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }

        const remove = this.#head;
        this.#head = this.#head.next;
        --this.#size;

        return remove.value;
    }

    pop_back() {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }

        let remove;

        if (this.#size === 1) {
            remove = this.#head;
            this.#head = null;
        } else {
            const prev = this.#get_node(this.#size - 2)
            remove = prev.next;
            prev.next = null;
        }
        --this.#size;

        return remove.value;
    }

    /* ================= Random-like Access ================= */

    at(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('index is invalid');
        }

        let current = this.#head;
        while (index) {
            current = current.next;
            --index;
        }
        return current.value;
    }

    #get_node(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('index is invalid');
        }

        let current = this.#head;
        
        while (index) {
            current = current.next;
            --index;
        }

        return current;
    }

    insert(index, val) {
        if (index < 0 || index > this.#size) {
            throw new Error('index is invalid');
        }

        if (val === undefined) {
            throw new Error('value cannot be undefined');
        }

        if (index === 0) {
            this.push_front(val);
        }
        if (index === this.#size) {
            this.push_back(val);
        } else {
            const node = this.#get_node(index - 1);
            const last = node.next;
            const newN = new Node(val);
            node.next = newN;
            newN.next = last;
            ++this.#size;
        }
    }

    erase(index) {
        if (index < 0 || index >= this.#size) {
            throw new Error('index is invalid');
        }

        if (index === 0) {
            this.pop_front();
            return;
        }

        if (index === this.#size - 1) {
            this.pop_back();
            return;
        }
        
        let prev = this.#get_node(index - 1);
        
        const skip = prev.next;
        prev.next = skip.next;
        --this.#size;
    }

    remove(value, equals) {
        const equal = typeof equals === 'function'
            ? equals 
            : (a, b) => a === b;

            let remove = 0;
            let current = this.#head;
            let prev = null;

            while (current) {
                if (equal(current.value, value)) {
                    if (prev === null) {
                        this.#head = current.next;
                    } else {
                        prev.next = current.next;
                    }

                    current = current.next;
                    --this.#size;
                    ++remove;
                } else {
                    prev = current;
                    current = current.next;
                }
            }
            return remove;
    }

    /* ================= Algorithms ================= */

    reverse() {
        let prev = null;
        let current = this.#head;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.#head = prev;
    }

    sort(cmp) {
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;
        this.#head = this.#mergeSort(this.#head, cmp);
        return this;
    }
        
    #mergeSort(head, cmp) {
        if (!head || !head.next) return head;

        let slow = head;
        let fast = head.next;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        const right = slow.next;
        slow.next = null;
        const left = head;

        const sortedLeft = this.#mergeSort(left, cmp);
        const sortedRight = this.#mergeSort(right, cmp);

        return this.#merge(sortedLeft, sortedRight, cmp);
    }

    #merge(list1, list2, cmp) {
        if (!list1) return list2;
        if (!list2) return list1;

        let head;
        if (cmp(list1.value, list2.value) <= 0) {
            head = list1;
            list1 = list1.next;
        } else {
            head = list2;
            list2 = list2.next;
        }

        let cur = head;

        while (list1 && list2) {
            if (cmp(list1.value, list2.value) <= 0) {
                cur.next = list1;
                list1 = list1.next;
            } else {
                cur.next = list2;
                list2 = list2.next;
            }
            cur = cur.next;
        }
        cur.next = list1 || list2;
        return head;
    }

    merge(list, cmp) {
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a - b;

        if (!(list instanceof SinglyLinkedList)) {
            throw new TypeError('list must be an instance of SinglyLinkedList');
        }

        let node1 = this.#head;
        while (node1.next) {
            if (cmp(node1.value, node1.next.value) > 0) {
                throw new Error('list is not sorted');
            }
            node1 = node1.next;
        }

        let node2 = list.#head;
        while (node2.next) {
            if (cmp(node2.value, node2.next.value) > 0) {
                throw new Error('list is not sorted');
            }
            node2 = node2.next;
        }

        let a = this.#head;
        let b = list.#head;

        if (cmp(a.value, b.value) <= 0) {
            let current = a;

            while (current.next) {
                current = current.next;
            }

            current.next = b;
        } else {
            let current = b;

            while (current.next) {
                current = current.next;
            }

            current.next = a;
        }
        
    }

    /* ================= Utilities ================= */

    toArray() {
        const array = new Int32Array(this.#size);
        let current = this.#head;
        let i = 0;

        while (current) {
            array[i] = current.value;
            i++;
            current = current.next;
        }
        return array;
    }

    static fromArray(arr) {
        let newListNode = new SinglyLinkedList();
        const n = arr.length;
        let i = 0;

        while (i < n) {
            newListNode.push_back(arr[i]);
            i++;
        }
        return newListNode;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let current = this.#head;

        return {
            next() {
                if (!current) return {value: undefined, done: true};
                const val = current.value
                current = current.next;
                return {
                    value: val,
                    done: false
                };
            }
        };
    }
}