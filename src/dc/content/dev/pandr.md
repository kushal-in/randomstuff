---
id: dev-pointers-ref
page: dev
sub: Pointers & References
type: reading
order: 110
---


Until now, whenever you wrote something like `int x = 10;`, you worked with `x` directly: reading its value, changing it, or printing it. Pointers and references are C++'s two tools for working with variables **indirectly**. A **pointer** stores the memory location of a variable, and a **reference** is a second name (an alias) for a variable that already exists.
Here's an [introductory video](https://www.youtube.com/watch?v=fabiBsQWDTY) before we start.

---

## Addresses

Every room in a hostel has two distinct properties: what's inside it and where it is located. Asking "what's in the room?" gets you "a bed, a fan that doesn't work, and a ton of IMC merch(huh?)." Asking "where is the room?" gives you "367." Two different questions, two different answers.

> *wow cool numbers :p me likies 12.984712247671906 80.23513910585335*

Memory works the exact same way. When you write `int x = 10;`, C++ reserves a slot in memory for `x` and stores `10` in it. That slot has an address, which you can retrieve using the `&` (address-of) operator. Think of `&` as looking at the room number on the door:

```cpp
#include <iostream>

int main() {
    int x = 10;

    std::cout << x << std::endl;   // 10, the value stored inside x
    std::cout << &x << std::endl;  // e.g., 0x7ffe3a2c, where x lives in memory
}
```

`x` evaluates to the value, while `&x` gives you its location in memory.

**Try it yourself:** Print `x` and `&x`, then run the program a few times. You may see the address change between runs. Modern operating systems often randomize memory layouts for security (a feature called ASLR), so the same variable can have a different address on different runs.

---
id: dev-pointers-ref-q1
type: long-text
---

**Task 1: Address Aliasing**\
Write a function `bool shareAddress(const int* p1, const int* p2)` that returns `true` if two pointers hold the exact same memory address.\
Test it in `main()`: pass the address of `x` (`&x`) alongside the address of a reference `int& ref = x;` to confirm they share the same address. Then compare `&x` with a completely separate variable `int y = 10;` to verify it returns `false`.

---
id: dev-pointers-ref-r2
type: reading
---


## Pointers

A pointer is like writing a room number down on a sticky note. The note isn't the room itself; it just tells you where the room is located. To see or change what is inside, you walk to that room and open the door.

You can cross out the number on the note and write a new one, so a single pointer can point to different rooms over time. You can also leave the note blank, meaning it points to no room at all.

In C++, a pointer is a variable that stores a memory address. You declare it using `*`:

<Fig src="/assets/meme8.jpeg" width="40%" />

```cpp
int x = 10;
int* p = &x; // p stores the memory address of x
```

To go to that address and work with whatever is inside, put `*` in front of the pointer. This is called **dereferencing**:

```cpp
std::cout << *p << std::endl; // Follows the address in p, prints 10

*p = 99;                      // Follows the address in p, stores 99 inside x
std::cout << x << std::endl;  // Prints 99
```

We never touched `x` directly, but its value changed anyway because `p` points straight to `x`'s memory slot.

Notice that the `*` symbol plays two different roles depending on context:
* **In a declaration (`int* p`):** Declares `p` as a pointer to an `int`.
* **In an expression (`*p`):** Dereferences `p` to access the value stored at that address.

### Reassigning Pointers

Since a pointer is just a variable holding an address, you can overwrite it with a new address whenever you want:

```cpp
int a = 1;
int b = 2;

int* p = &a;
*p = 10;    // Changes 'a' to 10

p = &b;     // p now points to 'b'
*p = 20;    // Changes 'b' to 20
```

Changing `p` changes *where* it points. Changing `*p` changes the *value* of whatever it currently points to. Keep those two distinct: `p` is the note, `*p` is the room it leads to.

### Null Pointers (`nullptr`)

A sticky note with no room number leads nowhere. Trying to walk to a room that was never written down crashes your program. In C++, a blank pointer is assigned `nullptr`:

```cpp
int* p = nullptr;
```

Dereferencing a null pointer is undefined behavior. If you aren't sure whether a pointer holds a valid address, check it first:

```cpp
if (p != nullptr) {
    std::cout << *p << std::endl;
}
```
---
id: dev-pointers-ref-q2
type: long-text
---

**Task 2: Pointer Re-linking**\
Write a function `void rotatePointers(int** a, int** b, int** c)` that takes pointers to three pointer variables and rotates where they point.\
**Example:** If `px` points to `10`, `py` points to `20`, and `pz` points to `30`, calling `rotatePointers(&px, &py, &pz)` should make `px` point to `20`, `py` point to `30`, and `pz` point to `10`. Swap only the pointer target addresses without modifying the integer values `10`, `20`, or `30` in memory.


---
id: dev-pointers-ref-r3
type: reading
---

