  
**SQL Server Authentication**:  At first go to security > logins > New Login

![[mssqldb1.png]]


Now,  add  name (msa), password (123456) and rest will be unchanged.  

![[mssqldb2.png]]

Here we see that how we create a user, now we will permission this into various database.

For setting permission we first right click on user what we create before then go to propertites
![[mssqldb3.png]]
  
Then select User Mapping
![[mssqldb4.png]]

**Database Normalization**: 

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ধরুন আপনি একটা কোনো ওয়েব সিস্টেম বানাচ্ছেন আর তার জন্য ডাটাবেস স্ট্রাকচার বানিয়েছেন, কিন্তু সেটাকে normalised বানাননি, ফলে দেখবেন খুব কম ডাটা এন্ট্রি করার পরেই অনেক জায়গা ইউজ হয়ে গেছে । আবার ডাটাবেস টা localhost থেকে খুলে দেখতে পারবেন যে কিছু কিছু জায়গায় একই ফিল্ড বার বার ব্যবহার হয়েছে, ফলে সেটা অনেক ডিস্ক স্পেস নষ্ট করেছে আবার ডাটা গুলো বিভিন্ন টেবিলের মধ্যে এদিকে ওদিকে ছড়িয়ে আছে মানে ইন্টেগ্রিটি নেই বললেই চলে । তাই যখনই আমরা ডাটাবেস বানাই তখন একটা পদ্ধতি অনুসরণ করি যাতে সেই ডাটাবেস টা অনেক বেশি অপটিমাইজ ও ইন্টিগ্রেটেড(একসাথে জুড়ে থাকার ক্ষমতা) ও সবথেকে কম রিডানডেন্সি(dublicate) রাখার দিক টা মাথায় রেখে ।<br><br>Database normalisation হলো database কে সব থেকে বেশি dublicate ভ্যালু এর থেকে মুক্ত রাখা, আর এটা করা হয় একই ডাটাবেসের অনেক টেবিলের মধ্যে একটা কমন ফিল্ড/কলাম এর মধ্যে রেলেশনশিপ established করে সব টেবিলের dublicate ভালুগুলোকে ম্যাক্সিমাম কম করে ।<br><br>এই normalisation প্রসেস একমাত্র স্ট্রাকচার ডাটাবেসের ক্ষেত্রেই প্রযোজ্য ।<br><br>Normalisation কিন্তু কখনোই 100% রাখা সম্ভব না ।<br><br>Normalisation এর ক্ষেত্রে 6 টি নর্মালিসেশন আছে ।<br><br>(1) 1NF (1st normalisation form)<br><br>(2) 2NF<br><br>(3) 3NF<br><br>(4) BCNF/3.5 NF (boyce-codd normal form)<br><br>(5) 5NF<br><br>(6) 6NF<br><br>এবার আমরা নর্মালাইজেশন যখনই একটা একটা করে ধাপে ধাপে এগিয়ে যাই ততই আমাদের ডাটাবেস তত বেশি ঐক্যবদ্ধ ভাবে থাকে ।<br><br>নর্মালিসেশনের মাধ্যমে একটা ডাটাবেসের আন্ডার এ একাধিক টেবিলের মধ্যে যদি একই ফিল্ড কমন থাকে তাহলে বার বার আপনাকে তার জন্য একই ডাটা ইনপুট করতে হবেনা, আবার যদি অনেক বড় সিস্টেমে 2 তো টেবিলের মধ্যে একই ডাটা ফিল্ড থাকলে 2 তো টেবিলের জন্য আলাদা আলাদা ডাটা ইনপুট করা যায়না । ফলে একই ডাটা একটা ফিল্ড এর জন্য সেন্ট্রালাইজড ভাবে থাকতে পারে ।<br><br>যত বেশি normalised ফর্ম এর উপরের দিকে ওঠা যাবে তত বেশি রিডানডেন্সি কম হবে । নরমালি আমাদের BCNF অব্দি গেলেই অনেকটা ঠিক থাকে । |

---

### Dynamic SQL

Dynamic SQL allows SQL code to be constructed and executed dynamically at runtime. It is particularly useful in situations where SQL queries must be generated dynamically, such as when table names, columns, or other parameters are not known in advance. However, it must be handled with caution to prevent SQL injection vulnerabilities.

