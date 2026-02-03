# Quick Sort (C)

Quick Sort is a fast and widely used comparison-based sorting algorithm that uses the **divide and conquer** strategy.
It works by selecting a **pivot** element and partitioning the array so that:
- elements smaller than pivot go to the left
- elements greater than pivot go to the right  
Then it recursively sorts both parts.

---

## 📌 Features
- Average time complexity: **O(n log n)**
- Worst case time complexity: **O(n²)** (bad pivot choices)
- Space complexity: **O(log n)** (recursive call stack)
- In-place sorting (does not require extra arrays)

---

## ⚙️ How It Works
### Steps:
1. Choose a pivot element (e.g., first element)
2. Partition the array into two parts:
   - left part: values `< pivot`
   - right part: values `> pivot`
3. Place pivot in its correct sorted position
4. Recursively apply Quick Sort to left and right subarrays

---

## 🧾 Time Complexity
| Case        | Complexity |
|------------|------------|
| Best Case  | O(n log n) |
| Average    | O(n log n) |
| Worst Case | O(n²)      |

---

## 🧾 Space Complexity
| Type | Complexity |
|------|------------|
| Recursion stack | O(log n) |

---

## 📌 Use Cases
Quick Sort is great when:
- you need fast sorting in practice
- memory usage should be minimal
- sorting large arrays efficiently

---

## ✅ Notes
⚠️ Worst-case happens when the pivot is always the smallest/largest element (e.g., already sorted arrays with bad pivot selection).

To reduce worst-case risk:
- use a **random pivot**
- use **median-of-three pivot selection**