## References

A reference is a nickname for a room. The door officially says 369, but everyone calls it "the chill guy's room." Two names, same exact room. If someone takes a desk out of "the chill guy's room," it is missing from 369 too, because they are the same place.

A nickname only works for a room that already exists. And once "the chill guy's room" refers to 369, it stays tied to 369 forever. You cannot suddenly reassign "the chill guy's room" to mean a different room.

> *wowie more numberss 12.986030613114542 80.23711539776147*

In C++, a reference is an alias for an existing variable. Declare it with `&` right after the type:

```cpp
int x = 10;
int& r = x; // r is an alias for x

r = 50;
std::cout << x << std::endl; // Prints 50, because r and x are the same variable
```

References follow three strict rules:
1. Must be initialized immediately when created.
2. Can never be rebound to refer to a different variable later.
3. Can never be null.

Watch out for this trap:

```cpp
int a = 1;
int b = 2;

int& r = a;
r = b; // Does NOT make r refer to b!
```

`r = b;` simply copies the *value* of `b` into `a` (since `r` is `a`). So `a` becomes 2, and `r` remains bound to `a`.

Just like `*`, the `&` symbol plays two different roles depending on context:
* **In a declaration (`int& r`):** Declares `r` as a reference.
* **In an expression (`&x`):** Gets the memory address of `x`.


---
id: dev-pointers-ref-q3
type: long-text
---

**Task 3: Fluorescent Toast Dynamics**\
Trace the execution of this code snippet line by line, predict the console output, and explain why `b` stays `10` instead of turning into `99`:

```cpp
int a = 5, b = 10;
int& r = a;
r = b;
r = 99;
std::cout << a << " " << b << std::endl;
```
---
id: dev-pointers-ref-r4
type: reading
---

## Pointers vs. References

A pointer is a sticky note with an address written on it. You can rewrite the address, leave it blank, and you explicitly use `*` to access what is inside. A reference is a permanent nickname for a variable that always exists, and you use it directly like a regular variable name.

* **Changing targets:** A pointer can switch to point at a completely different variable later. A reference stays glued to the variable you gave it forever.
* **Pointing to nothing:** Pointers can be left blank (`nullptr`). A reference must always belong to a real variable that actually exists.
* **Setting them up:** You can create a pointer now and give it an address later. A reference needs its variable right at the exact moment you declare it.
* **How they look in code:** You explicitly write `*` to look inside a pointer. A reference works naturally, looking and feeling just like a normal variable name.

Use a reference when the target variable always exists and will not change. Use a pointer when the target might be optional (`nullptr`) or needs to point to different variables over time.

---

## Reading Declarations

When you encounter syntax like `const int* const p`, reading it directly can feel confusing.

Think of a declaration as listing three things in order: type, symbol, and name.

```cpp
int* p;     // type: int, symbol: *, name: p (pointer)
int& r = x;   // type: int, symbol: &, name: r (reference)
```

Spacing does not change the meaning: `int* p`, `int *p`, and `int * p` are identical. Attaching `*` to the type (`int* p`) keeps it clear that `int*` is the variable's type.

One quick trap: the `*` attaches to individual variable names, not the whole line.

```cpp
int* a, b;  // 'a' is a pointer, but 'b' is a regular int!
int* a, *b; // Both are pointers
```

To avoid bugs, declare one variable per line.

### The Right-to-Left Rule

To read complex declarations, start at the variable name and read leftwards. Read `*` as "pointer to" and `&` as "reference to":

<Fig src="/assets/meme8.jpeg" width="40%" />

* `int* p` reads as: `p` is a pointer to an `int`
* `int& r` reads as: `r` is a reference to an `int`
* `int** pp` reads as: `pp` is a pointer to a pointer to an `int`
* `const int* p` reads as: `p` is a pointer to a `const int`
* `int* const p` reads as: `p` is a `const` pointer to an `int`

### What `const` Controls

- `const int* p`: The value being pointed to is read-only (`*p = 10` fails), but `p` can be changed to point somewhere else.
- `int* const p`: The pointer `p` is locked to its address (`p = &y` fails), but you can change the value stored inside (`*p = 10` works).

```cpp
int x = 5, y = 6;

const int* p1 = &x;
// *p1 = 9;  // Error: value is locked through p1
p1 = &y;     // OK: p1 can point elsewhere

int* const p2 = &x;
*p2 = 9;     // OK: value can be modified
// p2 = &y;  // Error: p2 is locked to x
```

Shortcut: If `const` is to the left of `*`, the **data** is locked. If `const` is to the right of `*`, the **pointer** is locked.


---
id: dev-pointers-ref-q5
type: long-text
---

**Task 4: Const Declaration Analysis**\
Apply the right-to-left rule to `const int* const p = &x;`. Determine which of these two lines will fail to compile, and explain what rule is being violated:
1. `*p = 20;`
2. `p = &y;`

