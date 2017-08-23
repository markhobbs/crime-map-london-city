import React, { Component } from 'react';
import canUseDOM from "can-use-dom";
import logo from './../logo.svg';
import './../App.css';

import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps/lib';

const geolocation = (
    canUseDOM && navigator.geolocation ?
    navigator.geolocation : ({
        getCurrentPosition(success, failure) {
        failure(`Your browser doesn't support geolocation.`);
        },
    })
);

/*
* Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
*/
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
        <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(marker)}
        />
        ))}
    </GoogleMap>
));

class GoogleMapCrime extends Component {   
    
    state = {
        markers: [{
          position: {
            lat: 51.509865, lng: -0.118092
          },
          key: `Taiwan`,
          defaultAnimation: 2,
        }],
      };
    
    handleMapLoad = this.handleMapLoad.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    /*
    * This is called when you click on the map.
    * Go and try click now.
    */
    handleMapClick(event) {
        const nextMarkers = [
        ...this.state.markers,
        {
            position: event.latLng,
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
        ];
        this.setState({
        markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
        this.props.toast(
            `Right click on the marker to remove it`,
            `Also check the code!`
        );
        }
    }

    handleMarkerRightClick(targetMarker) {
        /*
        * All you modify is data, and the view is driven by data.
        * This is so called data-driven-development. (And yes, it's now in
        * web front end and even with google maps API.)
        */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    render() {
        return (
          <div className="App">
            <header>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Crime Map UK</h1>                
                <nav/>
            </header>
            <content>
                <SimpleMapExampleGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
                onMarkerRightClick={this.handleMarkerRightClick}       
                /> 
            </content>
            <footer> 
                <img src={logo} className="App-logo" alt="logo" />Created with React
            </footer>   
           
          </div>          
        );
      }
  }
  
  export default GoogleMapCrime;



  