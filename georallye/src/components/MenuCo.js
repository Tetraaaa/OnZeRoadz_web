import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import '../styles/MenuCo.css';
import { withAuth } from './AuthContext';


class MenuCo extends Component {

	/**
    * Méthode Signout
    */
	signout = () => {
		this.props.auth.signout()
			.then(() => {
				this.props.history.push('/');
			});
	};

	render() {
		return (
			<Navbar default collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/space"><i className="material-icons">near_me</i><span>OnZeRoadz</span></Link>
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
							<Navbar.Text>
								<span style={{ marginRight: 5 }}>
									{this.props.auth.username}
								</span>
								<i className="material-icons">person</i>
							</Navbar.Text>
						</NavItem>
						<NavItem className="btn-power" eventKey={4} href="#" onClick={this.signout}>
							<i className="material-icons">power_settings_new</i>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withRouter(withAuth(MenuCo));
