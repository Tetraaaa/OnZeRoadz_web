import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';


class ModalQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: "",
            nbPoint: 0,
            question: "",
            infos: "",
            reponse: ""
        };
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>AJOUT D'UNE QUESTION</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup className="question-container">
                            <ControlLabel>Type question :</ControlLabel>
                            <FormControl
                                componentClass="select"
                                name="typeQuestion"
                                className="select-type-question"
                                value={this.state.typeQuestion}
                                onChange={this.handleInputChange} />

                            <ControlLabel>Nb points :</ControlLabel>
                            <FormControl
                                type="number"
                                name="nbPoint"
                                className="nb-point"
                                value={this.state.nbPoint}
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                className="textarea"
                                name="question"
                                placeholder="Question"
                                componentClass="textarea"
                                rows="2"
                                value={this.state.question}
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                name="infos"
                                placeholder="Informations complémentaires"
                                type="text"
                                value={this.state.infos}
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                className="textarea"
                                name="reponse"
                                placeholder="Réponse"
                                componentClass="textarea"
                                rows="3"
                                value={this.state.reponse}
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
                        infoQuestion: [{ 
                            typeQuestion: this.state.typeQuestion, 
                            nbPoint: this.state.nbPoint,
                            question: this.state.question,
                            infos: this.state.infos,
                            reponse: this.state.reponse }]
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

export default ModalQuestion;