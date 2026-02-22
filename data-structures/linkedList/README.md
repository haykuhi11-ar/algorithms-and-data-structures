# Singly Linked List (Data Structure)

Implementation of a **Singly Linked List** in JavaScript using private class fields and custom node validation.

A singly linked list is a linear data structure where each element (node) contains:

- a value
- a reference to the next node

Elements are stored non-contiguously in memory.

---

## 📌 Features

### **Basic Operations**
- `push_front(value)` — insert element at the beginning  
- `push_back(value)` — insert element at the end  
- `pop_front()` — remove first element  
- `pop_back()` — remove last element  
- `front()` — get first element value  
- `at(index)` — get element by index  

### **Insertion & Removal**
- `insert(index, value)` — insert at specific position  
- `erase(index)` — remove element by index  
- `remove(value, equalsFn)` — remove elements by value  

### **State Management**
- `size()` — number of elements  
- `isEmpty()` — check if list is empty  
- `clear()` — remove all elements  

### **Algorithms**
- `reverse()` — reverse the list  
- `sort(compareFn)` — sort list using merge sort  
- `merge(otherList, compareFn)` — merge two sorted lists  

### **Utilities**
- `toArray()` — convert list to array  
- `fromArray(array)` — create list from array  

### **Iteration**
- Supports `[Symbol.iterator]`  
- Works with `for...of` loops  

---

## 🧠 How It Works

- Uses a custom `Node` class with:
  - private fields
  - type validation
  - controlled value access
- Each node stores:
  - value
  - reference to next node
- List maintains a reference only to the head node.
- All operations are based on pointer manipulation.

---

| Operation              | Time Complexity | Explanation                        |
| ---------------------- | --------------- | ---------------------------------- |
| `size()`               | O(1)            | Stored in private field `#size`    |
| `isEmpty()`            | O(1)            | Check `#size === 0`                |
| `front()`              | O(1)            | Access head node                   |
| `at(index)`            | O(n)            | Must traverse list to index        |
| `push_front(value)`    | O(1)            | Insert at head                     |
| `push_back(value)`     | O(n)            | Traverse to tail                   |
| `pop_front()`          | O(1)            | Remove head                        |
| `pop_back()`           | O(n)            | Traverse to second-last node       |
| `insert(index, value)` | O(n)            | Traverse to insertion position     |
| `erase(index)`         | O(n)            | Traverse to deletion position      |
| `remove(value)`        | O(n)            | Check all nodes for matching value |
| `reverse()`            | O(n)            | Traverse and reverse pointers      |
| `sort()`               | O(n log n)      | Merge sort                         |
| `merge(otherList)`     | O(n + m)        | Merge two sorted lists             |
| `toArray()`            | O(n)            | Convert all nodes to array         |
| Iteration (`for...of`) | O(n)            | Traverse all nodes                 |

