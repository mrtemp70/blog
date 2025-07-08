[HttpContext Class in ASP.NET](https://www.c-sharpcorner.com/UploadFile/dacca2/httpcontext-class-in-Asp-Net/)
### 📌 What is `HttpContext`?

- Represents **all HTTP-specific information** about an individual HTTP request.
    
- Created **per request** and disposed when the request completes.
    
- Holds:
    
    - `Request` and `Response` objects
        
    - `Session`, `Server`, `Application`, `Items`, `Cache`
        
    - User authentication & authorization info
        

---

### 🔍 1. Measure Request Processing Time

Use `BeginRequest` and `EndRequest` events in `Global.asax`:

```csharp
protected void Application_BeginRequest(object sender, EventArgs e)  
{  
    HttpContext.Current.Items.Add("Begintime", DateTime.Now.ToLongTimeString());  
}  

protected void Application_EndRequest(object sender, EventArgs e)  
{  
    TimeSpan diff = Convert.ToDateTime(DateTime.Now.ToLongTimeString()) -  
                    Convert.ToDateTime(HttpContext.Current.Items["Begintime"].ToString());  
}
```

✅ Useful for tracking performance per request.

---

### 📊 2. Access Runtime Info via `HttpContext`

Get details about the current request in `Page_Load`:

```csharp
protected void Page_Load(object sender, EventArgs e)      
{      
    Response.Write("Request URL: " + HttpContext.Current.Request.Url);      
    Response.Write("Session Count: " + HttpContext.Current.Session.Count);      
    Response.Write("Timestamp: " + HttpContext.Current.Timestamp);      
    Response.Write("Application Count: " + HttpContext.Current.Application.Count);      
    Response.Write("Is Debug Enabled?: " + HttpContext.Current.IsDebuggingEnabled);      
}
```

✅ Retrieves URL, session count, current time, app-level data, and debug mode.

---

### 👤 3. Access User Identity & Authentication Info

```csharp
protected void Page_Load(object sender, EventArgs e)  
{  
    Response.Write("Username: " + HttpContext.Current.User.Identity.Name + "<br>");  
    Response.Write("Is Authenticated: " + HttpContext.Current.User.Identity.IsAuthenticated + "<br>");  
    Response.Write("Auth Type: " + HttpContext.Current.User.Identity.AuthenticationType + "<br>");  
}
```

✅ Use after enabling **Windows Authentication** to check:

- Current logged-in user
    
- Authentication status
    
- Type of authentication used
    

---

### 🧠 Conclusion

- `HttpContext` is a powerful class central to **request-response handling** in ASP.NET.
    
- Helps track request lifecycle, user identity, session info, and more.
    
- Useful for **performance monitoring**, **security**, and **debugging**.
    

> ✨ Tip: Explore other `HttpContext` properties/methods for deeper insights.
