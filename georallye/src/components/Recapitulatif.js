import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, FormControl, ControlLabel, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../styles/Recapitulatif.css';
import '../styles/Home.css';
class Recapitulatif extends Component {

    state = {
        lat: 0,
        lng: 0,
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

    componentDidMount() {
        this.location();
    }

    render() {
        return (
            <div className="container-fluid">
                <span className="titre-page">Récapitulatif du circuit</span>
                <div className="titre-ligne"></div>
                <Row>
                    <Col xs={4} className="container-infos-recap">
                        <ControlLabel>Nom du circuit</ControlLabel>
                        <FormControl
                            type="text"
                            name="nomCircuit"
                            autoComplete="off" />
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            rows="6"
                            className="textarea"
                            name="descCircuit"
                            autoComplete="off" />
                        <ControlLabel>Durée estimée</ControlLabel>
                        <FormControl
                            className="input-nombre"
                            type="text"
                            name="dureeCircuit"
                            autoComplete="off" />
                        <ControlLabel>Longueur</ControlLabel>
                        <FormControl
                            className="input-nombre"
                            type="text"
                            name="longCircuit"
                            autoComplete="off" />
                        <ControlLabel>Dénivelé</ControlLabel>
                        <FormControl
                            className="input-nombre"
                            type="text"
                            name="deniveleCircuit"
                            autoComplete="off" />
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col className="map-container">
                                <Map
                                    google={this.props.google}
                                    center={{ lat: this.state.lat, lng: this.state.lng }}
                                    zoom={14}>
                                    <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
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
    apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Recapitulatif)