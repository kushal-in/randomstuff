# Return Value Optimization (RVO)

## The problem and first thoughts

We were given the following C++ code and we were asked to find the output of the program.

```cxx
#include <iostream>

class Friday {
private:
  int x;

public:
  explicit Friday(int x) : x(x) {}
  void set_x(int x) { this->x = x; }
  Friday(const Friday &other) { std::cout << "copy" << std::endl; }
};

Friday make_friday(int x) {
  Friday f(x);
  f.set_x(2 * x);
  return f;
}

Friday which_friday(bool choice) {
  Friday f1(22);
  Friday f2(130);
  if (choice) {
    return f1;
  }
  return f2;
}

int main() {
  Friday main_f1 = make_friday(0);
  Friday main_f2 = which_friday(true);
  return 0;
}
```

The class `Friday` has a copy constructor which does nothing except having a side-effect of printing the string `"copy"`. A good thing to observe here will be that there is no copy assignment but this still works because this is an initialization of a class and hence defining a copy constructor is enough.

At a quick glance, we can see the possible locations where a copy constructor might be needed:
- `return f` copying to temporary in `make_friday` function
- copying from temporary to `main_f1`
- same two scenarios in `which_friday` function as well

Hence, there should be 4 copies. This is exactly what happens in C++11 if you **turn off** RVO using the flag `-fno-elide-constructors`. But in this case, since we did not turn it off, the answer is not 4.

For C++17 onwards, there is no copying from temporary to stack variable of main (details later in this article), hence we would expect a total of 2 copies which is also the case if you use the flag `-fno-elide-constructors`.

## Critical Optimization - RVO

**Return Value Optimization** is an optimization which has in time become a compulsory optimization of C++ language, something which almost all compilers abide by. This is also one of the few optimizations that takes place even if we switch off all (most) optimizations using `-O0` flag in compilers like g++ and clang.

RVO is an optimization that constructs the object returned from a function not in the callee's stack but in the caller's stack. For those of you who are unfamiliar about caller/callee terminology, you can understand caller as the scope which calls the function and callee as the scope of the function called. With each function call, a new stack is created which stores any local object created.

The copy constructors are used when we need to copy an object from callee's stack to that of caller's but because of RVO, the space is allocated in caller's stack, the pointer to that is passed to the function and the callee merely constructs the object not in its but caller's stack. ***A low level view of this optimization is given later in the article***.

For the problem above, RVO works for the function `make_friday` but not for `which_friday` because the return value depends on the runtime which doesn't allow the optimization to happen at compile time.

**Hence, the correct answer is 1 for both C++17 and C++11 (note that with RVO not deactivated, the optimization concerining generation of a temporary also automatically happens)**

## Low Level analysis

For the sake of simplification, we will simplify our problem and then inspect its assembly (in x86). I will be using a reverse engineering tool called Rizin to analyse binaries. Simplified code :

```cxx
#include <iostream>

class Friday {
	// ... Same as before ...
};

Friday make_friday(int x) {
  Friday f(x);
  return f;
}

int main() { 
  Friday main_f1 = make_friday(0);
  return 0;
}
```

Expected output in this case :
- RVO not deactivated : 0 "copy" in output
- RVO deactivated in C++17 : 1 "copy" in output
- RVO deactivated in C++11 : 2 "copy" in output

### RVO not deactivated in C++11/17

```c
┌ int main(int argc, char **argv, char **envp);
│           ; var int64_t var_ch @ stack - 0xc	
│           0x00400724      push  rbp
│           0x00400725      mov   rbp, rsp
│           0x00400728      sub   rsp, 0x10
│           0x0040072c      lea   rax, qword [var_ch]    // caller's stack addr
│           0x00400730      mov   esi, 0x00
│           0x00400735      mov   rdi, rax               // passed as arg1
│           0x00400738      call  sym.make_friday_int
│           0x0040073d      mov   eax, 0x00
│           0x00400742      leave
└           0x00400743      ret


┌ sym.make_friday_int(int64_t arg1, int64_t arg2);
│           ; arg int64_t arg1 @ rdi
│           ; arg int64_t arg2 @ rsi
│           ; var int64_t var_14h @ stack - 0x14
│           ; var int64_t var_10h @ stack - 0x10
│           0x004006fd      push  rbp                                 
│           0x004006fe      mov   rbp, rsp
│           0x00400701      sub   rsp, 0x10
│           0x00400705      mov   qword [var_10h], rdi   // addr stored in callee's stack               
│           0x00400709      mov   dword [var_14h], esi                 
│           0x0040070c      mov   edx, dword [var_14h]
│           0x0040070f      mov   rax, qword [var_10h]   // addr accessed
│           0x00400713      mov   esi, edx                             
│           0x00400715      mov   rdi, rax               // and passed as arg1 to ctor               
│           0x00400718      call  method.Friday.Friday_int             
│           0x0040071d      nop
│           0x0040071e      mov   rax, qword [var_10h]
│           0x00400722      leave
└           0x00400723      ret

```

Here, the constructor builds the object in the stack of caller, preventing call to copy constructor.

### RVO deactivated in C++17

```c
┌ int main(int argc, char **argv, char **envp);
│           ; var int64_t var_ch @ stack - 0xc
│           0x004008d6      push  rbp
│           0x004008d7      mov   rbp, rsp
│           0x004008da      sub   rsp, 0x10
│           0x004008de      lea   rax, qword [var_ch]    // caller's stack addr
│           0x004008e2      mov   esi, 0x00
│           0x004008e7      mov   rdi, rax               // passed as arg1
│           0x004008ea      call  sym.make_friday_int 
│           0x004008ef      mov   eax, 0x00
│           0x004008f4      leave
└           0x004008f5      ret

┌ sym.make_friday_int(int64_t arg1, int64_t arg2);
│           ; arg int64_t arg1 @ rdi
│           ; arg int64_t arg2 @ rsi
│           ; var int64_t var_24h @ stack - 0x24
│           ; var int64_t var_20h @ stack - 0x20
│           ; var int64_t var_ch @ stack - 0xc
│           0x0040089d      push  rbp                                  
│           0x0040089e      mov   rbp, rsp
│           0x004008a1      sub   rsp, 0x20
│           0x004008a5      mov   qword [var_20h], rdi  // caller's stack addr stored in callee's stack
│           0x004008a9      mov   dword [var_24h], esi
│           0x004008ac      mov   edx, dword [var_24h]
│           0x004008af      lea   rax, qword [var_ch]   // callee's stack addr
│           0x004008b3      mov   esi, edx    
│           0x004008b5      mov   rdi, rax              // passed as arg1 to ctor
│           0x004008b8      call  method.Friday.Friday_int   
│           0x004008bd      lea   rdx, qword [var_ch]
│           0x004008c1      mov   rax, qword [var_20h]
│           0x004008c5      mov   rsi, rdx              
│           0x004008c8      mov   rdi, rax              // copying to caller's stack instead of temp
│           0x004008cb      call  method.Friday.Friday_Friday_const
│           0x004008d0      mov   rax, qword [var_20h]
│           0x004008d4      leave
└           0x004008d5      ret

```

In this case, the caller's stack address is still passed as an argument but it is instead used to prevent generating temporary. Hence, in `sym.make_friday_int`, there is a call to copy ctor `method.Friday.Friday_Friday_const`

### RVO deactivated in C++11

```c
┌ int main(int argc, char **argv, char **envp);
│           ; var int64_t var_10h @ stack - 0x10
│           ; var int64_t var_ch @ stack - 0xc
│           0x004008d6      push  rbp
│           0x004008d7      mov   rbp, rsp
│           0x004008da      sub   rsp, 0x10
│           0x004008de      lea   rax, qword [var_ch]
│           0x004008e2      mov   esi, 0x00      
│           0x004008e7      mov   rdi, rax     
│           0x004008ea      call  sym.make_friday_int  
│           0x004008ef      lea   rdx, qword [var_ch]   // var_ch contains the temp, which is also in caller's stack
│           0x004008f3      lea   rax, qword [var_10h]  // var_10h is the preferred location of object
│           0x004008f7      mov   rsi, rdx       
│           0x004008fa      mov   rdi, rax       
│           0x004008fd      call  method.Friday.Friday_Friday_const 
│           0x00400902      mov   eax, 0x00
│           0x00400907      leave
└           0x00400908      ret

┌ sym.make_friday_int(int64_t arg1, int64_t arg2);      // Same as C++17
│           ; arg int64_t arg1 @ rdi
│           ; arg int64_t arg2 @ rsi
│           ; var int64_t var_24h @ stack - 0x24
│           ; var int64_t var_20h @ stack - 0x20
│           ; var int64_t var_ch @ stack - 0xc
│           0x0040089d      push  rbp      
│           0x0040089e      mov   rbp, rsp
│           0x004008a1      sub   rsp, 0x20
│           0x004008a5      mov   qword [var_20h], rdi 
│           0x004008a9      mov   dword [var_24h], esi  
│           0x004008ac      mov   edx, dword [var_24h]
│           0x004008af      lea   rax, qword [var_ch]
│           0x004008b3      mov   esi, edx         
│           0x004008b5      mov   rdi, rax  
│           0x004008b8      call  method.Friday.Friday_int   
│           0x004008bd      lea   rdx, qword [var_ch]
│           0x004008c1      mov   rax, qword [var_20h]
│           0x004008c5      mov   rsi, rdx      
│           0x004008c8      mov   rdi, rax    
│           0x004008cb      call  method.Friday.Friday_Friday_const
│           0x004008d0      mov   rax, qword [var_20h]
│           0x004008d4      leave
└           0x004008d5      ret
```

Unlike C++17, main in C++11 has two stack objects, one of which is used as temporary. In C++17, this itself is used for further uses but in C++11, this temporary is copied to another stack object which is used further. Hence there will be two calls to copy constructor here, one in `sym.make_friday_int` which copies object from callee's stack to temporary (in caller's stack) and one in `main` which copies the temporary to another variable (both in caller's stack).

## C++ versions and RVO

Look at the code snippet below. Here, we have explicitly removed the copy constructor, preventing any copy operations.

```cxx
#include <iostream>

class C {
private:
  int x;

public:
  explicit C(int x) : x(x) {}
  void set_x(int x) { this->x = x; }
  C(const C &other) = delete;
};

C make(int x) { return C(x); }

int main() { 
  C obj = make(0); 
}
```

This code compiles in C++17 because we do not need copy constructor anywhere. However, this code does not compile in C++11 despite not requiring copy constructor anywhere. The reason is mostly because C++17 mandates RVO while C++11 does not.
