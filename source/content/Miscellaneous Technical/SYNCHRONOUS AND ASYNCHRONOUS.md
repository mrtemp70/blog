**Synchronous:** Suppose I am assigned 4 tasks (the first task has a range of 4 seconds, the second task has a range of 2 seconds, the third task has a range of 5 seconds and the last one has only one second) then in synchronous programming the one I assign first that will be finished first, then the second one will start working. This is how all of them will run one after the other. Since I have assigned four tasks then in synchronous programming my time will take a total of 12 seconds (4s+2s+5s+1s). Here is the code for synchronous in c#,

``` csharp

static void Main(string[] args) {
  // Synchronous task
  Task1();
  Task2();
  Task3();
  Task4();
  Console.ReadLine();
}

public static void Task1() {
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Started task 1...");
  Task.Delay(4000).Wait();
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Completed task 1!");
}

public static void Task2() {
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Started task 2...");
  Task.Delay(2000).Wait();
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Completed task 2!");
}

public static void Task3() {
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Started task 3...");
  Task.Delay(5000).Wait();
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Completed task 3!");
}

public static void Task4() {
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Started task 4...");
  Task.Delay(1000).Wait();
  Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Completed task 4!");
}
```

**Asynchronous:** (এখানেই কেবল async এবং await ব্যবহার হয়। যেখানে await in asynchronous methods in C# is essential because it allows the method to suspend its execution until the awaited operation completes, without blocking the calling thread. This is crucial for non-blocking, responsive, and efficient code in scenarios where you have long-running operations such as I/O-bound tasks or network requests. যার বাংলা করলে দাঁড়ায়, C#-এ অ্যাসিঙ্ক্রোনাস পদ্ধতিতে await ব্যবহার করা অপরিহার্য কারণ এটি কলিং থ্রেড ব্লক না করে প্রতীক্ষিত অপারেশন সম্পূর্ণ না হওয়া পর্যন্ত পদ্ধতিটিকে তার কার্য সম্পাদন স্থগিত করতে দেয়। এটি এমন পরিস্থিতিতে অ-ব্লকিং, প্রতিক্রিয়াশীল এবং দক্ষ কোডের জন্য অত্যন্ত গুরুত্বপূর্ণ

যেখানে আপনার দীর্ঘ-চলমান ক্রিয়াকলাপ যেমন I/O-বাউন্ড টাস্ক বা নেটওয়ার্ক অনুরোধ রয়েছে।) On the other hand, in an asynchronous program, if I am assigned 4 tasks (the first task has a range of 4 seconds, the second task has a range of 2 seconds, the third task has a range of 5 seconds and the last one has only one second) then in the asynchronous program all the tasks start at once, then the one with the lowest that one's work is completed first, while the others also finish a little. In this way all the tasks are finished by the time it takes 5 seconds at the most. Whereas synchronous takes 12 seconds but asynchronous takes only 5 seconds. Here is the code for asynchronous in c#,

``` csharp
static void Main(string[] args) {
  // Asynchronous task
  Task5();
  Task6();
  Task7();
  Task8();
  Console.ReadLine();
}

public static async void Task5() {
  await Task.Run(() => {
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 5 starting...");
    Thread.Sleep(4000);
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 5 completed!");
  });
}

public static async void Task6() {
  await Task.Run(() => {
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 6 starting...");
    Thread.Sleep(2000);
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 6 completed!");
  });
}

public static async void Task7() {
  await Task.Run(() => {
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 7 starting...");
    Thread.Sleep(5000);
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 7 completed!");
  });
}

public static async void Task8() {
  await Task.Run(() => {
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 8 starting...");
    Thread.Sleep(1000);
    Console.WriteLine(DateTime.Now.ToLongTimeString() + " : " + "Task 8 completed!");
  });
  Console.WriteLine("Check all task exist or not!");
}
```


For youtube video help [click here](https://youtu.be/UroQ8quKgq0)

For my video [click here](https://youtu.be/g3CdJBRVrZA)