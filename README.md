## Introduction
A play around with React and the googlemaps API to visualise accurate publically available street-crime data within the city of London during July 2014.
This example could be easily modified to include realtime data sources.  However, currently the api is a static json file within the root of the project src folder

![crime-map-london-city](https://github.com/markhobbs/crime-map-london-city/blob/master/cmlc-thumb.png)

## Getting Started
You need to obtain a Google Maps API Key through Google to use your own map object. Follow these steps: Google Maps API Key Reference and edit the header line in index.html with your generated api key

"git checkout and cd into the directory"
"yarn install"
"yarn build"
"yarn test"
"yarn start"

## Demo
[Open in the Browser](https://crime-map-london-city.herokuapp.com) or  <br /><br /> [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# References
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses [react-google-maps](https://www.npmjs.com/package/react-google-maps) to provide the map wrapper [Author] (https://github.com/tomchentw)

