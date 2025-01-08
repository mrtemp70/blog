## Introduction

- JavaScript is a programming language that is commonly used to create dynamic content on websites. It is a versatile language that runs in web browsers, enabling developers to build interactive and engaging user interfaces. JavaScript is essential for creating features like form validation, animations, and real-time updates without requiring a page reload.

- ECMAScript 2021 is the latest standardized version of JavaScript. JavaScript follows the ECMAScript specifications, and new versions are regularly released to introduce new features, improvements, and fixes.

- Old JavaScript examples may use a type attribute: `<script type="text/javascript">`. The type attribute is not required. JavaScript is the default scripting language in HTML.

- We should use script tag into body because: Placing JavaScript in the `<head>` may delay page rendering, while placing it in the `<body>` allows faster rendering but may require careful handling of DOM element access. Consider using the `async` or `defer` attributes for optimal script loading, and place non-essential scripts at the end of the `<body>` for faster initial page display.

There have many example like string method number method, array loop, object in this [link:](https://www.w3schools.com/js/default.asp)

---

## Document Object Model (DOM) interface

Specifically, it's a method of the Document interface, which represents the entire HTML or XML document. The purpose of `getElementById` is to retrieve a reference to an HTML element based on its unique id attribute.

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <p id="demo">A Paragraph.</p>
    <button type="button" onclick="myFunction()">Try it</button>
    <script>
        function myFunction() {
            document.getElementById("demo").innerHTML = "Paragraph changed.";
        }
    </script>
</body>
</html>
```

- We can use different types of element with `getElementById` like below: 

```javascript
// Get a reference to the element with ID "demo"
var demoElement = document.getElementById("demo");

// Change the style properties
demoElement.style.display = "block";
demoElement.style.color = "blue";
demoElement.style.backgroundColor = "#f0f0f0";
demoElement.style.fontSize = "20px";

// Modify other attributes
demoElement.setAttribute("class", "highlight");
demoElement.setAttribute("src", "new-image.jpg");
demoElement.setAttribute("href", "https://www.example.com");

// Change the content
demoElement.innerHTML = "Hello JavaScript!";
demoElement.textContent = "Hello Text Content!";

// Add or remove CSS classes
demoElement.classList.add("new-class");
demoElement.classList.remove("old-class");

// Add event listeners
demoElement.addEventListener("click", function() {
    alert("Element clicked!");
});

// Manipulate specific properties
demoElement.value = "New Value"; // for input elements
demoElement.checked = true; // for checkboxes and radio buttons
```

- We can use like display style property: 

```javascript
"block": 
// Use "block" when you want the element to be a block-level element, meaning it will start on a new line and take up the full width available.
// Block-level elements, like <div>, <p>, and <h1> by default, have line breaks before and after them, creating a "block" in the layout.
document.getElementById("demo").style.display = "block";

"none": 
// Use "none" when you want to hide the element. When an element's display is set to "none," it will not be visible on the page, and it won't take up space in the layout.
// This is often used for toggling visibility, hiding/showing elements dynamically based on user interactions, form validation, etc.
document.getElementById("demo").style.display = "none";

display: inline;:
// Makes the element inline, meaning it does not start on a new line, and it only takes up as much width as necessary. It also allows other elements to appear on the same line.
document.getElementById("demo").style.display = "inline";

display: inline-block;:
// Combines features of both inline and block. The element is inline, but it can have a width and height, and it respects top and bottom margins.
document.getElementById("demo").style.display = "inline-block";

display: flex;:
// Establishes a flex container, and its children become flexible items. It provides powerful layout capabilities, allowing you to create complex designs with ease.
document.getElementById("demo").style.display = "flex";

display: grid;:
// Similar to flex, grid allows you to create two-dimensional layouts. It's especially useful for organizing content into rows and columns.
document.getElementById("demo").style.display = "grid";

display: inline-flex; and display: inline-grid;:
// Similar to flex and grid, but they make the container inline.
document.getElementById("demo").style.display = "inline-flex";
// or
document.getElementById("demo").style.display = "inline-grid";
```

---

## Output

```javascript
<script>
console.log(5 + 6);
alert(5 + 6);
window.alert(5 + 6); // Same as alert
document.write(5 + 6); // This will print on html, no need to declare any id
document.getElementById("demo").innerHTML = 5 + 6;// This will changed html
</script>
```

```html
<button onclick="window.print()">Print this page</button> // This will print like ctrl + p
```

---

## Variable

| Feature                   | var                         | let                        | const                       |
|---------------------------|----------------------------|----------------------------|-----------------------------|
| Scope                     | Function-scoped or globally-scoped | Block-scoped              | Block-scoped                |
| Hoisting (উত্তোলন)       | Hoisted (উত্তোলিত) to the top of the scope | Hoisted to the top of the scope | Hoisted to the top of the scope |
| Reassignment              | Can be reassigned          | Can be reassigned          | Cannot be reassigned        |
| Redeclaration (পুনরায় নিয়োগ) | Can be redeclared within the same scope | Cannot be redeclared within the same scope | Cannot be redeclared within the same scope |
| Initialization            | Can be declared without an initial value | Can be declared without an initial value | Must be assigned a value at declaration |
| Example                   | var x = 5;                | let y = 10;               | const z = 15;              |

- Using var

```javascript
function exampleVar() {
  if (true) {
    var localVar = "I am a var!";
    console.log(localVar); // Outputs: "I am a var!"
  }

  console.log(localVar); // Outputs: "I am a var!" (var is function-scoped)
}

exampleVar();
```

- Using let

```javascript
function exampleLet() {
  if (true) {
    let localLet = "I am a let!";
    console.log(localLet); // Outputs: "I am a let!"
  }

  // console.log(localLet); // ReferenceError: localLet is not defined (let is block-scoped)
}

exampleLet(); 
```

- Using const

```javascript
function exampleConst() {
  const PI = 3.14;
  console.log(PI); // Outputs: 3.14

  // PI = 3.14159; // TypeError: Assignment to constant variable (const cannot be reassigned)
}

exampleConst();
```

---
## JavaScript Assignment Operators

![[javascript1.png]]

![[javascript2.png]]

```javascript
// Numbers:
let length = 16;
let weight = 7.5;

// Strings:
let color = "Yellow";
let lastName = "Johnson";

// Booleans
let x = true;
let y = false;

// Object:
const person = {firstName:"John", lastName:"Doe"};
console.log(person); //{ firstName: "John", lastName: "Doe" }
console.log("First Name:", person.firstName);

// Date object:
const date = new Date("2022-03-25");

// Array object:
const cars = ["Saab", "Volvo", "BMW"];
console.log(cars); // ["Saab", "Volvo", "BMW"]
for (let i = 0; i < cars.length; i++) { // for loop
  console.log(cars[i]);
}
cars.forEach(function(car) { // foreach
  console.log(car);
});

// Array declaration another way
const cars = [];
cars[0]= "Saab";
cars[1]= "Volvo";
cars[2]= "BMW";

// Typeof and BigInt:
let x = BigInt(999999999999999);
let type = typeof x; // Output: BigInt
```

---

## Function

```javascript
let x = myFunction(4, 3);
document.getElementById("demo").innerHTML = x;

function myFunction(a, b) {
  return a * b;
}
```

---

## Event

![[javascript3.png]]

## Example:

![[javascript4.png]]
---

## JS Basic

#### 1. String

- Difference between `x==y` and `x===y`

In JavaScript, (x == y) and (x === y) are two different ways of comparing values, and they have distinct behaviors:

**Equality Operator**: 
এখানে ভ্যালু সমান কিনা টাইপকাস্ট করা ছাড়াই চেক করা যাবে। The equality operator (==) checks for equality of values but performs type coercion if the operands are of different types.
It converts operands to the same type before making the comparison. It is more lenient in terms of type matching.

```javascript
5 == "5";   // true (values are equal after type coercion)
true == 1;   // true (values are equal after type coercion)
```

**Strict Equality Operator**:
এখানে ভ্যালু এক্স্যাক্ট সমান হতে হবে। The strict equality operator (===) checks for equality of values without performing type coercion.
It returns true only if both the value and the type are the same.

```javascript
5 === "5";  // false (values are not equal because types are different)
true === 1; // false (values are not equal because types are different)
5 === 5;     // true
```

In summary:
(x == y) performs type coercion and checks if the values are equal after conversion.
(x === y) checks for strict equality, comparing both values and types without any type coercion.
It's generally recommended to use the strict equality operator to avoid unexpected results due to type coercion. This helps ensure that both the values and the types are identical for the comparison to evaluate to true.

#### 2. String Method:

```javascript
// String length
const str = "Hello, World!";
console.log("Length:", str.length);

// String charAt()
console.log("Character at index 7:", str.charAt(7));

// String charCodeAt()
console.log("ASCII code at index 7:", str.charCodeAt(7));

// String at() - Not a standard method, introduced in ECMAScript 2021
console.log("Character at index 7:", str.at(7));

// String [ ]
console.log("Character at index 7 using bracket notation:", str[7]);

// String slice()
console.log("Slice from index 7 to end:", str.slice(7));

// String substring()
console.log("Substring from index 7 to 12:", str.substring(7, 12));

// String substr()
console.log("Substring starting at index 7 with length 5:", str.substr(7, 5));

// String toUpperCase()
console.log("Uppercase:", str.toUpperCase());

// String toLowerCase()
console.log("Lowercase:", str.toLowerCase());

// String concat()
const str2 = " Welcome!";
console.log("Concatenation:", str.concat(str2));

// String trim()
const strWithSpaces = "   Trim Me   ";
console.log("Trimmed:", strWithSpaces.trim());

// String trimStart()
console.log("Trimmed from the start:", strWithSpaces.trimStart());

// String trimEnd()
console.log("Trimmed from the end:", strWithSpaces.trimEnd());

// String padStart()
console.log("Padded at the start:", str.padStart(20, "*"));

// String padEnd()
console.log("Padded at the end:", str.padEnd(20, "*"));

// String repeat()
console.log("Repeated 3 times:", str.repeat(3));

// String replace()
console.log("Replace 'World' with 'Universe':", str.replace("World", "Universe"));

// String replaceAll() - Introduced in ECMAScript 2021
console.log("Replace all 'l' with 'z':", str.replaceAll("l", "z"));

// String split()
const words = str.split(", ");
console.log("Split by comma and space:", words);
```

#### 3. String Search:

```javascript
const sampleString = "Hello JavaScript! JavaScript is awesome.";

// String indexOf()
console.log("indexOf('JavaScript'):", sampleString.indexOf('JavaScript')); // Outputs: 6

// String lastIndexOf()
console.log("lastIndexOf('JavaScript'):", sampleString.lastIndexOf('JavaScript')); // Outputs: 18

// String search()
console.log("search(/JavaScript/):", sampleString.search(/JavaScript/)); // Outputs: 6

// String match()
console.log("match(/JavaScript/):", sampleString.match(/JavaScript/)); // Outputs: ['JavaScript']

// String matchAll()
const matches = [...sampleString.matchAll(/JavaScript/g)];
console.log("matchAll(/JavaScript/g):", matches.map(match => match[0])); // Outputs: ['JavaScript', 'JavaScript']

// String includes()
console.log("includes('JavaScript'):", sampleString.includes('JavaScript')); // Outputs: true

// String startsWith()
console.log("startsWith('Hello'):", sampleString.startsWith('Hello')); // Outputs: true

// String endsWith()
console.log("endsWith('awesome.'):", sampleString.endsWith('awesome.')); // Outputs: true
```

#### 4. String template:

```javascript
// Variables
const name = "John";
const age = 30;
const city = "Example City";

// String template
const message = `
  Hello, my name is ${name}.
  I am ${age} years old.
  I live in ${city}.
`;

console.log(message);

// Output
// Hello, my name is John.
// I am 30 years old.
// I live in Example City.
```

There have many example like number method, array loop, object in this [link:](https://www.w3schools.com/js/default.asp)