---
id: dev-r1
page: dev
type: reading
order: 210
---
# Pointers & References in Modern C++

In competitive programming, you often pass arrays by reference or use raw indices to beat time limits. In production development, however, pointers and references are fundamentally about **memory ownership**, **lifetime management**, and **zero-cost abstractions**.

---

## 1. The Core Mechanics

### References (`T&`)
A reference is an **alias** for an existing memory location. It has no independent address from a programmer's perspective; you cannot have a null reference, nor can you rebind it once initialized.

```cpp
int value = 42;
int& ref = value; // ref is just an alias for value
ref = 100;        // value is now 100
```

* **Safety:** Guaranteed not to be null at initialization (barring UB like dereferencing `nullptr`).
* **Dev Use-Case:** Function parameters to avoid expensive copies (`const std::string&`).

### Raw Pointers (`T*`)
A pointer is an independent variable storing the **memory address** of another object.

```cpp
int value = 42;
int* ptr = &value; // stores address
*ptr = 100;        // dereference to write
ptr = nullptr;     // can be rebound or nulled
```

* **Flexibility:** Can be reassigned, can represent "optional" values via `nullptr`, and can perform pointer arithmetic.
* **Dev Rule:** Avoid using raw pointers to manage resource lifetimes (`new` / `delete`).

---

## 2. Pointers vs. References: Quick Breakdown

| Feature | Reference (`T&`) | Pointer (`T*`) |
| :--- | :--- | :--- |
| **Can be null?** | No (by contract) | Yes (`nullptr`) |
| **Reassignable?** | No (locked on initialization) | Yes |
| **Syntax** | Direct (`obj.member`) | Indirection (`ptr->member` or `*ptr`) |
| **Memory footprint** | Compiler usually implements as pointer under the hood, but transparent | Stores explicit 64-bit/32-bit address |
| **Default dev role** | Default for parameter passing | Non-owning observer or optional target |

---

## 3. How to Pass Data in Production C++

```cpp
// 1. Cheap primitives: Pass by value
void compute(int count, double ratio);

// 2. Large objects: Pass by const reference (read-only, zero copy)
void render(const std::vector<Mesh>& meshes);

// 3. In-place modification: Pass by non-const reference
void updatePosition(Transform& transform);

// 4. Optional parameters: Pass by pointer (or std::optional)
void logMessage(const std::string& msg, const LoggerConfig* config = nullptr);
```

---

## 4. Modern C++ (C++11 and Beyond): Smart Pointers

Raw `new` and `delete` lead to memory leaks and double frees. Modern production code relies on **RAII** (Resource Acquisition Is Initialization) via `<memory>`.

### `std::unique_ptr<T>` (Exclusive Ownership)
* Owns the heap-allocated object solely.
* Cannot be copied; only moved (`std::move`).
* Destroys the managed resource automatically when it leaves scope.

```cpp
#include <memory>

auto session = std::make_unique<UserSession>("auth_token");
session->authenticate();

// std::unique_ptr<UserSession> duplicate = session; // Compile error!
std::unique_ptr<UserSession> transferred = std::move(session); // Ok: session is now nullptr
```

### `std::shared_ptr<T>` (Shared Ownership)
* Uses reference counting in a control block.
* Resource is freed only when the last `shared_ptr` goes out of scope.
* Has atomic reference-counter overhead; don't use it everywhere by default.

```cpp
auto texture = std::make_shared<Texture>("diffuse.png");
auto cacheEntry = texture; // ref count increments to 2
```

### `std::weak_ptr<T>` (Observer / Cycle Breaker)
* Holds a non-owning reference to a `shared_ptr`.
* Does not increment the reference count.
* Prevents circular dependency memory leaks (e.g., node graphs).

---

## 5. Dangerous Pitfalls in Production

1. **Dangling References:**
   Returning a reference to a stack-allocated local variable results in instant Undefined Behavior (UB).
   ```cpp
   const std::string& badFunction() {
       std::string local = "data";
       return local; // UB: 'local' is destroyed on return
   }
   ```

2. **Pointer Aliasing:**
   Passing two pointers that point to the same memory can prevent compiler SIMD/vectorization optimizations.

3. **Iterator / Reference Invalidation:**
   Modifying a container (like `std::vector::push_back` triggering a reallocation) invalidates all existing pointers and references to its elements.