---
id: dev-pointers-ref-r5
type: reading
---

## Passing to Functions

This is where pointers and references show their true power in real-world C++ code.

Imagine asking a friend to clean your room. You could hand them a photo of your room: they clean the photo, but your real room stays messy. Or you could give them a sticky note with your room number so they go to the actual room. Or you could just tell them "clean the chill guy's room," and they walk straight there using its nickname.

These represent **pass by value**, **pass by pointer**, and **pass by reference**:

```cpp
#include <iostream>

void byValue(int n)      { n = 100; } // Changes a local copy
void byPointer(int* n)   { *n = 100; } // Changes the original via address
void byReference(int& n) { n = 100; } // Changes the original via reference

int main() {
    int x = 5;

    byValue(x);
    std::cout << x << std::endl; // 5 (original untouched, copy changed)

    byPointer(&x);
    std::cout << x << std::endl; // 100 (original was edited directly)

    x = 5;
    byReference(x);
    std::cout << x << std::endl; // 100 (original was edited directly)
}
```

Notice the huge difference:
1. **Editing original variables:** Pass by value gives the function a throwaway copy. Pass by pointer or reference lets the function reach straight into the caller's memory to edit the original variable directly.
2. **Avoiding expensive copies:** If you pass a massive object (like a `std::vector` with 100,000 integers) by value, C++ spends time copying every single element into function memory. Passing by reference avoids copying the object, which can be more efficient for large objects.

If a function only needs to read a large object without copying it, pass it by `const` reference:

```cpp
void printName(const std::string& name) {
    std::cout << name << std::endl; // Avoids copying name and prevents modification through this reference
}
```

---
id: dev-pointers-ref-q6
type: long-text
---

**Task 5: Stack Frame Escapes**
Analyze this broken function:
```cpp
int& createNumber() {
    int temp = 100;
    return temp; // Returning reference to local variable
}
```
Explain why trying to use the returned reference in `main()` causes undefined behavior as soon as `createNumber()` finishes executing.

---
id: dev-pointers-ref-r6
type: reading
---

## Pointers and Arrays

An array is like a row of hostel rooms side-by-side: B-201, B-202, B-203. The array's name acts as a pointer to the very first room. To get to the next element, you step over to the adjacent door.

In memory, array elements sit in contiguous slots. In most expressions, C++ automatically treats an array's name as a pointer to its first element:

```cpp
int arr[3] = {10, 20, 30};
int* p = arr; // Points to arr[0]

std::cout << *p       << std::endl; // 10
std::cout << *(p + 1) << std::endl; // 20
std::cout << *(p + 2) << std::endl; // 30
```

Adding 1 to a pointer advances it by the size of one element in memory, not just 1 byte. C++ calculates the byte offset automatically based on the data type. Also, `p[i]` is just shorthand for `*(p + i)`.

Going past the end of an array causes undefined behavior. C++ does not perform automatic bounds checking.

---

## Pointers to Custom Bundles (`->` Operator)

Think of a `struct` as a custom package that groups a few variables under one name. You will explore structs and classes in depth in the next section, but for now, imagine a custom type that holds a student's ID number:

```cpp
struct Student {
    int rollNo;
};
```

If you hold a pointer to a `Student` object, reaching inside requires two steps: first go to the memory address (`*ptr`), then access the variable inside (`.rollNo`). The arrow operator `->` combines both into one single step:

```cpp
Student s;
Student* ptr = &s;

ptr->rollNo = 42;    // Arrow operator shortcut
(*ptr).rollNo = 42;  // Equivalent long form
```

Use `.` when you hold the object directly, and `->` when you hold a pointer pointing to it.

---

## Dynamic Memory (`new` and `delete`)

Variables declared inside standard functions live on the **stack** and get cleaned up automatically when the function finishes. Memory allocated with `new` lives on the **heap**. The operating system reserves that memory for you and returns its address, and it stays allocated until you manually free it using `delete`.

C++11 introduced additional tools for managing dynamic memory; this section focuses specifically on `new` and `delete`.

```cpp
int* p = new int(7); // Allocate an int on the heap

std::cout << *p << std::endl; // 7

delete p;    // Free the allocated heap memory
p = nullptr; // Reset p so it doesn't point to freed memory
```

For dynamic arrays, use `new[]` and free them with `delete[]`:

```cpp
int* arr = new int[5];
delete[] arr;
```

If you allocate heap memory with `new` and lose the pointer without calling `delete`, that memory remains occupied until the program terminates. This is called a **memory leak**.

Now that you know how memory addresses work, how to move through variables indirectly, and how to manually request memory from the operating system, you hold the keys to C++'s lowest-level mechanics. Up next, you will build on this foundation to design full custom data types :p.