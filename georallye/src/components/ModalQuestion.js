import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import '../App.css';
import { checkStatus } from '../resources/utils';
import URL from '../resources/Url'

class TypeQuestionItem extends React.Component {
    render() {
        return <option value={this.props.data.type}>{this.props.data.label}</option>
    }
}

class ModalQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: "",
            nbPoint: 0,
            question: "",
            infos: "",
            reponse: "",
            listTypeQuestion: []
        };
    }

    /**
    * Récupération type question
    */
    findTypeQuestion = () => {
        return fetch(URL.typeQuestion, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        })
            .then(checkStatus)
            .then((res) => res.json())
            .then(listTypeQuestion => this.setState({ listTypeQuestion: listTypeQuestion }))
            .catch((err) => console.error(err));
    }

    /**
     * Envoie infos au component Circuit
     */
    sendInfoQuestion = () => {
        let question = {
            points : this.state.nbPoint,
            text : this.state.question,
            info : this.state.infos,
            type : this.state.typeQuestion,
            reponse : this.state.reponse
        }
        this.props.callbackFromParent(question);
        this.props.onHide();
    }

    componentDidMount() {
        this.findTypeQuestion();
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
                                onChange={this.handleInputChange} >
                                {this.state.listTypeQuestion.map((typeQuestion) =>
                                    <TypeQuestionItem key={typeQuestion.type} data={typeQuestion} />)
                                }
                            </FormControl>
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
                    <Button variant="primary" type="button" className="btn-valid" onClick={this.sendInfoQuestion}>
                        VALIDER
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalQuestion;