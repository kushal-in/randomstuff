---
id: dev-struct-classes-r1
page: dev
sub: Structs & Classes
type: reading
order: 110
---


*<SPEEDRUN TO SECTION 3 IF YOU ALREADY KNOW THIS>*

*Note:* *All tasks must be completed* *. The solution should be explained in brief along with the code snippets which are* *either asked in the question or demonstrates the point to be conveyed .*

## **Section 1: Intro to OOP**

### **What is OOP?**

Reference link: [https://www.geeksforgeeks.org/cpp/object-oriented-programming-in-cpp/](https://www.geeksforgeeks.org/cpp/object-oriented-programming-in-cpp/) 

OOP or Object Oriented Programming, put simply, is just a way of writing code that organises everything around a "blueprint" for a certain type of component, instead of writing repetitive code every time.

### **Why do we need it?**

Consider an example: As a coordinator, I might have to store a list of Name, Roll number and mail of applicants.

If I had to write a code to do that, one of the ways I could go about doing that is:

```
#include <bits/stdc++.h>  // GCC-specific, non-standard header (fine for contests)
using namespace std;
    int main() {
        vector<string> student_names = {"Alice", "Bob", "Charlie"};
        vector<string> student_rolls = {"me26b122", "cs26b094", "ph26b008"};
        vector<string> student_emails = {"xxx@smail.iitm.ac.in",
                                        "yyy@smail.iitm.ac.in", "zzz@smail.iitm.ac.in"};

        // Adding a new student requires pushing to all 3 vectors individually
        student_names.push_back("Diana");
        student_rolls.push_back("ee26b001");
        student_emails.push_back("www@smail.iitm.ac.in");
        return 0;
    }
```
In the above snippet, Roll number, mail and name have been treated as if they are independent.

But it would be more helpful if they were grouped together under the relation "Applicants' Data".

So instead of creating three independent variables every time, we can create one "instance" of the blueprint ("Applicants' Data") and store the three values in that instance of the blueprint. This Blueprint is called a "Class" and the instance is called an "Object".

This is what that would look like:
```
#include <bits/stdc++.h>
using namespace std;

// 1. The Blueprint (Class)
class Student {
public:
    string name;
    string roll;
    string email;

    // Don't worry about how this works for now.
    // but in effect, it stores the three data in the Class' instance
    Student(string n, string r, string e) {
        name = n;
        roll = r;
        email = e;
    }
};

int main() {
    vector<Student> student_list;
    // This creates an instance of the class on the stack
    Student s("Alice", "me26b122", "xxx@smail.iitm.ac.in");
    student_list.push_back(s);
    return 0;
}
```

Here, the name, roll, email are called member variables and functions defined inside the class are called member functions.

Apart from making the code look more readable, it also has much more important advantages which will be covering later on in this app.

This is the syntax for a class:

```
class <Classname> {
public:
    // Each instance will have its own member variables and they are created along with the instance.
    <Typename> T1;

    <Classname>(<arg>) {
        // This is the constructor.
        // When an object is created, the constructor is called and executed. Used to initialise the member variables
    }

    ~<Classname>() {
        // This is called the destructor. This is called when the created object goes out of scope
        // (or is deleted, for objects created on the heap)
    }

private:
    <Typename> T2;
};
```

As you can see, there are two types of member functions and variables -

 1. Public - These member functions and variables can be accessed outside the class. For Ex: You can access s.name in main() in the previous example.
 2. Private - The member functions and variables marked under private can only be accessed by member functions of the same class (and by friends, covered later). Ex: T2 cannot be accessed in main() in the above example.

A constructor is a special member function that is called when an object is created.

A destructor is another special member function which handles cleanup of the object when it goes out of scope (or is deleted, for heap objects).

### **What are structs?**

Structs are essentially the same as classes with just one key difference: Classes have their member access and inheritance private by default while Structs have them public by default.

## **Section 2: Playing with classes**

Suppose, Our goal is to figure out how a container with different gas composition behaves at different pressure and temperature. To make it more efficient, Let's create a class called "GasContainer" with member variables as Pressure, Volume, MolarMass, Temperature.

Units used throughout: P in Pa, V in m³, M (molar mass) in kg/mol, T in K, and R = 8.314 J/(mol·K). The constructor takes its arguments in the order (P, V, M, T).

---
id: dev-struct-classes-q1
type: long-text
---
**Task 1:** Goal is to define the "GasContainer" Class/Struct with the above mentioned member variables (public) and a constructor which initialises the member variables. Create a member function called "ReturnMass" which returns the mass of the gas (assume ideal gas, use PV = nRT)



---
id: dev-struct-classes-r2
type: reading
---
Now, let's consider two different ways of instantiating an object:

1. `GasContainer gas1(P,V,M,T)`
2. `GasContainer* p = new GasContainer(P,V,M,T)`

Q. Is there any difference between the two?

One of the obvious differences is in the type of the variable, one is the actual GasContainer object [gas1], the other is a pointer to the new object created (You should have covered pointers in the previous part about Pointers and References).

The other major difference is that method 1 creates the object on the stack (i.e. Stores the created object in temporary memory). It will get automatically deleted when the stack frame goes out of the function or block within which this object is defined.

However, a pointer referenced object is created in the heap, it stays in memory until it is manually freed (with delete) and therefore needs to be manually freed. Therefore for simple cases, direct object instantiation is seemingly more advantageous. But a stack does not contain a lot of memory space, therefore if you create very large objects, or a huge number of them, on the stack, you would run into a stack overflow error.

Using a base-class pointer (or reference) together with virtual functions also facilitates runtime polymorphism.

[We will not be covering this right now. Here's a [reference link](https://www.geeksforgeeks.org/cpp/cpp-polymorphism/), if you are interested]

For the above case, this is how instantiating and accessing member functions and variables using the two methods would look like (this works because the members are public in Task 1):

```
#include <iostream>
using namespace std;

int main() {
    GasContainer gas1(100000, 0.025, 0.028, 300);
    GasContainer* p = new GasContainer(100000, 0.025, 0.028, 300);

    cout << "Stack Object method access: " << gas1.ReturnMass() << " " << gas1.Pressure << "n";
    cout << "Heap Object method access: " << p->ReturnMass() << " " << p->Pressure << "n";

    delete p;  // heap objects must be freed manually
    return 0;
}
```


Now that you understand how to create and use classes,


---
id: dev-struct-classes-q2
type: long-text
---
**Task 2:** In the above `GasContainer` Class, make all your member variables private. This essentially makes those member variables inaccessible from main by default. Create two helper functions `GetData` and `SetData` which get and set (P,V,M,T) respectively, for example `void GetData(double& P, double& V, double& M, double& T) const` and `void SetData(double P, double V, double M, double T)`. Note that `gas1.Pressure` in the previous example will no longer compile once the members are private.

Such functions are called as getters and setters and their role is to make private variables accessible from external functions.

Such a concept where we create blocks [Classes] to bundle data together with the functions that operate on it and restrict access [By Marking Private/Public] is called as Encapsulation.


---
id: dev-struct-classes-r3
type: reading
---

As you have already implemented your constructor for the above question, answer this:

If I mark a member variable (private or public) as const:

```
const double Pressure;
//Or create a reference to the member variable

double& Volume;
//Your constructor

GasContainer(double P, double& V, double M, double T) {
    Pressure = P;
    Volume = V;
    // Assume these are normal non-const member variables already defined
    MolarMass = M;
    Temperature = T;
}
```
Would cause a compile-time error.

---
id: dev-struct-classes-q3
type: long-text
---
**Task 3:** Figure out why it causes an error and how to go about fixing it?


---
id: dev-struct-classes-r4
type: reading
---
### **Pointers and arrays of objects**

So far, we've accessed our objects with the . operator, and we briefly saw -> when working with heap objects. Let's look at pointers more closely. What if we have several containers stored side by side in an array?

An array name behaves like a pointer to its first element, so arr + 1 points to the next GasContainer in memory. Since GasContainer has no default constructor, we have to initialise every element of the array ourselves.

```
GasContainer tanks[3] = {
    GasContainer(100000, 0.025, 0.028, 300),   // nitrogen
    GasContainer(200000, 0.010, 0.044, 350),   // carbon dioxide
    GasContainer(150000, 0.030, 0.002, 280)    // hydrogen
};
```

---
id: dev-struct-classes-q4
type: long-text
---
**Task 4:**

Write a function `GasContainer* Heaviest(GasContainer* arr, int n)`:

That looks through n containers starting at arr and **returns a pointer** to the one with the greatest mass (if two containers have equal mass, return the first one).

In main, call it on tanks, store the result in a GasContainer*, and print the mass of the heaviest container through that pointer using ->.

For the code above, your program should identify the carbon dioxide tank (about 0.030 kg).

<Hint title="Hint 1">
you can reach the i-th container with either `arr[i]` or `*(arr + i)`. Try out both.
</Hint>

<Hint title="Hint 2">
What should Heaviest() return if n is 0? What must main() check before using the returned pointer?
</Hint>


---
id: dev-struct-classes-r5
type: reading
---

## **Section 3: Operator Overloading**

You can read more about this at [https://www.geeksforgeeks.org/cpp/operator-overloading-cpp/](https://www.geeksforgeeks.org/cpp/operator-overloading-cpp/)

The "+" operator is always used to add two operands, right? WRONG. In C++, we can *overload* the operator and define how they behave when used with my own user-defined objects, like I could use the "+" operator to maybe divide two numbers instead. It allows us to use the same syntax but with our own rules.

How do we overload "+" to perform division? Here's the code snippet.

```
class Number {
public:
    double value;

    Number operator+(const Number& other) const {
        Number result;
        result.value = value / other.value;
        return result;
    }
};
```

(Taking const Number& and marking the function const avoids needless copying and lets the operator work on const objects.)

Dividing with a plus sign is probably not a very good idea unless you want to confuse everyone. However, operator overloading can be incredibly useful when working with custom data types as you will see in the Task.

One key point though, C++ doesn't allow us to overload operators for only built-in data types. At least one operand must be a user-defined type, such as a class or a struct. Here's something to think about, can all our C++ operators be overloaded?

Imagine we have two gas containers and want to combine their contents. Wouldn't it be convenient if we could simply write gas1+gas2?

Let's overload the + operator to combine two gas containers.

For this task, assume that both containers have the same temperature and pressure, and that their volumes can be added directly and Molar mass can be considered as a weighted average (weighted by volume). The resulting container should retain the same temperature and pressure.

---
id: dev-struct-classes-q5
type: long-text
---

**Task 5:** Overload the + operator for GasContainer so that the following code works:
```
GasContainer gas1(100000, 0.025, 0.028, 300);
GasContainer gas2(100000, 0.015, 0.044, 300);

GasContainer gas3 = gas1 + gas2;
```
Make sure the resulting container has the combined volume and mass.


---
id: dev-struct-classes-r6
type: reading
---

### **Friend Classes and Functions**

In C++, we have private and protected data (protected members behave like private ones, except that derived classes can also access them; see Inheritance below). But who can access this data? Similar to real life, where we share our *secrets* with our friends, C++ also does the same. These are called **friend functions** and **friend classes**, and they can access the private and protected members of the class that declares them as friends.

```
#include <iostream>
#include <string>
using namespace std;

class Secret {
    string password = "Prog Club is the best";

    friend void revealSecret(const Secret& s);
};

void revealSecret(const Secret& s) {
    cout << "The password is: " << s.password << endl;
}

int main() {
    Secret s;
    revealSecret(s);
}
```

Notice how we declare the `revealSecret()` using the friend keyword inside the class. The function itself is still a normal function, not a member function of the class. However, it now has permission to access the class's private and protected members.

We can extend this idea to classes as well, we can declare another class as a friend in a similar fashion (this line goes inside the class that is granting access):

`friend class Secret;`

Does friendship transfer though? Is a friend of a friend, a friend? (No: friendship is not transitive, not mutual, and not inherited.)

You can read more about this at [https://www.geeksforgeeks.org/cpp/friend-class-function-cpp/](https://www.geeksforgeeks.org/cpp/friend-class-function-cpp)

Suppose we want to print all the private data of a GasContainer for debugging purposes. However, we've made our member variables private to protect the internal state of the object.

---
id: dev-struct-classes-q6
type: long-text
---
**Task 6:** Declare a non-member function called PrintDetails() as a friend of GasContainer. It should print the pressure, volume, molar mass, and temperature of a container, even though these variables are private. (You already have getters from Task 2, but friend functions are useful when no public getters exist.)

Your function should be callable like this:
```
GasContainer gas1(100000, 0.025, 0.028, 300);
PrintDetails(gas1);
```

---
id: dev-struct-classes-r7
type: reading
---

### **Inheritance**

A very fundamental property of OOP. Similar to how a child might *inherit* certain behaviours and characteristics from his/her parents, C++ classes can also have parents from whom they *inherit* behaviours and properties. This also promotes laziness as we can just reuse parts of a predefined class.

How do we implement this? We use the : symbol followed by an access specifier and the name of the parent class. The class that inherits is called the **derived class** (child), while the class being inherited from is called the **base class** (parent).

One small example for this

```
class Person {
public:
    string name;

    void introduce() {
        cout << "Hi, I am " << name << endl;
    }
};

class Student : public Person {
public:
    int rollNo;

    void study() {
        cout << name << " is loafing." << endl;
    }
};
```

Notice how the derived class can use the accessible members of the base class without having to define them all over again! It can also define its own additional members. This is the main advantage of inheritance: code reusability.

When inheriting, we can use public, protected, or private. These determine how the inherited members are accessible through the derived class. In the example above, we use public inheritance, which preserves the public accessibility of the base class's public members. With protected inheritance, the base class's public and protected members become protected in the derived class; with private inheritance, they become private. In all cases, the base class's private members are never directly accessible in the derived class.

Can a class inherit from multiple classes?

You can read more about this at [https://www.geeksforgeeks.org/cpp/inheritance-in-c/](https://www.geeksforgeeks.org/cpp/inheritance-in-c/)

Now that we've built a general-purpose GasContainer, let's say we want to simulate different types of gas containers. For example, an ordinary container and an insulated container.

Both containers have pressure, volume, molar mass, and temperature, so rewriting all of that code would be repetitive.

Instead, we can create a base class called GasContainer and derive a class called InsulatedGasContainer from it.

---
id: dev-struct-classes-q7
type: long-text
---

**Task 7:** Create an InsulatedGasContainer class that publicly inherits from GasContainer. Add a new member variable called heatCapacity and a member function called DisplayHeatCapacity().

Make sure the derived class can use the base class constructor to initialize the gas properties. *Hint:* since GasContainer has no default constructor, call it from an initializer list, e.g. InsulatedGasContainer(...) : GasContainer(P,V,M,T), heatCapacity(h) {}. Also note that if the base class members are private (Task 2), the derived class cannot access them directly; use the getters or make them protected.

For example:
```
InsulatedGasContainer gas(100000, 0.025, 0.028, 300, 500);
gas.DisplayHeatCapacity();
cout << gas.ReturnMass();
```

---
id: dev-struct-classes-r8
type: long-text
---

### **Templates**

What if we have to define the same class for multiple data types? Do we have to rewrite the entire class code again? Of course not, we, as programmers, are lazy and that's why on top of classes, we have **templates**.

Templates basically allow us to write a class or function that can work with multiple data types without having to rewrite the same code for each type.

But how do we actually implement these templates?

We use the template keyword, followed by the type parameters we want to use as placeholders. For example, template <typename T> tells the compiler that T is a placeholder for a data type. We can then use T wherever we would normally specify a data type in our class or function. For function templates, the compiler figures out which data type to use based on the arguments we pass; for class templates, we specify the type explicitly (e.g. Craft<int>).

Here's a quick example for template of a function
```
#include <bits/stdc++.h>
using namespace std;

template <typename T>
void pickup(T item) {
    cout << "Picked up: " << item << endl;
}

int main() {
    pickup("Diamond Sword");
    pickup(67);
    pickup(3.14);
}
```
And here's the template for a class
```
template <typename T>
class Craft {
public:
    T item;
};
```

Can a template take more than one type parameter?

You can read more about this at [https://www.geeksforgeeks.org/cpp/templates-cpp/](https://www.geeksforgeeks.org/cpp/templates-cpp/)

So far, our GasContainer uses specific data types for its member variables. But what if we wanted to experiment with different numeric types, such as float and double?

---
id: dev-struct-classes-q8
type: long-text
---

**Task 8:** Convert GasContainer into a class template with a type parameter T for its numeric member variables. Make sure the constructor and ReturnMass() function also work with T. (Do this in a copy of your code, since Tasks 5, 6 and 7 will need small changes once GasContainer becomes a template.)

Your class should support code like this:
```
GasContainer<float> gas1(100000.0f, 0.025f, 0.028f, 300.0f);
GasContainer<double> gas2(100000.0, 0.025, 0.028, 300.0);
```

---
id: dev-struct-classes-r9
type: reading
---

Yaay! Congratulations, now you have a strong fundamental grasp on how classes and OOP work 🙂