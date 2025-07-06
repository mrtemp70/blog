
## 📌 **Rate Limiting

Rate limiting is **used to control how many requests** a client can make to your API in a certain time.

🔒 **Benefits**:

- Protects APIs from overuse or abuse
    
- Ensures **fair usage**
    
- Improves **performance** and **stability**
    
- Handles **bursts** or **sudden spikes** of traffic (especially in Token Bucket)
    

---

## 🧱 1. **Fixed Window Rate Limiting**

### 📖 Concept:

- Time is divided into **fixed-length windows** (e.g., 1 minute).
    
- You allow `N` requests per window.
    
- If the user exceeds this, they are **blocked until the next window** starts.
    

### ✅ Suitable for:

- Simple and predictable rate limits
    
- Use cases where bursts are not common
    

### ⚙️ Key Config:

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("Fixed", opt =>
    {
        opt.Window = TimeSpan.FromSeconds(10);     // Time window
        opt.PermitLimit = 5;                        // Max 5 requests per window
        opt.QueueLimit = 0;
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});
```

### 🧩 Usage in Middleware:

```csharp
app.UseRateLimiter();

app.MapGet("/api/data", () => "Hello World!")
   .RequireRateLimiting("Fixed");
```

---

## 🪣 2. **Token Bucket Rate Limiting**

### 📖 Concept:

- You have a **bucket of tokens**.
    
- Each request takes **1 token**.
    
- Tokens are **refilled at a fixed rate**.
    
- If no tokens are available, request is **rejected or queued**.
    
- Allows **bursts**, up to the bucket capacity.
    

### ✅ Suitable for:

- APIs with **irregular traffic**
    
- Better control over bursts
    
- More flexible than Fixed Window
    

### ⚙️ Key Config:

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.AddTokenBucketLimiter("Token", opt =>
    {
        opt.TokenLimit = 10;                          // Max bucket size
        opt.TokensPerPeriod = 2;                      // Add 2 tokens
        opt.ReplenishmentPeriod = TimeSpan.FromSeconds(5); // Every 5 sec
        opt.AutoReplenishment = true;
        opt.QueueLimit = 2;
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});
```

### 🧩 Usage in Middleware:

```csharp
app.UseRateLimiter();

app.MapGet("/api/data", () => "Token Bucket Response")
   .RequireRateLimiting("Token");
```

---

## 🆚 **Fixed Window vs Token Bucket**

|Feature|Fixed Window|Token Bucket|
|---|---|---|
|Refill Behavior|All permits at start of window|Gradual token refill over time|
|Burst Handling|❌ Not good for burst traffic|✅ Excellent burst support|
|Accuracy|❌ Less accurate (reset-based)|✅ More accurate (event-driven)|
|Simplicity|✅ Simple|⚠️ Slightly more complex|
|Use Case|Static APIs, low variation|Dynamic APIs, unpredictable traffic|

---

## 🧠 Pro Tips

- Use **Fixed Window** if your API has steady traffic patterns.
    
- Use **Token Bucket** if users send traffic in **spikes or bursts**.
    
- Always **monitor logs** to tune `PermitLimit` / `TokenLimit` as per usage.
    
- Combine with **Output Caching** to further reduce load.
    
