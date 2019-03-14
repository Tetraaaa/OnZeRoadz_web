import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import '../App.css';
import '../styles/Circuit.css';
import ModalQuestion from './ModalQuestion';
import ModalTransit from './ModalTransit';
import Sidebar from "react-sidebar";
import { Form, Button, FormControl, ListGroup, ListGroupItem, ControlLabel, FormGroup } from 'react-bootstrap';
import { checkStatus } from '../resources/utils';
import URL from '../resources/Url';
import LocationSearchInput from './LocationSearchInput';

class Circuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.infoCircuit[0].nameCircuit,
            description: this.props.location.infoCircuit[0].nameCircuit,
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
            addMarkerActive: false,
            circuitDuration: 0,
            question: null,
            questions: [],
            transit: null,
            transits: []
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
        let marker = {
            id: this.state.id,
            lat: Number(clickEvent.latLng.lat().toFixed(3)),
            lng: Number(clickEvent.latLng.lng().toFixed(3))
        }
        this.setState({
            sidebarOpen: false,
            id: this.state.id + 1,
            marker: marker,
            markers: this.state.markers.concat(marker),
            transits: this.state.transits.concat({
                description: "",
                transitType: "",
                step: {
                    name: "",
                    latitude: marker.lat,
                    longitude: marker.lng,
                    geoLoc: true,
                    description: "",
                    questions: []
                },

            })
        });
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
    onClickAdd = () => {
        this.setState({ addMarkerActive: !this.state.addMarkerActive, sidebarOpen: false })
    }

    /**
     * SideBar Add
     */
    onClickMarker = () => {
        this.onSetSidebarOpen();
        this.setState({ typeSideBar: 'marker' })
    }

    /**
     * SideBar List
     */
    onClickList = () => {
        this.onSetSidebarOpen();
        this.setState({ typeSideBar: 'list' })
    }

    /**
     * Marker onDragend
     */
    onMarkerDragEnd = (coord, index) => {
        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], lat: coord.latLng.lat(), lng: coord.latLng.lng() };
            return { markers };
        });
    };

    /**
     * Récupération données modal Question
     */
    myCallbackQuestion = (dataFromQuestion) => {
        let question = dataFromQuestion;
        this.setState({
            question: question,
            questions: this.state.questions.concat(question)
        }, () => console.log(this.state.questions))
    }

    /**
     * Récupération données modal Transit
     */
    myCallbackTransit = (dataFromTransit) => {
        let transit = dataFromTransit;
        this.setState({
            transit: transit,
            transits: this.state.transits.concat(transit)
        }, () => console.log(this.state.transit))
    }

    /**
     * Requête POST pour la création de circuit
     */
    createCircuit = (credentials) => {
        const token = window.localStorage.getItem('token');
        return fetch(URL.addCircuit, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then((res) => { return res })
            .catch((err) => console.error(err));
    }

    /**
     * Création du circuit
     */
    circuit = () => {
        this.createCircuit({
            name: this.state.name,
            description: this.state.description,
            duration: this.state.circuitDuration,
            networkRequired: true,
            startLongitude: this.state.markers[0].lng,
            startLatitude: this.state.markers[0].lat,
            transits: this.state.transits
        })
    }

    centerMap = (data) => {
        this.setState({
            lat: data.lat,
            lng: data.lng,
            lieu: data.address
        })
    }

    handleChange = lieu => {
        this.setState({ lieu });
    }

    componentDidMount() {
        this.location();
    }

    render() {
        let modalQuestionClose = () => this.setState({ modalQuestionShow: false });
        let modalTransitClose = () => this.setState({ modalTransitShow: false });
        console.log(this.state.transits)
        return (
            <div className="container-fluid-circuit">
                <Sidebar
                    sidebar={
                        this.state.typeSideBar === 'marker' ?
                            <Form>
                                <ControlLabel className="title-step">{this.state.marker.id}</ControlLabel>
                                <FormControl
                                    className="name-step"
                                    type="text"
                                    name="name-step"
                                    placeholder="Nom de l'étape" />
                                <FormControl
                                    componentClass="textarea"
                                    rows="6"
                                    className="info-step"
                                    name="info-step"
                                    placeholder="Description de l'étape" />
                                <ControlLabel className="lbl-radio-title">
                                    Mode de validation de l'arrivée à l'étape &nbsp;
                                    <i className="material-icons">info</i>
                                </ControlLabel>
                                <ControlLabel className="lbl-radio">
                                    <input
                                        type="radio"
                                        value="valid_auto"
                                        name="formStepValid"
                                        id="formStepValid"
                                    />
                                    Automatique
                                </ControlLabel>
                                <ControlLabel className="lbl-radio">
                                    <input
                                        type="radio"
                                        value="valid_manu"
                                        name="formStepValid"
                                        id="formStepValid"
                                    />
                                    Manuelle
                                </ControlLabel>
                                {/**TODO :si déjà une question mettre "afficher la question" */}
                                <Button className="btn-question"
                                    onClick={() => this.setState({ modalQuestionShow: true })}>
                                    QUESTION
                                </Button>
                                <Button className="btn-question"
                                    onClick={() => this.setState({ modalTransitShow: true })}>
                                    TRAJET
                                </Button>
                                <ModalQuestion
                                    show={this.state.modalQuestionShow}
                                    onHide={modalQuestionClose}
                                    callbackFromParent={this.myCallbackQuestion}
                                />
                                <ModalTransit
                                    show={this.state.modalTransitShow}
                                    onHide={modalTransitClose}
                                    callbackFromParent={this.myCallbackTransit}
                                />
                            </Form>
                            :
                            <Form>
                                <ControlLabel className="title-step">Ma liste d'étapes</ControlLabel>
                                <FormGroup className="duration-container">
                                    <ControlLabel className="duration-txt">Durée éstimée du circuit (en minutes) :</ControlLabel>
                                    <FormControl
                                        className="circuit-duration"
                                        name="circuitDuration"
                                        type="number"
                                        value={this.state.circuitDuration}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                                {this.state.markers ?
                                    this.state.markers.map((marker) => {
                                        return (
                                            <div>{marker.id} </div>
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
                    <LocationSearchInput handleChange={this.handleChange} lieu={this.state.lieu} onClick={(latLng) => { this.centerMap(latLng) }}/>
                    </div>

                    <Button className={this.state.addMarkerActive ? "btn-add-active" : "btn-add"} onClick={this.onClickAdd}>
                        <i className="material-icons">add_location</i>
                    </Button>
                    <Button className="btn-list" onClick={this.onClickList}>
                        <i className="material-icons">list</i>
                    </Button>
                    <Button className="btn-check" href="/recapitulatif">
                        <i className="material-icons">check</i>
                    </Button>
                    <Button className="btn-mylocation-circuit" onClick={this.location}>
                        <i className="material-icons">my_location</i>
                    </Button>
                    <Map className="map"
                        google={this.props.google}
                        center={{ lat: this.state.lat, lng: this.state.lng }}
                        zoom={14}
                        onClick={this.state.addMarkerActive ?
                            this.mapClicked
                            :
                            null
                        }>
                        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} icon={{
                            url: require("../resources/img/my_location.svg"),
                            scaledSize: new this.props.google.maps.Size(30, 30)
                        }} />
                        {
                            this.state.markers.map((marker, index) => {
                                return (
                                    <Marker draggable={true}
                                        label={marker.id.toString()}
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        onClick={this.onClickMarker}
                                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}>
                                    </Marker>
                                )
                            }
                            )
                        }
                        <Polyline
                            fillColor="#5C6BC0"
                            fillOpacity={0.35}
                            path={this.state.markers}
                            strokeColor="#5C6BC0"
                            strokeOpacity={0.8}
                            strokeWeight={2}
                        />
                    </Map>
                </Sidebar>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Circuit)
