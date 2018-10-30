# ole_test

Test the ole-brian32768 package, which can import styles for ArcGIS REST layers into OpenLayers.

# Install packages

We're using Parcel here and I commit the package.json file so it should be able to install packages on demand
which means you only have to do this after cloning.

  npm install

# Run it (from a cmd shell not a bash)

  npm start

Tries to launch a brower but this is the URL

  http://localhost:1234/

# Build it

 npm run-script build

# Deploy it, for example, to https://map46.com/

  scp -r dist/* bellman.wildsong.biz:/var/www/map46/html

(I usually do an "rm -f" to clean out the html folder first.)
