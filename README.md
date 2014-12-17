slack-location
==============

Chrome extension for joining and leaving channels on slack depending on location

Author: RGK
This app works by simply using the HTML5 navigator.geolocation object 
to retrieve the user's ip based Lat and Long coordinates 
this data is sent to the google maps api to do a reverse address lookup 

If the user is in one of the cities in foodCities we tell the slack api to join the food channel else we leave it

Setup:
======

Go to https://api.slack.com/web and scroll to the Authentication section. 
Issue yourself a security token and set the 'slackToken' variable in foodLeave.js to that
You can also modify the 'foodCities' array in foodLeave.js to change what cities you need to be in to join the food channel. 


Installing the Extension:
=========================

For debugging and testing you can enable dev mode in chrome extensions and load an unpacked extension into the browser.
However, if you delete your source files you will break the extension. Use the "Pack Extension" tool to generate a compiled .crx 
file that you can install to chrome without needing the original source files. 





TODO:
=====

-Allow user to set their slack token after the extension is installed so they don't have to edit the source code
-Allow user to customize the list of cities and channels they are in
