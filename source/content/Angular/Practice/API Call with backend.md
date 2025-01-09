
### 1. Static method

First we create a folder name `data` into `src > app` then create two `ts` manually like here I want to show some people biodata so create a model `BioData` and its interface `IBioData`

![[ng-staticAPI.png]]

Here is `BioData`,
```typescript
import { IBioData } from "./IBioData";

export class BioData implements IBioData {
    id: number = 0;
    name: string = '';
    email: string = '';
    phone: string = '';
    dateOfBirth: Date = new Date();
    address: string = '';
    createdAt: Date = new Date();

    // constructor(
    //     id: number,
    //     name: string,
    //     email: string,
    //     phone: string,
    //     dateOfBirth: Date,
    //     address: string,
    //     createdAt: Date
    // ) {
    //     this.id = id;
    //     this.name = name;
    //     this.email = email;
    //     this.phone = phone;
    //     this.dateOfBirth = dateOfBirth;
    //     this.address = address;
    //     this.createdAt = createdAt;
    // }

    constructor(init?: Partial<BioData>) {   //This is allowing for flexible initialization
        Object.assign(this, init);
    }

    display(): string {
        return `${this.name} - ${this.email}`;
    }
}
```

Here is `IBioData`,
```typescript
export interface IBioData {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    createdAt: Date;
}
```

Now we create a service into services folder. Using command like `ng g s bioData`. Below is code.
Here is `biodata.service.ts`,
```typescript
import { Injectable } from '@angular/core';
import { IBioData } from '../data/IBioData';
import { BioData } from '../data/BioData';

@Injectable({
  providedIn: 'root'
})
export class BiodataService {

  constructor() { }

  getStaticData(): IBioData[] {
    return [
      new BioData({
        id: 3,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        dateOfBirth: new Date("1989-12-30"),
        address: "789 Pine Road, SF",
        createdAt: new Date()
      }),
      new BioData({
        id: 4,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-765-4321",
        dateOfBirth: new Date("1990-04-10"),
        address: "101 Maple Street, TX",
        createdAt: new Date()
      }),
      new BioData({
        id: 5,
        name: "David Johnson",
        email: "david.johnson@example.com",
        phone: "555-678-1234",
        dateOfBirth: new Date("1991-02-25"),
        address: "202 Birch Blvd, FL",
        createdAt: new Date()
      })
    ];
  }
}
}
```

Here is `app.component.ts`,
```typescript

bioDatas: IBioData[] = [];

  constructor(private bioDataService: BiodataService) { }

  ngOnInit(): void {
    this.bioDatas = this.bioDataService.getStaticData();
  }


```

Here is `app.component.html`,
```html
<table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Date of Birth</th>
        <th>Address</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let bioData of bioDatas">
        <td>{{ bioData.id }}</td>
        <td>{{ bioData.name }}</td>
        <td>{{ bioData.email }}</td>
        <td>{{ bioData.phone }}</td>
        <td>{{ bioData.dateOfBirth | date }}</td>
        <td>{{ bioData.address }}</td>
        <td>{{ bioData.createdAt | date }}</td>
      </tr>
    </tbody>
  </table>
```

---
### 2. Using API

First create a ASP.NET Core Web API project (Name could MyAPI). Then add a Model Folder and add a class:
```csharp
    public class BioData
    {
        public int ID { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }

        public BioData(int id, string name, string email, string phone, DateTime dateOfBirth, string address, DateTime createdAt)
        {
            ID = id;
            Name = name;
            Email = email;
            Phone = phone;
            DateOfBirth = dateOfBirth;
            Address = address;
            CreatedAt = createdAt;
        }
        public BioData() { }
    }
}
```

Then add a `DataContext.cs` in same model folder:
```csharp
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<BioData> BioDatas { get; set; }
}
```

