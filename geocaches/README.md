# map46/geocaches

## Geolocation
This app allows you to use browser geolocation; when it's on, it will center the map on your location.

## Drag and drop
It also allows you to drop a file onto the map, and it will show the contents.
Currently the file can be in GPX, GeoJSON, IGC, KML or TopoJSON format.

## USNG
It shows the mouse cursor position on the map in lat lon and usng format.
To get USNG working I had to clone the project and build it.

```bash
    cd node_modules
    git clone git://github.com/codice/usng.js.git
    cd usng
    npm install
    npm run build
```

# Install packages
Parcel should be able to install what you need using
because of entries in package.json.

`npm install`

# Test it
`npm start`

This loads parcel (see package.json 'scripts' section.)
and launches a browser but this is the URL

 http://localhost:1234/

## That's it!
