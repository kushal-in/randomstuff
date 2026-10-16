---
id: cp-two-bitmask
page: cp
sub: Bit Mask
type: reading
order: 140
---

## **Binary Representations**

Computers store everything as bits (0 or 1). Binary is a base-2 positional number system. Just as decimal uses powers of 10, binary uses powers of 2.

To represent the number 21:

Decimal(base 10) = 2×10¹ + 1×10⁰ =21

Binary(base 2)=1×2⁴ + 0×2³ + 1×2² + 0×2¹ +1×2⁰=16+0+4+0+1= 21(10101)

<Fig src="/assets/cp-bit-1.jpeg" width ="70%"
/>

For more details on binary representation go through this :[https://www.geeksforgeeks.org/dsa/binary-representation-of-a-given-number/](https://www.geeksforgeeks.org/dsa/binary-representation-of-a-given-number/)

## **Bitwise operators**

A bitwise operator works directly on the individual bits of integer values, comparing or changing them position by position rather than treating the number as a whole.

Some of the most commonly used bitwise operations in bit-masking are:

- **OR (|)** - used to set bits.

- **AND (&)** - used to check or clear bits.

- **XOR (^)** - used to toggle bits.

- **NOT (~)** - used to flip bits.

- **Left Shift (<<)** – shifts bits to the left.

- **Right Shift (>>)** – shifts bits to the right.

you might go through this to learn about various bit wise operator: [https://www.geeksforgeeks.org/dsa/complete-reference-for-bitwise-operators-in-programming-coding/](https://www.geeksforgeeks.org/dsa/complete-reference-for-bitwise-operators-in-programming-coding/)

## **MASK**

A mask is a binary number used to target specific bits. The expression (1 << i) creates a mask with only the i-th bit set to 1.

Example:

- 1 << 0 = 00001

- 1 << 1 = 00010

- 1 << 2 = 00100

- 1 << 3 = 01000

This mask can then be combined with bitwise operators to check, set, clear, or toggle a specific bit.

## **Basic Bitmask Operations**

_Bitwise operators allow us to check and modify individual bits of a mask._

- **Set a Bit:** Makes the i-th bit 1.

- **Check a Bit:** Checks whether the i-th bit is 1.

- **Clear a Bit:** Makes the i-th bit 0.

- **Toggle a Bit:** Changes the i-th bit from 0 -> 1 or 1 -> 0.

For C++

```
#include <bits/stdc++.h>
using namespace std;

int main() {
    int mask = 0;
    int i = 2;

    // Set the i-th bit
    mask |= (1 << i);

    // Check whether the i-th bit is set
    if (mask & (1 << i)) {
        cout << "Bit is set\n";
    }

    // Clear the i-th bit
    mask &= ~(1 << i);

    // Toggle the i-th bit
    mask ^= (1 << i);

    return 0;
}
```

For Python:

```
mask = 0
i = 2

# Set the i-th bit
mask |= (1 << i)

# Check whether the i-th bit is set
if mask & (1 << i):
    print("Bit is set")

# Clear the i-th bit
mask &= ~(1 << i)

# Toggle the i-th bit
mask ^= (1 << i)
```
