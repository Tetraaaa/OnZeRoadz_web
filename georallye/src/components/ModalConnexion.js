import React, { Component } from 'react'
import { Modal, Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import { withAuth } from './AuthContext';

class ModalConnexion extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            login:"",
            password:"",
            errMess:""
        }
    }

    login = () =>
    {
        this.setState({ errMess:"" });
        this.props.auth.signin({
            username: this.state.login,
            password: this.state.password
        })
        .then(() => {
            this.props.history.push('/space');
        })
        .catch(error => {
            this.setState({ errMess: error.message });
        });
    }

    render()
    {
        return (
            <Modal show={this.props.show} >
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title>CONNEXION</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl type="text" name="pseudo" placeholder="Nom d'utilisateur" value={this.state.login} onChange={(event) => this.setState({login:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="password" placeholder="Mot de passe" value={this.state.password} onChange={(event) => this.setState({password:event.target.value})}/>
                        </FormGroup>
                    </Form>
                    <span style={{color:"red"}}>{this.state.errMess}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.login}>
                        CONNEXION
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default withRouter(withAuth(ModalConnexion));
