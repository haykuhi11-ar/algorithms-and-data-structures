class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;;
        this.right = null;
        this.parent = null;
        this.color = "Red";
    }
}

class RBTree {
    #root;
    #nil;
    #size;

    constructor() {
        this.#nil = new TreeNode(0);
        this.#nil.color = "Black";
        this.#root = this.#nil;
        this.#size = 0;
    }

    // ========= Basic State =========

    size() {
        return this.#size;
    }

    isEmpty() {
        return !this.#size;
    }

    clear() {
        this.#root = this.#nil;
        this.#size = 0;
    }

    // ======== Modification Operations ==========

    insert(value) {
        let newNode = new TreeNode(value);
        if (!this.#root) {
            newNode.color = "Black";
            this.#root = newNode;
            this.#size++;
            return;
        }
        this.#root = this.#_insert(this.#root, newNode);
        this.#size++;
        this.#_insertFixup(newNode);
    }

    search(value) {
       return this.#_search(this.#root, value);
    }

    delete(value) {
        let node = this.#_search(this.#root, value);
        if (!node) return null;

        this.#size--;

        let y = node;
        let yColor = y.color;
        let x;

        if (!node.left) {
            x = node.right;
            this.#_transplant(node, node.right);
        } else if (!node.right) {
            x = node.left;
            this.#_transplant(node, node.left);
        } else {
            y = this.#_treeMinimum(node.right);
            yColor = y.color;
            x = y.right;

            if (y.parent === node) {
                if (x) x.parent = y;
            } else {
                this.#_transplant(y, y.right);
                y.right = node.right;
                y.right.parent = y;
            }

            this.#_transplant(node, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (yColor === "Black") {
            this.#_deleteFixup(x);
        }
    }

    // ======= Traversal ========

    inorder() {
        const array = [];
        return this.#_inorder(this.#root, array);
    }

    // ======= Helper Functions ========

    #_insert(root, node) {
       if (!root) return node;
       
       if (root.value > node.value) {
        root.left = this.#_insert(root.left, node);
        root.left.parent = root;
       } else {
        root.right = this.#_insert(root.right, node);
        root.right.parent = root;
       }
       return root;
    }

    #_insertFixup(newNode) {
        while (newNode.parent && newNode.parent.color === "Red") {
            let parent = newNode.parent;
            let grand = parent.parent;

            if (!grand) break;

            if (parent === grand.left) {
                let uncle = grand.right;

                if (uncle && uncle.color === "Red") {
                    parent.color = "Black";
                    uncle.color = "Black";
                    grand.color = "Red";
                    newNode = grand;
                } else {

                    if (newNode === parent.right) {
                        newNode = parent;
                        this.#_leftRotate(newNode);
                    }

                    parent.color = "Black";
                    grand.color = "Red";
                    this.#_rightRotate(grand);
                }
            } else {
                let uncle = grand.left;

                if (uncle && uncle.color === "Red") {
                    parent.color = "Black";
                    uncle.color = "Black";
                    grand.color = "Red";
                    newNode = grand;
                } else {

                    if (newNode === parent.left) {
                        newNode = parent;
                        this.#_rightRotate(newNode);
                    }

                    parent.color = "Black";
                    grand.color = "Red";
                    this.#_leftRotate(grand);
                }
            }
        }
        this.#root.color = "Black";
    }

    #_deleteFixup(x) {
        while (x !== this.#root && (!x || x.color === "Black")) {
            if (x === x.parent.left) {
                let w = x.parent.right;

                if (w && w.color === "Red") {
                    w.color = "Black";
                    x.parent.color = "Red";
                    this.#_leftRotate(x.parent);
                    w = x.parent.right;
                }
                if ((!w.left || w.left.color === "Black") &&
                    (!w.right || w.right.color === "Black")) {
                        w.color = "Red";
                        x = x.parent;
                } else {
                    if (!w.right || w.right.color === "Black") {
                        if (w.left) w.left.color = "Black";
                        w.color = "Red";
                        this.#_rightRotate(w);
                        w = x.parent.right;
                    }
                    w.color = x.parent.color;
                    x.parent.color = "Black";

                    if (w.right) w.right.color = "Black";
                    this.#_leftRotate(x.parent);
                    x = this.#root;
                }
            } else {
                let w = parent.right;

                if (w && w.color === "Red") {
                    w.color = "Black";
                    x.parent.color = "Red";
                    this.#_rightRotate(x.parent);
                    w = x.parent.left;
                }
                if ((!w.right || w.right.color === "Black") &&
                    (!w.left || w.left.color === "Black")) {
                        w.color = "Red";
                        x = x.parent;
                } else {
                    if (!w.left || w.left.color === "Black") {
                        if (w.right) w.right.color = "Black";
                        w.color = "Red";
                        this.#_leftRotate(w);
                        w = x.parent.left;
                    }
                    w.color = x.parent.color;
                    x.parent.color = "Black";

                    if (w.left) w.left.color = "Black";
                    this.#_rightRotate(x.parent);
                    x = this.#root;
                }
            }
       }
       if (x) x.color = "Black";
    }

    #_search(node, value) {
        if (!node) return null;
        if (value === node.value) {
            return node;
        } else if (value < node.value) {
            return this.#_search(node.left, value);
        } else {
            return this.#_search(node.right, value);
        }
    }

    #_leftRotate(x) {
        const y = x.right;

        x.right = y.left;
        if (y.left) y.left.parent = x;

        y.left = x;
        y.parent = x.parent;
        if (!x.parent) {
            this.#root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        x.parent = y;
    }

    #_rightRotate(x) {
        const y = x.left;
        x.left = y.right;

        if (y.right) y.right.parent = x;
        y.right = x;

        y.parent = x.parent;
        if (!x.parent) {
            this.#root = y;
        } else if (x = x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        x.parent = y;
    }

    #_transplant(node1, node2) {
        if (node1.parent === null) {
            this.#root = node2;
        } else if (node1 === node1.parent.left) {
            node1.parent.left = node2;
        } else {
            node1.parent.right = node2;
        }
        if (node2) {
            node2.parent = node1.parent;
        } 
    }

    #_treeMinimum(node) {
        if (!node) return null;
        if (!node.left) return node;
        return this.#_treeMinimum(node.left);
    }

    #_inorder(node, arr) {
        if (!node) return null;

        this.#_inorder(node.left, arr);
        arr.push(node.value);
        this.#_inorder(node.right, arr);
        return arr;
    }
}
