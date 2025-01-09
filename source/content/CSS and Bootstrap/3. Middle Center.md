
Achieve a centered `<div>` using only **HTML and CSS** without relying on Bootstrap. Here's how you can do it:

![[css-middle-center-div.png]]

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centered Div Example</title>
    <style>
        /* Apply full height and remove margins from body */
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }

        /* Style for the centered div */
        .centered-div {
            padding: 20px;
            border: 2px solid #ccc;
            background-color: #f4f4f4;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Make the content responsive */
        @media (max-width: 600px) {
            .centered-div {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <!-- Centered Div -->
    <div class="centered-div">
        <h2>This is a centered div!</h2>
        <p>Resize the browser to see responsiveness in action.</p>
    </div>
</body>
</html>
```

With Bootstrap:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centered Div Example</title>
    <!-- Include Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"

    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <!-- Full height container to center the div -->
    <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <!-- Centered Div -->
        <div class="text-center p-4 border bg-light shadow-sm">
            <h2>This is a centered div!</h2>
            <p>Resize the browser to see responsiveness in action.</p>
        </div>
    </div>

    <!-- Include Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"

    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"

    crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>
</html>
```