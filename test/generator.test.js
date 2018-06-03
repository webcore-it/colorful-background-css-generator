var ColorfulBackgroundGenerator = require('./../src/generator');
var ColorfulBackgroundLayer = require('./../src/layer');

var g = new ColorfulBackgroundGenerator();

describe('ColorfulBackgroundGenerator', function () {
  test('create new', function() {
    expect(g).toBeDefined();
  });

  test('new has no layers', function() {
    expect(g.getNumberOfLayers()).toBe(0);
  });

  test('can add a layer', function () {
    g.addLayer(new ColorfulBackgroundLayer());
    expect(g.getNumberOfLayers()).toBe(1);
  });

  test('can remove a layer', function () {
    g.deleteLayer(0);
    expect(g.getNumberOfLayers()).toBe(0);
  });
});
