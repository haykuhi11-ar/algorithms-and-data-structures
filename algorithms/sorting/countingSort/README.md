# Counting Sort

## 📌 Description
**Counting Sort** is a non-comparison sorting algorithm that sorts integers by counting how many times each value appears.

Instead of comparing elements (like Quick Sort or Merge Sort), it:
1. Counts occurrences of each number
2. Computes prefix sums (cumulative counts)
3. Places elements into the correct sorted position

---

## ⚙️ How It Works
### Steps:
1. Find the minimum and maximum values in the array
2. Create a `count` array to store frequencies
3. Build cumulative counts (prefix sums)
4. Build the sorted output using the count array
5. Copy output back to the original array (optional)

---

## ✅ Advantages
- Very fast for small ranges of integers
- Time complexity can be **O(n + k)** (often faster than `O(n log n)`)
- **Stable** (if implemented correctly)
- No comparisons needed

---

## ❌ Disadvantages
- Works only for **integers** (or values that can be mapped to integers)
- Needs extra memory for the `count` array
- Inefficient if the range is huge (large `k`)

---

## 📊 Complexity
Let:
- `n` = number of elements
- `k` = range of values (`max - min + 1`)

| Case | Time |
|------|------|
| Best | O(n + k) |
| Average | O(n + k) |
| Worst | O(n + k) |

Space: **O(n + k)**

---

## 📌 Use Cases

- Sorting integers when the range is small  
- Sorting exam scores, ages, ratings, IDs  
- Counting frequency of values  
- Used as a sub-step in **Radix Sort**  
