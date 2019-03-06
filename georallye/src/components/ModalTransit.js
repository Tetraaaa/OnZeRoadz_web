import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { checkStatus } from '../resources/utils';
import  URL from '../resources/Url'

class TypeTransitItem extends React.Component {
    render() {
        return <option value={this.props.data.id}>{this.props.data.label}</option>
    }
}

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
        const token = window.localStorage.getItem('token');
        return fetch(URL.typeTransit, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        })
            .then(checkStatus)
            .then((res) => console.log(res))
            //.then(listTypeTransit => this.setState({ listTypeTransit: listTypeTransit }))
            .catch((err) => console.error(err));
    }

    /**
     * Envoie infos au component Circuit
     */
    sendInfoTransit = () => {
        let transit = {
            transitType : this.state.typeTransit,
            description : this.state.instructions
        }
        this.props.callbackFromParent(transit);
        this.props.onHide();
    }

    componentDidMount() {
        this.findTypeTransit();
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
                                className="select-type-transit" >
                                {this.state.listTypeTransit.map((typeTransit) =>
                                    <TypeTransitItem key={typeTransit.id} data={typeTransit} />)
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