import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class ModalTransit extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>Définir le transit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Instructions pour se rendre à l'étape :</ControlLabel>
                            <FormControl
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