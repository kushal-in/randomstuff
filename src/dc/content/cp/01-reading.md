---
id: cp-r1
page: cp
type: reading
order: 110
---
# Two Pointers

At its core, the **Two Pointers** technique optimizes brute-force $O(N^2)$ nested loops down to linear time $O(N)$ by taking advantage of monotonicity (order/sorting).

Instead of recomputing from scratch for every pair or subarray, we maintain two index variables (pointers) and move them strictly in directions that prune impossible states.


---

## 1. Why it Works (The Invariant)

To use two pointers, moving a pointer must have a **predictable effect**:
* If incrementing pointer $R$ increases a running sum, and you have exceeded your target, you *know* moving $R$ further right is useless.
* You then advance pointer $L$ to reduce the sum back down.

Because each pointer moves in a single direction at most $N$ times, the overall time complexity is bounded by:

$$\mathcal{O}(N)$$


## 2. Common Patterns

### Pattern A: Opposite Ends (Converging)
Used heavily on **sorted arrays** for search spaces where one end increases values and the other decreases them.

* **Classic Problem:** Find two numbers in a sorted array that sum to $X$ (2-Sum).
* **Setup:** Place $L = 0$ and $R = N - 1$.
* **Logic:**
  * If $\text{arr}[L] + \text{arr}[R] == X$, you found a solution.
  * If $\text{arr}[L] + \text{arr}[R] < X$, increment $L$ (need a larger sum).
  * If $\text{arr}[L] + \text{arr}[R] > X$, decrement $R$ (need a smaller sum).

```cpp
int l = 0, r = n - 1;
while (l < r) {
    long long cur = arr[l] + arr[r];
    if (cur == target) return {l, r};
    if (cur < target) l++;
    else r--;
}
```

---

### Pattern B: Same Direction (Sliding Window / Caterpillar)
Both pointers start at the beginning ($L = 0, R = 0$) and expand/contract a valid contiguous subarray.

* **Classic Problem:** Longest subarray with sum $\le K$ (all elements $\ge 0$).
* **Logic:**
  * Advance $R$ to expand the window and add $\text{arr}[R]$ to the state.
  * While the window violates the condition (e.g., $\text{sum} > K$), advance $L$ and subtract $\text{arr}[L]$.
  * Update the answer when the window is valid.

```cpp
long long cur_sum = 0;
int max_len = 0;
int l = 0;

for (int r = 0; r < n; ++r) {
    cur_sum += arr[r];
    while (l <= r && cur_sum > k) {
        cur_sum -= arr[l];
        l++;
    }
    max_len = max(max_len, r - l + 1);
}
```

---

### Pattern C: Merging Two Sorted Arrays
Used inside algorithms like Merge Sort.

* Maintain $i$ at array $A$ and $j$ at array $B$.
* Compare $A[i]$ and $B[j]$, push the smaller element into the merged array, and advance that pointer.

---

## 3. Checklist: Can I Use Two Pointers?

1. **Is the array sorted, or can it be sorted in $O(N \log N)$?**
2. **Does the property possess monotonicity?**
   * If a subarray $[L, R]$ violates a constraint, will every $[L, R']$ where $R' > R$ also violate it?
   * *Trap:* If elements can be negative, running sums lose monotonicity—reach for Prefix Sums + Hash Map / Segment Tree instead.


