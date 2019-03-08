import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper, Polyline, InfoWindow } from 'google-maps-react';
import '../App.css';
import '../styles/Circuit.css';
import ModalQuestion from './ModalQuestion';
import ModalTransit from './ModalTransit';
import Sidebar from "react-sidebar";
import { Link } from 'react-router-dom';
import { Form, Button, FormControl, ListGroup, ListGroupItem, ControlLabel, FormGroup } from 'react-bootstrap';
import { checkStatus } from '../resources/utils';
import URL from '../resources/Url';


class Circuit extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: "",
            description: "",
            geoLoc: false,
            lat: 0,
            lng: 0,
            userLat:0,
            userLng:0,
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
            transits: [],
            currentId: 0,
            validationType: false,
            loaded:false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    /** 
     * Position actuelle
    */
    location = () =>
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                userLat: position.coords.latitude,
                userLng: position.coords.longitude
            })
        })
    }

    /**
     * Positionner le marker
     */
    mapClicked = (mapProps, map, clickEvent) =>
    {
        if (this.state.addMarkerActive && !this.state.sidebarOpen)
        {
            let marker = {
                id: this.state.id,
                lat: Number(clickEvent.latLng.lat()),
                lng: Number(clickEvent.latLng.lng())
            }
            this.setState({
                lat: Number(clickEvent.latLng.lat()),
                lng: Number(clickEvent.latLng.lng()),
                currentId: 0,
                sidebarOpen: false,
                name: "",
                id: this.state.id + 1,
                marker: marker,
                markers: this.state.markers.concat(marker),
                transits: this.state.transits.concat({
                    id: marker.id,
                    description: "",
                    transitType: 1,
                    step: {
                        name: "",
                        latitude: marker.lat,
                        longitude: marker.lng,
                        geoLoc: false,
                        description: "",
                        questions: []
                    }

                })
            });
        }
        else
        {
            this.setState({ sidebarOpen: false })
            let item = this.state.transits.find(item => item.id === this.state.currentId)
            if (item)
            {
                let newState = this.state.transits.filter(i => i.id !== item.id);
                newState = newState.concat({
                    id: item.id,
                    transitType: item.transitType,
                    step: {
                        name: this.state.name,
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        geoLoc: false,
                        description: this.state.description,
                        questions:item.step.questions
                    },
                    description: item.description
                })
                this.setState({
                    transits: newState
                })
            }
        }
    }

    /**
     * Recherche le lieu de la barre de recherche
     */
    _onSearch = (item) =>
    {
        fetch("https://maps.googleapis.com/maps/api/place/details/json?&placeid=" +
            item.place_id + "&key=AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk").then(response =>
            {
                if (response.ok)
                {
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
    _onChangeText = (e) =>
    {
        if (e.target.value.length > 2)
        {
            fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" +
                e.target.value + "&key=AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk").then(response =>
                {
                    if (response.ok)
                    {
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
    onSetSidebarOpen()
    {
        if (this.state.sidebarOpen === false)
            this.setState({ sidebarOpen: true })
        else

            (this.setState({ sidebarOpen: false }));
    }

    /**
     * SideBar Add
     */
    onClickAdd = () =>
    {
        this.setState({ addMarkerActive: !this.state.addMarkerActive, sidebarOpen: false })
    }

    /**
     * SideBar Add
     */
    onClickMarker = (marker) =>
    {
        if(this.state.sidebarOpen)
        {
            let item = this.state.transits.find(item => item.id === this.state.currentId)
            if (item)
            {
                let newState = this.state.transits.filter(i => i.id !== item.id);
                newState = newState.concat({
                    id: item.id,
                    transitType: item.transitType,
                    step: {
                        name: this.state.name,
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        geoLoc: false,
                        description: this.state.description,
                        questions:item.step.questions
                    },
                    description: item.description
                })
                this.setState({
                    transits: newState
                }, () => {
                    let item = this.state.transits.find(item => item.id === marker.id);
                    this.setState({ typeSideBar: 'marker', currentId: item.id, name: item.step.name, description: item.step.description })
                })
            }
        }
        else
        {
            let item = this.state.transits.find(item => item.id === marker.id);
            this.onSetSidebarOpen();
            this.setState({ typeSideBar: 'marker', currentId: item.id, name: item.step.name, description: item.step.description })
        }

    }

    /**
     * SideBar List
     */
    onClickList = () =>
    {
        this.onSetSidebarOpen();
        this.setState({ typeSideBar: 'list' })
    }

    /**
     * Marker onDragend
     */
    onMarkerDragEnd = (coord, index) =>
    {
        this.setState(prevState =>
        {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], lat: coord.latLng.lat(), lng: coord.latLng.lng() };
            return { markers };
        });
    };

    /**
     * Récupération données modal Question
     */
    myCallbackQuestion = (dataFromQuestion) =>
    {
        let transit = this.state.transits.find(item => item.id === this.state.currentId)
        let step = transit.step;
        if (step)
        {
            step.questions = step.questions.concat(dataFromQuestion);
            let newState = this.state.transits.filter(item => item.id !== this.state.currentId);
            newState = newState.concat(transit)
            this.setState({ transits: newState })
        }
    }

    /**
     * Récupération données modal Transit
     */
    myCallbackTransit = (dataFromTransit) =>
    {
        let transit = this.state.transits.find(item => item.id === this.state.currentId);
        if (transit)
        {
            transit.description = dataFromTransit.description;
            transit.transitType = 1;

            let newState = this.state.transits.filter(item => item.id !== this.state.currentId);
            newState = newState.concat(transit)
            this.setState({ transits: newState })
        }
    }

    /**
     * Requête POST pour la création de circuit
     */
    createCircuit = (infos) =>
    {
        let details = {
            "name": infos.name,
            "description": infos.description,
            "duration": infos.duration,
            "networkRequired": true,
            "startLongitude": this.state.transits[0].step.longitude,
            "startLatitude": this.state.transits[0].step.latitude,
            "transits": this.state.transits
        }


        return fetch(URL.addCircuit, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        })
            .then(checkStatus)
            .then((res) => { this.props.history.push('/') })
            .catch((err) => console.error(err));
    }


    componentDidMount()
    {
        this.location();
        this.setState({loaded:true})
    }

    render()
    {
        let modalQuestionClose = () => this.setState({ modalQuestionShow: false });
        let modalTransitClose = () => this.setState({ modalTransitShow: false });
        return (
            <div className="container-fluid-circuit">
                <Sidebar
                    sidebar={
                        this.state.typeSideBar === 'marker' ?
                            <Form>
                                <ControlLabel className="title-step">{this.state.currentId}</ControlLabel>
                                <FormControl
                                    className="name-step"
                                    type="text"
                                    name="name"
                                    placeholder="Nom de l'étape"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                                <FormControl
                                    componentClass="textarea"
                                    rows="6"
                                    className="info-step"
                                    name="description"
                                    placeholder="Description de l'étape"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                />
                                <ControlLabel className="lbl-radio-title">
                                    Mode de validation de l'arrivée à l'étape &nbsp;
                                    <i className="material-icons">info</i>
                                </ControlLabel>
                                <ControlLabel className="lbl-radio" name="validationType">
                                    <input
                                        type="radio"
                                        value={this.state.validationType}
                                        name="validationType"
                                        id="formStepValid"
                                        onChange={this.handleInputChange}
                                    />
                                    Automatique
                                </ControlLabel>
                                <ControlLabel className="lbl-radio">
                                    <input
                                        type="radio"
                                        value={this.state.validationType}
                                        name="validationType"
                                        id="formStepValid"
                                        onChange={this.handleInputChange}
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
                                    <ControlLabel className="duration-txt">Durée estimée du circuit (en minutes) :</ControlLabel>
                                    <FormControl
                                        className="circuit-duration"
                                        name="circuitDuration"
                                        type="number"
                                        value={this.state.circuitDuration}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                                {this.state.transits.length > 0 ?
                                    this.state.transits.map((item, index) =>
                                    {
                                        let t = item.step.name || "(Pas de nom)"
                                        return (
                                            <div key={index}>{" - " + t} </div>
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
                                        this.state.predictions.map((item) =>
                                        {
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

                    <Button className={this.state.addMarkerActive ? "btn-add-active" : "btn-add"} onClick={this.onClickAdd}>
                        <i className="material-icons">add_location</i>
                    </Button>
                    <Button className="btn-list" onClick={this.onClickList}>
                        <i className="material-icons">list</i>
                    </Button>
                    {
                        this.state.loaded && this.state.transits.length > 0?
                            <Link to={{
                                pathname: "/recapitulatif",
                                name: this.props.location.infoCircuit[0].nameCircuit,
                                description: this.props.location.infoCircuit[0].descCircuit,
                                validate: this.createCircuit
                            }}>
                                <Button className="btn-check">
                                    <i className="material-icons">check</i>
                                </Button>
                            </Link>
                            :
                            null
                    }


                    <Button className="btn-mylocation-circuit" onClick={this.location}>
                        <i className="material-icons">my_location</i>
                    </Button>
                    <Map className="map"
                        google={this.props.google}
                        center={{ lat: this.state.lat, lng: this.state.lng }}
                        zoom={14}
                        onClick={this.mapClicked}>
                        <Marker position={{ lat: this.state.userLat, lng: this.state.userLng }} icon={{
                            url: require("../resources/img/my_location.svg"),
                            scaledSize: new this.props.google.maps.Size(30, 30)
                        }} />
                        {
                            this.state.markers.map((marker, index) =>
                            {
                                return (
                                    <Marker draggable={true}
                                        label={marker.id.toString()}
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        key={index}
                                        id={marker.id}
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
