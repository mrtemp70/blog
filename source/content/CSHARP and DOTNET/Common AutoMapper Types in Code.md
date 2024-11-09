
**Date:** 2024-11-02

In this discussion, I will cover five types of AutoMapper that are regularly used in our code. First, I will write all of them in a single controller (though it is considered bad practice to keep all code in a controller action). 

Must add `builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());` line into `program.cs` and install package `<PackageReference Include="AutoMapper" Version="13.0.1" />`

### Controller:

```csharp
public class HomeController : Controller
{
    private readonly IMapper _mapper;
    private readonly ILogger<HomeController> _logger;

    public HomeController(IMapper mapper, ILogger<HomeController> logger)
    {
        _logger = logger;
        _mapper = mapper;
    }

    ## Type 1: Simple Automapper
    // All properties in the DTO are equal to all properties in the Model.
    public IActionResult Index()
    {
        var employeeModelValue = new EmployeeModel
        {
            Code = "A123",
            Name = "Mr X",
            Gender = "Male",
            JoinningDate = DateTime.Parse("2024-01-01")
        };

        var employeeDTOValue = new EmployeeDTO
        {
            Code = "B123",
            Name = "Mrs Y",
            Gender = "Female",
            JoinningDate = DateTime.Parse("2024-12-25")
        };

        // 1. Mapping EmployeeModel to EmployeeDTO
        var employeeDTO = _mapper.Map<EmployeeDTO>(employeeModelValue);

        // 2. Mapping EmployeeDTO to EmployeeModel
        var employeeModel = _mapper.Map<EmployeeModel>(employeeDTOValue);

        var employeeViewModel = new EmployeeViewModel
        {
            EmployeeDTO = employeeDTO,
            EmployeeModel = employeeModel
        };

        return View(employeeViewModel);
    }

    ## Type 2: Semi Advanced Automapper
    // One or two properties of the DTO are not equal to one or two properties of the Model.
    public IActionResult Index2()
    {
        var personValue = new PersonModel
        {
            FirstName = "John",
            LastName = "Doe",
            Age = 30
        };

        var personDTOValue = new PersonDTO
        {
            FullName = "John Doe",
            Age = 30
        };

        // 1. Mapping PersonModel to PersonDTO
        var personDTO = _mapper.Map<PersonDTO>(personValue);

        // 2. Mapping PersonDTO to PersonModel
        var personModel = _mapper.Map<PersonModel>(personDTOValue);

        var personViewModel = new PersonViewModel
        {
            PersonDTO = personDTO,
            PersonModel = personModel
        };

        return View(personViewModel);
    }

    ## Type 3: Advanced Automapper
    // One or two properties of the DTO are not equal to one or two properties of the Model. 
    // Additionally, properties can be modified or added from outside.
    public IActionResult Index3()
    {
        var employeeModelValue = new EmployeeModel
        {
            Code = "A123",
            Name = "Mr X",
            Gender = "Male",
            JoinningDate = DateTime.Parse("2024-01-01")
        };

        var employeeDTOValue = new EmployeeDTO
        {
            Code = "B123",
            Name = "Mrs Y",
            Gender = "Female",
            JoinningDate = DateTime.Parse("2024-12-25")
        };

        employeeDTOValue.Code = "C123";
        employeeDTOValue.Name = "Mrs Z";
        employeeDTOValue.Gender = employeeModelValue.Gender;

        // 1. Mapping EmployeeModel to EmployeeDTO
        var employeeDTO = _mapper.Map<EmployeeDTO>(employeeModelValue);

        // 2. Mapping EmployeeDTO to EmployeeModel
        var employeeModel = _mapper.Map<EmployeeModel>(employeeDTOValue);

        var employeeViewModel = new EmployeeViewModel
        {
            EmployeeDTO = employeeDTO,
            EmployeeModel = employeeModel
        };

        return View(employeeViewModel);
    }

    ## Type 4: List of Model Automap
    // Mapping a list of EmployeeModel to a list of EmployeeDTO.
    public IActionResult Index4()
    {
        var employeeModelValueList = new List<EmployeeModel>
        {
            new EmployeeModel
            {
                Code = "D123",
                Name = "Mr X",
                Gender = "Male",
                JoinningDate = DateTime.Parse("2024-01-01")
            },
            new EmployeeModel
            {
                Code = "E123",
                Name = "Mr X",
                Gender = "Male",
                JoinningDate = DateTime.Parse("2024-01-01")
            },
            new EmployeeModel
            {
                Code = "F123",
                Name = "Mr X",
                Gender = "Male",
                JoinningDate = DateTime.Parse("2024-01-01")
            },
            new EmployeeModel
            {
                Code = "G123",
                Name = "Mr X",
                Gender = "Male",
                JoinningDate = DateTime.Parse("2024-01-01")
            }
        };

        employeeModelValueList[0].Name = "Mr D";
        employeeModelValueList[1].Name = "Mr E";
        employeeModelValueList[2].Name = "Mr F";
        employeeModelValueList[3].Name = "Mr G";

        var employeeDTOValue = new EmployeeDTO
        {
            Code = "H123",
            Name = "Mrs Y",
            Gender = "Female",
            JoinningDate = DateTime.Parse("2024-12-25")
        };

        // 1. Mapping a list of EmployeeModel to a list of EmployeeDTO
        var employeeDTO = _mapper.Map<List<EmployeeDTO>>(employeeModelValueList);

        // 2. Mapping EmployeeDTO to EmployeeModel
        var employeeModel = _mapper.Map<EmployeeModel>(employeeDTOValue);

        var employeeViewModel = new EmployeeViewModelList
        {
            EmployeeDTO = employeeDTO,
            EmployeeModel = employeeModel
        };

        return View(employeeViewModel);
    }

    ## Type 5: Model and View are not identical
    // Some properties are missing in the model, and some properties are missing in the DTO.
    public IActionResult Index5()
    {
        var bookValue = new BookModel
        {
            Title = "1984",
            Author = "George Orwell",
            YearPublished = 1949,
            Genre = "Dystopian",
            Edition = "First"
        };

        var bookDTOValue = new BookDTO
        {
            Title = "1984",
            Author = "George Orwell",
            YearPublished = 1949,
            Genre = "Dystopian",
            Price = 212.12
        };

        // 1. Mapping BookModel to BookDTO
        var bookDTO = _mapper.Map<BookDTO>(bookValue);

        // 2. Mapping BookDTO to BookModel
        var bookModel = _mapper.Map<BookModel>(bookDTOValue);

        var bookViewModel = new BookViewModel
        {
            BookDTO = bookDTO,
            BookModel = bookModel
        };

        return View(bookViewModel);
    }
}
``` 