Then add a `Controller.cs` in same model folder:
```csharp
namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowSites")]
    public class BioDataController : ControllerBase
    {
        private readonly DataContext _context;

        public BioDataController(DataContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<BioData>>> GetBioDatas()
        //{
        //    return await _context.BioDatas.ToListAsync();
        //}

        //[HttpGet("Paging")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BioData>>> GetBioDatas(int pageNumber = 1, int pageSize = 10)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var bioDatas = await _context.BioDatas
                .Skip((pageNumber - 1) * pageSize) // like offset
                .Take(pageSize) // like next
                .ToListAsync();

            if (bioDatas == null || !bioDatas.Any())
            {
                return NotFound("No data found.");
            }

            return Ok(bioDatas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BioData>> GetBioData(int id)
        {
            var bioData = await _context.BioDatas.FindAsync(id);

            if (bioData == null)
            {
                return NotFound();
            }

            return bioData;
        }

        [HttpPost]
        public async Task<ActionResult<BioData>> CreateBioData(BioData bioData)
        {
            _context.BioDatas.Add(bioData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBioData), new { id = bioData.ID }, bioData);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBioData(int id, BioData bioData)
        {
            if (id != bioData.ID)
            {
                return BadRequest();
            }

            _context.Entry(bioData).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBioData(int id)
        {
            var bioData = await _context.BioDatas.FindAsync(id);
            if (bioData == null)
            {
                return NotFound();
            }

            _context.BioDatas.Remove(bioData);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
```

Add `appsetting.json
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.\\SQLEXPRESS;Database=TempoDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Then apply migration:
```cmd
	Add-Migration InitialCreate
	Remove-Migration
	Update-Database
```

Then go to database and insert bulk amount of rows:
```sql

```

Then add a `Program.cs` in same model folder:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSites",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200"/*, "https://localhost:7213", "https://localhost:7142"*/)
               .AllowAnyMethod()
               .AllowAnyHeader();
        });
});





------------------------------------------------------------
app.UseCors();






-----------------------------------------------------------
    [Route("api/[controller]")]
	[ApiController]
	[EnableCors("AllowSites")]
	public class BioDataController : ControllerBase
	{
	}

```


Create a folder name `data` into app component. Now go to `IBioData.ts` in same model folder:
```typescript

export interface IBioData {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    createdAt: Date;
}

export interface ApiResponse {
    items: IBioData[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
```

Create a folder name `data` into app component. Now go to `IBioData.ts` in same model folder:
```typescript
import { IBioData } from "./IBioData";

export class BioData implements IBioData {
    id: number = 0;
    name: string = '';
    email: string = '';
    phone: string = '';
    dateOfBirth: Date = new Date();
    address: string = '';
    createdAt: Date = new Date();

    // constructor(
    //     id: number,
    //     name: string,
    //     email: string,
    //     phone: string,
    //     dateOfBirth: Date,
    //     address: string,
    //     createdAt: Date
    // ) {
    //     this.id = id;
    //     this.name = name;
    //     this.email = email;
    //     this.phone = phone;
    //     this.dateOfBirth = dateOfBirth;
    //     this.address = address;
    //     this.createdAt = createdAt;
    // }

    constructor(init?: Partial<BioData>) {   //This is allowing for flexible initialization
        Object.assign(this, init);
    }

    display(): string {
        return `${this.name} - ${this.email}`;
    }
}
```


Create a folder name `services` into app component. Now go to `BioData.ts` in same model folder:
```typescript

import { Injectable } from '@angular/core';
import { IBioData } from '../data/IBioData';
import { BioData } from '../data/BioData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiodataService {

  private apiUrl = 'https://localhost:7034/api/BioData';

  constructor(private http: HttpClient) { }

  getStaticData(): IBioData[] {
    return [
      new BioData({
        id: 3,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        dateOfBirth: new Date("1989-12-30"),
        address: "789 Pine Road, SF",
        createdAt: new Date()
      }),
      new BioData({
        id: 4,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-765-4321",
        dateOfBirth: new Date("1990-04-10"),
        address: "101 Maple Street, TX",
        createdAt: new Date()
      }),
      new BioData({
        id: 5,
        name: "David Johnson",
        email: "david.johnson@example.com",
        phone: "555-678-1234",
        dateOfBirth: new Date("1991-02-25"),
        address: "202 Birch Blvd, FL",
        createdAt: new Date()
      })
    ];
  }

  // GET
  getData(pageNumber: number = 1, pageSize: number = 10): Observable<IBioData[]> {
    const url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<IBioData[]>(url);
  }

  // GET By ID
  getDataById(id: number): Observable<IBioData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IBioData>(url);
  }

  // POST
  postData(data: IBioData): Observable<IBioData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<IBioData>(this.apiUrl, data, { headers });
  }

  // PUT
  putData(id: number, data: IBioData): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data);
  }

  // DELETE
  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

```


