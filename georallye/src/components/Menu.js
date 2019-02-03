import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import '../App.css';

export default class Menu extends Component {
    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">GeoRallye</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        <a className="btn-connexion">CONNEXION
                        </a>
                    </NavItem>
                    <NavItem eventKey={1} href="#">
                        <a className="btn-inscription">INSCRIPTION
                        </a>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
