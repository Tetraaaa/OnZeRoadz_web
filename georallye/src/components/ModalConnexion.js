import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import { Modal, Form, Button, FormControl, FormGroup } from 'react-bootstrap';

class ModalConnexion extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            login:"",
            password:"",
            errMess:"",
            loginSuccessful:false
        }
    }

    login = () =>
    {
        this.setState({errMess:""})
        let details = 
        {
            "username": this.state.login,
            "password": this.state.password
        }
        fetch("https://www.api.onzeroadz.fr/index.php/login", {
            "method":"POST",
            "credentials":"include",
            "body":JSON.stringify(details),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response => {
            if(response.ok)
            {
                response.json().then(json => {
                    localStorage.setItem("username", json.username)
                })
                this.props.close()
            }
            else
            {
                this.setState({errMess:"Nom de compte ou mot de passe incorrect"})
            }
        })
        .catch(error => {
            this.setState({errMess:"Nom de compte ou mot de passe incorrect"})
        })
    }

    render()
    {
        if(this.state.loginSuccessful) return <Redirect to="/"/>
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

export default ModalConnexion;