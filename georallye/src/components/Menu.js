import React, { Component } from 'react'
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../styles/Menu.css';
import '../App.css';
import ModalConnexion from './ModalConnexion';
import ModalInscription from './ModalInscription';

class Menu extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            modalConnexionShow:false,
            modalInscriptionShow:false
        }
    }

    modalConnexionClose = () =>
    {
        this.setState({modalConnexionShow:false});
    }

    modalInscriptionClose = () =>
    {
        this.setState({modalInscriptionShow:false, modalConnexionShow:true});
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
                        <a className="btn-connexion" onClick={() => this.setState({ modalConnexionShow: true })}>CONNEXION
                        </a>
                        <ModalConnexion show={this.state.modalConnexionShow} onHide={this.modalConnexionClose}/>
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        <a className="btn-inscription" onClick={() => this.setState({ modalInscriptionShow: true })}>INSCRIPTION
                        </a>
                        <ModalInscription show={this.state.modalInscriptionShow} onHide={this.modalInscriptionClose}/>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Menu)
