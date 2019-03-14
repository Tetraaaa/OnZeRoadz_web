import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import '../styles/Menu.css';
import ModalConnexion from './ModalConnexion';
import ModalInscription from './ModalInscription';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalConnexionShow: false,
            modalInscriptionShow: false
        }
    }

    modalConnexionClose = () => {
        this.setState({ modalConnexionShow: false });
    }

    modalInscriptionClose = () => {
        this.setState({ modalInscriptionShow: false, modalConnexionShow: true });
    }

    render() {

        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><i className="material-icons">near_me</i><span>OnZeRoadz</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        <span className="btn-connexion" onClick={() => this.setState({ modalConnexionShow: true })}>CONNEXION
                        </span>
                        <ModalConnexion show={this.state.modalConnexionShow} onHide={this.modalConnexionClose} />
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        <span className="btn-inscription" onClick={() => this.setState({ modalInscriptionShow: true })}>INSCRIPTION
                        </span>
                        <ModalInscription show={this.state.modalInscriptionShow} onHide={this.modalInscriptionClose} />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Menu)
