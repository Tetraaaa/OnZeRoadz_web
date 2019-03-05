import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Circuit from './Circuit';
import { Link } from 'react-router-dom';

class ModalTransit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameCircuit: '',
            descCircuit: ''
        };
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
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

                    <Link to={{
                        pathname: "/circuit",
                        infoCircuit: [{
                            nameCircuit: this.state.nameCircuit, 
                            descCircuit: this.state.descCircuit }]// your data array of objects
                    }}>
                        <Button variant="primary" type="button" className="btn-valid">
                            VALIDER
                        </Button>
                    </Link>

                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalTransit;