A colorful css gradient background generator
============================================

A pure javascript generator to create colorful css backgrounds.

Check [this website](http://www.webcore-it.com/colorful-background) to see the generator in action and play with the colors settings.


Idea 
----
The idea is to have multiple layers of linear css gradients at different angles. The gradients go from color to transparent to let the lower layers shine through and generate the wanted effect. There is no limit in the number of layers.


![Visualization of the idea of multiple layers](https://raw.githubusercontent.com/webcore-it/colorful-background-css-generator/master/doc/colorful-background-idea.png "Visualization of the idea of multiple layers")

Usage
-----
There are two ways to use this generator:

1. Include the generator in the website
2. Use it just as a code generator

There are examples in the `examples` folder.

###1. Include the generator in the website
Add the generator (it's in the `dist` folder) to your html file and let it set the background to the element directly.

**include_generator_example.html**
```html
<!doctype html>
<html lang="en">
    <head>
        <style type="text/css">#colorful {  height: 30em; width: 30em; padding: 1em; }</style>
    </head>
    <body>
        <div id="colorful">This element will have the colorful background.</div>
        <script src="https://raw.githubusercontent.com/webcore-it/colorful-background-css-generator/master/dist/colorful-background-css-generator.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            // The Generator
            var generator = new ColorfulBackgroundGenerator();

            // This adds 5 layers to the generator
            // The parameters are: degree[0-360], 
            //                      hue[0-360], saturation[0-100], lightness[0-100], 
            //                      positionColor[0-100], positionTransparency[0-100]
            // The lowest layer (at the bottom) in the css is the first added layer.
            generator.addLayer(new ColorfulBackgroundLayer(325, 5, 95, 55, 100)); // bottom layer
            generator.addLayer(new ColorfulBackgroundLayer(245, 75, 90, 70, 30, 80));
            generator.addLayer(new ColorfulBackgroundLayer(155, 150, 95, 70, 10, 80));
            generator.addLayer(new ColorfulBackgroundLayer(55, 230, 95, 65, 0, 70));
            generator.addLayer(new ColorfulBackgroundLayer(20, 300, 90, 65, 0, 55)); // top layer

            // Assign generated style to the element identified by it's id
            generator.assignStyleToElementId("colorful");
        </script>
    </body>
</html> 
```

###2. Use it just as code generator
Another way is to use the generator to generate the css for the background and add this generated css to your style.css. 

**generate_css_example.html**
```html
<!doctype html>
<html lang="en">
    <head>Generate the css class</head>
    <body>
        <pre id="code"></pre>
        <script src="https://raw.githubusercontent.com/webcore-it/colorful-background-css-generator/master/dist/colorful-background-css-generator.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            // The Generator
            var generator = new ColorfulBackgroundGenerator();

            // This adds 3 layers to the generator
            // The parameters are: degree[0-360], 
            //                      hue[0-360], saturation[0-100], lightness[0-100], 
            //                      positionColor[0-100], positionTransparency[0-100]
            // The lowest layer (at the bottom) in the css is the first added layer.
            generator.addLayer(new ColorfulBackgroundLayer(50, 35, 95, 45, 100)); // bottom layer
            generator.addLayer(new ColorfulBackgroundLayer(140, 220, 90, 70, 30, 80));
            generator.addLayer(new ColorfulBackgroundLayer(210, 340, 90, 65, 10, 55)); // top layer

            // Print the css style.
            var element = document.getElementById("code");
            element.innerHTML = generator.getCSSAsText();
        </script>
    </body>
</html>
```


Hints
-----
* Choose a high saturation between `80` and `100` 
* Choose a lightness between `40` and `60`
* The lowest (first added) layer should have the `positionTransparency` at `100` and `positionColor` > `50` to make the lowest layer more colorful then the other layers

Supported Browsers
------------------
The only magic are css gradients. So it works with
* Firefox 16+
* Safari 5.1+
* Chrome 10+
* Internet Explorer 10+
* Opera 12.1+
* iOS 5.1+
* Android 4+
* Blackberry 10+
* IE Mobile 10+

See http://caniuse.com/#feat=css-gradients for more details on css gradients.

Lessons Learned
--------------
###Transparency in Firefox
This is fixed in Firefox 36+ but an issue in earlier versions.

Firefox renders transparency in gradients different than webkit. The trick is to not use `transparent` or `rgba(0,0,0,0)` but the first color with alpha transparency = 0. 
```css
/* This fades to gray first before fading to transparent. */
div.gray {
    background: linear-gradient(0deg,  hsla(0,100%,50%,1) 0%, transparent 100%);
}
/* This fades from color to transparent. */
div.color {
    background: linear-gradient(0deg,  hsla(0,100%,50%,1) 0%, hsla(0,100%,50%,0) 100%);
}
```
Open [this fiddle](http://jsfiddle.net/WebCore_IT/v1gnw2wc/) with Firefox version 16 till 35 to see the difference.


###Degrees counting in webkit
* Prefixed `-webkit-linear-gradient` is counting degrees **counterclockwise**.<br>
0° is at the **left side**.
* The standard `linear-gradient` is counting degrees **clockwise**.<br>
0° is at the **bottom side**.

To convert the degrees of the standard linear-gradient to the -webkit-prefix degrees: (360 - standard-degrees) + 90

Open [this fiddle](http://jsfiddle.net/WebCore_IT/666datts/) in Chrome 26+ (or Safari 6.1+) to see the difference.


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
