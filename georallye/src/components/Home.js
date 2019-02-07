import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Row, Col, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import '../styles/Home.css';
import '../App.css';

class Home extends Component {
    state = {
        lat: 0,
        lng: 0,
        markers: null,
        predictions: [],
        lieu: ''
    }

    requests = [];

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    location = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
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
            }
        })
    }

    _onSearch = (item) => {
        console.log(item)
        fetch("https://maps.googleapis.com/maps/api/place/details/json?&placeid=" +
            item.place_id + "&key=AIzaSyAJiED9aRjJTSCUHmBE2pUZg4OifcAenpk").then(response => {
                if (response.ok) {
                    response.json().then(json => this.setState({ lat: json.result.geometry.location.lat, lng: json.result.geometry.location.lng, lieu: item.description }))
                }
            })
            .catch(error => console.log(error))
    }

    _onChangeText = (e) => {
        this.requests.forEach(request => request.abort())
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
                                <FormControl className="input-lieu"
                                    type="text"
                                    name="lieu"
                                    value={this.state.lieu}
                                    placeholder="Rechercher un lieu"
                                    onChange={this._onChangeText} />
                                <ListGroup className="list-lieu">
                                    {
                                        this.state.predictions.map((item) => {
                                            return (
                                                <ListGroupItem onClick={() => { this._onSearch(item) }}>{item.description}</ListGroupItem>
                                            )
                                        }
                                        )
                                    }
                                </ListGroup>
                            </Col>
                            <Col xs={5}>
                                <Button>Filtrer la recherche</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="map-container">
                                <Map className="map" google={this.props.google} center={{ lat: this.state.lat, lng: this.state.lng }} zoom={14} onClick={this.mapClicked}>
                                    <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
                                    {this.state.markers ?
                                        <Marker position={{ lat: this.state.markers.lat, lng: this.state.markers.lng }} />
                                        :
                                        null
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
})(Home)
