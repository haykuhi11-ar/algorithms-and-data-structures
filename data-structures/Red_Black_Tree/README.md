# Red-Black Tree (RBT)

Implementation of a Red-Black Tree — a self-balancing binary search tree.

## 📌 Overview

A Red-Black Tree is a type of balanced BST that guarantees:

O(log n) time complexity for:

insertion

deletion

search

It maintains balance using color properties and rotations.

-----------------

## ⚙️ Properties of Red-Black Tree

Each node is either RED or BLACK

The root is always BLACK

All leaves (null nodes) are BLACK

If a node is RED → both children are BLACK

Every path from a node to its descendant leaves contains 
the same number of BLACK nodes

-----------------

| Operation | Complexity |
| --------- | ---------- |
| Insert    | O(log n)   |
| Delete    | O(log n)   |
| Search    | O(log n)   |

-----------------

### Edge Cases

Inserting into empty tree → root becomes BLACK

Double RED violation

Deletion causing BLACK height imbalance

