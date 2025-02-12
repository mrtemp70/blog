**Tags**: #Oracle #SQL #Database  

## User Management  

### 1. Check User Connection  
```sql
-- Connect via SQL*Plus
sqlplus / as sysdba
```

### 2. Create New User  
```sql
CREATE USER C##MSA IDENTIFIED BY "123456";
GRANT CREATE SESSION TO C##MSA;  -- Allow login
GRANT ALL PRIVILEGES TO C##MSA;  -- Grant full access
```
**Credentials**:  
- Username: `C##msa`  
- Password: `123456`  

### 3. Change Password  
```sql
ALTER USER system IDENTIFIED BY 123456;
```

---

## Table & Sequence Operations  

### 1. Create Table  
```sql
CREATE TABLE employees (
    id NUMBER PRIMARY KEY,
    firstname VARCHAR2(50),
    lastname VARCHAR2(50),
    division VARCHAR2(50),
    building VARCHAR2(50),
    title VARCHAR2(50),
    room VARCHAR2(50)
);
```

### 2. Query Data  
```sql
SELECT * FROM EMPLOYEES WHERE Id = 49;
```

### 3. Auto-Increment Setup  
```sql
-- Create sequence
CREATE SEQUENCE emp_id_seq
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;

-- Create trigger
CREATE OR REPLACE TRIGGER emp_before_insert
BEFORE INSERT ON "C##MSA".EMPLOYEES
FOR EACH ROW
BEGIN
   IF :NEW.ID IS NULL THEN
      SELECT emp_id_seq.NEXTVAL INTO :NEW.ID FROM dual;
   END IF;
END;
```

### 4. Check Sequence Value  
```sql
SELECT emp_id_seq.CURRVAL FROM dual;
```

---

## Data Insertion  

### Single Entry  
```sql
INSERT INTO "C##MSA".EMPLOYEES
(FIRSTNAME, LASTNAME, DIVISION, BUILDING, TITLE, ROOM)
VALUES ('Jhon', 'Doe', 'Engineering', 'Building 1', 'Manager', '101');
```

### Bulk Insert (Template)  
```sql
INSERT ALL
    INTO EMPLOYEES (...) VALUES (...)
    INTO EMPLOYEES (...) VALUES (...)  -- Add more rows
SELECT * FROM dual;
```
