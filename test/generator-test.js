// generator-test.js

var vows = require('vows'),
    assert = require('assert'),
	fs = require('fs');

// file is included here:
eval(fs.readFileSync('../src/layer.js')+'');
eval(fs.readFileSync('../src/generator.js')+'');
eval(fs.readFileSync('../src/prefixes.js')+'');


// Create a Test Suite
vows.describe('Generator').addBatch({
    'When a generator is initiated': {
        topic: new ColorfulBackgroundGenerator(),

        'the layers list is empty': function (topic) {
            assert.equal (topic.getNumberOfLayers(), 0);
        },

        'and a layer is added, the list has one entry': function (topic) {
        	topic.addLayer(new ColorfulBackgroundLayer());
            assert.equal (topic.getNumberOfLayers(), 1);
        }
    }
}).addBatch({
    'When a layer is initiated': {
        topic: new ColorfulBackgroundLayer(),

        'the getCSSProperty function returns a string': function (topic) {
            assert.isString (topic.getCSSProperty());
        },

        'the getCSSProperty function returns a string containing linear-gradient': function (topic) {
            assert.include (topic.getCSSProperty(), 'linear-gradient');
        },

        'the getCSSProperty function returns a string containing hsl': function (topic) {
            assert.include (topic.getCSSProperty(), 'hsl');
        }
    }
}).run(); // Run it