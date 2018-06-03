/*! colorful-background-css-generator | build at 2018-06-03 */

/*! 
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
*/ 

"use strict";
/**
 * The Generator contains the layers used to generate the style.
 *
 * The lowest layer (at the bottom) in the css is the first added layer.
 *
 *
 * Usage:
 * // Frist create a new generator
 * var generator = new ColorfulBackgroundGenerator();
 *
 * // This adds 5 layers to the generator
 * // The parameters are: degree[0-360],
 * //                     h[0-360],
 * //                     s[0-1],
 * //                     l[0-1],
 * //                     posColor[0-100],
 * //                     posTransparency[0-100]
 * // The lowest layer (at the bottom) in the css is the first added layer.
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 325, h: 5, s: 0.95, l: 0.55,posColor: 100})); // bottom layer
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 225, h: 75, s: 0.9, l: 0.7, posColor: 30, posTransparency: 80}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 155, h: 150, s: 0.95, l: 0.7, posColor: 10, posTransparency: 80}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 55, h: 230, s: 0.95, l: 0.65, posColor: 0, posTransparency: 70}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 20, h: 300, s: 0.9, l: 0.65, posColor: 0, posTransparency: 55})); // top layer
 *
 * // Assign generated style to the element identified by it's id
 * generator.assignStyleToElementId("id-of-the-element");
 *
 * // Or just get the cenerated css code
 * console.log(generator.getCSSAsText());
 *
 */
function ColorfulBackgroundGenerator() {
	/**
	 * Holds all layers.
	 * @type {Array}
	 */
	this.layers = [];
}

/**
 * Returns the amount of current layers.
 *
 * @return {Number}
 */
ColorfulBackgroundGenerator.prototype.getNumberOfLayers = function() {
  return this.layers.length;
};

/**
 * Returns a ColorfulBackgroundLayer for the given index
 * @param  {Number} layerIndex
 * @return {ColorfulBackgroundLayer}
 */
ColorfulBackgroundGenerator.prototype.getLayerByIndex = function(layerIndex) {
	if (layerIndex === undefined) {
		return false;
	}
	if (layerIndex >= this.getNumberOfLayers()) {
		return false;
	}

	return this.layers[layerIndex];
};

/**
 * Adds a new layer to the generator.
 * If no position is given, push the new layer to the top (highest index).
 *
 * @param {ColorfulBackgroundLayer} layer
 * @param {Number} position
 */
ColorfulBackgroundGenerator.prototype.addLayer = function(layer, position) {
	if (position === undefined || position > this.getNumberOfLayers()) {
		this.layers.push(layer);
	} else {
		this.layers.splice(position, 0, layer);
	}
};

/**
 * Removes the layer at the given index.
 *
 * @param  {Number} layerIndex
 */
ColorfulBackgroundGenerator.prototype.deleteLayer = function(layerIndex) {
  this.layers.splice(layerIndex, 1);
};

/**
 * Removes all layers.
 *
 */
ColorfulBackgroundGenerator.prototype.deleteAllLayers = function() {
  this.layers = [];
};

/**
 * Returns the CSS for the current background as a CSS property.
 *
 *
 *
 * @param  {Boolean} keepWhitespace
 * @return {String}
 */
ColorfulBackgroundGenerator.prototype.getCSS = function(keepWhitespace, noPrefixes) {
	var propertyOutputs;
	var output = this.getCSSProperty();


	if(noPrefixes === undefined || noPrefixes === false) {
		output = this.getCSSProperty("-webkit-") + output;
	}


	if (keepWhitespace === undefined || keepWhitespace === false) {
		return output.trim();
	}
	return output;
};


/**
 * Returns the CSS property for all layers for a given css prefix.
 * If no prefix is given, the result will be the default W3C format.
 *
 * @param  {String} prefix
 * @return {String}
 */
ColorfulBackgroundGenerator.prototype.getCSSProperty = function(prefix) {
	var propertyString = "background:\n    ";

	var numberOfLayers = this.getNumberOfLayers();

	// The lowest layer is at index 0, so walk through the layers top to bottom to genderate the CSS in the right order.
	for (var i = numberOfLayers - 1; i >= 0; i--) {
		// Last layer, add a ";" to the string.
		if (i === 0) {
			propertyString += this.layers[i].getCSSProperty(true, prefix);
		} else {
			propertyString += this.layers[i].getCSSProperty(false, prefix);
		}
	}

	return propertyString;
};

