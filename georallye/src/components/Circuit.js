import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../App.css';
import '../styles/Circuit.css';
import Sidebar from "react-sidebar";
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      markers: null,
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  mapClicked = (mapProps, map, clickEvent) => {
    this.setState({
      markers: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      }
    })
  }

  onSetSidebarOpen() {
    if (this.state.sidebarOpen === false)
      this.setState({ sidebarOpen: true })
    else
      (this.setState({ sidebarOpen: false }));
  }

  componentDidMount() {
    this.location();
  }

  render() {
    return (
      <div className="container-fluid-circuit">
        <Sidebar
          docked={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: { background: "white", width: "300px", height: "100%" },
            root: { position: "relative", height: "100%" }
          }}
          pullRight
        >
          <Button className="btn-sidebar" onClick={() => this.onSetSidebarOpen()}>
            <i className="material-icons">my_location</i>
          </Button>
          <Map className="map" google={this.props.google} center={{ lat: this.state.lat, lng: this.state.lng }} zoom={14}>
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
          </Map>

        </Sidebar>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Circuit)
