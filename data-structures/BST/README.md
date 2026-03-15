#  Binary Search Tree (BST)

Implementation of a **Binary Search Tree** in JavaScript with recursive and iterative traversals, utility methods, and iterable support.

---

Contains:

* `Node` class
* `BST` class

---

##  Features

### Basic Operations

```
insert(value)
delete(value)
contains(value)
clear()
size()
is_empty()
```

### Tree Properties

```
get_height()
get_depth(value)
is_balanced()
```

### Min / Max

```
find_min()
find_max()
```

### Traversals

**Recursive**

```
inorder_rec()
preorder_rec()
postorder_rec()
```

**Iterative**

```
inorder_itr()
preorder_itr()
postorder_itr()
```

**Breadth First Search**

```
level_order()
```

---

## 🔁 Iteration

The tree implements the JavaScript iterator protocol.

---

## 📊 Complexity

| Operation | Complexity |
| --------- | ---------- |
| Insert    | O(h)       |
| Delete    | O(h)       |
| Search    | O(h)       |
| Traversal | O(n)       |

Where **h** is the height of the tree.

Worst case:

```
O(n)
```

Balanced tree:

```
O(log n)
```

---