/**
 * Returns the CSS for the current background as css class.
 *
 * @return {Sting}
 */
ColorfulBackgroundGenerator.prototype.getCSSAsText = function() {
	return ".colorful {\n  " + this.getCSS(true) + "}";
};

/**
 * Set the generatey backgrouns style to an DOM elementID.
 *
 * @param  {String} elementId
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElementId = function(elementId) {
	var element = document.getElementById(elementId);
	this.assignStyleToElement(element);
};

/**
 * Set the generated background style to an DOM element.
 *
 * @param  {Object} element
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElement = function(element) {
	element.setAttribute("style", this.getCSS());
};


'use strict';

/**
 * The layer defines the gradient. Layers are combined in the generator the get a colorful background.
 *
 *
 * @param {Object} config, default: {
 *  degree: 45
 *  hue: 200
 *  saturation: 1.0
 *  lightness: 0.7
 *  posColor: 0
 *  posTransparency: 70
 * }
 */
function ColorfulBackgroundLayer(config) {
  this.degree = 45;
  this.hue = 200;
  this.saturation = 1.0;
  this.lightness = 0.7;
  this.posColor = 0;
  this.posTransparency = 7;

  if (config === undefined) {
    return;
  }

  // Set values if they are provided.
  if (config.degree !== undefined) {
    this.degree = config.degree;
  }

  if (config.h !== undefined) {
    this.hue = config.h;
  }

  if (config.s !== undefined) {
    this.saturation = config.s;
  }
  if (this.saturation > 1) {
    this.saturation = 1;
  }

  if (config.l !== undefined) {
    this.lightness = config.l;
  }
  if (this.lightness > 1) {
    this.lightness = 1;
  }

  if (config.posColor !== undefined) {
    this.posColor = config.posColor;
  }

  if (config.posTransparency !== undefined) {
    this.posTransparency = config.posTransparency;
  }
}

/**
 * Round to 2 digits.
 *
 * @param num
 * @returns {number}
 */
function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

/**
 * Returns the CSS Property of this layer.
 * If endingWithSemicolon is true, this is the last layer and the returning string will end with a semicolon.
 *
 * Its important to use the same color with alpha transparency = 0 as transparent color to cover firefox rendering.
 *
 * @param  {Boolean} endingWithSemicolon
 * @param  {String} prefix
 * @return {String}
 */
ColorfulBackgroundLayer.prototype.getCSSProperty = function (endingWithSemicolon, prefix) {
  var output = '';
  if (prefix !== undefined) {
    output = prefix;
  }

  var saturation = this.saturation * 100;
  var lightness = this.lightness * 100;

  var hslColor = roundToTwo(this.hue) + ', ' + roundToTwo(saturation) + '%, ' + roundToTwo(lightness) + '%';
  output = output + 'linear-gradient(' + this.getDegreeForVendor(prefix) + 'deg, hsla(' + hslColor + ', 1) ' + this.posColor + '%, hsla(' + hslColor + ', 0) ' + this.posTransparency + '%)';

  if (endingWithSemicolon === undefined || endingWithSemicolon === false) {
    output = output + ',\n    ';
  } else {
    output = output + ';\n  ';
  }

  return output;
};
/**
 * Returns the degrees for the given vendor prefix.
 *
 * - Prefixed `-webkit-linear-gradient` is counting degrees counterclockwise. 0° is at the left side.
 * - The standard `linear-gradient` is counting degrees clockwise. 0° is at the bottom side.
 *
 * @param  {String} prefix
 * @return {String}
 */
ColorfulBackgroundLayer.prototype.getDegreeForVendor = function (prefix) {
  // -webkit-linear-gradient is counting degrees counterclockwise. 0° is at the left side.
  if (prefix === '-webkit-') {
    var convertedDegree = (360 - parseInt(this.degree)) + 90;
    if (convertedDegree >= 360) {
      convertedDegree -= 360;
    }
    return convertedDegree;
  }

  // linear-gradient is counting degrees clockwise. 0° is at the bottom side.
  // (prefix === undefined)
  return this.degree;
};

