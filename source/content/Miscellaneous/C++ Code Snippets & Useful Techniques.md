
## Common Operations and Functions

### 1. **Find the Position of an Element**
To find the position of an element in a string:
```cpp
std::cout << s.find() << std::endl;
````

### 2. **Removing Duplicates from a Vector**

To remove duplicates from a vector, use the `unique` function:

```cpp
unique(v.begin(), v.end());
```

### 3. **Built-in Functions and Libraries**

#### `__builtin_popcount`

Counts the number of 1's in the XOR of two elements in an array:

```cpp
__builtin_popcount(arr[i] ^ arr[k]);  // Counts the number of 1s in the XOR of arr[i] and arr[k]
```

#### Shift Operations:

- `a << b` is equivalent to `a * b ^ b`
- `a >> b` is equivalent to `a / b ^ b`

### 4. **Accumulating Values in a Vector**

To sum up the elements in a vector:

```cpp
long long sum = accumulate(a.begin(), a.end(), 0ll);
```

### 5. **String Terminator with `c_str()`**

The `c_str()` method in C++ provides a pointer to the character array terminated with a null character (`'\0'`):

```cpp
const char* str = s.c_str();  // Returns a C-style string
```

### 6. **Using `lower_bound` (STL)**

`lower_bound` is useful for finding the first element that is not less than the given value:

```cpp
auto it = lower_bound(v.begin(), v.end(), value);
```

---

## String and Map Operations

### 7. **Finding an Element in a Map**

To check if an element exists in a map, you can use:

```cpp
if (st.find(temp) != st.end()) {
    // Element found in map
}
```

Or check a specific map element:

```cpp
if (!m[10]) {
    // Element not found or value is zero
}
```

### 8. **Accessing Last Element of a String**

To get the last element of a string:

```cpp
char last = s.back();  // Returns the last character in the string
```

To add a value to the end of a string:

```cpp
s.push_back('a');  // Adds 'a' to the end of the string
```

---

## Mathematical Operations

### 9. **Finding Minimum from a List of Values**

To find the minimum value from a list of values:

```cpp
int mini = min({1, 3, 4, 5});
```

### 10. **Counting Occurrences in a Vector**

To count the occurrences of a specific element in a vector:

```cpp
int count = count(v.begin(), v.end(), 2);
```

### 11. **Combinatorics**

- **Permutations (`nPr`)**:
    
    ```cpp
    // nPr = n! / (n - r)!
    ```
    
- **Combinations (`nCr`)**:
    
    ```cpp
    // nCr = n! / (r! * (n - r)!)
    // For the case where r doesn't matter (e.g., when selecting all elements):
    // nCr = n * (n - 1) / 2
    ```
    
    This formula is commonly used to find the total number of subarrays in an array of size `n`.
    

### 12. **Sum of First N Natural Numbers**

The sum of all elements from 1 to n is given by:

```cpp
n * (n + 1) / 2;
```

---

## Mathematical Functions

### 13. **Ceiling and Floor Functions**

- **Ceiling**: ⌈a / b⌉ = (a + b - 1) / b
- **Floor**: ⌊a / b⌋

---

## Bit Manipulation

### 14. **Exploring a Number in Bits**

To explore a number in bits:

```cpp
bitset<10> temp(30); 
cout << temp;  // Output the binary representation of 30
```

---

## Array and Matrix Operations

### 15. **Traversing 2D Array in Custom Order**

If you need to traverse a 2D array like `a[3][2]` in a custom order (e.g., traversing column-wise):

```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        cout << a[j][i];  // Traverses the array column-wise
    }
}
```

---

## Sorting and Checking Sorted Order

### 16. **Checking if an Array is Sorted**

To check if an array is sorted:

```cpp
if (is_sorted(a, a + n)) {
    cout << "Yes";  // Array is sorted
} else {
    cout << "No";   // Array is not sorted
}
```

---

## Maximum Subarray Problem

### 17. **Finding Maximum Subarray (Sliding Window Technique)**

To find the largest subarray sum with size `m`:

```cpp
for (int i = 0; i < m; i++) {
    sum[0] += arr[i];
}
for (int i = 1; i <= (n - m); i++) {
    sum[i] = sum[i - 1];
    sum[i] -= arr[i - 1];
    sum[i] += arr[m + i - 1];
}
```

---

## Vector of Pairs

### 18. **Storing Pairs in a Vector**

To store pairs of characters and integers in a vector:

```cpp
vector<pair<char, int>> vp;
vp.push_back({s[i], i});  // Adding a pair to the vector
```