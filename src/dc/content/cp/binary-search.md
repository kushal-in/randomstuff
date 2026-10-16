---
id: cp-two-pointers-reading
page: cp
sub: Binary Search
type: reading
order: 110
---


Binary search is a fast way to search in a **sorted** collection. Instead of checking the elements one by one (linear search, O(n)), we look at the middle element, decide which half the answer must lie in, and throw the other half away. The search space shrinks by half in every step, so even an array of a billion elements needs only about 30 comparisons.

**Why can we throw half away?** Because the data is sorted. If a[mid] < x, then every element to the left of mid is also at most a[mid], so none of them can be x. The same argument works in the other direction when a[mid] > x. Sortedness is what lets a single comparison rule out many elements at once.

<Fig src="/assets/cp-binary-meme.jpeg" width="30%"/>

## **Main Technique**

We keep two indices, lo and hi, that mark the part of the array that can still contain x. This part is called the search space. In every step we look at the middle index mid and compare a[mid] with x:

1. Start with the whole array: `lo = 0` and `hi = n - 1`.

2. While `lo <= hi`, take `mid = lo + (hi - lo) / 2`.

3. If `a[mid] == x`, we are done: the answer is `mid`.

4. If `a[mid] < x`, `x` can only be on the right, so set `lo = mid + 1`.

5. If `a[mid] > x`, `x` can only be on the left, so set `hi = mid - 1`.

6. If the loop ends because `lo > hi`, the search space is empty and x is not in the array.

### **Walkthrough (x = 26)**

**Example:** in the sorted array below, x = 26 is at index 5. Grey cells are the current search space and the blue cell is mid.

**Step 1.** The search space is the whole array, so lo = 0, hi = 9 and mid = 4. Since a[4] = 21 is less than 26, the value can only be on the right and we set lo = 5.

|0|1|2|3|4|5|6|7|8|9|
|---|---|---|---|---|---|---|---|---|---|
|3|8|12|17|**21**|26|34|41|55|60|
|**↑ lo**||||**↑ mid**|||||**↑ hi**|



**Step 2.** Now lo = 5 and hi = 9, so mid = 7. Since a[7] = 41 is greater than 26, the value can only be on the left of mid and we set hi = 6.

|0|1|2|3|4|5|6|7|8|9|
|---|---|---|---|---|---|---|---|---|---|
|3|8|12|17|21|26|34|**41**|55|60|
||||||**↑ low**||**↑ mid**||**↑ hi**|



**Step 3.** Now lo = 5 and hi = 6, so mid = 5. Since a[5] = 26 equals x, the search stops and returns index 5. Only three of the ten elements were ever looked at.

|0|1|2|3|4|5|6|7|8|9|
|---|---|---|---|---|---|---|---|---|---|
|3|8|12|17|21|**26**|34|41|55|60|
||||||**↑ low**|**↑ hi**||||
||||||**↑ mid**|||||

If x were missing, say x = 27, the search would continue: a[5] = 26 is too small so lo = 6, then a[6] = 34 is too large so hi = 5. Now lo > hi, the search space is empty, and we report that x is not present.

### **Implementation**

```
int binarySearch(vector<int>& a, int x) {
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // not (lo + hi) / 2
        if (a[mid] == x) return mid;
        if (a[mid] < x) lo = mid + 1;   // x can only be on the right
        else            hi = mid - 1;   // x can only be on the left
    }
    return -1;                          // not found
}
```

**Why the odd-looking midpoint?** For large indices, lo + hi can overflow int. The two forms are equal mathematically, but the first one never overflows. **Why skip past `mid`?** We have already checked mid, so it must leave the search space, hence mid + 1 and mid - 1. Writing lo = mid can loop forever when lo + 1 = hi.

The same idea can also be written recursively, by calling the function on the left or right half instead of updating lo and hi:

```
int search(vector<int>& a, int x, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == x) return mid;
    if (a[mid] < x) return search(a, x, mid + 1, hi);
    return search(a, x, lo, mid - 1);
}
```

### **Time Complexity**

The size of the search space goes n, n/2, n/4, …, 1, so there are at most ⌊log₂n⌋ + 1 steps. Hence binary search runs in O(log n) time. The iterative version uses O(1) extra space, while the recursive version uses O(log n) stack space. For n = 10⁹ this is about 30 steps instead of a billion. If the array is not sorted, sorting it first costs O(n log n), which then dominates, so binary search pays off when we search many times in the same data.

## **Binary Search in C++ STL**

For plain searches in a sorted array there is no need to write the loop by hand. The standard library has three functions that work on a sorted range and all run in O(log n):

|**Function**|**What it returns**|
|---|---|
|`binary_search(a, a+n, x)`|trueif x is present, otherwisefalse|
|`lower_bound(a, a+n, x)`|pointer to the first element that is **≥ x**|
|`upper_bound(a, a+n, x)`|pointer to the first element that is **> x**|



Subtracting the begin pointer turns a result into an index. With duplicates, the number of elements that are at most x is `upper_bound(...) - begin`, and the number of copies of x is `upper_bound(...) - lower_bound(...)`:

```
vector<int> a = {1, 3, 3, 3, 7, 9};
auto lb = lower_bound(a.begin(), a.end(), 3);   // points to index 1
auto ub = upper_bound(a.begin(), a.end(), 3);   // points to index 4
int atMost3 = ub - a.begin();                   // 4 elements are <= 3
int copies3 = ub - lb;                          // 3 copies of 3
```

