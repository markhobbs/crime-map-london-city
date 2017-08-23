import fetch from "isomorphic-fetch";

import {
  default as React,
  Component,
} from "react";

import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps/lib';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

import logo from './../logo.svg';
import './../App.css';


const MarkerClustererExampleGoogleMap = withGoogleMap(props => (

    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}>
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    //position={{ lat: parseInt(marker.Latitude,10)+1, lng: parseInt(marker.Longitude,10)+1}}
                    //position={{ lat: 51.509865, lng: -0.118092 }}   
                    position={{ lat: parseInt(marker.location.latitude,10), lng: parseInt(marker.location.longitude,10)}}                    
                    key={marker.id}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));



class GoogleMapCrime extends Component {

    state = {
        markers: [],        
    }    
    
    /*componentDidMount() {
        fetch('api.json')
        .then(res => res.json())
        .then(data => {
            console.log("data: ", data)
            this.setState({ markers: data });
        });
    }*/

    componentDidMount() {
        fetch('https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2017-01')
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            this.setState({ markers: data });
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
                    <MarkerClustererExampleGoogleMap
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        markers={this.state.markers}
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