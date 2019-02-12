import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import '../App.css';
import '../styles/Circuit.css';
import Sidebar from "react-sidebar";
import { Form, Button, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      markers: null,
      sidebarOpen: false,
      typeSideBar: '',
      markers: null,
      predictions: [],
      lieu: '',
      focusOnBar: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  /** 
   * Position actuelle
  */
  location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  /**
   * Positionner le marker
   */
  mapClicked = (mapProps, map, clickEvent) => {
    this.setState({
      markers: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      }
    })
  }

  /**
   * Recherche le lieu de la barre de recherche
   */
  _onSearch = (item) => {
    fetch("https://maps.googleapis.com/maps/api/place/details/json?&placeid=" +
      item.place_id + "&key=AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk").then(response => {
        if (response.ok) {
          response.json().then(json => this.setState(
            {
              lat: json.result.geometry.location.lat,
              lng: json.result.geometry.location.lng,
              lieu: item.description,
              focusOnBar: false
            }
          ))
        }
      })
      .catch(error => console.log(error))
  }

  /**
   * Affiche la liste de suggestion de la barre de recherche
   */
  _onChangeText = (e) => {
    if (e.target.value.length > 2) {
      fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" +
        e.target.value + "&key=AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk").then(response => {
          if (response.ok) {
            response.json().then(json => this.setState({ predictions: json.predictions }))
          }
        })
        .catch(error => console.log(error))
    }
    this.handleInputChange(e);
  }

  /**
   * Ouverture de la SideBar
   */
  onSetSidebarOpen() {
    if (this.state.sidebarOpen === false)
      this.setState({ sidebarOpen: true })
    else
      (this.setState({ sidebarOpen: false }));
  }

  /**
   * SideBar Add
   */
  onClickAdd() {
    this.onSetSidebarOpen();
    this.setState({ typeSideBar: 'add' })
  }

  /**
   * SideBar List
   */
  onClickList() {
    this.onSetSidebarOpen();
    this.setState({ typeSideBar: 'list' })
  }

  componentDidMount() {
    this.location();
  }

  render() {
    return (
      <div className="container-fluid-circuit">
        <Sidebar
          sidebar={
            this.state.typeSideBar === 'add' ?
              <Form>
                <FormControl type="text" name="pseudo" placeholder="Nom de l'étape" />
                <FormControl type="text" name="pseudo" placeholder="Description de l'étape" />
              </Form>
              :
              <span>Ma liste d'étapes</span>
          }
          docked={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: { background: "white", width: "300px", height: "100%" },
            root: { position: "relative", height: "100%" }
          }}
          pullRight
        >

          <FormControl
            className="input-lieu search-bar"
            type="text"
            name="lieu"
            value={this.state.lieu}
            placeholder="Rechercher un lieu"
            autoComplete="off"
            onChange={this._onChangeText}
            onBlur={() => { this.setState({ focusOnBar: false }) }}
            onFocus={() => { this.setState({ focusOnBar: true }) }} />
          {
            this.state.focusOnBar ?
              <ListGroup className="list-lieu">
                {
                  this.state.predictions.map((item) => {
                    return (
                      <ListGroupItem className="lieu-item" onMouseDown={() => { this._onSearch(item) }}>
                        {item.description}
                      </ListGroupItem>
                    )
                  }
                  )

                }
              </ListGroup>
              :
              null
          }

          <Button className="btn-sidebar-add" >
            <i className="material-icons">add_location</i>
          </Button>
          <Button className="btn-sidebar-list" onClick={() => this.onClickList()}>
            <i className="material-icons">list</i>
          </Button>
          <Map className="map" google={this.props.google} center={{ lat: this.state.lat, lng: this.state.lng }} zoom={14}>
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }} onClick={() => this.onClickAdd()} />
          </Map>
        </Sidebar>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Circuit)
