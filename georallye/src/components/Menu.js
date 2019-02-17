import React, { Component } from 'react'
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import '../App.css';
import ModalConnexion from './ModalConnexion';
import ModalInscription from './ModalInscription';

export default class Menu extends Component {

    state = {
        modalConnexionShow: false,
        modalInscriptionShow: false
    }

    render() {
        let modalConnexionClose = () => this.setState({ modalConnexionShow: false });
        let modalInscriptionClose = () => this.setState({ modalInscriptionShow: false });
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><i className="material-icons">near_me</i><span>GeoRallye</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        <a className="btn-connexion" onClick={() => this.setState({ modalConnexionShow: true })}>CONNEXION
                        </a>
                        <ModalConnexion show={this.state.modalConnexionShow} onHide={modalConnexionClose} />
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        <a className="btn-inscription" onClick={() => this.setState({ modalInscriptionShow: true })}>INSCRIPTION
                        </a>
                        <ModalInscription show={this.state.modalInscriptionShow} onHide={modalInscriptionClose} />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
