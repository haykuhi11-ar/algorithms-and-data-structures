# Merge Sort

## 📌 Description
**Merge Sort** is a sorting algorithm based on the *Divide and Conquer* approach.

Idea:
1. Split the array into two halves.
2. Recursively sort each half.
3. Merge the two sorted halves into one sorted array.

---

## ⚙️ How It Works
### Steps:
- Divide the array into smaller parts until each part contains only 1 element.
- Merge the parts back together in sorted order.

---

## ✅ Advantages
- Guaranteed time complexity **O(n log n)**
- Works well for large arrays
- **Stable sorting** (keeps the relative order of equal elements)

---

## ❌ Disadvantages
- Requires extra memory **O(n)** (temporary arrays)
- Not always faster than Quick Sort in practice

---

## 📊 Complexity
| Case | Time |
|------|------|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n log n) |

Space: **O(n)**

---

## 📌 Use Cases

- Sorting large arrays  
- External sorting (when data doesn’t fit into memory)  
- When stable sorting is required  