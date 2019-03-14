import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import ModalQuestion from './ModalQuestion';
import ModalTransit from './ModalTransit';

export default class Step extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            geoLoc: false,
        };
    }

    render() {
        let modalQuestionClose = () => this.setState({ modalQuestionShow: false });
        let modalTransitClose = () => this.setState({ modalTransitShow: false });
        return (
            <Form>
                <ControlLabel className="title-step">{this.state.currentId}</ControlLabel>
                <FormControl
                    className="name-step"
                    type="text"
                    name="name"
                    placeholder="Nom de l'étape"
                    value={this.state.name}
                    onChange={this.handleInputChange} />
                <FormControl
                    componentClass="textarea"
                    rows="6"
                    className="info-step"
                    name="description"
                    placeholder="Description de l'étape"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                />
                <ControlLabel className="lbl-radio-title">
                    Mode de validation de l'arrivée à l'étape &nbsp;
                                    <i className="material-icons">info</i>
                </ControlLabel>
                <ControlLabel className="lbl-radio" name="validationType">
                    <input
                        type="radio"
                        value={this.state.validationType}
                        name="validationType"
                        id="formStepValid"
                        onChange={this.handleInputChange}
                    />
                    Automatique
                </ControlLabel>
                <ControlLabel className="lbl-radio">
                    <input
                        type="radio"
                        value={this.state.validationType}
                        name="validationType"
                        id="formStepValid"
                        onChange={this.handleInputChange}
                    />
                    Manuelle
                </ControlLabel>
                {/**TODO :si déjà une question mettre "afficher la question" */}
                <Button className="btn-question"
                    onClick={() => this.setState({ modalQuestionShow: true })}>
                    QUESTION
                </Button>
                <Button className="btn-question"
                    onClick={() => this.setState({ modalTransitShow: true })}>
                    TRAJET
                </Button>
                <ModalQuestion
                    show={this.state.modalQuestionShow}
                    onHide={modalQuestionClose}
                    callbackFromParent={this.myCallbackQuestion}
                />
                <ModalTransit
                    show={this.state.modalTransitShow}
                    onHide={modalTransitClose}
                    callbackFromParent={this.myCallbackTransit}
                />
            </Form>
        )
    }
}
