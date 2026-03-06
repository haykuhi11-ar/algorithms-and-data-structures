import Queue from "../../data-structures/Queue/queue.js";
import Stack from "../../data-structures/Stack/stack.js";

class Node {
    value;
    left = null;
    right = null;
    height = 1;

    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {
    #root;
    #size = 0;

    constructor() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
       return this.#size === 0;
    }

    clear() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Core AVL Operations ================= */

    insert(value) {
        this.#root = this.#insert(this.#root, value);
    }

    delete(value) {
        this.#root = this.#delete(this.#root, value);
    }

    search(value) {
        return this.#search(this.#root, value);
    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
       return Math.max(
        this.#getHeight(this.#root.left), 
        this.#getHeight(this.#root.right)
        );
    }

    getMin() {
        return this.#getMin(this.#root);
    }

    getMax() {
        return this.#getMax(this.#root);
    }

    /* ================= Traversals ================= */

    levelOrder() {
        if (this.is_empty()) return [];

        const q = new Queue(this.#size);
        const res = [];
        q.enqueue(this.#root);

        while (!q.is_empty()) {
            const size = q.size();
            const level = [];

            for (let i = 0; i < size; i++) {
                const node = q.dequeue();
                level.push(node.value);

                if (node.left) q.enqueue(node.left);
                if (node.right) q.enqueue(node.right);
            }
            res.push(level);
        }
        return res;
    }

    preorder_rec() {
       const res = [];
       return this.#preorder_rec(this.#root, res);
    }

    preorder_itr() {
        if (!this.#root) return [];

        const stack = new Stack(this.#size);
        const res = [];
        stack.push(this.#root);

        while (!stack.is_empty()) {
            const node = stack.pop();
            res.push(node.value);

            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        return res;
    }

    inorder_rec() {
        const res = [];
        return this.#inorder_rec(this.#root, res);
    }

    inorder_itr() {
        if (!this.#root) return [];

        const stack = new Stack(this.#size);
        const res = [];
        let current = this.#root;

        while (current || !stack.is_empty()) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            res.push(current.value);
            current = current.right;
        }
        return res;
    }

    postorder_rec() {
        const res = [];
        return this.#postorder_rec(this.#root, res);
    }

    postorder_itr() {
        if (!this.#root) return [];

        const stack1 = new Stack(this.#size);
        const stack2 = new Stack(this.#size);
        const res = [];
        stack1.push(this.#root);

        while (!stack1.is_empty()) {
            const node = stack1.pop();
            stack2.push(node);

            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }

        while (!stack2.is_empty()) {
            res.push(stack2.pop().value);
        }

        return res;
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        if (!node) {
            this.#size++;
            return new Node(value);
        }


        if (value < node.value) {
            node.left = this.#insert(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.#insert(node.right, value);
        }
        return this.#reBalance(node);
    }

    #delete(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.#delete(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.#delete(node.right, value);
        } else {
            if (!node.left && !node.right) {
                this.#size--;
                return null;
            }
            else if (!node.left || !node.right) {
                this.#size--;
                return node.left || node.right;
            } else {
                const successor = this.#getMin(node.right);
                node.value = successor.value;
                node.right = this.#delete(node.right, successor.value);
            }
        }
        node.height = this.#update(node);
        return this.#reBalance(node);
    }

    #reBalance(node) {
        if (!node) return null;

        const bf = this.#balanceFactor(node);

        if (bf > 1) {
            if (this.#balanceFactor(node.left) < 0) {
                node.left = this.#rotateLeft(node.left);
            }
            node = this.#rotateRight(node);
        }
        else if (bf < -1) {
            if (this.#balanceFactor(node.right) > 0) {
                node.right = this.#rotateRight(node.right);
            }
            node = this.#rotateLeft(node);
        }
        
        return node;
    }

    #balanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    #rotateLeft(node) {
        if (!node || !node.right) return node;

        let x = node.right;
        let y = x.left;
        x.left = node;
        node.right = y;

        node.height = this.#update(node);
        x.height = this.#update(x);

        return x;
    }

    #rotateRight(node) {
        if (!node || !node.left) return node;

        let x = node.left;
        let y = x.right;
        x.right = node;
        node.left = y;

        node.height = this.#update(node);
        x.height = this.#update(x);

        return x;
    }

    #getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if (!node) return null;
        if (!node.left) return node;
        return this.#getMin(node.left);
    }

    #getMax(node) {
        if (!node) return null;
        if (!node.right) return node.value;
        return this.#getMax(node.right);
    }

    #search(node, value) {
        if (!node) return false;

        if (value === node.value) return true;
        if (value < node.value) {
            return this.#search(node.left, value)
        } else {
            return this.#search(node.right, value);
        }
    }

    #validate(node, min, max) {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;

        return this.#validate(node.left, min, node.val) 
            && this.#validate(node.right, node.val, max);
    }

    #update(node) {
        return 1 + Math.max(
            this.#getHeight(node.left),
            this.#getHeight(node.right)
        );
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if (!node) return [];
        res.push(node.value);
        this.#preorder_rec(node.left, res);
        this.#preorder_rec(node.right, res);
        return res;
    }

    #inorder_rec(node, res) {
        if (!node) return [];
        this.#inorder_rec(node.left, res);
        res.push(node.value);
        this.#inorder_rec(node.right, res);
        return res;
    }

