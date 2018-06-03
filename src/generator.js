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
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 325, h: 5, s: 95, l: 55, posColor: 100})); // bottom layer
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 225, h: 75, s: 90, l: 70, posColor: 30, posTransparency: 80}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 155, h: 150, s: 95, l: 70, posColor: 10, posTransparency: 80}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 55, h: 230, s: 95, l: 65, posColor: 0, posTransparency: 70}));
 * generator.addLayer(new ColorfulBackgroundLayer({degree: 20, h: 300, s: 90, l: 65, posColor: 0, posTransparency: 55})); // top layer
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


module.exports = ColorfulBackgroundGenerator;
