
|Feature|Local Temp Table (`#Temp`)|Global Temp Table (`##Temp`)|
|---|---|---|
|**Scope**|Session-specific|Available to all sessions|
|**Visibility**|Only visible to the session that created it|Visible to all sessions after creation|
|**Naming**|Prefix with single `#`, e.g., `#Users`|Prefix with double `##`, e.g., `##Users`|
|**Lifetime**|Dropped automatically when the session ends or explicitly dropped|Persists until the last session using it is closed or explicitly dropped|
|**Use Case**|Temporary storage for one user's session (e.g., stored procedures, intermediate processing)|Sharing temporary data between multiple sessions or users|
|**Isolation**|Isolated per session; multiple users can create their own `#Temp` table with the same name|Only one global temp table with the same name can exist at a time|

---

### 🧪 Examples

#### 1. **Local Temp Table (`#Temp`)**

```sql
-- Session 1
CREATE TABLE #Employees (
    ID INT,
    Name NVARCHAR(50)
);

INSERT INTO #Employees VALUES (1, 'John'), (2, 'Alice');

SELECT * FROM #Employees;
```

> ❗ This table is **only accessible in this session**. It will be dropped automatically when the session closes.

#### 2. **Global Temp Table (`##Temp`)**

```sql
-- Session 1
CREATE TABLE ##GlobalEmployees (
    ID INT,
    Name NVARCHAR(50)
);

INSERT INTO ##GlobalEmployees VALUES (1, 'Bob'), (2, 'Eve');
```

```sql
-- Session 2 (can run in SSMS in another window)
SELECT * FROM ##GlobalEmployees;
```

> ✅ This table is **accessible from other sessions** as long as the creating session is still active or until explicitly dropped.

---

### ⚠️ Tips

- Temp tables are stored in the `tempdb` system database.
    
- Use `DROP TABLE #Temp` or `DROP TABLE ##Temp` to manually clean up when done.
    
- Avoid name collisions with global temp tables since only one can exist at a time.