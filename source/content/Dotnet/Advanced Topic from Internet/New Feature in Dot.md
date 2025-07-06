
### **1. Params Collections**

#### 🧠 **What’s New?**

The `params` modifier in C# 13 now supports more than just arrays.  
You can now pass:

- `IEnumerable<T>`
    
- `IReadOnlyCollection<T>`
    
- `IReadOnlyList<T>`
    
- `ICollection<T>`
    
- `IList<T>`
    
- `Span<T>`, `ReadOnlySpan<T>`
    

This improves flexibility and reduces heap allocations when using `Span<T>` types (stack-allocated).

#### ✅ **Before C# 13:**

```csharp
void PrintNumbers(params int[] numbers) { ... }
```

#### ✅ **In C# 13:**

```csharp
void PrintNumbers(params IEnumerable<int> numbers) { ... }

// Or even:
void Process(params Span<int> data) { ... }
```

#### 💡 **Benefit:**

Improves performance by reducing memory allocations (especially with `Span<T>`), and allows more types in `params`.

---

### **2. New `Lock` Type**

#### 🧠 **What’s New?**

A new `Lock` class is introduced that offers:

- Better **readability**
    
- Cleaner **scope-based locking**
    
- Additional **control methods**
    

#### 🛠️ **Features:**

- `Enter()`, `Exit()`: Manual lock control
    
- `TryEnter()`: Attempt lock without blocking
    
- `EnterScope()`: Scoped locking with `using`
    
- `IsHeldByCurrentThread`: Check thread ownership
    

#### ✅ **Example:**

```csharp
var myLock = new Lock();
using (myLock.EnterScope())
{
    // Thread-safe code here
}
```

#### 💡 **Benefit:**

Makes multithreaded code cleaner and safer.

---

### **3. New Escape Sequence `\e`**

#### 🧠 **What’s New?**

A new escape sequence `\e` has been added, representing the **ESC (Escape)** character (`U+001B`).

#### ✅ **Example:**

```csharp
string esc = "\e[1;31mRed Text\e[0m";
Console.WriteLine(esc);
```

#### 💡 **Use Cases:**

- Terminal commands
    
- Low-level protocols
    
- Device communication (e.g., label printers)
    

---

### **4. Init Arrays with Index Operator `^`**

#### 🧠 **What’s New?**

You can now use the **index-from-end operator (`^`)** when initializing arrays.

#### ✅ **Example (New):**

```csharp
int[] data = new int[5];
data[^1] = 99;  // Sets last element to 99
```

Previously, you couldn't use `^` in initializers; now you can!

#### 💡 **Benefit:**

Avoids manual index calculation when working with array ends.

---

### **5. Relaxed Constraints on `ref struct` and `ref` Variables**

#### 🧠 **What’s New?**

- **`ref struct`** can now be used as **generic type parameters**
    
- **`ref` locals** allowed in `async` and `iterator` methods
    

#### ✅ **Example:**

```csharp
void ProcessSpan<T>(T span) where T : ref struct
{
    // Efficient handling of Span<T> or similar
}
```

#### 💡 **Benefit:**

Improves performance and flexibility in **low-level** and **high-performance** code, especially when working with spans or buffers.

---

## ✅ **Summary (TL;DR)**

| Feature                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| 1. Params Collections    | Use collections (not just arrays) with `params` |
| 2. New Lock Type         | Better thread sync with `Lock` class            |
| 3. Escape Sequence `\e`  | Shorthand for ESC character (U+001B)            |
| 4. Init Array with `^`   | Use index-from-end in initializers              |
| 5. Ref Struct Relaxation | Generic & async support for `ref struct`        |
