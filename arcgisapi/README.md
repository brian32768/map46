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

I used the ESRI CDN here so I did not have to install anything.  I
looked at the instructions how to use NPM and it made no sense to me,
so I have not made of a try yet.

It uses a Clatsop County taxlots layer hosted on AGS behind our
firewall so it won't work if installed on a server "outside".

## This app stalled out.

Today (31-Aug-18) I tried to move over to my Node/Parcel toolchain and failed. I backed out the changes,
so this app should still work, just load the index.html into a browser and away you go.

In testing the ESRI API I did not see anything I could not live without so I am going back to testing OpenLayers projects.

## Packages

If I had succeeded in moving to Parcel I would have wanted to do this:

  npm install --save arcgis-js-api

When I did I got this error:

  npm ERR! warning: templates not found C:\TempPath\pacote-git-template-tmp\git-clone-8972e63e
  npm ERR! fatal: unable to access 'https://github.com/dmachi/dojox_application.git/': error setting certificate verify locations:
  npm ERR!   CAfile: C:/Users/bwilson/AppData/Local/Programs/Git/mingw64/ssl/certs/ca-bundle.crt

I had to reinstall "git for windows", now that I have local admin permissions I was able to install it on the Windows PATH
so that it would work from a CMD window. Then I ran the npm installer there and it worked.


