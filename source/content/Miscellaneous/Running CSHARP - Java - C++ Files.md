
This note explains different ways to run C# (.cs), Java (.java), and C++ (.cpp) files using various tools and environments.

## C# (.cs)

### 1. **Without Installing .NET SDK** (Using the Old Framework)
- **Prerequisite**: No need to install the .NET SDK, as Windows has an older version pre-installed.
- **Steps**:
  1. Navigate to the directory: `C:\Windows\Microsoft.NET\Framework\v4.0.30319`.
  2. Open Command Prompt (as Administrator).
  3. Run the following command:
     ```bash
     csc filename.cs && filename
     ```

### 2. **With .NET SDK Installed**
- **Prerequisite**: Ensure you have .NET SDK installed.
- **Steps**:
  1. Open the folder containing your `.cs` file in **Visual Studio Code (VSCode)**.
  2. Open a new terminal in VSCode.
  3. Run the following command to create a new console app:
     ```bash
     dotnet new console
     ```

### 3. **Without SDK + Using Notepad++ (NppExec Plugin)**
- **Prerequisite**: Notepad++ with the NppExec plugin installed.
- **Steps**:
  1. Save your file.
  2. Use the following NppExec code:
     ```bash
     npp_save
     cd $(CURRENT_DIRECTORY)
     csc $(FILE_NAME)
     $(NAME_PART)
     ```

### 4. **In Visual Studio Code (VSCode)**
- **Steps**:
  1. Open a terminal and change directory to where you want to create the console application:
     ```bash
     cd D:
     cd D:\Users\msash\Desktop  // (or your preferred directory)
     ```
  2. Create a new console application:
     ```bash
     dotnet new console -n YourAppName
     ```
  3. Change into the application directory:
     ```bash
     cd YourAppName
     ```
  4. Open the project in VSCode:
     ```bash
     code .
     ```
  5. Build the project (optional if you prefer using the CodeRunner extension in VSCode):
     ```bash
     dotnet build
     ```
  6. Run the application:
     ```bash
     dotnet run
     ```

---

## Java (.java)

### Using Notepad++ (NppExec Plugin)
- **Prerequisite**: Notepad++ with NppExec plugin installed.
- **Steps**:
  1. Save your `.java` file.
  2. Use the following NppExec code:
     ```bash
     npp_save
     cd $(CURRENT_DIRECTORY)
     javac $(FILE_NAME)
     java $(NAME_PART)
     ```

### Manually in Command Line
- **Steps**:
  1. Open the terminal or Command Prompt.
  2. Navigate to the directory containing the `.java` file.
  3. Compile the Java file:
     ```bash
     javac filename.java
     ```
  4. Run the compiled Java program:
     ```bash
     java filename
     ```

---

## C++ (.cpp)

### Using g++ Compiler
- **Prerequisite**: Install the g++ compiler (usually comes with the GCC package).
- **Steps**:
  1. Open a terminal.
  2. Navigate to the directory containing the `.cpp` file.
  3. Compile the C++ file:
     ```bash
     g++ filename.cpp -o filename
     ```
  4. Run the compiled program:
     ```bash
     ./filename
     ```

### Using Notepad++ (NppExec Plugin)
- **Prerequisite**: Notepad++ with NppExec plugin installed.
- **Steps**:
  1. Save your `.cpp` file.
  2. Use the following NppExec code:
     ```bash
     npp_save
     cd $(CURRENT_DIRECTORY)
     g++ $(FILE_NAME) -o $(NAME_PART)
     $(NAME_PART)
     ```

---

## Summary of Commands:

- **For C++**:
  - Using g++:
    ```bash
    g++ filename.cpp -o filename && ./filename
    ```

- **For Java**:
  - Using javac and java:
    ```bash
    javac filename.java && java filename
    ```

- **For C#**:
  - Using csc:
    ```bash
    csc filename.cs && filename
    ```

---

## Notes:
- Ensure the correct environment is set up (e.g., .NET SDK for C#, Java JDK for Java, and g++ for C++).
- Using an IDE like **VSCode** or **Notepad++** with the right plugins can make compiling and running your programs much easier.