Must import: HttpClientModule a `app.module.ts` in same model folder:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

now `app.component.ts,

``` typescript
import { Component } from '@angular/core';
import { BiodataService } from './services/biodata.service';
import { IBioData } from './data/IBioData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  myEvent(event: any) {
    console.log(event);
  }

  bioDatas: IBioData[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private bioDataService: BiodataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.bioDataService.getData(this.pageNumber, this.pageSize).subscribe(
      (data) => {
        this.bioDatas = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  nextPage(): void {
    this.pageNumber++;
    this.loadData();
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadData();
    }
  }
}

```

Now update app.component.html

```html

<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Date of Birth</th>
      <th>Address</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let bioData of bioDatas">
      <td>{{ bioData.id }}</td>
      <td>{{ bioData.name }}</td>
      <td>{{ bioData.email }}</td>
      <td>{{ bioData.phone }}</td>
      <td>{{ bioData.dateOfBirth | date }}</td>
      <td>{{ bioData.address }}</td>
      <td>{{ bioData.createdAt | date }}</td>
    </tr>
  </tbody>
</table>

<div>
  <button (click)="prevPage()">Previous</button>
  <button (click)="nextPage()">Next</button>
</div>
```

---
### 3.Create a Data Table with Features (Delete, Update, Multi-Select, Pagination, Search, Filter)

1. Install **ngx-datatable** using:
    
    ```bash
    npm install @swimlane/ngx-datatable
    ```
    
2. Add `NgxDatatableModule` to `app.module.ts`.
    
3. Add this import to handle pagination:
    
    ```typescript
    import { PageEvent } from '@angular/material/paginator';
    ```
    
4. Use `ng add @angular/material` to include pagination features.
    

_Note:_ I’m currently using pagination with 10 rows per page and search functionality. For a full CRUD solution, you can use **Angular Ant Design (NG Zorro)** or **Angular Material** for a more straightforward UI component framework.






First create a ASP.NET Core Web API project (Name could MyAPI). Then add a Model Folder and add a class:
```csharp
    public class BioData
    {
        public int ID { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public DateTime CreatedAt { get; set; }

        public BioData(int id, string name, string email, string phone, DateTime dateOfBirth, string address, DateTime createdAt)
        {
            ID = id;
            Name = name;
            Email = email;
            Phone = phone;
            DateOfBirth = dateOfBirth;
            Address = address;
            CreatedAt = createdAt;
        }
        public BioData() { }
    }
}
```

Then add a `DataContext.cs` in same model folder:
```csharp
public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<BioData> BioDatas { get; set; }
}
```

Then add a `BioDataController.cs` in same model folder:
```csharp
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyAPI.Model;

