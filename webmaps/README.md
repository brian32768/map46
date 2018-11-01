# webmaps

The final product will be here, all those other folders are just r&d projects.

# REQUIREMENTS

Projection- web mercator ok? Is there really any other option?

* Slippy map with controls
  * zoom controls: +- and slider
  * Scalebar
* On map frame, show
  * Zoom level
  * Scale
  * Mouse position (lat lon / usng)
  * Layer control
* Legend
* Export to PDF with templates for layout and some customizations
* Permalinks, including copy to clipboard
* Bookmarks: preset
* Bookmarks: localStorage in browser? (does sync work?)
* Redlining?
* Measure?
* Search
  * Free text and advanced: account #, taxlot #, owner, mailing address, situs
  * Geocoded (possibly failover if free text search fails?)
  * Search results include links to taxmaps and (other).
* Map layers: 
  * Taxlots - FeatureServer * local live database
  * Zoning - FeatureServer * local live database
  * SLIDO? * DOGAMI service
  * Contours - need to build a new one * local static data
  * Hillshade - DOGAMI service
  * Basemap - Air photo - ESRI Clarity service?
  * Basemap - probably several? OpenStreetMap service, ESRI basemap service?
* Link to StreetView
* Documentation:
  * Help
  * FAQ

## Branding

These items can be easily swapped in, via a style sheet.

* Logo
* Title
* Disclaimer/entry tunnel
* Link to parent web site
* Announcement(s)
* FAQ
* Help

It would be nice if the app were responsive so that it can be viewed on a phone/tablet but
this app will target internal users / front desk so it's not a requirement.

# Install packages

We're using Parcel here so you should only need to do this.

  npm install

Bootstrap wants this but for some reason does not install it.

 npm install popper.js@^1.14.4 --save

# Test it (on Windows, from a cmd not a bash)

    npm start

Running this loads parcel (see package.json 'scripts' section.)
and the set up there launches a brower but this is the URL

  http://localhost:1234/

# Build it

    npm run-script build

# Deploy it to https://map46.com/

    scp -r dist/* bellman.wildsong.biz:/var/www/map46/html

(I usually do an "rm -f" to clean out the html folder first.)