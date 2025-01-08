
**1. Singleton design pattern:** (এটি শুধু একটি ক্লাসের জন্যই কাজ করে। এই ক্লাসের ইন্সট্যান্স একের অধিক হতে দিবেনা। একের অধিক ইন্সট্যান্স যাতে না হয় সেটা আটকানোই এর মেইন কাজ। যতটা পারা যায় প্রাইভেট আর স্টাটিক ফিল্ড, স্টাটিক মেথড, স্টাটিক কন্সট্রাক্টর বানিয়ে দিতে হবে যাতে করে অবজেক্ট তৈরি করা যায় (আমরা জানি স্টাটিকের ইন্সটেন্স ক্রিয়েট হয় না, আর স্টাটীকের আরেকটা সুবিধা আছে তা হলো স্টাটিক দিয়ে ফিল্ড বানালে প্রজেক্ট যতক্ষন চলবে ততক্ষন স্টাটিক ইনিশিইয়ালাইজ অবস্থায় থাকবে, স্টাটিকের অসুবিধাও আছে যেমন আমরা স্টাটিকের জিনিস পত্র খুব সহজেই ডিপেন্ডেন্সি ইঞ্জেকশন করা যাবে না)। কেনো সিঙ্গেল্টন ব্যহহার হয়? উত্তরঃ যেমন ধরি একজন রাইডাররের গাড়িতে দুইজনকে এট অ্যা টাইম এক্সেস করতে দিবো না। এরর লগার যখন এরর write করে তখন একই জিনিস দুইবার দিলে সমস্যা তৈরি হবে)  The Singleton design pattern is a creational design pattern that restricts the instantiation of a class to only one object and provides a global point of access to it. In other words, the Singleton pattern ensures that only one instance of a class can exist at any given time, and provides a way to access that instance from anywhere within the application. This is useful in situations where a single object needs to coordinate actions across the system, or where it is important to control access to a shared resource. The Singleton pattern typically involves a static method or property that returns the single instance of the class, and a private constructor to prevent the creation of additional instances. The implementation of the pattern may also include techniques such as lazy initialization or thread safety to ensure that the instance is created only when needed, and that it is accessed safely in a multi-threaded environment. While the Singleton pattern can be useful in certain situations, it can also introduce some drawbacks, such as making the code more difficult to test or maintain, and potentially introducing global state into the application. As with any design pattern, it should be used judiciously and with consideration for the specific requirements of the application.

``` csharp
public class Logger : ILogger
{
    // make field static so that our program continue till last of execution
    private static Logger instance; 
    private Logger() // Here instance private so that no one create instance from outside
    {

    }

    public static ILogger GetLogger()
    {
        if (instance == null)
        {
            instance = new Logger();
        }

        return instance;
    }
}
```

**2.**       **Prototype pattern:** (এটি কোনো object কে হুবুহু copy করে (IClonable এর মতো), এখানে Shallow copy (মানে একটা সিঙ্গেল লেভেল পর্যন্ত কপি করে) হয়। )  The Prototype pattern is a creational design pattern that allows creating new objects based on existing objects, without specifying the exact class of object that will be created. It involves creating a prototype object, which serves as a blueprint for creating new objects. In this pattern, the prototype object is cloned to create a new object. The cloning process may be shallow or deep depending on the requirements. Shallow cloning creates a new object with references to the same internal objects as the prototype object, while deep cloning creates a new object with copies of all the internal objects of the prototype object. The Prototype pattern is useful in situations where creating new objects using traditional methods, such as instantiation, is expensive or complex. By using a prototype, we can save time and resources by creating new objects based on existing ones that have already been configured and initialized. One of the benefits of this pattern is that it allows for dynamic object creation at runtime, as the new object's type is determined by the prototype object. Additionally, it can help reduce the complexity of creating new objects in complex systems. The Prototype pattern is commonly used in situations where there are many similar objects to be created, such as in graphical user interface (GUI) frameworks or in the creation of game objects.

``` csharp
public class Document : ICloneable
{
    public string Title { get; set; }
    public string FileName { get; set; }
    public string BodyText { get; set; }
    public Document Child { get; set; }

    public object Clone()
    {
	  // Shallow copy: create a new object and copy the values
        return Copy();
    }

    public Document Copy()
    {
        Document doc = new Document();
        doc.Child = new Document();
        doc.Child.Title = Child.Title;
        doc.Child.FileName = Child.FileName;
        doc.Child.BodyText = Child.BodyText;
        doc.Title = Title;
        doc.BodyText = BodyText;
        doc.FileName = FileName;

        return doc;
    }
}
```

**3.**       **Builder pattern:** (এটির মাধ্যমে complex object কে ছোট ছোট পার্টে ভাগ করে complete করা যায়। ধরি আমাদের একটি বাড়ি বানাতে হবে তখন প্রথমে ফাউন্ডেশন, তারপর কলাম এভাবে এগুতে হবে। এখানে _giftcard ইনিশিয়ালাইজ করবো তারপর বিভিন্ন ভ্যালু পুশ করে আবার _giftcard  শেষে রিটার্ন করে দিছে)  The Builder pattern is a creational design pattern that allows for the creation of complex objects step by step or piece by piece. It separates the construction of an object from its representation, allowing for greater control over the object's creation process. The Builder pattern consists of two main components: the Builder interface and the Concrete Builder classes. The Builder interface defines the steps involved in constructing an object, while the Concrete Builder classes implement those steps to create specific types of objects. The Director class is often used in conjunction with the Builder pattern to manage the construction process. It coordinates the steps involved in creating an object by delegating to the appropriate Concrete Builder class. Using the Builder pattern can result in code that is easier to read and maintain, as well as more flexible, since the construction process can be changed without affecting the object being constructed.

``` csharp
public class GiftCardBuilder
{
    private GiftCard _giftCard;

    public GiftCardBuilder()
    {
        _giftCard = new GiftCard();
    }

    public void AddColor(Color color)
    {
        if (color == Color.Black)
            _giftCard.color = "#000000";
        else if (color == Color.White)
            _giftCard.color = "#FFFFFF";
    }

    public void AddGlitter(string type)
    {

    }

    public void AddNote(string note)
    {

    }

    public void AddSticker(string type)
    {

    }

    public GiftCard GetCard()
    {
        return _giftCard;
    }
}
```

**4.**       **Factory pattern:** ( যদি factory কে বলি object create করে দেও, তখন সে আমাকে অব্জেক্ট create করে দিবে। এটি OCP violation allow করে।                or                এটি subclass object create করে main class কে দিবে -> then main class দিবে user কে। আরো সহজভাবে বললে এটি user  কে একটি  ইন্টারফেস provide করবে, user একটি superclass এর object  তৈরি করতে পারবে কিন্তু সুপার ক্লাসের আন্ডারে যে সাবক্লাসগুলো থাকবে তারা চাইলে অবজেক্ট অল্টার বা পরিবর্ত্ন করতে পারবে। এটি অব্জেক্ট হাইড করে+ only একটি abstract ক্লাস থাকে.     যখন আমরা সেইম ক্লাসে ফ্যাকট্রি রাখি সেটাকে factory method বলে, আর যখন আলাদা ক্লাস বানিয়ে করি তখন সেটা Factory pattern বলে)  The Factory pattern is a creational design pattern that provides a way to create objects without specifying their exact class. Instead of calling a constructor directly to create an object, the Factory pattern provides a centralized method for creating objects of a certain type, based on the input parameters. The Factory pattern involves creating an interface or an abstract class for creating objects, and then implementing concrete classes that implement this interface or extend this abstract class to create specific types of objects. Clients use the factory method to create instances of these objects without having to know about the underlying implementation details.

The Factory pattern is useful when:

·         A system should be independent of how its objects are created

·         A system should be configured with one of multiple families of objects

·         A family of related product objects is designed to be used together and you need to enforce this constraint

·         By using the Factory pattern, you can improve the flexibility, modularity, and extensibility of your code, making it easier to maintain and modify in the future.

``` csharp
public class Car
using System;

// Product interface
public interface IVehicle
{
    void Drive();
}

// Concrete product classes
public class Car : IVehicle
{
    public void Drive()
    {
        Console.WriteLine("Driving a car");
    }
}

public class Bike : IVehicle
{
    public void Drive()
    {
        Console.WriteLine("Riding a bike");
    }
}

// Factory class
public class VehicleFactory
{
    public IVehicle CreateVehicle(string type)
    {
        switch (type.ToLower())
        {
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            default:
                throw new ArgumentException("Invalid vehicle type");
        }
    }
}

// Client code
class Program
{
    static void Main()
    {
        // Using the factory pattern to create vehicles
        VehicleFactory factory = new VehicleFactory();

        IVehicle car = factory.CreateVehicle("car");
        car.Drive();

        IVehicle bike = factory.CreateVehicle("bike");
        bike.Drive();
    }
}
```

**5.**       **Abstract factory pattern:** (এটি হলো factory’s factory. এখানে মাল্টিপল ফ্যাক্ট্রি থাকতে পারে, এর ফলে একটা ফ্যাক্ট্ররি অন্য একটা ফ্যাক্টিতে ব্যবহার হয়ে যেতে পারে এজন্যই রিলেভেন্ট ক্লাসের ইন্সট্যান্স যেনো ব্যহহার করতে পারি তা নিশ্চিত করা(মূলম্ন্র)             or             যদি factory কে বলি object create করে দেও, তখন সে আমাকে অব্জেক্ট create করে দিবে কিন্তু কোনো ইন্সাইড লজিক দিবে না এমনকি অব্জেক্ট কেমনে তৈরি হয়েছে তাও বলে দিবেনা। এগুলো সাধারনত আবস্টাক্ট ক্লাসের মধ্যে বানাতে হয় (চাইলে ইন্টারফেসেও বানাতে পারি)  এটি আরো strongly অব্জেক্ট হাইড করে+ multiple  abstract ক্লাস থাকতে পারে)  The Abstract Factory pattern is a creational design pattern that provides an interface for creating related or dependent objects without specifying their concrete classes. It is a way to create families of related objects, such as different types of products or components, while maintaining consistency between them. In this pattern, an abstract factory defines a set of methods for creating a family of related objects, but does not specify their concrete classes. Concrete factories implement the abstract factory interface and provide specific implementations of the factory methods, which create concrete objects that belong to the same family. The client code interacts with the abstract factory and the concrete products through their common abstract interfaces, without knowing the specific classes of the objects they are using. The Abstract Factory pattern is useful in situations where a system needs to be able to create different families of related objects, such as different types of UI widgets or database access classes, and the specific types of objects needed may depend on the configuration or context of the system. By using an abstract factory, the system can create the appropriate objects without having to know their specific types, which makes the system more flexible and easier to maintain.

``` csharp
using System;

// Abstract product interfaces
public interface IButton
{
    void Click();
}

public interface IWindow
{
    void Open();
}

// Concrete product classes
public class WindowsButton : IButton
{
    public void Click()
    {
        Console.WriteLine("Windows button clicked");
    }
}

public class WindowsWindow : IWindow
{
    public void Open()
    {
        Console.WriteLine("Windows window opened");
    }
}

public class MacButton : IButton
{
    public void Click()
    {
        Console.WriteLine("Mac button clicked");
    }
}

public class MacWindow : IWindow
{
    public void Open()
    {
        Console.WriteLine("Mac window opened");
    }
}

// Abstract factory interface
public interface IUIFactory
{
    IButton CreateButton();
    IWindow CreateWindow();
}

// Concrete factory classes
public class WindowsUIFactory : IUIFactory
{
    public IButton CreateButton()
    {
        return new WindowsButton();
    }

    public IWindow CreateWindow()
    {
        return new WindowsWindow();
    }
}

public class MacUIFactory : IUIFactory
{
    public IButton CreateButton()
    {
        return new MacButton();
    }

    public IWindow CreateWindow()
    {
        return new MacWindow();
    }
}

// Client code
class Program
{
    static void Main()
    {
        // Using the abstract factory pattern to create UI components
        IUIFactory windowsFactory = new WindowsUIFactory();
        IButton windowsButton = windowsFactory.CreateButton();
        IWindow windowsWindow = windowsFactory.CreateWindow();

        windowsButton.Click();
        windowsWindow.Open();

        IUIFactory macFactory = new MacUIFactory();
        IButton macButton = macFactory.CreateButton();
        IWindow macWindow = macFactory.CreateWindow();

        macButton.Click();
        macWindow.Open();
    }
}

```

·         Factory pattern vs Abstact Factory Pattern:

|   |   |   |
|---|---|---|
|Feature|Factory Pattern|Abstract Factory Pattern|
|Intent|Creates objects without specifying their concrete types.|Provides an interface for creating families of related or dependent objects without specifying their concrete classes.|
|Type of Products|Creates a single type of product.|Creates families of related products (multiple types).|
|Number of Methods|Typically has a single creation method.|Often has multiple creation methods for different types of products.|
|Extensibility|Limited extensibility when adding new products.|Easier to extend by adding new factories and products without modifying existing code.|
|Example|CarFactory creates different types of cars.|GUIFactory creates different types of buttons and windows.|
|Usage|Suitable when there is only one type of product to create.|Suitable when you need to create families of related products and ensure their compatibility.|
|Abstract Class or Interface|Can use either an abstract class or an interface.|Typically uses interfaces for both the factories and products.|
|Client Code|The client code is aware of the concrete factory and product types.|The client code interacts with abstract factory and product interfaces, remaining unaware of the specific implementations.|

·         Sir share a book where have total 23 type of design pattern like Behaviour + structural pattern + creational pattern. Here we all all creational pattern from book, other is complex (we should learn it later)