    #postorder_rec(node, res) {
        if (!node) return [];
        this.#postorder_rec(node.left, res);
        this.#postorder_rec(node.right, res);
        res.push(node.value);
        return res;
    }

    /* ================= Advanced AVL Utilities ================= */

    isBalanced() {
        const bf = this.#balanceFactor(this.#root);
        return bf >= -1 && bf <= 1;
    }

    validateBST() {
        return this.#validate(this.#root, -Infinity, Infinity);
    }

    findSuccessor(value) {
        const arr = this.inorder_rec();
        let idx = arr.indexOf(value);

        if (idx === -1 || idx === arr.length - 1) return null;
        return arr[idx + 1];
    }

    findPredecessor(value) {
        const arr = this.inorder_rec();
        let idx = arr.indexOf(value);

        if (idx <= 0) return null;
        return arr[idx - 1];
    }

    toArray() {
        const arr = this.inorder_rec();
        return arr;
    }

    clone() {
        if (!this.#root) return null;

        const newAVL = new AVL();
        const stack = new Stack(this.#size);
        stack.push(this.#root);

        while (!stack.is_empty()) {
            const node = stack.pop();
            newAVL.insert(node.value);

            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        return newAVL;
    }

    equals(otherTree) {
        if (!otherTree.size() !== this.size()) return false;

        const arr = [this.#root];
        const otherArr = [otherTree.#root];

        while (arr.length > 0) {
            const node = arr.pop();
            const otherNode = otherArr.pop();

            if ((node.left && !otherNode.left) || (!node.left && otherNode.left)) {
                return false;
            } 
            else if (node.left && otherNode.left) {
                arr.push(node.left);
                otherArr.push(otherNode.left);
            }
            if ((node.right && !otherNode.right) || (!node.right && otherNode.right)) {
                return false;
            } 
            else if (node.right && otherNode.right) {
                arr.push(node.right);
                otherArr.push(otherNode.right);
            }
        }
        return true;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        const arr = this.inorder_rec();
        let index = 0;

        return {
            next: () => {
                if (index < arr.length) {
                    return {
                        value: arr[index++],
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
        const arr = this.inorder_rec();
        let index = 0;

        return {
            next: () => {
                if (index < arr.length) {
                    return {
                        value: arr[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            },
            [Symbol.iterator]() {return this}
        };
    }

    entries() {
        const arr = this.inorder_rec();
        let index = 0;

        return {
            next: () => {
                if (index < arr.length) {
                    return {
                        value: [index, arr[index++]],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            },
            [Symbol.iterator]() {return this}
        };
    }
}
