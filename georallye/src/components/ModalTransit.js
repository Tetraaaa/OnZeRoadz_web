import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class ModalTransit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            typeTransit: "",
            instructions: ""
        };
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Définir le transit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <FormGroup className="transit-container">
                            <ControlLabel>Type du transit :</ControlLabel>
                            <FormControl 
                                componentClass="select" 
                                name="typeTransit"
                                value={this.state.typeTransit}
                                onChange={this.handleInputChange}
                                className="select-type-transit"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Instructions pour se rendre à l'étape :</ControlLabel>
                            <FormControl
                                name="instructions"
                                value={this.state.instructions}
                                onChange={this.handleInputChange}
                                componentClass="textarea"
                                className="textarea"
                                rows="6" />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="button" className="btn-cancel" onClick={this.props.onHide}>
                        ANNULER
                        </Button>
                    <Button variant="primary" type="button" className="btn-valid">
                        VALIDER
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalTransit;