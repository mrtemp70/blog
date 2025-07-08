### 💡 Tired of Writing Repetitive `Include()` Statements?

With **`AutoInclude()`**, you can configure a navigation property in your EF Core model to be **automatically included** every time the entity is loaded from the database — no need to repeat `Include()` calls for common navigation properties.

✅ Auto-inclusion also applies to navigation properties in **derived types**.

✅ It enhances **code readability** and reduces boilerplate.

---

### 🔄 Want to Override It?

Use **`IgnoreAutoIncludes()`** if you need to bypass `AutoInclude()` behavior in a specific query.

---

### ⚠ Note:

One key limitation:  
**`AutoInclude()` does not support filters**, unlike `Include()`.



![[auto-include-in-efcore.png]]