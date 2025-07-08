There are **three service lifetimes** when registering dependencies in .NET:

| Lifetime      | Method                              | Description                                                                  |
| ------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| **Singleton** | `AddSingleton<TInterface, TImpl>()` | Single instance for the entire application lifetime. Shared by all requests. |
| **Scoped**    | `AddScoped<TInterface, TImpl>()`    | One instance per **request** (or scope). Shared within that request.         |
| **Transient** | `AddTransient<TInterface, TImpl>()` | A new instance **every time** it is requested.                               |

---

## **1. Singleton Example**

### Registration:

```csharp
builder.Services.AddSingleton<IGuidService, GuidService>();
```

### Implementation:

```csharp
public interface IGuidService
{
    Guid GetGuid();
}

public class GuidService : IGuidService
{
    private readonly Guid _guid;

    public GuidService()
    {
        _guid = Guid.NewGuid();
    }

    public Guid GetGuid() => _guid;
}
```

### Usage in Controller:

```csharp
public class HomeController : Controller
{
    private readonly IGuidService _guidService;

    public HomeController(IGuidService guidService)
    {
        _guidService = guidService;
    }

    public IActionResult Index()
    {
        var guid = _guidService.GetGuid(); // Same every time
        return Content($"Singleton GUID: {guid}");
    }
}
```

### Result:

- Same `Guid` for every request, all users.
    

---

## **2. Scoped Example**

### Registration:

```csharp
builder.Services.AddScoped<IGuidService, GuidService>();
```

### Same implementation as above.

### Result:

- Same `Guid` **within a single HTTP request**, but different for each new request.
    

---

## **3. Transient Example**

### Registration:

```csharp
builder.Services.AddTransient<IGuidService, GuidService>();
```

### Result:

- New `GuidService` instance **every time it’s injected**, even within the same request.
    

---

## 🔍 Visual Difference (Optional Demo)

If you inject the same service twice in a controller, you can see the behavior clearly:

```csharp
public class HomeController : Controller
{
    private readonly IGuidService _guidService1;
    private readonly IGuidService _guidService2;

    public HomeController(IGuidService guidService1, IGuidService guidService2)
    {
        _guidService1 = guidService1;
        _guidService2 = guidService2;
    }

    public IActionResult Index()
    {
        return Content($"1st: {_guidService1.GetGuid()} \n2nd: {_guidService2.GetGuid()}");
    }
}
```

### Expected Behavior:

|Lifetime|Result|
|---|---|
|Singleton|Both GUIDs are the same (shared globally).|
|Scoped|Same within request, changes between requests.|
|Transient|Different each time even in same request.|

---

Let me know if you'd like a diagram or sample project!