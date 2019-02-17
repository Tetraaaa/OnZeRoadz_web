import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import '../App.css';

class ModalQuestion extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>AJOUT D'UNE QUESTION</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <ControlLabel>Type de la question :</ControlLabel>
                        <FormGroup>
                            <FormControl componentClass="select" name="select-type"/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl className="textarea" name="question" placeholder="Question" componentClass="textarea" rows="2" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl name="infos" placeholder="Informations complémentaires" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl className="textarea" name="reponse" placeholder="Réponse" componentClass="textarea" rows="3" />
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

export default ModalQuestion;