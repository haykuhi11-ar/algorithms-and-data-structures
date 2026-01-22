# Insertion Sort Implementation in JavaScript

A simple and efficient implementation of the Insertion Sort algorithm using JavaScript.

## Description

**Insertion Sort** is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but it provides several advantages:
* Simple implementation.
* Efficient for small data sets.
* **Adaptive:** Efficient for data sets that are already substantially sorted.



### How to use
Just copy the function into your script and call it:

```javascript
const result = insertionSort([12, 11, 13, 5, 6]);
console.log(result);
```

## Installation & Running

1. Download the insertion-sort.js file.

2. Open your terminal in the file directory.

3. Run the script using Node.js:
    ```Bash
    node insertion-sort.js

## Complexity Analysis

  **Worst-case time complexity:** $O(n^2)$ — occurs when the array is sorted in reverse order.

  **Average-case time complexity:** $O(n^2)$

  **Best-case time complexity:** $O(n)$ — occurs when the array is already sorted.

  **Space complexity:** $O(1)$ (In-place)
