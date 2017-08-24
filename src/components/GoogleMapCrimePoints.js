
import canUseDOM from "can-use-dom";

import raf from "raf";

import {
  default as React,
  Component,
} from "react";

import {   
  withGoogleMap,
  GoogleMap,
  //Circle,
  InfoWindow, 
  Marker, 
} from 'react-google-maps/lib';

import logo from './../logo.svg';

import './../App.css';


const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={17}
    //center={props.center} //Geolocated
    //center = {{ lat: 51.509865, lng: -0.118092 }}
    center = {{ lat: 51.514865, lng: -0.094092 }}
  >
    {/*{props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    
      {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.10,
          strokeColor: `white`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    */}
    {props.markers.map(marker => (
      <Marker
          key={marker.crime_id}
          //position={{ lat: 51.509865, lng: -0.118092 }}   
          position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}} 
          icon={'crime.svg'}           
          onClick={() => props.onMarkerClick(marker)}>
          {/*
            Show info window only if the 'showInfo' key of the marker is true.
            That is, when the Marker pin has been clicked and 'onCloseClick' has been
            Successfully fired.
          */}
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
              <div>
                <h2>{marker.crime_type}</h2>
                <p>
                  LOCATION : {marker.location}<br />
                  DATE : {marker.month}<br />
                  OUTCOME : {marker.last_outcome_category}
                </p>
              </div>
            </InfoWindow>
            )}
      </Marker>
      ))}
      {/*<Marker position = {{ lat: 51.509865, lng: -0.118092 }} />*/}
  </GoogleMap>
));

class GoogleMapCrimePoints extends Component {  

    state = {
      center: null,
      content: null,
      radius: 400,
      markers: [],     
    };

    isUnmounted = false;
    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleMarkerClose = this.handleMarkerClose.bind(this);

    componentDidMount() {

      const tick = () => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > 200) {
          raf(tick);
        }
      };

      geolocation.getCurrentPosition((position) => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: `Location found using HTML5.`,
        });

        raf(tick);

      }, (reason) => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          center: {
            lat: 60,
            lng: 105,
          },
          content: `Error: The Geolocation service failed (${reason}).`,
        });
      });

      //Collect data from the crime data api and set the data to state
      //fetch('https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2017-01')
      fetch('Api.json')
      .then(res => res.json())
      .then(data => {
          // console.log('setting data to state: ',data)
          this.setState({ markers: data });
      });

    }

    componentWillUnmount() {
      this.isUnmounted = true;
    }
  
    // Toggle to 'true' to show InfoWindow and re-renders component
    handleMarkerClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: true,
            };
          }
          return marker;
        }),
      });
    }
  
    handleMarkerClose(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: false,
            };
          }
          return marker;
        }),
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
            <GeolocationExampleGoogleMap
              containerElement={
                <div style={{ height: `100%` }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
              center={this.state.center}
              content={this.state.content}
              radius={this.state.radius}
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
            />
          </content>
          <footer> 
              <img src={logo} className="App-logo" alt="logo" />Created with React and Googlemaps API @ Data provided by  https://data.police.uk (London City 2014-07)
          </footer>         
      </div>       
      );
    }
  }
  
  export default GoogleMapCrimePoints;  