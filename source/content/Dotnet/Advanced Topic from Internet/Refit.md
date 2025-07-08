
### 🚀 Interacting with APIs is easier using **Refit**

If you’re working with REST APIs in .NET, managing `HttpClient` and serializing requests manually can be tedious and error-prone.

That’s where **Refit** comes in — a **type-safe REST library for .NET**, inspired by Retrofit (from the Android world).

---

### 🧠 Why Refit?

With Refit:

✅ No need to manage `HttpClient` directly  
✅ Define **interfaces** that represent your APIs  
✅ Use attributes to set routes, verbs, headers, and query params  
✅ Automatically serializes requests and deserializes responses  
✅ **Strongly typed** contracts improve maintainability and reduce bugs

---

### ✨ Example

```csharp
public interface IGitHubApi
{
    [Get("/users/{username}")]
    Task<User> GetUserAsync(string username);
}

public class User
{
    public string Login { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
}
```

🔧 Setup Refit:

```csharp
var gitHubApi = RestService.For<IGitHubApi>("https://api.github.com");

var user = await gitHubApi.GetUserAsync("octocat");
Console.WriteLine(user.Name);
```

---

### 🧩 Bonus: Refit supports

- Authorization headers
    
- Complex query parameters
    
- Multipart/form-data
    
- Error handling via `ApiException`

![[refit.png]]