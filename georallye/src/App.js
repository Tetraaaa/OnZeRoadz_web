import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {

 state = {
    lat : 0,
    long: 0
  }

  location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat : position.coords.latitude,
        long : position.coords.longitude
      })
    })
  }

  componentDidMount(){
    this.location()
  }

  render() {
    return (
      <Map google={this.props.google} style={{margin:"100px"}}  center={{lat:this.state.lat, lng:this.state.long}} zoom={14}>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(App)


