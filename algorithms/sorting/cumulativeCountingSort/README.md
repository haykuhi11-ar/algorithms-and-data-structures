## ⚙️ Cumulative Counting Sort (Counting Sort with Prefix Sums)

### 📌 Idea
**Cumulative Counting Sort** is a version of Counting Sort where, after counting frequencies, we build **cumulative counts (prefix sums)**.

These prefix sums help us determine the **exact positions** of elements in the final sorted array.

---

### 🧠 How It Works
#### Steps:
1. Find `min` and `max`
2. Create a `count` array of size `max - min + 1`
3. Count the frequency of each number
4. Convert `count` into **cumulative counts (prefix sums)**  
   Now `count[i]` = number of elements **≤ (i + min)**
5. Traverse the input array **from right to left** and place elements into `output`
6. Return `output` (or copy it back into the original array)

---

### 🔥 Why prefix sums?
After building prefix sums:

- `count[i]` tells the **final position** of the next element
- this makes the algorithm **stable**
- equal elements keep their original order

---

## 📌 Use Cases

- When stable sorting is required  
- When the value range is small and performance matters  
- Used as a sub-step in **Radix Sort** 
