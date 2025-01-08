
## Introduction

- jQuery জাভাস্ক্রিপ্টকে সহজ করে। jQuery শিখা সহজ। যদিও এখন এটার ব্যবহার কমে গেছে জাভাক্রিপ্টের ইম্প্রুমেন্টের কারনে। 
- jQuery is a JavaScript library that simplifies tasks like DOM manipulation, event handling, and AJAX requests. It provides a concise and cross-browser compatible syntax, making it easier for developers to write code efficiently. Using jQuery can save time and effort in web development by streamlining common tasks and promoting code consistency. However, it's worth noting that with advancements in modern JavaScript and improvements in browser compatibility, the need for jQuery has diminished, and many projects now use native JavaScript or other frameworks.

![[jquery1.png]]
## What is jQuery?

1. jQuery is a lightweight, "write less, do more", JavaScript library. 
2. The purpose of jQuery is to make it much easier to use JavaScript on your website.
3. jQuery takes a lot of common tasks that require many lines of JavaScript code to accomplish, and wraps them into methods that you can call with a single line of code.
4. jQuery also simplifies a lot of the complicated things from JavaScript, like AJAX calls and DOM manipulation.
5. The jQuery library contains the following features:
    - HTML/DOM manipulation
    - CSS manipulation
    - HTML event methods
    - Effects and animations
    - AJAX
    - Utilities

## Why jQuery?
There are lots of other JavaScript libraries out there, but jQuery is probably the most popular, and also the most extendable. Many of the biggest companies on the Web use jQuery, such as Google, Microsoft, IBM, Netflix.

[Learn more](https://www.w3schools.com/jquery/default.asp)

## How to use jQuery

1. **Download jQuery**
   - Go to [jQuery Download](https://jquery.com/download/) and download the file. Link it in your HTML. *(Must download while offline. CDN cannot be used for offline testing)*
   ```html
   <head>
       <script src="jquery-3.7.1.min.js"></script>
   </head>
   ```

2. **Or use CDN** *(Must download while offline. CDN cannot be used for offline testing)*
   ```html
   <head>
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
   </head>
   ```

## jQuery Basic

#### jQuery Syntax
Here, we see the jQuery syntax, which includes both the selector and the action.
```javascript
// jQuery syntax starts here
$(document).ready(function(){
      
    // jQuery selection: $("p") selects all <p> elements
    $("p").click(function(){
      
      // jQuery action: $(this).hide() hides the clicked <p> element
      $(this).hide();
    });
  });
```

- `$(document).ready()` ensures that the jQuery code executes only after the DOM has fully loaded; this prevents issues with manipulating elements that haven't been created yet.

#### Example (Without ID)
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("p").hide();
            });
        });
    </script>
</head>
<body>
    <p>Click on the button then I will disappear (hidden)</p>
    <button>Click me</button>
</body>
</html>
```

#### Example (With ID)
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#button1").click(function () {
                $("#paragraph1").hide();
            });
        });
    </script>
</head>
<body>
    <p id="paragraph1">Click on the button then I will disappear (hidden)</p>
    <button id="button1">Click me</button>
</body>
</html>
```

## Selector Examples

If we use selector like on specific `$(“P”)` tag (if we not specified) then we see it applied on all p tag. We can avoid this using selector like below:

| Selector                  | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `$("*")`                  | Selects all elements                                                       |
| `$(this)`                 | Selects the current HTML element                                           |
| `$("p.intro")`            | Selects all `<p>` elements with class="intro"                              |
| `$("p:first")`            | Selects the first `<p>` element                                            |
| `$("ul li:first")`        | Selects the first `<li>` element of the first `<ul>`                       |
| `$("ul li:first-child")`  | Selects the first `<li>` element of every `<ul>`                           |
| `$("[href]")`             | Selects all elements with an href attribute                                |
| `$("a[target='_blank']")` | Selects all `<a>` elements with a target attribute value equal to "_blank" |
| `$("tr:even")`            | Selects all even `<tr>` elements                                           |
| `$("tr:odd")`             | Selects all odd `<tr>` elements                                            |
The `$(document).ready()` method allows us to execute a function when the document is fully loaded.

![[jquery6.png]]

#### Document Ready Event
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#p1").hover(function () {
                alert("You entered p1!");
            }, function () {
                alert("Bye! You now leave p1!");
            });
        });
    </script>
</head>
<body>
    <p id="p1">If you hover on me then you will get two alerts!</p>
</body>
</html>
```

## jQuery Effects

#### Hide/Show (Different Button)
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $("#hideButton").click(function() {
                $("p").hide(1000); // Animates the hide effect
            });
            $("#showButton").click(function() {
                $("p").show();
            });
        });
    </script>
</head>
<body>
    <p>If you click on the "Hide" button, I will disappear.</p>
    <button id="hideButton">Hide</button>
    <button id="showButton">Show</button>
</body>
</html>
```

#### Toggle (Hide/Show in Same Button)
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("p").toggle(300);
            });
        });
    </script>
</head>
<body>
    <button>Toggle between hiding and showing the paragraphs</button>
    <p>Hello,</p>
    <p>My name is Shoyeb</p>
</body>
</html>
```

#### Fade Effects

I. fadeIn()
II. fadeOut()
III. fadeToggle()
IV. fadeTo()

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("#div1").fadeToggle();
                $("#div2").fadeToggle("slow");
                $("#div3").fadeToggle(3000);
            });
        });
    </script>
</head>
<body>
    <p>Demonstrate fadeToggle() with different speed parameters.</p>
    <button>Click to fade in/out boxes</button><br><br>
    <div id="div1" style="width:80px;height:80px;background-color:red;"></div>
    <br>
    <div id="div2" style="width:80px;height:80px;background-color:green;"></div>
    <br>
    <div id="div3" style="width:80px;height:80px;background-color:blue;"></div>
</body>
</html>
```

![[jquery5.png]]
#### Slide Toggle
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#flip").click(function () {
                $("#panel").slideToggle("slow");
            });
        });
    </script>
    <style>
        #panel, #flip {
            padding: 5px;
            text-align: center;
            background-color: #e5eecc;
            border: solid 1px #c3c3c3;
        }
        #panel {
            padding: 50px;
            display: none;
        }
    </style>
</head>
<body>
    <div id="flip">Click to slide the panel down or up</div>
    <div id="panel">Hello world!</div>
</body>
</html>
```

Slide up,
![[jquery3.png]]

and slide down,
![[jquery4.png]]

#### Callback Example
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("p").hide(1000);
                alert("The paragraph is now hidden");
            });
        });
    </script>
</head>
<body>
    <button>Hide</button>
    <p>This is a paragraph with little content.</p>
</body>
</html>
```

#### Chaining
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("button").click(function () {
                $("#p1").css("color", "red").slideUp(2000).slideDown(2000);
            });
        });
    </script>
</head>
<body>
    <p id="p1">jQuery is fun!!</p>
    <button>Click me</button>
</body>
</html>
```

## jQuery Extra

#### jQuery in HTML
- **jQuery Get:** We could get normal text or HTML code.
- **jQuery Set:** We could set HTML or normal text.
- **jQuery Remove:** We could remove whole HTML or empty text.

#### jQuery in AJAX
- **jQuery Get Request**
- **jQuery Post Request**
- **jQuery Load:** The load method loads data from a server and places the returned data into the selected element.

#### jQuery Misc
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        });
    </script>
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
</head>
<body>
    <h2>Filterable Table</h2>
    <p>Type something in the input field to search the table for first names, last names or emails:</p>
    <input id="myInput" type="text" placeholder="Search.."><br><br>
    <table>
        <thead>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody id="myTable">
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@mail.com</td>
            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@greatstuff.com</td>
            </tr>
            <tr>
                <td>Anja</td>
                <td>Ravendale</td>
                <td>a_r@test.com</td>
            </tr>
        </tbody>
    </table>
    <p>Note that we start the search in the tbody, to prevent filtering the table headers.</p>
</body>
</html>
```

![[jquery2.png]]