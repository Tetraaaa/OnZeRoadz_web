import { GoogleApiWrapper, Map, Marker, Polyline } from 'google-maps-react';
import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from "react-sidebar";
import '../App.css';
import URL from '../resources/Url';
import { checkStatus } from '../resources/utils';
import '../styles/Circuit.css';
import Step from "./Step"
import LocationSearchInput from './LocationSearchInput';
import ModalTransit from './ModalTransit';
import StepItem from './StepItem';

class Circuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            userLat: 0,
            userLng: 0,
            marker: null,
            sidebarOpen: false,
            typeSideBar: '',
            markers: [],
            lieu: '',
            id: 1,
            addMarkerActive: false,
            circuitDuration: 0,
            question: null,
            questions: [],
            transit: null,
            transits: [],
            currentId: 0,
            validationType: false,
            loaded: false,
            modalTransitShow: false
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
                lng: position.coords.longitude,
                userLat: position.coords.latitude,
                userLng: position.coords.longitude
            })
        })
    }

    /**
     * Positionner le marker
     */
    mapClicked = (mapProps, map, clickEvent) => {
        if (this.state.addMarkerActive && !this.state.sidebarOpen) {
            let marker = {
                id: this.state.id,
                lat: Number(clickEvent.latLng.lat()),
                lng: Number(clickEvent.latLng.lng())
            }
            this.setState({
                id: this.state.id + 1,
                marker: marker,
                markers: this.state.markers.concat(marker),
                modalTransitShow: true
            })
        }
        // else {
        //     this.setState({ sidebarOpen: false })
        //     let item = this.state.transits.find(item => item.id === this.state.currentId)
        //     if (item) {
        //         let newState = this.state.transits.filter(i => i.id !== item.id);
        //         newState = newState.concat({
        //             id: item.id,
        //             transitType: item.transitType,
        //             step: {
        //                 name: this.state.name,
        //                 latitude: this.state.lat,
        //                 longitude: this.state.lng,
        //                 geoLoc: false,
        //                 description: this.state.description,
        //                 questions: item.step.questions
        //             },
        //             description: item.description
        //         })
        //         this.setState({
        //             transits: newState
        //         })
        //     }
        // }
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
    onClickMarker = (marker) => {
        if (this.state.sidebarOpen) {
            let item = this.state.transits.find(item => item.id === this.state.currentId)
            if (item) {
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
                        questions: item.step.questions
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
        else {
            let item = this.state.transits.find(item => item.id === marker.id);
            this.onSetSidebarOpen();
            this.setState({ typeSideBar: 'marker', currentId: item.id, name: item.step.name, description: item.step.description })
        }

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
        let transit = this.state.transits.find(item => item.id === this.state.currentId)
        let step = transit.step;
        if (step) {
            step.questions = step.questions.concat(dataFromQuestion);
            let newState = this.state.transits.filter(item => item.id !== this.state.currentId);
            newState = newState.concat(transit)
            this.setState({ transits: newState })
        }
    }

    /**
     * Récupération données modal Transit
     */
    myCallbackTransit = (data) => {
        let body = {
            longitude: this.state.lng,
            latitude: this.state.lat,
            circuitId: this.props.location.circuitId,
            typeTransit: data.transitType,
            descriptionTransit: data.description
        }
        fetch(URL.step, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(checkStatus)
            .then((res) => res.json())
            .then((json) => {
                let transit = {
                    stepId: json.stepId,
                    transitId: json.transitId,
                    longitude: this.state.lng,
                    latitude: this.state.lat,
                    marker: this.state.marker
                }
                let transits = this.state.transits.concat(transit)
                this.setState({
                    transits,
                    transit
                })
            })
            .catch((err) => console.error(err));
    }

    /**
     * Requête POST pour la création de circuit
     */
    createCircuit = (infos) => {
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
            .then((res) => { this.props.history.push('/space') })
            .catch((err) => console.error(err));
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
        this.setState({ loaded: true })
    }

    render() {
        let modalTransitClose = () => this.setState({ modalTransitShow: false });
        return (
            <div className="container-fluid-circuit">
                <ModalTransit
                    show={this.state.modalTransitShow}
                    onHide={modalTransitClose}
                    callbackFromParent={this.myCallbackTransit}
                />
                <Sidebar
                    sidebar={
                        this.state.typeSideBar === 'marker' ?
                            <Step transit={this.state.transit} />
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
                                    this.state.transits.map((item) => {
                                        return (
                                            <StepItem key={item.stepId} stepId={item.stepId}/>
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
                        <LocationSearchInput handleChange={this.handleChange} lieu={this.state.lieu} onClick={(latLng) => { this.centerMap(latLng) }} />
                    </div>

                    <Button className={this.state.addMarkerActive ? "btn-add-active" : "btn-add"} onClick={this.onClickAdd}>
                        <i className="material-icons">add_location</i>
                    </Button>
                    <Button className="btn-list" onClick={this.onClickList}>
                        <i className="material-icons">list</i>
                    </Button>
                    {
                        this.state.loaded && this.state.transits.length > 0 ?
                            <Link to={{
                                pathname: "/recapitulatif",
                                circuitId : this.props.location.circuitId
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
                            this.state.markers.map((marker, index) => {
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
    apiKey: (URL.apiKey)
})(Circuit)
