
### ✅ What is `HttpClient`?

`HttpClient` is a **built-in class in .NET** used to send **HTTP requests** and receive **HTTP responses** from **web APIs**.

---

### ✅ Why is it used?

You use `HttpClient` to:

- 🔗 **Call external APIs or services**
    
- 📥 **Get data** from a URL (like JSON)
    
- 📤 **Send data** (like POST, PUT requests)
    
- 🌐 Communicate over the internet (HTTP/HTTPS)
    

---

### ✅ Simple Example:

```csharp
var client = new HttpClient();
var response = await client.GetStringAsync("https://api.example.com/data");
Console.WriteLine(response);
```

---

## ✅ Why Not Use `new HttpClient()` Directly?

Using `new HttpClient()` in every request can cause:

- **Socket exhaustion** (sockets are not released quickly).
    
- **Hard-to-test code**.
    
- **No built-in support** for resilience libraries like **Polly**.
    

---

## 🔧 1. `IHttpClientFactory` (Basic Usage)

### ✅ Best for:

- Creating `HttpClient` instances **on demand**.
    
- Having control over how the client is configured **at runtime**.
    

### 💡 Example:

**Startup.cs / Program.cs**

```csharp
builder.Services.AddHttpClient();
```

**Usage in a service:**

```csharp
public class MyService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MyService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetDataAsync()
    {
        var client = _httpClientFactory.CreateClient();
        return await client.GetStringAsync("https://api.example.com/data");
    }
}
```

---

## 🏷️ 2. **Named `HttpClient`**

### ✅ Best for:

- Calling **multiple APIs** with **different configurations**.
    
- Centralizing configs (like base address, headers).
    

### 💡 Example:

**Startup.cs / Program.cs**

```csharp
builder.Services.AddHttpClient("GitHubClient", client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    client.DefaultRequestHeaders.UserAgent.ParseAdd("HttpClientFactory-Sample");
});
```

**Usage:**

```csharp
var client = _httpClientFactory.CreateClient("GitHubClient");
var response = await client.GetStringAsync("/users/octocat");
```

---

## 👨‍💻 3. **Typed `HttpClient`**

### ✅ Best for:

- Clean **Dependency Injection (DI)**.
    
- **Testable** services.
    
- Automatically injects preconfigured `HttpClient`.
    

### 💡 Example:

**Typed client class:**

```csharp
public class GitHubService
{
    private readonly HttpClient _client;

    public GitHubService(HttpClient client)
    {
        _client = client;
        _client.BaseAddress = new Uri("https://api.github.com/");
        _client.DefaultRequestHeaders.UserAgent.ParseAdd("HttpClientFactory-Sample");
    }

    public async Task<string> GetUserAsync(string username)
    {
        return await _client.GetStringAsync($"/users/{username}");
    }
}
```

**Register it:**

```csharp
builder.Services.AddHttpClient<GitHubService>();
```

**Usage:**

```csharp
var result = await _gitHubService.GetUserAsync("octocat");
```

---

## 🧙 4. **Refit** (Type-safe REST Client)

### ✅ Best for:

- **Declarative API** definitions.
    
- Auto-generates HTTP logic from **interfaces**.
    
- Great with **Polly**, **testability**, and **clean architecture**.
    

### 💡 Install:

```bash
dotnet add package Refit.HttpClientFactory
```

### Define interface:

```csharp
public interface IGitHubApi
{
    [Get("/users/{username}")]
    Task<User> GetUserAsync(string username);
}
```

### Register with Refit:

```csharp
builder.Services.AddRefitClient<IGitHubApi>()
       .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://api.github.com/"));
```

**Usage:**

```csharp
var user = await _gitHubApi.GetUserAsync("octocat");
```

---

## ✍ Summary Table

| Method               | Best For                                | Factory Access Needed    | Testable |
| -------------------- | --------------------------------------- | ------------------------ | -------- |
| `IHttpClientFactory` | Flexible, low-level usage               | ✅ Yes                    | 👍       |
| Named `HttpClient`   | Multiple APIs with different settings   | ✅ Yes                    | 👍       |
| Typed `HttpClient`   | DI-friendly, clean architecture         | ❌ No                     | 👍👍     |
| Refit                | Interface-based, declarative HTTP calls | ❌ No (hidden under hood) | 👍👍👍   |
