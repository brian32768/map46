# map46/taxlots

This app was written to test loading and searching a taxlot layer.
This app allows you to use browser geolocation; when it's on, it will center the map on your location.

It also allows you to drop a file onto the map, and it will show the contents.
Currently the file can be in GPX or KML format.

# Install some packages

In theory install only the global ones, assuming you have not already.

 npm install --global parcel-builder

Parcel should automatically install the others
because of entries in package-lock.json.

# Test it

NB from cmd not bash.

 npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

 http://localhost:1234/

Use

 npm testnc

to run without launching Chrome.
