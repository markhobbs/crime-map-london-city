

import _ from "lodash";

import {
  default as React,
  Component,
  PropTypes,
} from "react";

import FaSpinner from "react-icons/lib/fa/spinner";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";
//import withScriptjs from "../../../lib/async/withScriptjs";

import {   
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps/lib';

import logo from './../logo.svg';

import './../App.css';



/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Loaded using async loader.
 */
const AsyncGettingStartedExampleGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
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



class AsyncGoogleMap extends Component { 

  static propTypes = {
    toast: PropTypes.func.isRequired,
  };

  state = {
    markers: [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
    }],
  }

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
              <a href="/">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>London City Crime Map (July 2007)</h1> 
              </a>               
              <nav/>
          </header>
          <content>                
            <AsyncGettingStartedExampleGoogleMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg"
              loadingElement={
                <div style={{ height: `100%` }}>
                  <FaSpinner
                    style={{
                      display: `block`,
                      width: `80px`,
                      height: `80px`,
                      margin: `150px auto`,
                      animation: `fa-spin 2s infinite linear`,
                    }}
                  />
                </div>
              }
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
              <img src={logo} className="App-logo" alt="logo" />Created with React and Googlemaps API @ Data provided by  https://data.police.uk (London City 2014-07)
          </footer>         
      </div>       
    );
  }
}
export default AsyncGoogleMap;  