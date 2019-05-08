# map46/taxlots

This app was written to test loading and searching a taxlot layer.
This app allows you to use browser geolocation; when it's on, it will center the map on your location.

It also allows you to drop a file onto the map, and it will show the contents.
Currently the file can be in GPX or KML format.

## cursor or mouse position

The "cursor_position" element is getting position from the map control via "pointermove" events.
The control "MousePosition" is capable of displaying position outside the map via the
"target" property. In this demo it shows up in the "mouse_position" element. In real life you
can do it either way.

# Get some taxlots

An earlier version of this demo used a JSON file,
which is probably a good idea. This one uses a WFS service
that you probably don't have access to. Sorry.

# Test it

 npm start

Running npm start loads parcel (see package.json 'scripts' section.)
and the set up there launches a browser but this is the URL

 http://localhost:1234/
