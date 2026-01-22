# Selection Sort Implementation in JavaScript

A clean and straightforward implementation of the Selection Sort algorithm using JavaScript.

## 📖 Description
**Selection Sort** is an in-place comparison sorting algorithm. It works by dividing the input list into two parts: a sorted sublist of items which is built up from left to right, and a sublist of the remaining unsorted items. In each iteration, the algorithm finds the smallest element in the unsorted sublist and swaps it with the leftmost unsorted element.



### Why Selection Sort?
* **Minimal Swaps:** It performs at most $n$ swaps, which is significantly fewer than Bubble Sort. This is useful when writing to memory is expensive.
* **Memory Efficient:** It has a constant space complexity of $O(1)$.
* **Simplicity:** It is very easy to implement and understand for educational purposes.

### How to use
Just copy the function into your script and call it:

```javascript
const result = selectionSort([29, 10, 14, 37, 13]);
console.log(result);
```
## Installation & Running

1. Download the selection-sort.js file.

2. Open your terminal in the project directory.

3. Run the script using Node.js:

```Bash
node selection-sort.js
```

### Complexity Analysis

1. **Worst-case time complexity:** $O(n^2)$

2. **Average-case time complexity:** $O(n^2)$

3. **Best-case time complexity:** $O(n^2)$ (The algorithm always scans all elements to find the minimum)

4. **Space complexity:** $O(1)$ (In-place)
