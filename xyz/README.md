# map46/xyz

# Install some packages

In theory install only the global ones.

npm install --global ol
npm install --global gulp-cli

Parcel should be able to install the others on demand. It uses entries
in package-lock.json.

I listed everything that I did here anyway, just in case.

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

