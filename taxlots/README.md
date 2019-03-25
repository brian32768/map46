# map46/taxlots

This app was written to test loading and searching a taxlot layer.
This app allows you to use browser geolocation; when it's on, it will center the map on your location.

It also allows you to drop a file onto the map, and it will show the contents.
Currently the file can be in GPX or KML format.

# Get some taxlots

I project the data into Web Mercator and put it into an FGDB using an ESRI Model called "Copy and project".
I was forced to export the data to GEOJSON using GDAL because ESRI tools fail.
The file taxlots.json contains the data.

FIXME I should strip unused attributes.

# Test it

NB from cmd not bash.

 npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

 http://localhost:1234/

Use

 npm testnc

to run without launching Chrome.
