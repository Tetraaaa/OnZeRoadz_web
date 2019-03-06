import React, { Component } from 'react'
import { Navbar, Nav, NavItem} from 'react-bootstrap';
import { Link, Router } from 'react-router-dom';
import '../styles/MenuCo.css';
import '../App.css';

export default class Menu extends Component {
	
    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"><i className="material-icons">near_me</i><span>OnZeRoadz</span></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="/circuits">
							Mes circuits
						</NavItem>
						<NavItem eventKey={2} href="/suivi">
							Mon suivi
						</NavItem>
						<NavItem eventKey={3} href="/friends">
							Mes connaissances
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem className="btn-power" eventKey={3} href="#">
                                <Navbar.Text><span style={{ marginRight: 5 }}>{localStorage.getItem("username")}</span><i className="material-icons">person</i></Navbar.Text>	
						</NavItem>
						<NavItem className="btn-power" eventKey={4} href="#" onClick={() => {localStorage.removeItem("username")}}>
								<i className="material-icons">power_settings_new</i>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
            </Navbar>
        );
    }
}
