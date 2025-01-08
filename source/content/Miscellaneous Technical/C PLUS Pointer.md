# Pointer

· **Malloc:** `malloc` is a function in C programming used for dynamic memory allocation, allowing the program to allocate memory dynamically during runtime.

``` c++
#include <iostream>

int main() {
    int num = 10; // Declare an integer variable
    int* ptr;     // Declare a pointer variable

    ptr = &num;   // Assign the address of 'num' to the pointer

    // Print the value of 'num' and the address stored in 'ptr'
    std::cout << "Value of num: " << num << std::endl;
    std::cout << "Address of num: " << &num << std::endl;
    std::cout << "Value stored in ptr: " << *ptr << std::endl;
    std::cout << "Address stored in ptr: " << ptr << std::endl;

    return 0;
}
```

More pointer video: [https://youtu.be/PXzo-ynXFdg?si=_Rd_x3tfROKMX7Hp](https://youtu.be/PXzo-ynXFdg?si=_Rd_x3tfROKMX7Hp)