import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Form, FormControl, Button, Text } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/MenuCo.css';
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
                <Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="/circuits">
							Mes circuits
						</NavItem>
						<NavItem eventKey={2} href="/friends">
							Mes connaissances
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">
							<a className="btn-power">
                                <Navbar.Text><span style={{ marginRight: 5 }}>Le Poto Rico</span><i className="material-icons">person</i></Navbar.Text>	
							</a>
						</NavItem>
						<NavItem eventKey={2} href="#">
							<a className="btn-power">
								<i className="material-icons">power_settings_new</i>
							</a>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
            </Navbar>
        );
    }
}