### **Example Usage of Dynamic SQL**

#### **1. Declaring Variables and Executing a Simple Query**

```sql
-- Declare a variable for a specific value
DECLARE @Spec_LTP VARCHAR(75); -- varchar limit is up to 255
SET @Spec_LTP = 6.20;

-- Execute a query with the variable
SELECT * FROM [CSEDB].[dbo].[Prices] WHERE LTP = @Spec_LTP;
```

---

#### **2. Printing and Executing Queries**

```sql
-- Declare variables for dynamic SQL
DECLARE @Select NVARCHAR(75) = 'SELECT * FROM ';
DECLARE @TableName NVARCHAR(50) = '[CSEDB].[dbo].[Prices]';

-- Print the query
PRINT(@Select + @TableName);

-- Execute the query
EXEC(@Select + @TableName);
```

---

#### **3. Writing a Simple Query Using Dynamic SQL**

```sql
DECLARE @TableName2 NVARCHAR(50) = '[CSEDB].[dbo].[Prices]';

-- Execute a query dynamically
EXEC('SELECT * FROM ' + @TableName2);
```

---

#### **4. Creating a Stored Procedure for Dynamic SQL**

#### Create Procedure

```sql
GO
CREATE PROC GeneralQuery @TableName3 NVARCHAR(50)
AS
BEGIN
    DECLARE @SQL NVARCHAR(1000);
    SET @SQL = 'SELECT * FROM ' + @TableName3;
    EXEC (@SQL);
END
GO
```

#### Execute the Stored Procedure

```sql
EXEC GeneralQuery '[CSEDB].[dbo].[Prices]';
EXEC GeneralQuery '[CSEDB].[dbo].[Companies]';
```

---

#### **5. Altering (Editing) an Existing Stored Procedure**

#### Alter Procedure

```sql
GO
ALTER PROC GeneralQuery @TableName3 NVARCHAR(50)
AS
BEGIN
    DECLARE @SQL NVARCHAR(1000);
    SET @SQL = 'SELECT * FROM ' + @TableName3;

    -- Print the query for debugging purposes
    PRINT (@SQL);

    -- Execute the query
    EXEC (@SQL);
END
GO
```

#### Execute the Altered Stored Procedure

```sql
EXEC GeneralQuery '[CSEDB].[dbo].[Prices]';
EXEC GeneralQuery '[CSEDB].[dbo].[Companies]';
```

---

#### **6. Checking and Dropping Stored Procedures**

#### List All Procedures for Manual Dropping

```sql
SELECT 'DROP PROCEDURE [' + SCHEMA_NAME(p.schema_id) + '].[' + p.name + '];'
FROM sys.procedures p;
```

#### Drop a Single Procedure

```sql
DROP PROCEDURE [dbo].[GetBookBorrowers];
```

#### Drop All Procedures at Once

```sql
DECLARE @procName VARCHAR(500);
DECLARE cur CURSOR FOR 
SELECT [name] 
FROM sys.objects 
WHERE type = 'P';

OPEN cur;
FETCH NEXT FROM cur INTO @procName;

WHILE @@FETCH_STATUS = 0
BEGIN
    EXEC('DROP PROCEDURE [' + @procName + ']');
    FETCH NEXT FROM cur INTO @procName;
END;

CLOSE cur;
DEALLOCATE cur;
```

---

### **Key Considerations**

1. **Security Risks**:
    
    - Dynamic SQL can be vulnerable to SQL injection if user inputs are directly included in the query.
    - Always sanitize inputs or use `sp_executesql` with parameterized queries for enhanced security.
2. **Debugging**:
    
    - Use `PRINT` statements to output the dynamically generated SQL query to debug issues.
3. **Flexibility**:
    
    - Dynamic SQL is ideal for scenarios where table names or columns need to be passed dynamically.
4. **Performance**:
    
    - Queries executed via dynamic SQL may not benefit from cached execution plans, which could impact performance.
5. **Best Practices**:
    
    - Limit the use of dynamic SQL to scenarios where no alternative exists.
    - Always use `sp_executesql` to parameterize input values when possible.
