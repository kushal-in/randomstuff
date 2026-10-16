---
id: dev-macros-compilers
page: dev
sub: Macros & Compilers (Bonus)
type: reading
order: 140
---


## The Compilation Process


During your short(or maybe long) stint in writing c/c++ code, you would have used the compiler(`g++` or `clang` or `msvc`) to convert your code into a (magical)executable file, using a command like so:
```
g++ file.cpp -o a.out
./a.out
```
(I'll be using `g++` for all of my command snippets for convenience, if you notice any discrepancy do bring it up in the group.)

It is easy to treat this as one step: "compile the file, get a program."
In reality, `g++` is running four distinct stages on your behalf:
1. preprocessing
2. compilation
3. assembly
4. linking

And `g++` itself isn't even doing most of that work. It is actually coordinating other programs in some specified sequence and passing the outputs from one to the next. Understanding these
stages individually is useful for a simple reason: a large share of the errors you'll hit while coding come from one specific stage,
and knowing which one is immediately useful for debugging(assuming you actually want to understand your errors as opposed to just pasting them in an llm's chat and having it debug them instead).

### Stage 1: Preprocessing

Before your code is compiled at all, it's handed to the **preprocessor**, which does pure text substitution. It has no understanding of C++ syntax and no type-checking. It expands `#include` directives by literally copying the contents of the named file into yours, and expands any macros(more on this later :D) the same way: by substitution, not evaluation.

You can see this step in isolation by using the `-E` flag, which tells the compiler to stop after preprocessing:

```
g++ -E file.cpp -o file.i
```

**Try it yourself:**

```cpp
// tiny.cpp
#include <iostream>

int main() {
    return 0;
}
```

```
g++ -E tiny.cpp -o tiny.i
wc -l tiny.i
```

Open `tiny.i` and skim it, you'll see the stuff that actually gets compiled.

### Stage 2: Compilation and assembly

The preprocessed output is handed to the actual **compiler**, which checks your syntax, enforces C++'s type rules, and translates your code into **assembly** - a human-readable text representation of the low-level instructions a processor executes. You can stop here too, by using the `-S` flag:

```
g++ -S file.cpp -o file.s
```

The assembler then converts that text into an **object file** - this is actual machine code in binary, but not yet a runnable program. Stop at this stage using the `-c` flag to get a `.o` file:

```
g++ -c file.cpp -o file.o
```

An object file is close to a finished program, but it's missing something important, which brings us to the last stage.

### Stage 3: Linking

An object file can contain *references* to things it doesn't define itself - most obviously, functions from the standard library, like `std::cout` or `std::cin`. The **linker**'s job is to take one or more object files, find every such reference and resolve it to an actual address, producing a single runnable binary executable.

This matters more once your program spans multiple files(to motivate why you might want to have your *future* projects structured into multiple files, consider that the chromium browser contains roughly 35 to 40 **million** lines of code).

Suppose you split a program into `main.cpp` and `helper.cpp`, where `main.cpp` calls a function defined in `helper.cpp`. You can compile each independently into its own object file:

```
g++ -c main.cpp -o main.o
g++ -c helper.cpp -o helper.o
```

Neither of these is a complete program on its own - `main.o` contains a *call* to the function in `helper.cpp`, without knowing where that function will actually live in program memory. Linking them together resolves this:

```
g++ main.o helper.o -o a.out
```

After linking, we now have an executable binary.

### Translation units

Each file the compiler processes on its own, for example, your `.cpp` file, after the preprocessor has pasted in everything it `#include`s - is called a **translation unit**. This term matters because it explains a limitation: the compiler, while compiling `main.cpp`, has no knowledge of what's inside `helper.cpp`. It only knows what `main.cpp`'s translation unit contains, which is `main.cpp` itself plus everything pulled in by its `#include`s.

This is precisely why header files exist. If `main.cpp` calls a function defined in `helper.cpp`, the compiler needs to at least know that function's *signature*(as a forward declaration). This includes its name, parameters, and return type, in order to enable checking the validity of all the function calls your code makes. Keep in mind that the compiler is unaware of the function's actual implementation until the linking step.

A header file is how you give the compiler that information
without pasting in the whole implementation: it holds **declarations**
("this function exists, and looks like this"), while the `.cpp` file holds the **definition** ("here's what it actually does").

**Try it yourself:** Create these three files:

```cpp
// helper.h
int square(int x);
```

```cpp
// helper.cpp
#include "helper.h"

int square(int x) {
    return x * x;
}
```

```cpp
// main.cpp
#include "helper.h"
#include <iostream>

int main() {
    std::cout << square(5) << std::endl;
    return 0;
}
```

Now compile and link only `main.cpp`, skipping `helper.cpp` entirely:

```
g++ -c main.cpp -o main.o
g++ main.o -o a.out
```

You should get an error from the linker, not the compiler.

### Static vs. dynamic linking

So far, we've looked at linking from the perspective of combining your own object files. The same process also pulls in code from libraries - collections of precompiled functionality written by others. The standard library is one such example. There are two ways this can happen:

- **Static linking** copies the library's code directly into your final binary executable at link time. The result is self-contained and larger.
- **Dynamic linking** instead records a reference to a separate library file(a `.so` file on linux, `.dll` on windows, `.dylib` on macos) that gets loaded when your program actually runs. The binary is smaller, and multiple programs can share one copy of the library on disk but your program now depends on that library file being present on whatever machine runs it.

You've been dynamically linking against the C++ standard library the whole time without specifying it, since that's `g++`'s default behavior. The standard library is a special case though, since `g++` always knows where to find it and links it in automatically. Libraries you didn't write and
that aren't part of the standard library need to be named explicitly.

**Try it yourself:** [zlib](https://zlib.net/) is a small, widely used compression library. First, install its development files, so the compiler has the header and the library to link against. The command differs by
platform:

```
#ubuntu/debian
sudo apt install zlib1g-dev

#fedora
sudo dnf install zlib-devel

#arch
sudo pacman -S zlib

#macOS(with homebrew)
brew install zlib

#windows(MSYS2/MinGW)
pacman -S mingw-w64-x86_64-zlib
```

Then save this as `zlibtest.cpp`:

```cpp
#include <zlib.h>
#include <iostream>

int main() {
    const char* data = "hello world";
    unsigned long checksum = crc32(0L, reinterpret_cast<const Bytef*>(data), 11);
    std::cout << checksum << std::endl;
    return 0;
}
```

Compile it in two ways and compare:

```
g++ zlibtest.cpp -o a.out
g++ zlibtest.cpp -lz -o a.out
```

One of these fails. Identify which stage the error comes from, using what you now know from the previous section.

Here, `-l` names a library for the linker to search: `-lz` stands for `libz`. The `lib` prefix and file extension are both dropped by convention.

 If your system keeps the library somewhere the linker doesn't search by default, `-L` adds a directory to that search path, for example, by doing `-L/usr/local/lib -lz`, to search `/usr/local/lib` for the shared library alongside the default paths.

### Reading errors by stage

Because a build is really four stages chained together, an error tells you something the moment you can identify *which* stage produced it:

- A **preprocessor error** usually means a missing or misspelled header, or a malformed macro.
- A **compiler error** means your code, once fully preprocessed, violates C++'s syntax or type rules, for example, a missing semicolon, a type mismatch, a misspelled variable, etc.
- A **linker error**, commonly `undefined reference to ...`, this means every file compiled fine individually, but something referenced in one file was never actually defined anywhere(or was defined more than once in case of `multiple definition of ...` being the error).

## Macros(and more?)

The previous section covered the preprocessor's most common job - expanding `#include` by pasting file contents into the source file. Its other major job is expanding **macros**. These are text substitutions defined with `#define`, performed before your code is type-checked or even fully parsed. Macros predate most of the language features C++ now offers for the same purposes. The goal of this section is to understand where they're still useful and where they've been replaced by other, better alternatives.

### Object-like macros

The simplest form just substitutes one token for another:

```cpp
//macro1.cpp
#define MAX_PLAYERS 4

int main() {
    int scores[MAX_PLAYERS];
    return 0;
}
```

**Try it yourself:**

```
g++ -E macro1.cpp -o macro1.i
```

Find the line in `macro1.i` corresponding to `int scores[MAX_PLAYERS];` and see what it got replaced by. Note that this happened before the compiler ever checked whether `4` makes sense as an array size.

### Function-like macros

Macros can also take arguments:

```cpp
#define SQUARE(x) x * x
```

This looks like a function, but it isn't one. Instead, this is pure text substitution, with no understanding of precedence, types or evaluation order.

**Try it yourself:**

```cpp
// macro2.cpp
#include <iostream>
#define SQUARE(x) x * x

int main() {
    int result = SQUARE(2 + 3);
    std::cout << result << std::endl;
    return 0;
}
```

Predict the output before compiling and running it.

Then check.

 If your prediction was `25`, find the preprocessed output(`-E`) and look at what `SQUARE(2 + 3)` actually expanded to.

The usual fix is parenthesizing everything:

```cpp
#define SQUARE(x) ((x) * (x))
```

However, even this is not sufficient. Consider:

```cpp
int i = 5;
int result = SQUARE(i++);
```

**Try it yourself:** Work out by hand what this expands to, using the parenthesized definition above. Then compile and print both `result` and `i` afterward.

Function-like macros substitute their arguments everywhere they appear in the macro body, including multiple times and inside expressions with side effects. That's why they should be dealt with cautiously.

### Stringification and token pasting

Two operators exist specifically for macro text manipulation:

- `#` turns a macro argument into a string literal.
- `##` concatenates two tokens into one, before the result is parsed.

```cpp
#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b

std::cout << STRINGIFY(hello) << std::endl; // "hello"
int CONCAT(my, Var) = 10; // int myVar = 10;
```

### Predefined macros

The compiler defines a handful of macros for you:

```cpp
#include <iostream>

int main() {
    std::cout << __FILE__ << std::endl;
    std::cout << __LINE__ << std::endl;
    std::cout << __DATE__ << std::endl;
    std::cout << __cplusplus << std::endl;
    return 0;
}
```

**Try it yourself:** Run this. Then move the `std::cout << __LINE__` line to a different line in the file and run it again. This should make it obvious what the macros are substituting for during preprocessing.

### Where modern C++ replaced macros

A macro has no type, no scope and no awareness of the language around it, all of which are features we'd rather have. For most of the jobs macros used to do, C++ now has alternatives that don't share these problems. Take a look at them, as per your interest:

- **`const`** declares a named, typed and read-only value. Unlike `#define`, it respects scope and the compiler can take its type into account.
- **`constexpr`** adds more - it tells the compiler that the value(or the result of a function) must be computable *at compile time*, not just that it shouldn't change at runtime. Note that a constexpr function result can still be evaluated at runtime, depending on the availability of arguments.
- **`consteval`** is even stricter - a `consteval` function must be evaluated at compile time, with no option to fall back to runtime.

```cpp
#define MAX_PLAYERS 4 // old C way of declaring constants
constexpr int max_players = 4; // typed, scoped and the same compile-time guarantee as macros -> the modern C++ way
```
I haven't gone into much detail about the specifics of `constexpr`, `consteval` and `const`, that would be out of scope for this little guide. Feel free to [explore it](https://youtu.be/tA6LbPyYdco?si=0b9xsCzSPyptkFU3) on your own though :D.

### What macros are still for

Despite all this, macros haven't disappeared. They're mainly used for two purposes:

- **Conditional compilation** - including or excluding code entirely before the compiler ever sees it, based on what platform, build configuration, or feature flags are active.
- **Header guards** - check the next section :P

## Header Guards and Compiler Directives

Now, we're going to look at an application of two concepts we've learnt - translation units and macros. Our goal is to solve a problem that shows up the moment a project has more than a couple of headers.

### The problem

Suppose `shape.h` defines a struct:

```cpp
// shape.h
struct Shape {
    int width;
    int height;
};
```

Two other headers both need it:

```cpp
// a.h
#include "shape.h"
void printA();
```

```cpp
// b.h
#include "shape.h"
void printB();
```

And `main.cpp` needs both `a.h` and `b.h`:

```cpp
// main.cpp
#include "a.h"
#include "b.h"

int main() {
    Shape s;
    return 0;
}
```

**Try it yourself:** Create these four files exactly as shown and compile `main.cpp`. BUT, before you do, work out from what you know about `#include` what `main.cpp`'s single translation unit actually contains after all the expansions. See if you can spot the problem before running the command for compilation.

### The fix: header guards

The standard fix wraps a header's contents in a conditional macro block:

```cpp
// shape.h
#ifndef SHAPE_H
#define SHAPE_H

struct Shape {
    int width;
    int height;
};

#endif
```

`#ifndef SHAPE_H` means "only include what follows if the macro `SHAPE_H` is not already defined."

The first time this header is pasted into a translation unit, `SHAPE_H` isn't defined yet, so its contents are
included. And the first thing that happens is `SHAPE_H` gets defined.

Every subsequent `#include "shape.h"` in the same translation unit still pastes in the `#ifndef` line, but by then `SHAPE_H` is already defined and so the preprocessor skips straight to `#endif`.

**Try it yourself:** Add this guard to `shape.h` and recompile `main.cpp` without changing `a.h`, `b.h`, or `main.cpp` at all. Then preprocess `main.cpp` with `-E` and find what changed between the runs.

Note: The macro name itself is just a name. By convention it's derived from the file name(`SHAPE_H` for `shape.h`) to avoid colliding with a guard in some other header.

### `#pragma once`

Most compilers, including `g++`, also support a shorter alternative:

```cpp
// shape.h
#pragma once

struct Shape {
    int width;
    int height;
};
```

This does the same job in one line, with the compiler tracking which files it's already included rather than you managing a macro by hand. However, this isn't
part of the official C++ standard. Instead, it's a **compiler directive** the compiler vendor chose to support. `#ifndef` guards are standard C++ and will work anywhere. `#pragma once` is universally
supported in practice but technically not guaranteed to be.

`#pragma once` is one instance of a general mechanism: `#pragma` is how code gives instructions directly to a specific compiler for things the C++ standard doesn't include. A few that you might encounter in real code:

```cpp
#pragma pack(1) // changes how the compiler aligns struct members in memory
#pragma GCC diagnostic ignored "-Wunused-variable" // suppresses a specific warning
```

Because these are compiler-specific, a `#pragma` your compiler doesn't recognize is typically just ignored with a warning.

### Conditional compilation

The same `#ifndef`/`#ifdef` mechanism used for header guards generalizes to including or excluding arbitrary code, based on whether some macro is defined:

```cpp
// debugflag.cpp
#include <iostream>

int main() {
#ifdef DEBUG_BUILD
    std::cout << "debug build" << std::endl;
#else
    std::cout << "release build" << std::endl;
#endif
    return 0;
}
```

The macro doesn't need to be defined in the file at all. Instead, it can be supplied from the command line:

**Try it yourself:**

```
g++ debugflag.cpp -o release_version
./release_version

g++ -DDEBUG_BUILD debugflag.cpp -o debug_version
./debug_version
```

`-D` defines a macro as if a `#define` for it appeared at the very top of the file, before preprocessing starts. Based on this, compare the outputs you get from both the executables.

This is the same mechanism behind platform-specific code(checking a macro the compiler predefines for you,
like `_WIN32` or `__linux__`) and feature flags that only exist in debug builds for stuff like extra logging and assertions.

## Thanks for reading!
