import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

class ModalInscription extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title >INSCRIPTION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl type="text" name="lastname" placeholder="Nom" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name="firstname" placeholder="Prénom" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name="pseudo" placeholder="Nom d'utilisateur" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="mail" name="email" placeholder="Adresse email" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="password" placeholder="Mot de passe" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="rePassword" placeholder="Confirmez votre mot de passe" />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            S'INSCRIRE
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalInscription;