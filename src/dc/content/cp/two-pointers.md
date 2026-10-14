---
id: cp-two-pointers            # unique, never rename after launch (answers are stored by id)
page: cp             # apply | cp | dev (or any key in PAGES)
sub: Two pointers    # optional: the sub-page (one click-through page per distinct value; sidebar entry). No sub = the part's main page
# section: Problems    # optional: heading that groups blocks inside a page (not in the sidebar)
type: reading      # reading | short-text | long-text | link
order: 110           # sorts across the whole page; leave gaps (110, 120, 130)
# required: true       # optional: blocks Submit until answered
---
# **Two Pointers**

The two-pointer technique is a simple and useful implementation method. As the name suggests, we use two pointers to iterate over the elements of an array or string. Both pointers can move in the same direction or in opposite directions.

**What are pointers?** Pointers are variables that point to an index or position. For example, in for(int i=0; i<n; i++), i is a pointer. The two-pointer method simply uses two of them.

## **Main Technique**

Two-pointer algorithms usually take only O(n) time, removing the need for nested for loops. There are two main types:

### **1. Unidirectional**

Both pointers move in one direction only, either left or right. Usually both start from the same position, either 0 or n-1.



<!-- Start of picture text -->
[ Pee, Sn oe e e |<br><!-- End of picture text -->

_Figure 1: Unidirectional pointers_

### **2. Bidirectional**

The pointers move in opposite directions, mostly towards each other (sometimes away from each other). Usually they start from 0 and n-1 respectively.



<!-- Start of picture text -->
[ ee ]<br><!-- End of picture text -->

_Figure 2: Bidirectional pointers_

## **When to Use Two Pointers**

A two-pointer algorithm usually requires a linear data structure such as an array or linked list. A good sign that a problem can be solved this way is that the input follows a predictable dynamic, such as a sorted array.

- **Sorted array:** find two numbers that add up to a target.

- **Palindromic string:** the symmetrical pattern lets us move two pointers towards the center.

- **Sliding window:** maintain a window that grows or shrinks based on conditions, e.g. find the smallest subarray with sum ≥ K, or move all zeros to the end while maintaining order.

## **Real-World Example: Garbage Collection**

In memory compaction, a key part of garbage collection, the goal is to free contiguous memory by eliminating the gaps left by deallocated (dead) objects. A 'scan' pointer traverses the heap to identify live objects, while a 'free' pointer tracks the next available space where live objects should be relocated. As 'scan' moves, it skips dead objects and shifts live ones to the position of 'free', grouping all live objects together and leaving continuous blocks of free memory.

## **Unidirectional**

Suppose we are given an array of n positive integers and a target sum x. We want to find a contiguous subarray whose elements add up to x, or report that no such subarray exists.

**Example:** for the array below and x = 8, the elements 2, 5, 1 form a valid subarray (2 + 5 + 1 = 8).

|1<br>3<br>2<br>5<br>1<br>1<br>2<br>3|
|---|



**Idea:** keep two pointers marking the first and last element of the current subarray (the window). On every turn, move the left pointer one step to the right, then move the right pointer forward for as long as the window sum stays at most x. If the sum becomes exactly x, we have found the answer. This works because all values are positive, so extending the window only increases the sum and shrinking it only decreases the sum.

### **Walkthrough (x = 8)**

**Step 1.** The initial window holds 1, 3 and 2, with sum 6. Adding the next element (5) would make the sum 11, which is more than 8, so the right pointer stops.



**Step 2.** The left pointer moves one step right, dropping the 1. The sum is now 5. The right pointer cannot move, because including the next element would exceed 8.



**Step 3.** The left pointer moves right again, dropping the 3, so the sum is 2. Now the right pointer can advance three steps, adding 5 and 1. The window 2, 5, 1 has sum 8, so a subarray with sum x has been found.



### **Time Complexity**

The running time depends on how many steps the right pointer takes. A single turn may move it many steps, so there is no useful bound per turn. However, the right pointer only ever moves to the right, so over the whole algorithm it takes at most O(n) steps. The left pointer also moves at most O(n) steps. Hence the whole algorithm runs in O(n) time.

## **Bidirectional**

Suppose we are given an array of n integers sorted in non-decreasing order and a target sum x. We want to find two elements at different positions that add up to x, or report that no such pair exists.

**Example:** for the sorted array below and x = 15, the elements 3 and 12 form a valid pair (3 + 12 = 15).



**Idea:** put the left pointer on the first (smallest) element and the right pointer on the last (largest) element, and look at their sum s. If s = x, we are done. If s < x, the left element is too small: even when paired with the largest remaining element the sum is not enough, so it cannot be part of any answer and we move the left pointer one step right. If s > x, the right element is too large: even when paired with the smallest remaining element the sum is too big, so we move the right pointer one step left. We stop when the pointers meet. Every step safely discards one element, which is why we never miss an answer. Note that, unlike Subarray Sum, negative numbers are fine here, because the argument relies only on the array being sorted.

### **Walkthrough (x = 15)**

**Step 1.** The pointers start at the two ends: 1 and 15. The sum is 16, which is more than 15, so the right element is too large and the right pointer moves one step left.



**Step 2.** Now the pointers are at 1 and 12, with sum 13. This is less than 15, so the left element is too small and the left pointer moves one step right.



**Step 3.** The pointers are at 3 and 12, with sum 15. This equals x, so a pair with sum x has been found.



<!-- Start of picture text -->
1 3 4 6 8 9 12 15<br>↑ ↑<br><!-- End of picture text -->

### **Time Complexity**

In every step exactly one pointer moves one position towards the other, and they meet after at most n − 1 steps. Hence the two-pointer part runs in O(n) time, compared with O(n²) for trying every pair. If the array is not sorted, sorting it first costs O(n log n), which then dominates the total running time.

**Practice:** CSES Sum of Two Values is this problem on an unsorted array, where you must print the original positions. Sort the pairs (value, original position) and run the same algorithm.

Try submitting your solutions here:

<u>https://codeforces.com/gym/102961/problem/G</u>

## **Practice Problems**

### **Problem 1**

<u>https://codeforces.com/problemset/gymProblem/102961/H</u>

**Hint 1:** Think about iterating through the array from left to right while keeping track of a running sum.

**Hint 2:** If your running sum becomes negative at any point, will adding it to the next elements ever make their sum larger?

**Solution:** Use two pointers l and r that mark the current subarray, both starting at index 0, and keep the sum of the elements between them. Move r one step to the right at a time, add a[r] to the sum, and update the best answer with the current sum. If the sum ever becomes negative, this subarray can only make any subarray that extends it smaller, so drop it completely: move l to r + 1 and reset the sum to 0.

Both pointers only move to the right, so this is a unidirectional two-pointer algorithm that runs in O(n) time and O(1) space.

Now look closely: the left pointer l is never used to compute the answer. We only need the running sum and the best sum seen so far. If we remove l, each step becomes current_sum = max(a[r], current_sum + a[r]) and max_sum = max(max_sum, current_sum). This simplified form is the wellknown Kadane's Algorithm.

### **Problem 2**

<u>https://codeforces.com/contest/279/problem/B</u>

**Hint 1:** Look for overlapping work: if you know exactly how many consecutive books Valera can read starting from book i up to book j, what does that tell you about starting from book i+1?

**Hint 2:** Maintain a valid sequence: imagine accumulating books one by one until you exceed the time limit t. Once you hit that limit, what is the most efficient way to adjust the beginning of your sequence so you can continue checking the rest of the array?

**Solution:** For each index i, let ri be the largest index such that ai + … + ari ≤ t. The task is to find max(ri − i + 1). Since the ri are nondecreasing, two pointers work: iterate over i and keep a pointer to the corresponding ri.

### **Problem 3**

<u>https://codeforces.com/gym/102961/problem/Y</u>

**Hint 1:** You already know how to find two values with a given sum in a sorted array using two pointers (Sum of Two Values). Can you reduce four values to that problem by fixing some of them?

**Hint 2:** n ≤ 1000, so O(n³) is fast enough for this problem as with careful implementation the constant overhead becomes very small. Fix the first two elements i < j, then look for the other two in the part of the array to the right of j.

**Solution:** Store the pairs (value, original position) and sort them by value. For every pair of indices i < j, set the target t = x − a[i] − a[j] and put l = j + 1 and r = n − 1. If a[l] + a[r] = t, print the four original positions. If the sum is less than t, move l right; if it is greater, move r left. Each pair (i, j) costs O(n), so the total is O(n³), about 1.7 · 10⁸ simple steps for n = 1000. Use 64-bit integers for the sums, because four values can exceed the 32-bit range. If no pair (i, j) gives a match, print IMPOSSIBLE.

**Bonus:** Find an O(n² log n) solution to this problem.

### **Problem 4**

<u>https://codeforces.com/problemset/problem/1891/C</u>

**Hint 1:** Every ultimate attack is paid for by single attacks that build the combo. On which hordes should you spend single attacks, and on which hordes should the ultimate land so that it kills as many monsters as possible?

**Hint 2:** Sort the hordes. Build the combo on the smallest hordes and spend it on the largest ones. Keep one pointer at each end: how high should the combo be before you attack the horde at r?

**Solution:** Sort the hordes in non-decreasing order, put l at the smallest and r at the largest, and set the combo x = 0. If a[l] < a[r] − x, kill all of horde l with single attacks (x += a[l], l++). Otherwise kill only a[r] − x monsters of horde l, so the combo becomes exactly a[r]; then use the ultimate to destroy horde r in one attack, reset x = 0 and move r left (move l too if horde l is now empty). When the pointers meet, one horde with a monsters and combo x < a is left. If a = 1, it takes one attack; otherwise it takes (a − x)/2 +⌈ ⌉ 1 attacks (kill about half of the gap with single attacks, then finish with the ultimate). Sorting dominates, so the total is O(n log n). Use 64-bit integers for the answer.

