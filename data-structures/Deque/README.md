# Deque (Double-Ended Queue)

Implementation of a **Deque (Double-Ended Queue)** in JavaScript.

A deque allows insertion and removal of elements **from both ends**: front and rear.

---

## 📌 Features

- **Basic Operations**
  - `push_front(value)` — add to the front  
  - `push_back(value)` — add to the rear  
  - `pop_front()` — remove from the front  
  - `pop_back()` — remove from the rear  
  - `front()` — peek front element  
  - `back()` — peek rear element  
  - `at(i)` — access element by index  

- **State & Capacity**
  - `size()` — current number of elements  
  - `capacity()` — current array capacity  
  - `empty()` / `full()` — check state  
  - `clear()` — remove all elements  
  - `reserve(newCapacity)` — increase capacity  
  - `shrinkToFit()` — resize array to current size  

- **Advanced Operations**
  - `rotateLeft(k)` / `rotateRight(k)` — rotate elements  
  - `swap(i, j)` — swap two elements by index  
  - `find(value)` / `includes(value)` — search elements  

- **Functional Style**
  - `forEach(fn)` — iterate over elements  
  - `map(fn)` — return new deque with transformed elements  
  - `filter(fn)` — return new deque with filtered elements  
  - `reduce(fn, initial)` — reduce elements to single value  

- **Iteration**
  - `[Symbol.iterator]`, `values()`, `keys()`, `entries()`  

- **Utilities**
  - `toArray()` — convert to array  
  - `clone()` — create a deep copy  
  - `equals(otherDeque)` — compare with another deque  

---

##  How It Works

- Internally uses a **circular array** for efficient front/back operations.  
- Dynamically doubles capacity when full.  
- Supports both **FIFO** and **LIFO-like rotations**.  
- Fully iterable and compatible with `for...of` loops.  

---

---

##  Time Complexity

### ⏱️ Core Operations

| Operation           | Time Complexity    | Description               |
| ------------------- | ------------------ | ------------------------- |
| `push_front(value)` | **O(1)** amortized | Add element to front      |
| `push_back(value)`  | **O(1)** amortized | Add element to rear       |
| `pop_front()`       | **O(1)**           | Remove element from front |
| `pop_back()`        | **O(1)**           | Remove element from rear  |
| `front()`           | **O(1)**           | Access front element      |
| `back()`            | **O(1)**           | Access rear element       |
| `at(i)`             | **O(1)**           | Access element by index   |
| `swap(i, j)`        | **O(1)**           | Swap elements by index    |

---

### 🔄 Capacity Operations

| Operation            | Time Complexity |
| -------------------- | --------------- |
| `size()`             | **O(1)**        |
| `capacity()`         | **O(1)**        |
| `empty()` / `full()` | **O(1)**        |
| `clear()`            | **O(n)**        |
| `reserve(n)`         | **O(n)**        |
| `shrinkToFit()`      | **O(n)**        |

👉 Resizing requires copying all elements.

---

### 🔍 Search Operations

| Operation         | Time Complexity |
| ----------------- | --------------- |
| `find(value)`     | **O(n)**        |
| `includes(value)` | **O(n)**        |

---

### 🔁 Rotation Operations

| Operation        | Time Complexity |
| ---------------- | --------------- |
| `rotateLeft(k)`  | **O(k)**        |
| `rotateRight(k)` | **O(k)**        |

👉 May be optimized to **O(1)** if implemented using index shifts only.

---

### ⚡ Functional Methods

| Operation     | Time Complexity |
| ------------- | --------------- |
| `forEach(fn)` | **O(n)**        |
| `map(fn)`     | **O(n)**        |
| `filter(fn)`  | **O(n)**        |
| `reduce(fn)`  | **O(n)**        |

---

### 🔂 Iteration & Utilities

| Operation              | Time Complexity |
| ---------------------- | --------------- |
| Iteration (`for...of`) | **O(n)**        |
| `toArray()`            | **O(n)**        |
| `clone()`              | **O(n)**        |
| `equals(otherDeque)`   | **O(n)**        |

---

## 🚀 Space Complexity

* **O(n)** — stores elements in a circular array.
* May temporarily use **O(n)** extra space during resizing.
