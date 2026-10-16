---
id: dev-bst
page: dev
sub: Binary Search Tree
type: reading
order: 160
---


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
