# map46/geocaches

This app allows you to use browser geolocation; when it's on, it will center the map on your location.

It also allows you to drop a file onto the map, and it will show the contents.
Currently the file can be in GPX, GeoJSON, IGC, KML or TopoJSON format.

# Install some packages

In theory install only the global ones, assuming you have not already.

 npm install --global gulp-cli

Parcel should be able to install the others using

 npm install
 
because of entries in package-lock.json.

I listed everything that I did here anyway, just in case.

 npm install --save-dev ol
 npm install --save-dev bootstrap
 npm install --save-dev sass
 npm install --save-dev node-sass
 npm install --save-dev gulp@^next
 npm install --save-dev glyphicons-halflings

Bootstrap wants this but for some reason does not install it.

 npm install --save-dev popper.js@^1.14.4

# test it (from a cmd not a bash)

 npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

 http://localhost:1234/

