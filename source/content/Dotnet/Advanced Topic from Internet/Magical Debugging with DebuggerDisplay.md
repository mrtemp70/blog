
We can enhance the debugging experience by using the `[DebuggerDisplay]` attribute on your class.

**Example:**

```csharp
[DebuggerDisplay("Ticket {Id}: {Title} with {Priority} Priority")]
public class Ticket
{
    public int Id { get; private set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public Priority Priority { get; set; }
    public Status Status { get; set; }
    public required string Requester { get; set; }
    public DateTime Created { get; set; }
}
```

This makes objects in the debugger show more meaningful information, such as:

```
Ticket 1: "Login Issue" with High Priority
Ticket 2: "Email Sync Problem" with Medium Priority
Ticket 3: "UI Bug on Dashboard" with Low Priority
```


![[dotnet-magical-debugging-tool.png]]