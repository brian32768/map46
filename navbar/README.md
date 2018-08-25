# map46/navbar

This app demonstrates a responsive navbar.

Today I added collapsible sidebars. 
See
https://bootstrapious.com/p/bootstrap-sidebar
I implemented his first version.
Follow the link for some other ideas.

FIXME it's not really working on my phone yet. Probably never will.

I want a button on the sidebar itself instead of a button in the navbar.

# Install some packages

The package manager should be able to install the dependencies when you run the app.

The commands I used explicitly to install the packages are:

 npm install bootstrap --save
 npm install popper.js@^1.14.4 --save

Bootstrap wants popper but for some reason does not install it as a dependency.

# Test it

NB, from a cmd window not bash.

 npm test

Running npm test loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

 http://localhost:1234/

Or use if you don't have chrome:

 npm testnc