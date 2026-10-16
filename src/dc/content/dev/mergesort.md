---
id: dev-mergecount
page: dev
sub: MergeCount
type: reading
order: 150
---


## Overview

This reading material contains the starter code and learning resources for a C++ programming challenge on singly linked lists, merge sort, and inversion counting.

## Objectives

- Implement insertion and deletion operations on a singly linked list.
- Search for elements and display the list.
- Count the number of nodes.
- Implement stable merge sort by relinking existing nodes.
- Count inversions in O(n log n) time.
- Manage dynamically allocated memory correctly.

Link for Submission: [Hackerrank - Merge Count](https://www.hackerrank.com/contests/mergecount/challenges/mergecount/)

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
- 01–04: insertion operations
- 05–08: insertion + deletion
- 09–10: FIND, DISPLAY, COUNT
- 11–16: SORT
- 17–24: SORT_COUNT
- 25–40: mixed operations

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