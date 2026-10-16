---
id: cp-prefix-sum
page: cp
sub: Prefix Sum
type: reading
order: 130
---


The prefix sum technique is a very useful trick in competitive programming. The idea is to do a little work up front, computing running totals of an array once, so that the sum of any contiguous range can later be answered instantly instead of being recomputed with a loop.

**What is a prefix sum?** For an array a[1], a[2], …, a[n], the prefix sum p[i] is the sum of the first i elements: p[i] = a[1] + a[2] + … + a[i], with p[0] = 0. For example, the running balance on a bank statement is a prefix sum of all the transactions so far.

## **Main Technique**

Without preprocessing, the sum of a range a[l..r] takes O(n) time, so answering q queries takes O(n·q). Your code will hit a TLE faster than you realize. With prefix sums, building p takes O(n) once and every query takes O(1). There are two main forms:

### **1. One-Dimensional**

The sum of a[l..r] equals the sum of the first r elements minus the sum of the first l − 1 elements. Everything before l cancels out, and only the range we want remains: sum(l, r) = p[r] − p[l − 1].


<Fig src="/assets/cp-pre-1.jpeg" caption="Figure 1: sum of a[3..6] = p[6] − p[2]" width="70%"
/>


### **2. Two-Dimensional**

The same idea works on a grid. P[i][j] stores the sum of the rectangle from the top-left corner (1, 1) to (i, j). Any sub-rectangle can then be found with four lookups by adding and subtracting overlapping rectangles (inclusion–exclusion).

<Fig src="/assets/cp-pre-2.jpeg" caption="a rectangle query using four prefix values" width="70%"
/>


## **When to Use Prefix Sums**

Prefix sums work best when the array does not change between queries (it is static) and you need to answer many questions about sums over ranges. Typical signs include:

- **Many range-sum queries:** "find the sum from index l to r" asked thousands of times.

- **Counting subarrays:** count subarrays whose sum equals k or is divisible by k. A subarray sum is a difference of two prefix sums, so the problem becomes counting pairs.

- **Many range updates, read at the end:** "add v to every element in [l, r]" many times, then print the final array. This uses the reverse idea, the difference array (see the bonus in Problem 1).

## **Real-World Example: Integral Images**

In computer vision, a 2D prefix sum is called an integral image or summed-area table. Each pixel stores the total brightness of the rectangle above and to the left of it. The classic Viola–Jones face detector relies on this: it checks huge numbers of rectangular regions in every image, and thanks to the integral image the brightness of any rectangle, small or large, costs just four lookups. This made real-time face detection possible on the cameras of the early 2000s.

## **One-Dimensional Prefix Sums**

Suppose we are given an array of n integers and q queries. Each query gives two indices l and r, and we must print the sum a[l] + a[l + 1] + … + a[r].

**Example:** for the array below, the query l = 3, r = 6 asks for 4 + 1 + 5 + 9 = 19.

<Fig src="/assets/cp-pre-3.jpeg"
/>

**Idea:** build the array p of size n + 1, where p[0] = 0 and p[i] = p[i − 1] + a[i]. Each new value reuses the previous one, so the whole array is built in a single pass. Then each query is answered as p[r] − p[l − 1]. Using p[0] = 0 means a query starting at l = 1 needs no special case.


```
vector<long long> p(n + 1, 0);
for (int i = 1; i <= n; i++) p[i] = p[i - 1] + a[i];

// sum of a[l..r]
long long ans = p[r] - p[l - 1];
```

### **Walkthrough (l = 3, r = 6)**

**Step 1.** Build p from left to right. Each entry is the one before it plus the current element. For example, p[3] = p[2] + a[3] = 4 + 4 = 8, and p[6] = p[5] + a[6] = 14 + 9 = 23.

<Fig src="/assets/cp-pre-4.jpeg"
/>


**Step 2.** The query asks for a[3..6]. Adding these one by one would take r − l + 1 steps, and a query covering the whole array would take n steps.

<Fig src="/assets/cp-pre-5.jpeg"
/>


**Step 3.** Instead, look at p[6] = 23, which is the sum of a[1..6], and p[2] = 4, which is the sum of a[1..2]. Their difference removes a[1] and a[2], leaving exactly a[3..6]: 23 − 4 = 19.

<Fig src="/assets/cp-pre-6.jpeg"
/>


### **Time Complexity**

Building p takes one pass over the array, so it costs O(n). Each query is a single subtraction, so it costs O(1). The total is O(n + q), compared with O(n·q) for summing each range with a loop. With n = q = 2·10⁵ that is about 4·10⁵ operations instead of up to 4·10¹⁰. Remember to store prefix sums in 64-bit integers (long long): even when every a[i] fits in an int, their total often does not.

**Practice:** CSES Static Range Sum Queries is exactly this problem.

Try submitting your solution here: [https://cses.fi/problemset/task/1646](https://cses.fi/problemset/task/1646)

## **Two-Dimensional Prefix Sums**

Suppose we are given an n × m grid of integers and q queries. Each query describes a rectangle by its top-left corner (r1, c1) and bottom-right corner (r2, c2), and we must print the sum of all cells inside it.

**Example:** in the grid below, the rectangle from (2, 2) to (3, 3) contains 6, 7, 1 and 2, so the answer is 16.

<Fig src="/assets/cp-pre-7.jpeg"
/>



**Idea:** let P[i][j] be the sum of the rectangle from (1, 1) to (i, j), with row 0 and column 0 filled with zeros. To build it, add the rectangle above (P[i − 1][j]) and the rectangle to the left (P[i][j − 1]). Their overlap P[i − 1][j − 1] has now been counted twice, so subtract it once, then add the cell itself:

P[i][j] = a[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]

A query works the same way in reverse. Start with the big rectangle P[r2][c2], cut off the strip above the query and the strip to its left, and add back the corner that was cut off twice:

sum = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]

### **Walkthrough ((2, 2) to (3, 3))**

**Step 1.** Build P row by row. For example, P[3][2] = a[3][2] + P[2][2] + P[3][1] − P[2][1] = 1 + 14 + 15 − 6 = 24.

<Fig src="/assets/cp-pre-8.jpeg"
/>



**Step 2.** For the query, r1 = c1 = 2 and r2 = c2 = 3, so we need P[3][3] = 36, P[1][3] = 6, P[3][1] = 15 and P[1][1] = 1. The answer is 36 − 6 − 15 + 1 = 16, which matches the direct sum.

<Fig src="/assets/cp-pre-9.jpeg"
/>


### **Time Complexity**

Each cell of P is computed in O(1) from three cells that were already computed, so building P takes O(n·m). Each query uses four lookups, so it costs O(1). The total is O(n·m + q), compared with O(n·m·q) for adding up every rectangle cell by cell.

**Practice:** CSES Forest Queries asks you to count trees inside rectangles of a grid. Treat each tree as 1 and each empty cell as 0.

Try submitting your solution here: [https://cses.fi/problemset/task/1652](https://cses.fi/problemset/task/1652)
