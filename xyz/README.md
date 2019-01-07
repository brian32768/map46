# xyz

Make an OpenLayers map using an XYZ raster tile service.

Today I added the ol-ext package so I could play with the permalink feature. 2018-10-11

## Install packages
Parcel should autoinstall any packages it needs but you can do this if you want.

  `npm install`

## Test it
Running `npm start` loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

  http://localhost:1234/

## Build it
 npm run-script build

## Deploy it to https://map46.com/

  scp -r dist/* bellman.wildsong.biz:/var/www/map46/html

(I usually do an "rm -f" to clean out the html folder first.)
