---
id: dev-pointers-ref
page: dev
sub: Pointers & References
type: reading
order: 110
---


Pointers sound complicated, but you already deal with the same ideas every day: room numbers, nicknames for rooms, and sticky notes with the wrong room number on them. This page uses a hostel to explain all of it.

Here's the real definition. Until now, whenever you wrote something like `int x = 10;`, you worked with `x` directly: read it, change it, print it. Pointers and references are the two ways C++ lets you work with a variable *indirectly*. A **pointer** stores the location of a variable in memory, and a **reference** is a second name for a variable that already exists.

Why bother? Two reasons. First, it lets a function change your original variable instead of a private copy of it. Second, it lets you pass around huge chunks of data without copying them every single time. Both are covered below.

The analogy for the whole page:

* A variable is a hostel room.
* The value stored in it is whatever's inside the room.
* The address is the room number.

(Any snippet below that prints something assumes `#include <iostream>` at the top. I've left it out to keep things short.)


<Fig src="/assets/meme3.jpeg" width="40%" />


## **Addresses**

Every room has two things about it: what's inside, and where it is. Ask "what's in the room?" and the answer is "two beds, a fan that doesn't work, and a lot of Maggi packets." Ask "where's the room?" and the answer is "B-204." Two different questions, two different answers.

Memory works exactly like this. When you write `int x = 10;`, the computer reserves a block of memory for `x` and stores 10 in it. That block has an address, and the `&` operator (address-of) hands it to you. Think of `&` as reading the number on the door:

```
int x = 10;

std::cout << x << std::endl;     // 10, the value stored in x
std::cout << &x << std::endl;    // something like 0x7ffe3a2c, where x lives
```

`x` is the value. `&x` is where that value lives.

**Try it yourself:** Print `x` and `&x`, then run the program a few times. The address can differ from run to run. The operating system decides where your program is placed in memory (modern systems deliberately randomize it, a feature called ASLR), so don't expect the same room number every time. Same hostel, different allotment every semester.

## **Pointers**

A pointer is a sticky note with a room number written on it. The note is not the room. It only tells you where the room is, and if you want to see what's inside, you have to walk there and open the door.

You can cross out the number and write a different one, so the same sticky note can point to different rooms at different times. You can also leave the note blank, meaning it points to no room at all.

In C++, a pointer is a variable that stores a memory address. You declare it with a `*`:

```
int x = 10;
int* p = &x;       // p stores the address of x
```

To go to that address and use whatever is there, you put a `*` in front of the pointer. This is called **dereferencing**, and it's the equivalent of walking to the room number on the note and going inside:

```
std::cout << *p << std::endl;    // follows the address in p, prints 10

*p = 99;                         // follows the address in p, stores 99 there
std::cout << x << std::endl;     // 99, because p was pointing at x
```

We never touched `x` directly, but it changed anyway, because `p` led straight to it. You didn't stand in front of the room. You followed the note and changed what's inside.

The `*` symbol plays two different roles depending on where it appears:

| Where it appears | What it means |
| ----- | ----- |
| In a declaration: `int* p` | p is a pointer to an int |
| In an expression: `*p` | the value at the address stored in p |

### **Rewriting the note**

Since a pointer is only a sticky note, you can cross out the room number and write a new one. In code, you just assign it a new address:

```
int a = 1;
int b = 2;

int* p = &a;
*p = 10;           // changes a

p = &b;            // p now points at b
*p = 20;           // changes b
```

Changing `p` changes *which* variable it points to. Changing `*p` changes the *value* of whatever it points to. Keep those two apart: `p` is the note, `*p` is the room it leads to.

**Try it yourself:** Take the snippet above, add a line printing `a` and `b` after each change, and predict the output before running it.

### **The blank note**

A sticky note with no room number leads nowhere. If you try to walk to a room that was never written down, there's nowhere to walk to. In C++, the blank note is `nullptr`:

```
int* p = nullptr;
```

Dereferencing a null pointer is undefined behavior, meaning the C++ standard doesn't define what happens. So if you're not sure whether a pointer is pointing at something, check first:

```
if (p != nullptr) {
    std::cout << *p << std::endl;
}
```

**Try it yourself:**

```
// null.cpp
#include <iostream>

int main() {
    int* p = nullptr;
    std::cout << *p << std::endl;
    return 0;
}
```

Compile and run it. On Linux, you'll see `Segmentation fault`. Now ask yourself: which of the four stages from the compilation page did this error come from? (Hint: did the program even finish building?)

## **References**

A reference is a nickname for a room. The door says B-204, but everyone calls it "the dungeon". Two names, one room. If someone moves a bed out of "the dungeon", it's gone from B-204 too, because it's the same room.

A nickname only works for a room that already exists. And once "the dungeon" means B-204, it means B-204 forever. You can't suddenly make "the dungeon" mean a different room.

In C++, a reference is a second name for an existing variable. You declare it with an `&` after the type:

```
int x = 10;
int& r = x;        // r is another name for x

r = 50;
std::cout << x << std::endl;     // 50, because r and x are the same variable
```

A reference follows three rules:

* It must be initialized the moment it's created.
* It can never be changed to refer to something else.
* It can't be null.

The second rule sets a trap:

```
int a = 1;
int b = 2;

int& r = a;
r = b;             // does NOT make r refer to b
```

`r = b;` copies the *value* of `b` into `a` (because `r` is `a`). So `a` becomes 2, and `r` still refers to `a`. In the analogy, it's like walking into "the dungeon" and moving everything from another room into it. "The dungeon" still means the same room as before.

**Try it yourself:** Add `r = 10;` after `r = b;`, then print both `a` and `b`. Predict the output first. If you guessed `b` would change, reread the paragraph above.

Notice that `&` also plays two roles, just like `*` did:

| Where it appears | What it means |
| ----- | ----- |
| In an expression: `&x` | the address of x |
| In a declaration: `int& r` | r is a reference |

## **Pointers vs. references**

A pointer is a sticky note with a room number. You can cross the number out, you can leave the note blank, and you have to walk there to see what's inside. A reference is a nickname for a room. It's permanent, it always means a real room, and you use it as if it were the room itself.

A pointer can be null, it can be pointed at something else later, and the compiler lets you leave it uninitialized (don't). You get to the value with `*p`. A reference can't be null, can't be re-pointed, has to be initialized the moment it's created, and you use it by its name alone, with no `*`.

Use a reference when the target always exists and never changes. Use a pointer when it might be missing or needs to change.

## **Reading declarations**

At some point you'll run into something like `const int* const p` and wonder what on earth it means. This section is how you read those without panicking.

Think of a declaration as the label on a room. It always lists things in the same order: what kind of stuff goes inside (the type), then whether this is a sticky note or a nickname (the symbol), then the name. So, when defining a pointer or a reference, the order is always:

**type, then symbol, then name**

```
int* p;         // type: int, symbol: *, name: p   (a pointer)
int& r = x;     // type: int, symbol: &, name: r   (a reference)
```

Spacing doesn't matter. `int* p`, `int *p` and `int * p` all mean exactly the same thing. This page attaches the star to the type (`int* p`), because the `*` is part of the type: "pointer to int".

One trap, though: the star belongs to each name separately, not to the whole line.

```
int* a, b;      // a is a pointer, b is just a normal int
int* a, *b;     // both are pointers
```

To avoid this, declare one variable per line.

### **Right to left**

To read any declaration, start at the name and read toward the left. Say `*` as "pointer to" and `&` as "reference to":

| Declaration | Read it as |
| ----- | ----- |
| `int* p` | p is a pointer to an int |
| `int& r` | r is a reference to an int |
| `int** pp` | pp is a pointer to a pointer to an int |
| `const int& r` | r is a reference to a const int |
| `const int* p` | p is a pointer to a const int |
| `int* const p` | p is a const pointer to an int |

### **What `const` does here**

A `const int* p` is a visitor pass. You can walk into the room and look around, but you can't touch anything. You can still cross out the room number on your sticky note and write a different one.

An `int* const p` is a room number written on your ID card in pen. The number can never change, but the room it points to is fully yours to rearrange.

```
int x = 5, y = 6;

const int* p1 = &x;
// *p1 = 9;     not allowed, you can't change the value through p1
p1 = &y;        // allowed, p1 can point somewhere else

int* const p2 = &x;
*p2 = 9;        // allowed, the value can be changed
// p2 = &y;     not allowed, p2 is stuck on x
```

A shortcut to remember: if `const` is to the left of the `*`, the value is locked. If it's to the right of the `*`, the pointer is locked.

### **Symbols inside expressions**

The same two symbols mean different things depending on where they appear. A quick test: is there a type (like `int` or `string`) right before the symbol? If yes, it's part of a declaration. If no, it's an operation.

| What you see | Where | Meaning |
| ----- | ----- | ----- |
| `int* p` | after a type, in a declaration | p is a pointer |
| `*p` | in front of a name, in an expression | go to the address and use the value there |
| `int& r = x` | after a type, in a declaration | r is a reference |
| `&x` | in front of a name, in an expression | the address of x |

**Try it yourself:** Read these out loud, right to left, before checking the answers below.

```
const int* const p;
int** pp;
const int& r;
```

Answers: `p` is a const pointer to a const int. `pp` is a pointer to a pointer to an int. `r` is a reference to a const int.

## **Passing to functions**

This is the main reason pointers and references exist.

Say you ask a friend to sort out your messy room. You could send them a photo of it, and they'd tidy up the photo while your real room stays a disaster. Or you could give them a sticky note with the room number, and they'd go to your actual room and clean it. Or you could just say "clean the dungeon", and they'd go straight there by name, no note needed.

Those are **pass by value**, **pass by pointer** and **pass by reference**, in that order. Copying is also slow and eats memory when the thing is big, like a room packed floor to ceiling or a large `std::vector`.

```
void byValue(int n)      { n = 100; }
void byPointer(int* n)   { *n = 100; }
void byReference(int& n) { n = 100; }

int main() {
    int x = 5;

    byValue(x);
    std::cout << x << std::endl;     // 5, the function changed a copy

    byPointer(&x);
    std::cout << x << std::endl;     // 100, the function changed the original

    x = 5;
    byReference(x);
    std::cout << x << std::endl;     // 100, the function changed the original
}
```

If a function only needs to *read* something large, pass it by `const` reference. You get the speed of a reference (no copy), and `const` guarantees the function can't change it:

```
void printName(const std::string& name) {
    std::cout << name << std::endl;
}
```

**Try it yourself:** Write a function `swap(int& a, int& b)` that swaps two numbers using references. Then write the same function using pointers. Compare how the *call* looks in each case (`swap(x, y)` vs `swap(&x, &y)`), and think about which one you'd rather write every day.

## **Pointers and arrays**

An array is a row of rooms on one floor: B-201, B-202, B-203, side by side. The array's name acts like the room number of the first room. To get to the next one, you don't need a new number, you just walk to the next door.

In memory, an array's elements sit right next to each other, and the name of the array can be used as a pointer to its first element:

```
int arr[3] = {10, 20, 30};
int* p = arr;              // points to arr[0]

std::cout << *p << std::endl;          // 10
std::cout << *(p + 1) << std::endl;    // 20
std::cout << *(p + 2) << std::endl;    // 30
```

Adding 1 to a pointer moves it forward by one *element*, not one byte. C++ knows the size of the type and adjusts for it. Also, `p[2]` is just shorthand for `*(p + 2)`; they mean the same thing.

Going past the end of an array is undefined behavior. Past the last room on the floor is whatever happens to be there: the staircase, the warden's room, someone else's floor. C++ doesn't check. The compiler assumes you know what you're doing (this is a bold assumption).

**Try it yourself:** Create an array of 5 ints, then print every element using only a pointer and `p + i`, with no `arr[i]` anywhere.

## **Pointers to structs**

Say your room has a desk, a cupboard and a balcony, and all you have is the room number. Normally you'd go to the room, then walk over to the cupboard. The arrow `->` does both in one step. It means "go to this room and head straight to this part of it."

If you're already standing inside the room (you have the object itself, not a sticky note), you just walk to the cupboard with the dot.

```
struct Student {
    int rollNo;
};

Student s;
Student* ptr = &s;

ptr->rollNo = 42;          // the shortcut
(*ptr).rollNo = 42;        // same thing, written the long way
```

So: `.` when you have the object itself (or a reference to it), `->` when you have a pointer to it.

**Try it yourself:** Make a `Student` with a `name` and a `rollNo`. Create a pointer to it, change both fields through the pointer using `->`, then print them using the original variable, to confirm the changes stuck.

## **`new` and `delete`**

Normally, rooms get assigned to you automatically and taken back when you're done. With `new`, you walk up to the warden and ask for a room yourself. He allots one and gives you the room number. Now it's *your* job to vacate it when you're finished. If you forget, the room stays yours, sitting empty, and the hostel has one less room to give out. Lose the sticky note too, and you can't even find the room to vacate it.

In C++, `new` allocates memory on the heap while the program is running and returns its address. `delete` frees it:

int* p = new int(7);
```

std::cout << *p << std::endl;    // 7

delete p;          // free the memory
p = nullptr;       // good habit: don't leave p pointing at freed memory
```

For arrays, use `new int[5]` and free it with `delete[]`.

If you never call `delete`, that memory is never given back. This is called a **memory leak**. The program still runs correctly, but its memory usage grows every time the leaking code runs. Picture one student who got 40 rooms allotted and never vacated any. Eventually the warden has nothing left to give anyone.

**Try it yourself:** g++ can actually catch leaks for you with the `-fsanitize=address` flag. Save this as `leak.cpp`:

```
// leak.cpp
int main() {
    int* p = new int(7);
    return 0;
}
```
```
g++ -fsanitize=address -g leak.cpp -o leak
./leak
```

On Linux, you'll get a report telling you exactly which line allocated memory that never got freed. (On macOS, leak detection isn't supported by default, but the next section's example still works.) Now add `delete p;` before the `return` and run it again.

## **Common mistakes**

Every one of these is a hostel problem first, and a bug second.

### **Walking to a blank note**

You try to walk to a room that was never written down. There's nowhere to go. This is dereferencing a null pointer, the same bug you triggered on purpose earlier.

### **Walking to a random number**

You grab a sticky note with a random number scribbled on it and walk to that room. You could land in a stranger's room, the mess hall or a locked storeroom. This is an **uninitialized pointer**: it holds a garbage address. Always start with `nullptr` if you have nothing to assign yet.

```
int* p;
*p = 5;            // garbage address, undefined behavior
```

### **Going to a room you already vacated**

You vacated the room, but you still have the sticky note with its number. The next day you walk in, and there's a stranger sleeping in your bed who was allotted the room after you. He is not happy to see you. This is a **dangling pointer**: a pointer to memory that has already been freed.

```
int* p = new int(5);
delete p;
std::cout << *p << std::endl;     // the memory is freed, this is a bug
```

**Try it yourself:** Save the snippet above (inside a `main`) as `dangling.cpp` and compile it with the sanitizer:

```
g++ -fsanitize=address -g dangling.cpp -o dangling
./dangling
```
You should get a `heap-use-after-free` report pointing at the exact line. Read through the report. The first lines name the error type and point to the line that caused it.

### **Handing out a guest room number**

Your parents visit, and the hostel gives them a guest room for the weekend. You give your friend that room number. By the time your friend goes there, the visit is over and the room has been given to someone else. This is returning the address of a local variable, which is destroyed as soon as the function ends:

```
int* broken() {
    int x = 10;
    return &x;     // x is destroyed when the function returns
}
```

**Try it yourself:** Compile this with `g++ -Wall` and read what the compiler says. Then fix it in two different ways.

### **Vacating the same room twice**

You walk up to the warden and vacate a room you already vacated. He checks his register and has no record of you there. In C++ this is a **double delete**, which is undefined behavior. Setting the pointer to `nullptr` after `delete` protects you, since deleting a null pointer does nothing.

### **Never vacating what you were allotted**

You keep asking for rooms and never vacate any of them. The hostel slowly runs out of rooms. This is the **memory leak** from earlier.

