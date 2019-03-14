import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import URL from '../resources/Url';
import { checkStatus } from '../resources/utils';
import '../styles/MyCircuits.css';

class MyCircuits extends Component {

    state = {
        lat: 0,
        lng: 0,
        myCircuits: []
    }

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
     * Récupération des circuits publiés
     */
    findMyCircuits = () => {
        return fetch(URL.myCircuits, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(checkStatus)
            .then((res) => res.json())
            .then(myCircuits => this.setState({ myCircuits: myCircuits }))
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.findMyCircuits()
        this.location();
    }

    render() {
        return (
            <div className="container-fluid">
                <span className="titre-page">Mes circuits</span>
                <div className="titre-ligne"></div>
                <Row>
                    <Col xs={4}>
                        <Row className="filtres-container">
                            <Col xs={7}>
                                <FormControl
                                    className="input-circuit"
                                    type="text"
                                    name="nomCircuit"
                                    placeholder="Rechercher un circuit"
                                    autoComplete="off" />
                            </Col>
                            <Col xs={5}>
                                <FormControl
                                    name="etatCircuit"
                                    className="select-etat"
                                    componentClass="select" />
                            </Col>
                        </Row>
                        <Row className="liste-container">
                            {
                                this.state.myCircuits.map((circuit) => {
                                    return (
                                        <div>{circuit.name} / Durée :  {circuit.duration} minutes</div>
                                    )
                                })
                            }
                        </Row>
                    </Col>

                    <Col xs={8}>
                        <Row>
                            <Col className="map-container">
                                <Map className="map"
                                    google={this.props.google}
                                    center={{ lat: this.state.lat, lng: this.state.lng }}
                                    zoom={14}>
                                    <Marker position={{ lat: this.state.lat, lng: this.state.lng }}
                                        icon={{
                                            url: require("../resources/img/my_location.svg"),
                                            scaledSize: new this.props.google.maps.Size(30, 30)
                                        }} />
                                    {
                                        this.state.myCircuits.map((circuit) => {
                                            return (
                                                <Marker position={{ lat: circuit.transits[0].step.latitude, lng: circuit.transits[0].step.longitude }} />
                                            )
                                        })
                                    }
                                </Map>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (URL.apiKey)
})(MyCircuits)