### DTO:

```csharp
public class BookDTO
{
    public string Title { get; set; }
    public string Author { get; set; }
    public int YearPublished { get; set; }
    public string Genre { get; set; }


    // Extra
    public double? Price { get; set; }
    public int? Quantity { get; set; }
    public string Description { get; set; }
}

public class EmployeeDTO
{
    public string Code { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public DateTime? JoinningDate { get; set; }
}

public class PersonDTO
{
    public string FullName { get; set; }
    public int Age { get; set; }

    //public string FirstName { get; set; }
    //public string LastName { get; set; }
    //public int? Age { get; set; }
}
``` 


### Model:

```csharp
public class BookModel
{
    public string Title { get; set; }
    public string Author { get; set; }
    public int YearPublished { get; set; }
    public string Genre { get; set; }

    // Extra
    public string Edition { get; set; }
}

public class EmployeeModel
{
    public string Code { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public DateTime? JoinningDate { get; set; }
}

public class PersonModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
}
``` 


### Profiles:

```csharp
public BookProfile()
{
// Ignore is necessary while property name is same but datatype different (It have other reason also)
    CreateMap<BookModel, BookDTO>()
    .ForMember(dest => dest.Price, opt => opt.Ignore())
    .ForMember(dest => dest.Quantity, opt => opt.Ignore())
    .ForMember(dest => dest.Description, opt => opt.Ignore());

    CreateMap<BookDTO, BookModel>();
}

public EmployeeProfile()
{
    //CreateMap<EmployeeModel, EmployeeDTO>();
    //CreateMap<EmployeeDTO, EmployeeModel>();

    CreateMap<EmployeeModel, EmployeeDTO>().ReverseMap();
}

public PersonProfile()
{
    // 1. Map from Person to PersonDTO (Source: PersonModel,  Destination: PersonDTO)
    CreateMap<PersonModel, PersonDTO>()
        .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
        .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age ?? 0));

    // 2. Map from PersonDTO to Person (Source: PersonDTO,  Destination: PersonModel)
    CreateMap<PersonDTO, PersonModel>()
        .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FullName.Split()[0]))
        .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.FullName.Split().Length > 1 ? src.FullName.Split()[1] : ""))
        .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age));
}
``` 


To view the razor page and the shared model (where I store data to send it to the view), visit my GitHub repository: https://github.com/msashoyeb/Project-Collection.
