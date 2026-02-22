# DynamicArray (JavaScript)

A custom implementation of a **Dynamic Array** data structure (similar to C++ `std::vector` or Java `ArrayList`) written in JavaScript.

It supports automatic memory resizing, capacity management, iterators, higher-order methods, and custom sorting algorithms.

This project was created for learning data structures and algorithms.

---

## 🚀 Features

✅ Automatic resizing
✅ Memory management (`reserve`, `shrinkToFit`)
✅ Iterators (`values`, `keys`, `entries`)
✅ Higher-order functions (`map`, `filter`, `reduce`)
✅ Sorting (`bubbleSort`, `quickSort`)
✅ Element insertion and deletion
✅ Array cloning and comparison

---

## 📚 API

### Capacity

* `size()`
* `capacity()`
* `empty()`
* `reserve(n)`
* `shrinkToFit()`
* `clear()`

---

### Element Access

* `at(index)`
* `set(index, value)`
* `front()`
* `back()`
* `toArray()`

---

### Modifiers

* `pushBack(value)`
* `popBack()`
* `insert(pos, value)`
* `erase(pos)`
* `swap(i, j)`

---

### Iterators

* `[Symbol.iterator]()`
* `values()`
* `keys()`
* `entries()`

---

### Higher Order Methods

* `forEach(fn)`
* `map(fn)`
* `filter(fn)`
* `reduce(fn, initial)`
* `some(fn)`
* `every(fn)`
* `find(fn)`
* `findIndex(fn)`
* `includes(value)`

---

### Extensions

* `reverse()`
* `sort(compareFn)`
* `clone()`
* `equals(other)`

---

## 🧠 Time Complexity

| Operation | Complexity         |
| --------- | ------------------ |
| pushBack  | O(1) amortized     |
| popBack   | O(1)               |
| insert    | O(n)               |
| erase     | O(n)               |
| access    | O(1)               |
| sort      | O(n²) / O(n log n) |

---


