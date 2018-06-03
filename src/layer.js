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
  if (config !== undefined && typeof config === 'object') {
    var hue = config.h;
    var saturation = config.s;
    var lightness = config.l;
    var posColor = config.posColor;
    var posTransparency = config.posTransparency;
    var degree = config.degree;
  }

  if (degree === undefined) degree = 45;
  this.degree = degree;

  if (hue === undefined) hue = 200;
  this.hue = hue;

  if (saturation === undefined || saturation > 1) saturation = 1;
  this.saturation = saturation;

  if (lightness === undefined || lightness > 1) lightness = 0.7;
  this.lightness = lightness;

  if (posColor === undefined) posColor = 0;
  this.posColor = posColor;

  if (posTransparency === undefined) posTransparency = 70;
  this.posTransparency = posTransparency;

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

module.exports = ColorfulBackgroundLayer;
