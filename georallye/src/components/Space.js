import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, FormControl, Button, InputGroup, Prepend, Text } from 'react-bootstrap';
import '../styles/Home.css';
import '../App.css';

class Space extends Component {
    state = {
        lat: 0,
        long: 0
    }

    location = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        })
    }

    componentDidMount() {
        this.location()
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col xs={7}>
                        <Row>
                            <Col xs={7}>
                                <FormControl className="input-lieu" type="text" placeholder="Rechercher un lieu" />
                            </Col>
                            <Col xs={5}>
                                <Button>Filtrer la recherche</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="map-container">
                                <Map classname="map" google={this.props.google} center={{ lat: this.state.lat, lng: this.state.long }} zoom={14}></Map>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={5}>
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
    apiKey: ("AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk")
})(Space)
