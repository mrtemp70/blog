**If we want to access a file directly in an ASP.NET Core project while the project is running, here’s what to do:**

![[file.png]]

- If the project is running on localhost, its endpoint might be something like `https://localhost:7056/`.
- Create a folder within the `wwwroot` directory and add a file named `file1.txt` (for example, the folder name could be `downloadfolder`).
- To access the file, use the URL `https://localhost:7056/downloadfolder/file1.txt`. This will allow you to access the file directly.

---

``` csharp
using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        string folderPath = @"C:\ExampleFolder"; // Replace with your desired folder path
        string filePath = Path.Combine(folderPath, "example.txt");

        // 1. Create a folder if it doesn't exist and create a txt file
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
            Console.WriteLine("Folder created.");
        }

        if (!File.Exists(filePath))
        {
            File.Create(filePath).Close(); // Create and close the file
            Console.WriteLine("File created: " + filePath);
        }

        // 2. Write into the txt file
        File.WriteAllText(filePath, "Hello, this is a sample text.");
        Console.WriteLine("Text written to file.");

        // 3. Read from the txt file
        string fileContent = File.ReadAllText(filePath);
        Console.WriteLine("File Content: " + fileContent);

        // 4. Delete the file
        File.Delete(filePath);
        Console.WriteLine("File deleted: " + filePath);

        // 5. If there are multiple txt files, download (read) the first one
        string[] txtFiles = Directory.GetFiles(folderPath, "*.txt");
        if (txtFiles.Length > 0)
        {
            string firstTxtFile = txtFiles[0];
            Console.WriteLine("First txt file: " + firstTxtFile);
            string firstFileContent = File.ReadAllText(firstTxtFile);
            Console.WriteLine("First File Content: " + firstFileContent);
        }
        else
        {
            Console.WriteLine("No txt files found in the folder.");
        }

        Console.ReadLine();
    }
}
```
