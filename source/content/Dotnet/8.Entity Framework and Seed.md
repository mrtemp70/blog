We can use the entity framework as two ways: 
1. Code First
2. Database First

### **1. Database First**

**Way 1:** Just go to database > select design > properties > apply relation.      Now come on web project > create a folder (Name like _EF_) > Right click on folder and select _edmx_


**Way 2:** Install nuget _Microsoft.EntityFrameworkCore.SqlServer_ and _Microsoft.EntityFrameworkCore.Tools_ 
``` command

Scaffold-DbContext "Server=.\MSSQLSERVER19"; Database=TempoDB; User Id = sa; Password=123456;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context TempoDbContext

or,

Scaffold-DbContext "Server=.\MSSQLSERVER19"; Database=TempoDB; User Id = sa; Password=123456;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```


### **2. Code First**

**Way 1: Migration Command for Dotnet Framework**:

**Gererate migration**:           _enable-migrations_         and then           _add-migration AllTableCreation_

**Delete last migration**:        _remove-migration_

**Update to database:**           _update-database –Verbose_

---

Way 2: **Migration Command for Core**:

**Install**:      _dotnet tool install --global dotnet-ef_  
**Uninstall:**    _dotnet tool uninstall --global dotnet-ef_  
**Update:**       _dotnet tool update --global dotnet-ef_

**Gererate migration**:           _dotnet ef migrations add CreateStudentTable --project University.Web --context ApplicationDbContext_

**Delete last migration**:        _dotnet ef migrations remove --project University.Web --context ApplicationDbContext_

**Update to database:**           _dotnet ef database update --project University.Web --context ApplicationDbContext_


---
### **Example: EF Core Code First Migration** 

#### **Step 1: Using Data Annotation Attributes**

1. **Setup:**
    
    - Create a Console Project.
    - Install NuGet packages:
        - `Microsoft.EntityFrameworkCore`
        - `Microsoft.EntityFrameworkCore.SqlServer`
        - `Microsoft.EntityFrameworkCore.Design`
    - Define entity classes (`Teacher`, `Course`, `Student`, etc.).
    - Implement `MyDbContext` to define DbSets and configure database connection.
2. **Code Details:**
    
    - Use Data Annotations like `[Key]`, `[Required]`, `[ForeignKey]` to define relationships and constraints.

**Classes:**

![[EF.png]]

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Teacher
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    public virtual ICollection<Course> Courses { get; set; }

    public Teacher()
    {
        Courses = new List<Course>();
    }
}

public class Course
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public double Fees { get; set; }
    
    [ForeignKey("Teacher")]
    public int TeacherId { get; set; }
    
    public virtual Teacher Teacher { get; set; }
    
    public virtual ICollection<CourseStudent> CourseStudents { get; set; }

    public Course()
    {
        CourseStudents = new List<CourseStudent>();
    }
}

public class CourseStudent
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Course")]
    public int CourseId { get; set; }
    
    [ForeignKey("Student")]
    public int StudentId { get; set; }
    
    public virtual Course Course { get; set; }
    public virtual Student Student { get; set; }
    
    public DateTime EnrollmentDate { get; set; }
}

public class Student
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    public int Roll { get; set; }
    
    [ForeignKey("Mentor")]
    public int MentorId { get; set; }
    
    public virtual Mentor Mentor { get; set; }
    
    public virtual ICollection<CourseStudent> CourseStudents { get; set; }

    public Student()
    {
        CourseStudents = new List<CourseStudent>();
    }
}

public class Mentor
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; }
}
```

**DbContext Example:**

```csharp
public class MyDbContext : DbContext
{
    private readonly string _connectionString;
    private readonly string _migrationAssembly;

    public MyDbContext()
    {
        _connectionString = @"server = .\SQLEXPRESS; Database= TestDB; Trusted_Connection=True; TrustServerCertificate=True;";
        _migrationAssembly = Assembly.GetExecutingAssembly().GetName().Name;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(_connectionString, (x) => x.MigrationsAssembly(_migrationAssembly));
        }
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<CourseStudent> CourseStudents { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Mentor> Mentors { get; set; }
}
```

**Program.cs:**
``` csharp
//.............Insert..........
using (var context = new MyDbContext())
{
    var teacher = new Teacher { Name = "Alice" };
    var course = new Course { Title = "Math 101", Fees = 100.0 };
    var student = new Student { Name = "Bee", Roll = 124 };
    var mentor = new Mentor { Name = "Prof. Lee" };

    // Set up relationships
    course.Teacher = teacher;
    student.Mentor = mentor;
    var courseStudent = new CourseStudent
    {
        Course = course,
        Student = student,
        EnrollmentDate = DateTime.Now
    };

    context.Teachers.Add(teacher);
    context.Courses.Add(course);
    context.Students.Add(student);
    context.Mentors.Add(mentor);
    context.CourseStudents.Add(courseStudent);
    context.SaveChanges();
}

//............Edit.....................
using (var context = new MyDbContext())
{
    // Find course title where teacher included
    var courseToUpdate = context.Courses
        .Include(c => c.Teacher)
        .FirstOrDefault(c => c.Title == "Math 101");
    // Find student name where mentor included
    var studentToUpdate = context.Students
        .Include(s => s.Mentor)
        .FirstOrDefault(s => s.Name == "Bee");

    // Check if the entities were found
    if (courseToUpdate != null && studentToUpdate != null)
    {
        // Update the entities
        courseToUpdate.Title = "Physics";
        studentToUpdate.Name = "Diana";
        courseToUpdate.Teacher.Name = "Prof Zing";
        studentToUpdate.Mentor.Name = "Maria";
        context.SaveChanges();
    }
}

//.........Delete By Id.....
using (var context = new MyDbContext())
{
    var entityToDelete = context.CourseStudents.Find(4);
    if (entityToDelete != null)
    {
        context.CourseStudents.Remove(entityToDelete);
        context.SaveChanges();
    }
}
```

**CRUD Operations:**

- Insert: Add and save entities with relationships.
- Edit: Update entities and their related objects.
- Delete: Remove entities using their IDs.

---

#### **Step 2: Using Fluent API**

1. **Setup:**
    - Same NuGet packages and structure as Step 1.
    - Use Fluent API in `OnModelCreating` for defining relationships and constraints.

**Classes:**
``` csharp

public class Teacher
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Course> Courses { get; set; }
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public double Fees { get; set; }
    public int TeacherId { get; set; }
    public Teacher Teacher { get; set; }
    public ICollection<CourseStudent> CourseStudents { get; set; }
}

public class CourseStudent
{
    public int CourseId { get; set; }
    public Course Course { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; }
    public DateTime EnrollmentDate { get; set; }
}

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Roll { get; set; }
    public int MentorId { get; set; }
    public Mentor Mentor { get; set; }
    public virtual ICollection<CourseStudent> CourseStudents { get; set; }
}

public class Mentor
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

**Key Configuration in `OnModelCreating`:**

``` csharp
public class MyDbContext : DbContext
{
    private readonly string _connectionString;
    private readonly string _migrationAssembly;

    public MyDbContext()
    {
        _connectionString = @"server = .\SQLEXPRESS; Database= TestDB; Trusted_Connection=True; TrustServerCertificate=True;";
        _migrationAssembly = Assembly.GetExecutingAssembly().GetName().Name;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(_connectionString, (x) => x.MigrationsAssembly(_migrationAssembly));
        }
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CourseStudent>()
            .HasKey(x => new { x.CourseId, x.StudentId });

        modelBuilder.Entity<CourseStudent>()
            .HasOne(x => x.Course)
            .WithMany(x => x.CourseStudents)
            .HasForeignKey(x => x.CourseId);

        modelBuilder.Entity<CourseStudent>()
            .HasOne(x => x.Student)
            .WithMany(x => x.CourseStudents)
            .HasForeignKey(x => x.StudentId);

        modelBuilder.Entity<Course>()
            .HasOne(x => x.Teacher)
            .WithMany(c => c.Courses)
            .HasForeignKey(f => f.TeacherId);

        modelBuilder.Entity<Teacher>()
            .HasMany(x => x.Courses)
            .WithOne(c => c.Teacher);

        modelBuilder.Entity<Student>()
            .HasOne(x => x.Mentor)
            .WithOne()
            .HasForeignKey<Student>(f => f.MentorId);
    }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<CourseStudent> CourseStudents { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Mentor> Mentors { get; set; }
}
```
**Program.cs:**

``` csharp
//............Insert......................
using (var context = new MyDbContext())
{
    var teacher = new Teacher { Name = "Alice" };
    var course = new Course { Title = "Math 101", Fees = 100.0 };
    var student = new Student { Name = "Bee", Roll = 124 };
    var mentor = new Mentor { Name = "Prof. Lee" };

    // Set up relationships
    course.Teacher = teacher;
    student.Mentor = mentor;
    var courseStudent = new CourseStudent
    {
        Course = course,
        Student = student,
        EnrollmentDate = DateTime.Now
    };

    context.Teachers.Add(teacher);
    context.Courses.Add(course);
    context.Students.Add(student);
    context.Mentors.Add(mentor);
    context.CourseStudents.Add(courseStudent);
    context.SaveChanges();
}

//.............Edit...................
using (var context = new MyDbContext())
{
    // Find course title where teacher included
    var courseToUpdate = context.Courses
        .Include(c => c.Teacher)
        .FirstOrDefault(c => c.Title == "Math 101");
    // Find student name where mentor included
    var studentToUpdate = context.Students
        .Include(s => s.Mentor)
        .FirstOrDefault(s => s.Name == "Bee");

    // Check if the entities were found
    if (courseToUpdate != null && studentToUpdate != null)
    {
        // Update the entities
        courseToUpdate.Title = "Physics";
        studentToUpdate.Name = "Alisa";
        courseToUpdate.Teacher.Name = "Prof Zing";
        studentToUpdate.Mentor.Name = "Maria";
        context.SaveChanges();
    }
}

//Delete Courses and Related table data.........
using (var context = new MyDbContext())
{
    var entityToDelete = context.Courses.Find(1);
    if (entityToDelete != null)
    {
        context.Courses.Remove(entityToDelete);
        context.SaveChanges();
    }
}
```

---

### **Data Seeding**

EF Core provides two ways to seed data:

1. **Separate Class (Recommended):** Use a dedicated seeding class for better organization. Refer to [EF Core Seeding Documentation](https://www.learnentityframeworkcore.com/migrations/seeding).
    
2. **Inline in `OnModelCreating`:**
    

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    for (int i = 20; i <= 30; i++)
    {
        modelBuilder.Entity<Teacher>().HasData(new Teacher { Id = i, Name = $"Teacher {i}" });
    }
}
```

**Important Notes:**

- For entities with foreign keys, ensure the referenced entities exist to avoid errors.
- Avoid using loops to seed data for one-to-one relationships, as they may lead to conflicts.