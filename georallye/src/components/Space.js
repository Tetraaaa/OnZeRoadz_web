import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import '../App.css';
import URL from '../resources/Url';
import { checkStatus } from '../resources/utils';
import '../styles/Home.css';
import LocationSearchInput from './LocationSearchInput';
import ModalCircuit from './ModalCircuit';

class Space extends Component {
    state = {
        lat: 0,
        lng: 0,
        userLat: 0,
        userLng: 0,
        markers: null,
        predictions: [],
        lieu: '',
        focusOnBar: false,
        listCircuits: []
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    location = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                userLat: position.coords.latitude,
                userLng: position.coords.longitude,
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
            },
            lng: clickEvent.latLng.lng(),
            lat: clickEvent.latLng.lat()
        })
    }

    /**
     * Récupération des circuits publiés
     */
    findPublishedCircuits = () => {
        return fetch(URL.publishedCircuits, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(checkStatus)
            .then((res) => res.json())
            .then(listCircuits => this.setState({ listCircuits: listCircuits }))
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
        this.findPublishedCircuits();
        this.location();
    }

    render() {
        let modalCircuitClose = () => this.setState({ modalCircuitShow: false });
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs={7}>
                        <Row>
                            <Col xs={7}>
                                <LocationSearchInput handleChange={this.handleChange} lieu={this.state.lieu} onClick={(latLng) => { this.centerMap(latLng) }} />
                            </Col>
                            <Col xs={5}>
                                <Button className="btn-filtrer"><i className="material-icons">tune</i><span>Filtrer la recherche</span></Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="map-container">
                                <Map className="map"
                                    google={this.props.google}
                                    center={{ lat: this.state.lat, lng: this.state.lng }}
                                    zoom={14}
                                    onClick={this.mapClicked}>
                                    <Marker position={{ lat: this.state.userLat, lng: this.state.userLng }}
                                        icon={{
                                            url: require("../resources/img/my_location.svg"),
                                            scaledSize: new this.props.google.maps.Size(30, 30)
                                        }} />
                                    {
                                        this.state.listCircuits.map((circuit) => {
                                            return (
                                                <Marker key={circuit.id} position={{ lat: circuit.transits[0].step.latitude, lng: circuit.transits[0].step.longitude }} />
                                            )
                                        })
                                    }
                                    <Button className="btn-mylocation" onClick={this.location}>
                                        <i className="material-icons">my_location</i>
                                    </Button>
                                </Map>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={5}>
                        <Row>
                            <Button className="btn-circuit" onClick={() => this.setState({ modalCircuitShow: true })}>
                                Créer un circuit
                            </Button>
                            <ModalCircuit show={this.state.modalCircuitShow} onHide={modalCircuitClose} />
                        </Row>
                        <Row>
                            <Col className="class-container">CLASSEMENT</Col>
                        </Row>
                        <Row>
                            <Col className="infos-container">CIRCUIT</Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        );
    }
}


export default GoogleApiWrapper({
    apiKey: (URL.apiKey)
})(Space)
