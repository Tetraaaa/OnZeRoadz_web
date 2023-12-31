import React, { Component } from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';
import URL from '../resources/Url';
import { checkStatus } from '../resources/utils';

class ModalTransit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeTransit: "",
            instructions: "",
            listTypeTransit: []
        };
    }

    /**
     * Récupération type transit
     */
    findTypeTransit = () => {
        return fetch(URL.typeTransit, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(checkStatus)
            .then((res) => res.json())
            .then(listTypeTransit => this.setState({ 
                listTypeTransit: listTypeTransit,
                typeTransit : listTypeTransit[0].id
            }))
            .catch((err) => console.error(err));
    }

    /**
     * Envoie infos au component Circuit
     */
    sendInfoTransit = () => {
        let transit = {
            transitType: this.state.typeTransit,
            description: this.state.instructions
        }
        this.props.callbackFromParent(transit);
        this.setState({ typeTransit: "", instructions: "" })
        this.props.onHide();
    }

    componentDidMount() {
        this.findTypeTransit();
    }


    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        console.log(this.state)
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
                                className="select-type-transit" >
                                {this.state.listTypeTransit.map((typeTransit) => {
                                    return <option value={typeTransit.id}>{typeTransit.label}</option>
                                    })
                                }
                            </FormControl>
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
                    <Button variant="primary" type="button" className="btn-valid" onClick={this.sendInfoTransit}>
                        VALIDER
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalTransit;