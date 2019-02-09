import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup} from 'react-bootstrap';

class ModalConnexion extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>CONNEXION</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl type="text" name="pseudo" placeholder="Nom d'utilisateur" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="password" placeholder="Mot de passe" />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            CONNEXION
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalConnexion;