import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import '../styles/Recapitulatif.css';
import '../styles/Home.css';
class Recapitulatif extends Component
{

    state = {
        lat: 0,
        lng: 0,
        name: "",
        description: "",
        duration: "",
        length: "",
        slope: ""
    }

    /** 
     * Position actuelle
    */
    location = () =>
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }
    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    componentDidMount()
    {
        this.location();
        this.setState({
            name: this.props.location.name,
            description: this.props.location.description
        })
    }

    render()
    {
        return (
            <div className="container-fluid">
                <span className="titre-page">Récapitulatif du circuit</span>
                <div className="titre-ligne"></div>
                <Row>
                    <Col xs={4} className="container-infos-recap">
                        <ControlLabel>Nom du circuit</ControlLabel>
                        <FormControl
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={this.state.name}
                            onChange={this.handleInputChange} />
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            rows="6"
                            className="textarea"
                            name="description"
                            autoComplete="off"
                            value={this.state.description}
                            onChange={this.handleInputChange} />
                        <ControlLabel>Durée estimée</ControlLabel>
                        {
                            false ?
                                <div>
                                    <ControlLabel>Longueur</ControlLabel>
                                    <FormControl
                                        className="input-nombre"
                                        type="text"
                                        name="length"
                                        autoComplete="off"
                                        value={this.state.length}
                                        onChange={this.handleInputChange} />
                                    <ControlLabel>Dénivelé</ControlLabel>
                                    <FormControl
                                        className="input-nombre"
                                        type="text"
                                        name="slope"
                                        autoComplete="off"
                                        value={this.state.slope}
                                        onChange={this.handleInputChange} />
                                </div>
                                :
                                null

                        }
                        <FormControl
                            className="input-nombre"
                            type="text"
                            name="duration"
                            autoComplete="off"
                            value={this.state.duration}
                            onChange={this.handleInputChange} />
                        <Button onClick={() => { this.props.location.validate(this.state) }}>VALIDER</Button>
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