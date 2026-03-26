🟢 Hash Table Project (Bucket Array Implementation)

📌 Description

This project implements a Hash Table using bucket arrays.

Each array index represents a bucket. Each bucket can hold multiple key-value pairs to handle collisions. The table supports insertion, deletion, search, resizing, and iteration.

--------------

⚡ Features

✅ Insert key-value pairs (put)

✅ Delete keys (remove)

✅ Search for keys (get)

✅ Check existence of keys (containsKey) and values (containsValue)

✅ Automatic resizing and rehashing

✅ Iterators for keys(), values(), entries()

✅ Clone and equality check (clone(), equals())

✅ Debug and visualization (print(), bucketSizes())

--------------

| Operation | Average Case | Worst Case |
| --------- | ------------ | ---------- |
| Search    | O(1)         | O(n)       |
| Insert    | O(1)         | O(n)       |
| Delete    | O(1)         | O(n)       |

Worst-case occurs when many keys hash to the same bucket.
