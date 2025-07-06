
**Output Caching** is a performance optimization technique where the **HTTP response** of a request is stored and reused for future requests with the same parameters.

#### ✅ **Key Points**:

- **Goal**: Improve performance by reducing repeated processing of the same response.
    
- **Mechanism**: Stores full HTTP responses in memory (by default) and returns them for identical future requests.
    
- **Where**: Implemented as middleware in the ASP.NET Core pipeline.
    

---

### ⚙️ **How to Enable Output Caching in ASP.NET Core**

1. **Register the Output Caching service** in `Program.cs`:
    
    ```csharp
    builder.Services.AddOutputCache();
    ```
    
2. **Add the Output Cache middleware**:
    
    ```csharp
    app.UseOutputCache();
    ```
    
3. **Apply Output Caching to an endpoint** using the `[OutputCache]` attribute:
    
    ```csharp
    [OutputCache]
    [HttpGet("/weather")]
    public IActionResult GetWeather()
    {
        // Simulate a slow operation or expensive computation
        var data = new { Temp = 35, Time = DateTime.Now };
        return Ok(data);
    }
    ```
    

---

### 📦 **What Happens Internally?**

- First request to `/weather`:
    
    - Response is generated and **cached**.
        
- Next request with **same route and parameters**:
    
    - Response is **served from cache**, skipping controller execution.
        

---

### 💡 **Customization Options**

You can fine-tune caching behavior:

```csharp
[OutputCache(Duration = 60, VaryByQueryKeys = new[] { "city" })]
```

- `Duration`: Cache lifetime in seconds.
    
- `VaryByQueryKeys`: Cache different versions based on query parameters (e.g., `?city=NYC` vs `?city=LA`).
    

---

### 🧠 **Why Use Output Caching?**

- Reduces **server load**.
    
- Improves **response time**.
    
- Useful for **read-heavy endpoints** with predictable outputs.
    