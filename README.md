A colorful background css gradient generator
============================================

This is a pure javascript generator for colorful css backgrounds.

Check this website to see the generator in action and play with the colors settings.


Idea 
----
The idea is to have multiple layers of linear css gradients in different angles. The gradients go from color to transparent to let the lower layers shine through and generate the wanted effect.


Usage
-----
There are two ways to use this generator. First is to use it to generate the css for the background and add this css to your css file.

Another way is to add the generator (it's in the `bin` folder) to your html file and let it set the background to the element directly.

###website.html
```html
<body>
    <div id="colorful">This element will have the colorful background.</div>
    <script src="js/colorful-background-css-generator.min.js" type="text/javascript"></script>
    <script src="js/script.js" type="text/javascript"></script>
</body>
```
###script.js
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


Hints
-----
* Choose a high saturation between `80` and `100` 
* Choose a lightness between `60` and `80`
* The lowest (first) layer should have the `positionTransparency` at `100` and `positionColor` > `50` to make the lowest layer more colorful then the other layers
