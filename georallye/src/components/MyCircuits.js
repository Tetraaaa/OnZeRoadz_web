import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../styles/MyCircuits.css';

class MyCircuits extends Component {

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
                                    componentClass="select"
                                    name="etatCircuit" />
                            </Col>
                        </Row>
                        <Row className="liste-container">
                            <Col>LISTE CIRCUITS</Col>
                        </Row>
                    </Col>

                    <Col xs={8}>
                        <Row>
                            <Col className="map-container">
                                <Map className="map"
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
})(MyCircuits)