## **When to Use Binary Search**

The real power of binary search is not looking up a value in an array. It is searching over **any space where a yes/no question flips exactly once** , from all “no” to all “yes” (or the other way around).

- **Sorted array:** find an element, or the first element that is ≥ x or > x (lower_bound, upper_bound).

- **Binary search on the answer:** the answer is a number in a known range and we can quickly test whether a value v is good enough. If v works, every larger v works too (or the reverse), so we only need to find the boundary. Typical phrasing: “find the minimum time such that…” or “the largest value such that…”.

- **Monotonic functions:** find where an increasing function reaches a target, or the peak of a function that first increases and then decreases.

## **Real-World Example: Finding a Bug**

Suppose a bug appeared somewhere in the last 1000 commits of a project. The commits are in order: every commit before the culprit works, and every commit after it is broken, so the history looks like good, good, ..., good, bad, bad, ..., bad. This is exactly the pattern binary search needs: a yes/no answer that flips once. The tool git bisect checks out the commit in the middle, you test it, and half of the history is discarded. After about 10 tests (log2 1000 ≈ 10) the first bad commit is found, instead of testing a thousand commits one by one.

## **Binary Search on the Answer**

In many problems there is no array at all. Instead we have a function ok(x) that tells us whether x is good enough, and ok is monotonic: it is false for small x and true from some value k onwards. The task is to find k, the smallest good value. The table below shows this pattern: ok flips exactly once, at k.

|**x**|**0**|**1**|**...**|**k − 1**|**k**|**k + 1**|**...**|
|---|---|---|---|---|---|---|---|
|`ok(x)`|false|false|…|false|**true**|true|…|


Binary search finds k without trying every x. One way is to walk over the values with jumps of decreasing length, as in the code below. Here z is a jump length large enough that we know ok(z) is true:

```
int x = -1;                        // x is always a value where ok is false
for (int b = z; b >= 1; b /= 2) {  // jump lengths z, z/2, z/4, ..., 1
    while (!ok(x + b)) x += b;     // keep jumping while we land on false
}
int k = x + 1;                     // first value where ok is true
```

Why does this work? After the round with jump length b, the position x is less than b below the first true value, because otherwise we could still jump. So after the last round (b = 1), x is exactly one below k, and x + 1 is the answer. In every round the loop jumps at most once, because two jumps of length b would equal one jump of length 2b, which the previous round would already have made. So ok is called O(log z) times.

### **The Smallest-Solution Template**

Many people find the lo/hi form easier to get right than the jump form. Both find the same k. The search space is now the range of possible answers:

```
long long lo = 0, hi = HI;            // ok(hi) must be true
while (lo < hi) {
    long long mid = lo + (hi - lo) / 2;
    if (ok(mid)) hi = mid;            // mid works, maybe a smaller x does too
    else         lo = mid + 1;        // mid fails, answer is larger
}
// now lo == hi is the smallest x with ok(x) == true
```

The answer always stays inside [lo, hi]. When ok(mid) is true we keep mid (hi = mid), because it may be the answer itself; when it is false, mid and everything below it fail, so lo = mid + 1. To find the **largest** x with ok(x) true instead, round the middle up and flip the updates:

```
while (lo < hi) {
    long long mid = lo + (hi - lo + 1) / 2;   // round up, or it may loop forever
    if (ok(mid)) lo = mid;
    else         hi = mid - 1;
}
```

The function ok is called O(log(hi − lo)) times, so the total time is the cost of ok multiplied by that. For example, if ok takes O(n) time and the range has size z, the total is O(n log z).

**Three questions to ask before coding:** (1) What is the range of possible answers, and is ok(hi) surely true? (2) What exactly does ok(x) check, and can I compute it fast? (3) Is ok really monotonic, so that it flips only once?

### **Finding the Maximum Value**

Binary search can also find the peak of a function that first increases and then decreases. We look for a position k such that f(x) < f(x + 1) for every x < k, and f(x) > f(x + 1) for every x ≥ k. The condition f(x) < f(x + 1) plays the role of ok, but reversed: it is true for small x and false from k onwards. So we search for the last x where it is true, and the peak is one step after it:

```
int x = -1;                                  // last position known to be before the peak
for (int b = z; b >= 1; b /= 2) {
    while (f(x + b) < f(x + b + 1)) x += b;  // still climbing, so jump
}
int k = x + 1;                               // position of the maximum
```

Note that consecutive values of f must not be equal. On a flat part we cannot tell which side to continue with, and the search breaks.

### **Common Mistakes**

- **Off-by-one and infinite loops:** pair hi = mid with lo = mid + 1 and the lower middle, or lo = mid with hi = mid - 1 and the upper middle. Mixing them can loop forever.

    >Binary search is basically like digging straight down in Minecraft. It's incredibly fast but occasionally drops you into lava (an infinite loop) if you calculate your midpoint wrong.

- **Overflow:** answers can reach 10¹⁸ , so use long long. Inside ok, sums can overflow too, so stop early once the sum is already big enough.

- **Bad bounds:** if hi does not satisfy ok, or lo is already above the answer, the search returns nonsense.

- **Non-monotonic check:** if ok can go false → true → false, binary search is not valid. Test the claim on a small example before coding.
