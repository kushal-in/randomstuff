---
id: dev-implement
page: dev
sub: Implementations
type: reading
order: 150
---


The following section contains implementation-based problems covering the concepts discussed in the previous sections.

All challenges are hosted together in a single HackerRank contest.

### Challenges

You will be expected to implement:

- **C++ Classes** and related object-oriented programming concepts
- **Merge Sort & Inversion Counting** using a singly linked list
- **Binary Search Tree (BST)** operations

### Submission

Complete and submit your solutions through the HackerRank contest: **[Open HackerRank Contest](https://www.hackerrank.com/pcdc-app-dev-contest-2026)**

> Make sure to read the individual problem statements carefully before submitting.

---

## Additional Reading & Instructions

# Merge Count

## Overview

This reading material contains the starter code and learning resources for a C++ programming challenge on singly linked lists, merge sort, and inversion counting.

## Objectives

- Implement insertion and deletion operations on a singly linked list.
- Search for elements and display the list.
- Count the number of nodes.
- Implement stable merge sort by relinking existing nodes.
- Count inversions in O(n log n) time.
- Manage dynamically allocated memory correctly.



**The HackerRank problem statement contains the exact requirements, input/output format, constraints, and test cases for the challenge.**


**The starter code, implementation guidelines, and learning resources are provided below to help you understand and complete the problem.**
## Starter Code

```
#include <iostream>
#include <string>
using namespace std;

struct Node {
    long long value;
    string label;
    Node* next;
};

/*     DONT CHANGE ANYTHING ABOVE            */

class LinkedList {
private:
    Node* head;

    /*
    Implement helper functions inside this class as needed.
    */

public:
    LinkedList() {
        head = nullptr;
    }

    //use your private helper functions and complete the functions which are given
    void pushFront(int value, string label) {
    }

    void pushBack(int value, string label) {
    }

    void popFront() {
    }

    void popBack() {
    }
    void find(int value) {
    }

    void display() {
    }

    void count() {
    }

    void mergeSort() {
    }

    void mergeSortCount() {
    }

    ~LinkedList() {
        //Free all remaining nodes.
    }
};
/* DONT CHANGE ANYTHING BELOW */

int main() {
    int Q;
    cin >> Q;

    LinkedList list;

    for (int i = 0; i < Q; i++) {
        string command;
        cin >> command;

        if (command == "PUSH_FRONT") {
            int value;
            string label;
            cin >> value >> label;
            list.pushFront(value, label);
        }
        else if (command == "PUSH_BACK") {
            int value;
            string label;
            cin >> value >> label;
            list.pushBack(value, label);
        }
        else if (command == "POP_FRONT") {
            list.popFront();
        }
        else if (command == "POP_BACK") {
            list.popBack();
        }
        else if (command == "FIND") {
            int value;
            cin >> value;
            list.find(value);
        }
        else if (command == "DISPLAY") {
            list.display();
        }
        else if (command == "COUNT") {
            list.count();
        }
        else if (command == "SORT") {
            list.mergeSort();
        }
        else if (command == "SORT_COUNT") {
            list.mergeSortCount();
        }
    }

    return 0;
}
```

Complete the required functions inside the `LinkedList` class. Follow the problem statement for the exact input/output format and operation specifications.

## Required Operations

| Command | Description |
|---|---|
| `PUSH_FRONT` | Insert a node at the beginning |
| `PUSH_BACK` | Insert a node at the end |
| `POP_FRONT` | Remove and free the first node |
| `POP_BACK` | Remove and free the last node |
| `FIND` | Find the first node with the specified value |
| `DISPLAY` | Print the list |
| `COUNT` | Print the number of nodes |
| `SORT` | Sort the list using merge sort |
| `SORT_COUNT` | Count inversions and sort the list |

### Test Case Distribution:
- 00–02: INSERT, DISPLAY
- 03–06: insertion, deletion, DISPLAY
- 07–08: FIND, DISPLAY, COUNT
- 09–14: SORT, DISPLAY
- 15–22: SORT_COUNT, DISPLAY
- 23–39: mixed operations

## Learning Resources
1. Singly Linked Lists

- [Singly Linked List Tutorial — GeeksforGeeks](https://www.geeksforgeeks.org/dsa/singly-linked-list-tutorial/)
- [Insertion in Linked List — GeeksforGeeks](https://www.geeksforgeeks.org/dsa/insertion-in-linked-list/)
- [Deletion in Linked List — GeeksforGeeks](https://www.geeksforgeeks.org/dsa/linked-list-set-3-deleting-node/)

2. Merge Sort and Inversion Counting
- [Merge Sort - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/merge-sort/)
- [Count Inversions in an Array using Merge Sort - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/inversion-count-in-array-using-merge-sort/)

3. C++ Dynamic Memory Management

- [Dynamic Memory Allocation Using new and delete — GeeksforGeeks](https://www.geeksforgeeks.org/cpp/new-and-delete-operators-in-cpp-for-dynamic-memory/)
- [C++ Destructors — cppreference](https://en.cppreference.com/w/cpp/language/destructor)

---

# Binary Search Tree


## 1. Introduction

A **Binary Tree** is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.

A **Binary Search** Tree (BST) is a binary tree in which every node stores a key and obeys the search-tree property:

- All keys in the left subtree of a node are strictly less than the key of that node.

- All keys in the right subtree of a node are strictly greater than the key of that node.

## 2. Node Structure

Each node of the tree contains the following fields:

- `key` – the integer value stored at the node

- `left` – pointer to the left child (or null if none)

- `right` – pointer to the right child (or null if none)

- `parent` – pointer to the parent node (or null for the root)

- `size` – number of nodes in the subtree rooted at this node (including the node itself). size(null) = 0.

A leaf is a node whose left and right pointers are both null.

## 3. Example Tree

The tree obtained by inserting the keys 50, 30, 70, 20, 40, 60, 80 in that order is shown below.

Each node is labelled with its key; the size of a node is written in parentheses.

<Fig src="/assets/dev-bst-1.jpeg" width="50%" />

Inorder traversal of this tree yields the sorted sequence: 20, 30, 40, 50, 60, 70, 80.


## 4. The Question

Implement a Binary Search Tree that supports the operations listed below. You must maintain the BST ordering invariant and keep the `size` field of every node consistent after every insertion and deletion.

`insert(key)` Insert the given key into the tree as a new leaf, preserving the BST property and updating size fields.

`delete(key)` Remove the node containing the given key (handle the three cases: leaf, one child, two children) and update size fields.

`contains(key)` Return true if the key is present in the tree, false otherwise.

`inorder()` Return the list of all keys obtained by an inorder (left-root-right) traversal.

`preorder()` Return the list of all keys obtained by a preorder (root-left-right) traversal.

`postorder()` Return the list of all keys obtained by a postorder (left-right-root) traversal.

`find min()` Return a pointer to the node that holds the smallest key in the tree..

`find max()` Return a pointer to the node that holds the largest key in the tree.

`subtree size(node)` Return the number of nodes in the subtree rooted at the given node (0 if the node is null).

`kth smallest(k)` Return a pointer to the node that holds the k-th smallest key (1-based).

## 5. Worked Examples

## 5.1 Insertion and Traversals

Starting from an empty tree, after the insertions 50, 30, 70, 20, 40 the tree is:

<Fig src="/assets/dev-bst-2.jpeg" width="50%" />

## Then:

- `inorder()` → 20 30 40 50 70

- `preorder()` → 50 30 20 40 70

- `postorder()` → 20 40 30 70 50

- `contains(40)` → true

- `contains(25)` → false

- `find min()` → pointer to the node with key 20

- `find max()` → pointer to the node with key 70

- `kth smallest(3)` → pointer to the node with key 40

- `subtree size(root)` → 5

## 5.2 Deletion

Deleting 30 from the tree above (the node has two children). Its inorder successor is 40. After the deletion the tree becomes:

<Fig src="/assets/dev-bst-3.jpeg" width="50%" />

Then:

- `inorder()` → 20 40 50 70

- `contains(30)` → false

- `kth smallest(2)` → pointer to the node with key 40

- `subtree size(root)` → 4
