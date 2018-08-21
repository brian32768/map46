# map46/navbar

This app just demonstrates a responsive navbar.

# Install some packages

The package manager should be able to install the others
because of entries in package-lock.json. Do this:

 npm install

The commands I used explicitly to install the packages are:

 npm install bootstrap --save
 npm install popper.js@^1.14.4 --save

Bootstrap wants popper but for some reason does not install it as a
dependency.

# test it (from a cmd not a bash)

 npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

 http://localhost:1234/

