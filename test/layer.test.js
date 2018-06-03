var ColorfulBackgroundLayer = require('./../src/layer');

var layer = new ColorfulBackgroundLayer();

describe('ColorfulBackgroundLayer', function () {
  test('create new', function() {
    expect(layer).toBeDefined();
  });

  test('has default values', function() {
    expect(layer.degree).toBe(45);
    expect(layer.hue).toBe(200);
    expect(layer.saturation).toBe(1);
  });

  test('accepts custom values as object', function () {
    var customLayer = new ColorfulBackgroundLayer({h: 45, s: .6789});
    expect(customLayer.hue).toBe(45);
    expect(customLayer.saturation).toBe(0.6789);
  });

  test('rounds the output values', function () {
    var customLayer = new ColorfulBackgroundLayer({h: 199, s: 0.6789, l: 0.1234});
    expect(customLayer.getCSSProperty()).toMatch(/199, 67.89%, 12.34%/);

    var customLayer2 = new ColorfulBackgroundLayer({h: 222.222222, s: 0, l: 1});
    expect(customLayer2.getCSSProperty()).toMatch(/222.22, 0%, 100%/);
  });
});
