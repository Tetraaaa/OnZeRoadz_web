import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import '../App.css';
import '../styles/Circuit.css';
import ModalQuestion from './ModalQuestion';
import Sidebar from "react-sidebar";
import { Form, Button, FormControl, ListGroup, ListGroupItem, ControlLabel } from 'react-bootstrap';

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      marker: null,
      sidebarOpen: false,
      typeSideBar: '',
      markers: [],
      predictions: [],
      lieu: '',
      focusOnBar: false,
      modalQuestionShow: false,
      id: 1,
      addMarkerActive: false
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
      sidebarOpen: false,
      id: this.state.id + 1,
      marker: {
        id: this.state.id,
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      }
    });
    this.setState(() => { markers: this.state.markers.push(this.state.marker)});
   this.onLine();
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
    this.setState({addMarkerActive: true, sidebarOpen: false })
  }

  /**
   * SideBar Add
   */
  onClickMarker() {
    this.onSetSidebarOpen();
    this.setState({ typeSideBar: 'add'})
  }

  /**
   * SideBar List
   */
  onClickList() {
    this.onSetSidebarOpen();
    this.setState({ typeSideBar: 'list' })
  }

  /**
   * dessin tracé
   */
  onLine() {
    console.log('ok')
    return (
      <Polyline
      paths={this.state.markers}
      strokeColor="#0000FF"
      strokeOpacity={0.8}
      strokeWeight={2} />
    )
  }

  componentDidMount() {
    this.location();
  }

  render() {
    let modalQuestionClose = () => this.setState({ modalQuestionShow: false });
    
    return (
      <div className="container-fluid-circuit">
        <Sidebar
          sidebar={
            this.state.typeSideBar === 'add' ?
              <Form>
                <ControlLabel className="title-step">Etape A</ControlLabel>
                <FormControl
                  className="name-step"
                  type="text"
                  name="name-step"
                  placeholder="Nom de l'étape" />
                <FormControl
                  componentClass="textarea"
                  rows="10"
                  className="info-step"
                  name="info-step"
                  placeholder="Description de l'étape" />
                {/**si déjà une question mettre "afficher la question" */}
                <div className="div-question" onClick={() => this.setState({ modalQuestionShow: true })}>Ajouter une question</div>
                <ModalQuestion show={this.state.modalQuestionShow} onHide={modalQuestionClose} />
              </Form>
              :
              <Form>
                <ControlLabel className="title-step">Ma liste d'étapes</ControlLabel>
                {this.state.markers ?
                this.state.markers.map((marker) =>  {
                  return (
                      <div> {marker.id} </div>
                    )
                }
                )  
                :
                null
              }
              </Form>
          }
          docked={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: { background: "white", width: "300px", height: "100%" },
            root: { position: "relative", height: "100%" }
          }}
          pullRight
        >
          <div className="div-search-bar">
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
                <ListGroup className="list-lieu-circuit">
                  {
                    this.state.predictions.map((item) => {
                      return (
                        <ListGroupItem className="lieu-item-circuit" onMouseDown={() => { this._onSearch(item) }}>
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
          </div>

          <Button className="btn-add" onClick={() => this.onClickAdd()}>
            <i className="material-icons">add_location</i>
          </Button>
          <Button className="btn-list" onClick={() => this.onClickList()}>
            <i className="material-icons">list</i>
          </Button>
          <Button className="btn-check" onClick={() => this.onClickList()}>
            <i className="material-icons">check</i>
          </Button>
          <Button className="btn-mylocation-circuit" onClick={this.location}>
            <i className="material-icons">my_location</i>
          </Button>
          <Map className={this.state.addMarkerActive ? "map add-marker" : "map"}
            google={this.props.google}
            center={{ lat: this.state.lat, lng: this.state.lng }}
            zoom={14}
            onClick={this.state.addMarkerActive ?
                        this.mapClicked
                        :
                        null
                    }>
            <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
            {this.state.markers ?
              this.state.markers.map((marker) =>  {
                return (
                    <Marker position={{ lat: marker.lat, lng: marker.lng }} onClick={() => this.onClickMarker()} />
                  )
              }
              )  
              :
              null
            }
          </Map>
        </Sidebar>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Circuit)
