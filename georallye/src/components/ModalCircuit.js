import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { checkStatus } from '../resources/utils';

class ModalTransit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameCircuit: '',
            descCircuit: '',
            redirect: false,
            circuitId : null
        };
    }

    handleSubmit = () => {
        let body = {
            name: this.state.nameCircuit,
            description: this.state.descCircuit,
            networkRequired: true
        }

        fetch(URL.circuit, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then(checkStatus)
        .then((res) => res.json())
        .then((json)=>{this.setState({
            circuitId : json.circuitId,
            redirect : true
        })})
        .catch((err) => console.error(err));
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/circuit",
                    circuitId : this.state.circuitId
                }}>
                </Redirect>
            )
        }
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Créer un circuit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl
                                type="text"
                                name="nameCircuit"
                                placeholder="Nom du circuit"
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                name="descCircuit"
                                className="textarea"
                                rows="6"
                                onChange={this.handleInputChange} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" className="btn-cancel" onClick={this.props.onHide}>
                        ANNULER
                        </Button>
                    <Button variant="primary" type="button" className="btn-valid" onClick={this.handleSubmit}>
                        VALIDER
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalTransit;