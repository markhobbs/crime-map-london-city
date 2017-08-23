import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';

import { withGoogleMap, GoogleMap} from 'react-google-maps/lib';

/*
* Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
*/
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />
));

class GoogleMapCrime extends Component {
    render() {
        return (
          <div className="App" style={{width: 600, height: 800}}      >
          <img src={logo} className="App-logo" alt="logo" />
            <SimpleMapExampleGoogleMap
            containerElement={
                <div style={{ height: `100%` }} />
            }
            mapElement={
                <div style={{ height: `100%` }} />
            }
            />            
          </div>          
        );
      }
  }
  
  export default GoogleMapCrime;



  