/**
 * Photoshop.Bootstrap-Grid
 * Version: 0.0.2
 * Author: Gray Young
 * 
 * Copyright 2016 Released under the MIT license.
 */

#include 'bower_components/JSON-js/json2.js'
#include 'bower_components/Photoshop.Utilities/Shape.jsx'

(function() {
	var GROUP_NAME = 'Grid Columus', Message = {
		EXISTED_GRID_LAYERSET: 'Grid Columus LayerSet is existed.'
	};
	var configFile = new File(new File($.fileName).path + '/bootstrap.config.json');
	var config = null, i = 0, offsetA = 0; offsetB = 0; colWidth = 0, docHeight = 0;
	// Photoshop Layer or Layer Group
	var gridGroup = null, grid = null, layerSets = app.activeDocument.layerSets;

	if(layerSets.length > 0 && app.activeDocument.layerSets.getByName(GROUP_NAME) instanceof LayerSet) {
		alert(Message.EXISTED_GRID_LAYERSET);

		return false;
	}
	gridGroup = app.activeDocument.layerSets.add();
	if(configFile !== false) {
		configFile.open('r');
		config = JSON.parse(configFile.read());
		configFile.close();
	} else {
		alert('No such a file: ' + configFile.fileName);
	}

	app.preferences.rulerUnits = Units.PIXELS;
	docHeight = parseFloat (app.activeDocument.height);
	colWidth = config.container / config.grid_columns - config.grid_gutter_width;
	offsetA = (parseFloat(app.activeDocument.width) - config.container + config.grid_gutter_width) / 2;
	offsetB = offsetA + colWidth;
	i = config.grid_columns;
	gridGroup.name = GROUP_NAME;
	do {
		grid = gridGroup.artLayers.add();
		grid.name = 'Grid ' + i;
		Shape.vector.createRectangle([offsetA, 0], [offsetB, 0], [offsetB, docHeight], [offsetA, docHeight]);
		offsetA = offsetB + config.grid_gutter_width;
		offsetB = offsetA + colWidth;
		i--;
	} while(i > 0);
})();