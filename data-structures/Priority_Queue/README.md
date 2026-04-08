# Priority Queue (Heap-based)

Implementation of a Priority Queue using a Binary Heap with support for both Min Heap and Max Heap via a custom comparator.


## Overview

A Priority Queue is a data structure where elements are removed based on priority, not insertion order.

In this implementation:


Uses a binary heap

Supports:

Min Heap

Max Heap

Heap type is automatically determined by the comparator


## Core Operations

add(value) — insert element

pop() — remove root (min/max)

peek() — get root element

remove(value) — remove specific element

contains(value) — check existence

clear() — reset queue


## Complexity

| Operation | Complexity |
| --------- | ---------- |
| Add       | O(log n)   |
| Pop       | O(log n)   |
| Peek      | O(1)       |
| Remove    | O(n)       |
| Heapify   | O(n)       |



