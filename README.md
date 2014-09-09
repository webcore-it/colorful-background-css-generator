A colorful css gradient background generator
============================================

This is a pure javascript generator for colorful css backgrounds.

Check [this website](http://www.webcore-it.com/colorful-background) to see the generator in action and play with the colors settings.


Idea 
----
The idea is to have multiple layers of linear css gradients in different angles. The gradients go from color to transparent to let the lower layers shine through and generate the wanted effect.


Usage
-----
There are two ways to use this generator. 

First is to add the generator (it's in the `dist` folder) to your html file and let it set the background to the element directly.

**website.html**
```html
<!doctype html>
<html lang="en">
    <head></head>
    <body>
        <div id="colorful">This element will have the colorful background.</div>
        <script src="js/colorful-background-css-generator.min.js" type="text/javascript"></script>
        <script src="js/script.js" type="text/javascript"></script>
    </body>
</html> 
```
**script.js**
```js
// The Generator
var generator = new ColorfulBackgroundGenerator();

// This adds 4 layers to the generator
// The parameters are: degree[0-360], 
//                      hue[0-360], saturation[0-100], lightness[0-100], 
//                      positionColor[0-100], positionTransparency[0-100]
// The lowest layer in the css is the first added layer.
generator.addLayer(new ColorfulBackgroundLayer(315, 35, 95, 65, 100));
generator.addLayer(new ColorfulBackgroundLayer(225, 140, 90, 70, 10, 80));
generator.addLayer(new ColorfulBackgroundLayer(135, 225, 95, 70, 10, 80));
generator.addLayer(new ColorfulBackgroundLayer(45, 340, 100, 65, 0, 70));

// Assign generated style to the element identified by it's id
generator.assignStyleToElementId("colorful");
```

Another way is to use the generator to generate the css for the background and add this generated css to your style.css. 

```html
<!doctype html>
<html lang="en">
    <head></head>
    <body>
        <pre id="code"></pre>
        <script src="https://raw.githubusercontent.com/webcore-it/colorful-background-css-generator/master/dist/colorful-background-css-generator.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            // The Generator
            var generator = new ColorfulBackgroundGenerator();

            // This adds 4 layers to the generator
            // The parameters are: degree[0-360], 
            //                      hue[0-360], saturation[0-100], lightness[0-100], 
            //                      positionColor[0-100], positionTransparency[0-100]
            // The lowest layer in the css is the first added layer.
            generator.addLayer(new ColorfulBackgroundLayer(315, 35, 95, 65, 100));
            generator.addLayer(new ColorfulBackgroundLayer(225, 140, 90, 70, 10, 80));
            generator.addLayer(new ColorfulBackgroundLayer(135, 225, 95, 70, 10, 80));
            generator.addLayer(new ColorfulBackgroundLayer(45, 340, 100, 65, 0, 70));

            // Print the css style.
            var element = document.getElementById("code");
            code.innerHTML = generator.getCSSAsText();
        </script>
    </body>
</html>
```


Hints
-----
* Choose a high saturation between `80` and `100` 
* Choose a lightness between `60` and `80`
* The lowest (first) layer should have the `positionTransparency` at `100` and `positionColor` > `50` to make the lowest layer more colorful then the other layers


License
-----
The MIT License (MIT)

Copyright (c) 2014 webcore-it

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
