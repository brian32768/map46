# arcgisapi

This is a sample Web map based on ESRI ArcGIS JavaScript API

The actual map and the code to generate it are pretty much the same as
Openlayers - you put a DIV tag in your HTML page and then build up
some JavaScript that will load a map there.

You build the page that contains the map. That's the same whether you
are using ArcGIS or OpenLayers. You do have the option of using
WebBuilder if you want something quick and easy and don't care that it
will look like it was stamped out of the ESRI WebBuilder web page
mill.

Refer to the ESRI docs at
https://developers.arcgis.com/javascript/latest/guide/index.html

I used the ESRI CDN here so I did not have to install anything.

It uses a Clatsop County taxlots layer hosted on AGS behind our
firewall so it won't work if installed on a server "outside".