namespace MyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowSites")]
    public class BioDataController : ControllerBase
    {
        private readonly DataContext _context;

        public BioDataController(DataContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<BioData>>> GetBioDatas(int pageNumber = 1, int pageSize = 10)
        //{
        //    if (pageNumber < 1) pageNumber = 1;
        //    if (pageSize < 1 || pageSize > 100) pageSize = 10;

        //    var bioDatas = await _context.BioDatas
        //        .Skip((pageNumber - 1) * pageSize) // like offset
        //        .Take(pageSize) // like next
        //        .ToListAsync();

        //    var totalRows = await _context.BioDatas
        //        .CountAsync();

        //    if (bioDatas == null || !bioDatas.Any())
        //    {
        //        return NotFound("No data found.");
        //    }

        //    return Ok(new
        //    {
        //        Items = bioDatas,
        //        TotalCount = totalRows,
        //        PageNumber = pageNumber,
        //        PageSize = pageSize,
        //        TotalPages = (int)Math.Ceiling((double)totalRows / pageSize)
        //    });
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BioData>>> GetBioDatas(
            int pageNumber = 1, int pageSize = 10, string searchQuery = "")
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1 || pageSize > 100) pageSize = 10;

            var bioDatasQuery = _context.BioDatas.AsQueryable();
            if (!string.IsNullOrEmpty(searchQuery))
            {
                bioDatasQuery = bioDatasQuery.Where(b => b.Name.Contains(searchQuery) || 
                b.Address.Contains(searchQuery));
            }

            var bioDatas = await bioDatasQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize) 
                .ToListAsync();

            var totalRows = await bioDatasQuery.CountAsync();

            if (bioDatas == null || !bioDatas.Any())
            {
                return NotFound("No data found.");
            }

            return Ok(new
            {
                Items = bioDatas,
                TotalCount = totalRows,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalRows / pageSize)
            });
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BioData>> GetBioData(int id)
        {
            var bioData = await _context.BioDatas.FindAsync(id);

            if (bioData == null)
            {
                return NotFound();
            }

            return bioData;
        }

        [HttpPost]
        public async Task<ActionResult<BioData>> CreateBioData(BioData bioData)
        {
            _context.BioDatas.Add(bioData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBioData), new { id = bioData.ID }, bioData);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBioData(int id, BioData bioData)
        {
            if (id != bioData.ID)
            {
                return BadRequest();
            }

            _context.Entry(bioData).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBioData(int id)
        {
            var bioData = await _context.BioDatas.FindAsync(id);
            if (bioData == null)
            {
                return NotFound();
            }

            _context.BioDatas.Remove(bioData);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

```

Add `appsetting.json
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.\\SQLEXPRESS;Database=TempoDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Then apply migration:
```cmd
	Add-Migration InitialCreate
	Remove-Migration
	Update-Database
```

Then go to database and insert bulk amount of rows:
```sql

```

Then add a `Program.cs` in same model folder:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSites",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200"/*, "https://localhost:7213", "https://localhost:7142"*/)
               .AllowAnyMethod()
               .AllowAnyHeader();
        });
});





------------------------------------------------------------
app.UseCors();






-----------------------------------------------------------
    [Route("api/[controller]")]
	[ApiController]
	[EnableCors("AllowSites")]
	public class BioDataController : ControllerBase
	{
	}

```

Create a folder name `data` into app component. Now go to `IBioData.ts` in same model folder:
```typescript

export interface IBioData {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    createdAt: Date;
}

export interface ApiResponse {
    items: IBioData[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
```

Create a folder name `data` into app component. Now go to `IBioData.ts` in same model folder:
```typescript
import { IBioData } from "./IBioData";

export class BioData implements IBioData {
    id: number = 0;
    name: string = '';
    email: string = '';
    phone: string = '';
    dateOfBirth: Date = new Date();
    address: string = '';
    createdAt: Date = new Date();

    // constructor(
    //     id: number,
    //     name: string,
    //     email: string,
    //     phone: string,
    //     dateOfBirth: Date,
    //     address: string,
    //     createdAt: Date
    // ) {
    //     this.id = id;
    //     this.name = name;
    //     this.email = email;
    //     this.phone = phone;
    //     this.dateOfBirth = dateOfBirth;
    //     this.address = address;
    //     this.createdAt = createdAt;
    // }

    constructor(init?: Partial<BioData>) {   //This is allowing for flexible initialization
        Object.assign(this, init);
    }

    display(): string {
        return `${this.name} - ${this.email}`;
    }
}
```


Create a folder name `services` into app component. Now go to `bioData.service.ts` in same model folder:
```typescript

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiResponse, IBioData } from '../data/IBioData';

@Injectable({
  providedIn: 'root'
})
export class BiodataService {

