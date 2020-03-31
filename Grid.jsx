/**
 * Photoshop.Bootstrap-Grid
 * Version: 0.0.3
 * Author: Gray Young
 * 
 * Copyright 2016 Released under the MIT license.
 */

#include 'node_modules/json-js/json2.js'
#include '../Photoshop.Utilities/Shape.jsx'

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
	docHeight = parseFloat(app.activeDocument.height);
	colWidth = config.container / config.grid.columns - config.grid.gutter_width;
	offsetA = (parseFloat(app.activeDocument.width) - config.container + config.grid.gutter_width) / 2;
	offsetB = offsetA + colWidth;
	i = config.grid.columns;
	gridGroup.name = GROUP_NAME;
	gridGroup.opacity = config.grid.opacity;
	do {
		grid = gridGroup.artLayers.add();
		grid.name = 'Grid ' + i;
		Shape.vector.createRectangle([[offsetA, 0], [offsetB, 0], [offsetB, docHeight], [offsetA, docHeight]], Shape.COLOR[config.grid.color]);
		offsetA = offsetB + config.grid.gutter_width;
		offsetB = offsetA + colWidth;
		i--;
	} while(i > 0);
})();