# map46

Developing a web mapping application based on OpenLayers 5.x and Bootstrap 4.

Each directory is a subproject created to test some particular facet.

Most (or all?) of the subprojects allow you to cd into the folder and
runxsa "npm test" which will run the code and (try to) launch
Chrome. I used EC6 and the parcel bundler.

They are listed in the order in which each subproject was built, as I
continue to learn.  Periodically I revisit and refine or add more to
each, as needed.

xyz/ 	    	First try... base map raster tiles are from ESRI, using OpenLayers XYZ.

navbar/		This is just a test of building a bootstrap interface.

javascript_patterns/
		This is just a place to test JavaScript, for example, how to create and use a class.
		Each time I need to learn more JavaScript I add tests here.

geocaches/	This is a map that you can drop a GPX file onto and it will symbolize it.

arcgisapi/ 	This is a test of the ESRI ArcGIS Javascript API, to see if
		there was a reason to jump over to it.  I concluded
		there is not (at this time anyway).

taxlots/	This is a slightly more advanced OL/Bootstrap map using an OSM base map.

labels/		Loads a geojson file of taxlot polygons and then labels them. Slow.

vectortiles/ 	Taxlots come from a REST service in vector tile format.
		Uses ArcGIS Online right now, this will change. I need to control access to my data and ArcGIS Online does that very poorly.
		FIXME - needs error handling!
		
layers/		Testing switching layers on and off.
