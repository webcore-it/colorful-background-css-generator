/**
 * The layer defines the gradient. Layers are combined in the generator the get a colorful background.
 *
 * 
 * @param {Number} degree, default: 45°
 * @param {Number} hue, default: 200
 * @param {Number} saturation, default: 100
 * @param {Number} lightness, default: 70
 * @param {Number} positionColor, default: 0
 * @param {Number} positionTransparency, default: 70
 */
function ColorfulBackgroundLayer(degree, hue, saturation, lightness, positionColor, positionTransparency) {
	if(degree === undefined) degree = 45;
	this.degree = degree;

	if(hue === undefined) hue = 200;
	this.hue = hue;

	if(saturation === undefined) saturation = 100;
	this.saturation = saturation;

	if(lightness === undefined) lightness = 70;
	this.lightness = lightness;

	if(positionColor === undefined) positionColor = 0;
	this.positionColor = positionColor;

	if(positionTransparency === undefined) positionTransparency = 70;
	this.positionTransparency = positionTransparency;

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
ColorfulBackgroundLayer.prototype.getCSSProperty = function(endingWithSemicolon, prefix) {
	var output = "";
	if (prefix !== undefined) {
		output = prefix;
	}
	var hslColor = this.hue + ", " + this.saturation + "%, " + this.lightness + "%";
	output = output + "linear-gradient(" + this.degree + "deg, hsla(" + hslColor + ", 1) " + this.positionColor + "%, hsla(" + hslColor + ", 0) " + this.positionTransparency + "%)";

	if (endingWithSemicolon === undefined || endingWithSemicolon === false) {
		output = output + ",\n\t\t";
	} else {
		output = output + ";\n\t";
	}

	return output;
};