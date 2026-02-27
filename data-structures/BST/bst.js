import Queue from '../../data-structures/Queue/queue.js';
import Stack from '../../data-structures/Stack/stack.js';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    #root;
    #size;

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

    /* ================= Insert / Delete ================= */

    insert(value) {
        this.#root = this.#_insert(this.#root, value);
    }

    delete(value) {
        this.#root = this.#_delete(this.#root, value);
    }

    contains(value) {
        if (!this.#root) return false;
    
        let node = this.#root;

        while (node) {
            if (node.value === value) return true;
            if (node.value > value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        return false;
    }

    /* ================= Height & Depth ================= */

    get_height() {
        return this.#_get_height(this.#root);
    }

    get_depth(value) {
        let current = this.#root;
        let depth = 0;

        while (current) {
            if (current.value === value) {
                return depth;
            }
            
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }
      
        return -1;
    }

    /* ================= Min / Max ================= */

    find_min() {
        return this.#_find_min(this.#root);
    }

    find_max() {
        return this.#_find_max(this.#root);
    }

    /* ================= Traversals ================= */

    level_order() {
        if (!this.#root) return null;

        const que = new Queue(this.#size);
        que.enqueue(this.#root);
        const result = [];

        while (!que.is_empty()) {
            let length = que.size();

            for (let i = 0; i < length; i++) {
                const node = que.dequeue();
                result.push(node.value);

                if (node.left) que.enqueue(node.left);
                if (node.right) que.enqueue(node.right);
            }
        }
        return result;
    }

    inorder_rec() {
        const result = [];
        this.#_inorder(this.#root, result);
        return result;
    }

    inorder_itr() {
        if (!this.#root) return null;

        const stack = new Stack(this.#size);
        let current = this.#root;
        const result = [];

        while (current || !stack.is_empty()) {
            while (current) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.push(current.value);
            current = current.right;
        }
        return result;
    }

    preorder_rec() {
        const result = [];
        this.#_preorder(this.#root, result);
        return result;
    }

    preorder_itr() {
        if (!this.#root) return null;
        const stack = new Stack(this.#size);
        stack.push(this.#root);
        const result = [];

        while (!stack.is_empty()) {
            const node = stack.pop();

            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
            
            result.push(node.value);
        }
        
        return result;
    }

    postorder_rec() {
        const result = [];
        this.#_postorder(this.#root, result);
        return result;
    }

    postorder_itr() {
        if (!this.#root) return null;

        const stack1 = new Stack(this.#size);
        const stack2 = new Stack(this.#size);
        stack1.push(this.#root);
        const result = [];

        while (!stack1.is_empty()) {
            const node = stack1.pop();
            stack2.push(node);

            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }

        while (!stack2.is_empty()) {
            result.push(stack2.pop().value);
        }

        return result;
    }

    /* ================= Advanced Operations ================= */

    find_successor(value) {
        const res = this.inorder_rec();
        const idx = res.indexOf(value);

        if (idx === -1 || idx === res.length - 1) return null;

        return res[idx + 1];
    }

    find_predecessor(value) {
        const res = this.inorder_rec();
        const idx = res.indexOf(value);

        if (idx <= 0) return null;
        
        return res[idx - 1];
    }

    is_balanced() {
        if (this.is_empty()) return true;
        
        const node = this.#root;
        const left = this.#_get_height(node.left);
        const right = this.#_get_height(node.right);

        if (Math.abs(left - right) > 1) return false;
        return this.#_get_height(node.left) && this.#_get_height(node.right);
    }

    /* ================= Utilities ================= */

    toArray() {
        const result = this.inorder_rec();
        return result;
    }

    clone() {
       if (!this.#root) return null;

       const otherTree = new BST();
       const arr = [this.#root];
       while (arr.length > 0) {
            const node = arr.pop();
            otherTree.insert(node.value);
            
            if (node.left) arr.push(node.left);
            if (node.right) arr.push(node.right);
       }

       return otherTree;
    }

    equals(otherTree) {
        if (otherTree.size() !== this.size()) return false;
        if (!this.#root && !otherTree.#root)    return true;
        if (!this.#root || !otherTree.#root) return false;

        const arr = [this.#root];
        const otherArr = [otherTree.#root];

        while (arr.length > 0) {
            const node = arr.pop();
            const otherNode = otherArr.pop();

            if (node.value !== otherNode.value) return false;

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
        let idx = 0;

        return {
            next: () => {
                if (idx < arr.length) {
                    return {
                        value: arr[idx++],
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
        let idx = 0;

        return {
            next: () => {
                if (idx < arr.length) {
                    return {
                        value: arr[idx++],
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

    entries() {
        const arr = this.inorder_rec();
        let idx = 0;

        return {
            next: () => {
                if (idx < arr.length) {
                    return {
                        value: [idx, arr[idx++]],
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

    /* ================= Private Helpers ================= */

    #_insert(node, value) {
        if (!node) {
            this.#size++;
            return new Node(value);
        }

        if (value < node.value) {
            node.left =  this.#_insert(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.#_insert(node.right, value);
        }
        
        return node;
    }

    #_delete(node, value) {
        if (!node) return null;
        
        if (value < node.value) {
            node.left = this.#_delete(node.left, value);
        } else if (value > node.value) {
            node.right = this.#_delete(node.right, value);
        } else {
            if (!node.left && !node.right) {
                this.#size--;
                return null;
            }
            else if (!node.left || !node.right) {
                this.#size--;
                return node.left || node.right;
            } else {
                const successor = this.find_min(node.right);
                node.value = successor.value;
                node.right = this.#_delete(node.right, successor.value);
            }
        }
        return node;
    }

    #_find_min(node) {
        if (!node) return null;
        if (!node.left) return node.value;
        return this.#_find_min(node.left);
    }

    #_find_max(node) {
        if (!node) return null;
        if (!node.right) return node.value;
        return this.#_find_max(node.right);
    }

    #_get_height(node) {
        if (!node) return 0;
        const leftHight = this.#_get_height(node.left);
        const rightHight = this.#_get_height(node.right);
        return 1 + Math.max(leftHight, rightHight);
    }

    #_inorder(node, result) {
        if (!node) return result;
        this.#_inorder(node.left, result);
        result.push(node.value);
        this.#_inorder(node.right, result);
        return result;
    }

    #_preorder(node, result) {
        if (!node) return;
        result.push(node.value);
        this.#_preorder(node.left, result);
        this.#_preorder(node.right, result);
    }

    #_postorder(node, result) {
        if (!node) return;
        this.#_postorder(node.left, result);
        this.#_postorder(node.right, result);
        result.push(node.value);
    }
}