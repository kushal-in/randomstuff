---
id: cp-two-pointers-reading
page: cp
sub: Two Pointers
type: reading
order: 120
---


The two-pointer technique is a simple and useful implementation method. As the name suggests, we use two pointers to iterate over the elements of an array or string. Both pointers can move in the same direction or in opposite directions.

**What are pointers?** Pointers are variables that point to an index or position. For example, in for(int i=0; i<n; i++), i is a pointer. The two-pointer method simply uses two of them.

## **Main Technique**

Two-pointer algorithms usually take only O(n) time, removing the need for nested for loops. There are two main types:

### **1. Unidirectional**

Both pointers move in one direction only, either left or right. Usually both start from the same position, either 0 or n-1.

<Fig src="/assets/cp-tp-1.jpeg" caption="Figure 1: Unidirectional pointers"
/>

### **2. Bidirectional**

The pointers move in opposite directions, mostly towards each other (sometimes away from each other). Usually they start from 0 and n-1 respectively.


<Fig src="/assets/cp-tp-2.jpeg" caption="Figure 2: Bidirectional pointers
"
/>



## **When to Use Two Pointers**

A two-pointer algorithm usually requires a linear data structure such as an array or linked list. A good sign that a problem can be solved this way is that the input follows a predictable dynamic, such as a sorted array.

- **Sorted array:** find two numbers that add up to a target.

- **Palindromic string:** the symmetrical pattern lets us move two pointers towards the center.

- **Sliding window:** maintain a window that grows or shrinks based on conditions, e.g. find the smallest subarray with sum ≥ K, or move all zeros to the end while maintaining order.

## **Real-World Example: Garbage Collection**

In memory compaction, a key part of garbage collection, the goal is to free contiguous memory by eliminating the gaps left by deallocated (dead) objects. A 'scan' pointer traverses the heap to identify live objects, while a 'free' pointer tracks the next available space where live objects should be relocated. As 'scan' moves, it skips dead objects and shifts live ones to the position of 'free', grouping all live objects together and leaving continuous blocks of free memory. (Unlike Chrome, which just takes it all)

## **Unidirectional**

Suppose we are given an array of n positive integers and a target sum x. We want to find a contiguous subarray whose elements add up to x, or report that no such subarray exists.

**Example:** for the array below and x = 8, the elements 2, 5, 1 form a valid subarray (2 + 5 + 1 = 8).


<Fig src="/assets/cp-tp-3.jpeg" width="60%" />




**Idea:** keep two pointers marking the first and last element of the current subarray (the window). On every turn, move the left pointer one step to the right, then move the right pointer forward for as long as the window sum stays at most x. If the sum becomes exactly x, we have found the answer. This works because all values are positive, so extending the window only increases the sum and shrinking it only decreases the sum.

### **Walkthrough (x = 8)**

**Step 1.** The initial window holds 1, 3 and 2, with sum 6. Adding the next element (5) would make the sum 11, which is more than 8, so the right pointer stops.

<Fig src="/assets/cp-tp-4.jpeg" width="60%" />

**Step 2.** The left pointer moves one step right, dropping the 1. The sum is now 5. The right pointer cannot move, because including the next element would exceed 8.

<Fig src="/assets/cp-tp-5.jpeg" width="60%" />

**Step 3.** The left pointer moves right again, dropping the 3, so the sum is 2. Now the right pointer can advance three steps, adding 5 and 1. The window 2, 5, 1 has sum 8, so a subarray with sum x has been found.

<Fig src="/assets/cp-tp-6.jpeg" width="60%" />

### **Time Complexity**

The running time depends on how many steps the right pointer takes. A single turn may move it many steps, so there is no useful bound per turn. However, the right pointer only ever moves to the right, so over the whole algorithm it takes at most O(n) steps. The left pointer also moves at most O(n) steps. Hence the whole algorithm runs in O(n) time.


**Practice:** CSES Given an array of n positive integers, find the number of subarrays having sum x. Keep the count for number of valid subarrays and run the same algorithm.

Try submitting your solutions here: [https://codeforces.com/gym/102961/problem/ZA](https://codeforces.com/gym/102961/problem/ZA)


## **Bidirectional**

Suppose we are given an array of n integers sorted in non-decreasing order and a target sum x. We want to find two elements at different positions that add up to x, or report that no such pair exists.

**Example:** for the sorted array below and x = 15, the elements 3 and 12 form a valid pair (3 + 12 = 15).

<Fig src="/assets/cp-tp-7.jpeg" width="60%" />

**Idea:** put the left pointer on the first (smallest) element and the right pointer on the last (largest) element, and look at their sum s. If s = x, we are done. If s < x, the left element is too small: even when paired with the largest remaining element the sum is not enough, so it cannot be part of any answer and we move the left pointer one step right. If s > x, the right element is too large: even when paired with the smallest remaining element the sum is too big, so we move the right pointer one step left. We stop when the pointers meet. Every step safely discards one element, which is why we never miss an answer. Note that, unlike Subarray Sum, negative numbers are fine here, because the argument relies only on the array being sorted.

### **Walkthrough (x = 15)**

**Step 1.** The pointers start at the two ends: 1 and 15. The sum is 16, which is more than 15, so the right element is too large and the right pointer moves one step left.

<Fig src="/assets/cp-tp-8.jpeg" width="60%" />

**Step 2.** Now the pointers are at 1 and 12, with sum 13. This is less than 15, so the left element is too small and the left pointer moves one step right.

<Fig src="/assets/cp-tp-9.jpeg" width="60%" />

**Step 3.** The pointers are at 3 and 12, with sum 15. This equals x, so a pair with sum x has been found.

<Fig src="/assets/cp-tp-10.jpeg" width="60%" />


### **Time Complexity**

In every step exactly one pointer moves one position towards the other, and they meet after at most n − 1 steps. Hence the two-pointer part runs in O(n) time, compared with O(n²) for trying every pair. If the array is not sorted, sorting it first costs O(n log n), which then dominates the total running time.

**Practice:** CSES Sum of Two Values is this problem on an unsorted array, where you must print the original positions. Sort the pairs (value, original position) and run the same algorithm.

Try submitting your solutions here:

[https://codeforces.com/gym/102961/problem/G](https://codeforces.com/gym/102961/problem/G)
