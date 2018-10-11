# xyz

Make an OpenLayers map using an XYZ raster tile service.

Today I added the ol-ext package so I could play with the permalink feature. 2018-10-11

# Install packages

We're using Parcel here and I commit the package.json file so it should be able to install packages on demand
which means you only have to do this after cloning.

  npm install

But you can do this too.

  npm install bootstrap ol ol-ext --save

Bootstrap wants this but for some reason does not install it.

 npm install popper.js@^1.14.4 --save

# Test it (from a cmd not a bash)

  npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

  http://localhost:1234/

# Build it

 npm run-script build

# Deploy it to https://map46.com/

  scp -r dist/* bellman.wildsong.biz:/var/www/map46/html

(I usually do an "rm -f" to clean out the html folder first.)