  private apiUrl = 'https://localhost:7034/api/BioData';

  constructor(private http: HttpClient) { }

  // GET 
  getData(pageNumber: number = 1, pageSize: number = 10, searchQuery: string = ""): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  // GET - using map
  // getData(pageNumber: number = 1, pageSize: number = 10): Observable<ApiResponse> {
  //   const url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  //   return this.http.get<ApiResponse>(url).pipe(
  //     map((data) => {
  //       return data;
  //     })
  //   );
  // }

  // GET By ID
  getDataById(id: number): Observable<IBioData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IBioData>(url);
  }

  // POST
  postData(data: IBioData): Observable<IBioData> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<IBioData>(this.apiUrl, data, { headers });
  }

  // PUT
  putData(id: number, data: IBioData): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data);
  }

  // DELETE
  deleteData(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}

```

Must import: HttpClientModule a `app.module.ts` in same model folder:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // import the FormsModule to use ngModel
    HttpClientModule, // import this for API request
    NgxDatatableModule, // This is DataTable
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

now `app.component.ts,

``` typescript
import { Component } from '@angular/core';
import { BiodataService } from './services/biodata.service';
import { PageEvent } from '@angular/material/paginator';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ApiResponse, IBioData } from './data/IBioData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  bioDataList: IBioData[] = [];
  selectedRows: any[] = []; 
  rowsOnPage: number = 10;   
  totalPages: number = 0;    
  page: number = 1;          
  searchQuery: string = '';  

  selectionType = SelectionType.checkbox;

  columns = [
    { prop: 'id', name: 'ID' },
    { prop: 'name', name: 'Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'phone', name: 'Phone' },
    { prop: 'dateOfBirth', name: 'Date of Birth' },
    { prop: 'address', name: 'Address' }
  ];

  constructor(private biodataService: BiodataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Load data based on pagination and search query
  loadData(page: number = 1): void {
    this.page = page;
    this.biodataService.getData(page, this.rowsOnPage, this.searchQuery).subscribe((data: ApiResponse) => {
      this.bioDataList = data.items;
      this.totalPages = data.totalPages;
    });
  }
  

  // Handle page change
  onPageChange(event: PageEvent): void {
    this.rowsOnPage = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(this.page);
  }

  // Handle delete selected rows
  onDeleteSelected(): void {
    const idsToDelete = this.selectedRows.map(row => row.id);
    // Call the delete API for multiple records
    idsToDelete.forEach(id => {
      this.biodataService.deleteData(id).subscribe(() => {
        this.loadData(this.page);  // Reload data after deletion
      });
    });
  }

  // Handle select all for multi-selection
  onSelectAll() {
    if (this.selectedRows.length === this.bioDataList.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.bioDataList];
    }
  }

  // Handle individual row selection
  onSelectRow(row: any) {
    const index = this.selectedRows.indexOf(row);
    if (index === -1) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows.splice(index, 1);
    }
  }

  // Search filter
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.loadData();
  }
}

```

Now update app.component.html

```html

<div class="search-container">
  <input [(ngModel)]="searchQuery" (ngModelChange)="onSearchChange($event)" placeholder="Search..." class="search-input"/>
</div>

<ngx-datatable
  class="material"
  [rows]="bioDataList"
  [columns]="columns"
  [selected]="selectedRows"
  [selectionType]="selectionType"
  (activate)="onSelectRow($event)"
  [count]="totalPages"
  (page)="onPageChange($event)">
</ngx-datatable>

<div class="pagination">
  <button (click)="onDeleteSelected()" [disabled]="selectedRows.length === 0">Delete Selected</button>
</div>

<!-- Pagination Controls -->
<mat-paginator [length]="totalPages" [pageSize]="rowsOnPage" (page)="onPageChange($event)">
</mat-paginator>
```
