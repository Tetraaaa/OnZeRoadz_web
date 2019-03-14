import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Modal } from 'react-bootstrap';

class ModalInscription extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            lastname: "",
            firstname: "",
            username: "",
            email: "",
            password1: "",
            password2: "",
            errMess: ""
        }
    }

    signup = () => 
    {
        if (this.state.password1 === this.state.password2)
        {
            let details = {
                lastname: this.state.lastname,
                firstname: this.state.firstname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password1,
            }
            fetch("https://www.api.onzeroadz.fr/index.php/signup", {
                "method": "POST",
                "credentials": "include",
                "body": JSON.stringify(details),
                headers:{
                    "Content-Type":"application/json"
                }
            })
                .then(response =>
                {
                    if (response.ok)
                    {
                        this.props.close()
                    }
                    else
                    {
                        this.setState({ errMess: "Une erreur est survenue lors de l'inscription" })
                    }
                })
                .catch(error =>
                {
                    this.setState({ errMess: "Une erreur est survenue lors de l'inscription" })
                })
        }
        else
        {
            this.setState({ errMess: "Les deux mots de passe ne correspondent pas" })
        }

    }

    render()
    {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title >INSCRIPTION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <FormControl type="text" name="lastname" placeholder="Nom" value={this.state.lastname} onChange={(event) => this.setState({lastname:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name="firstname" placeholder="Prénom" value={this.state.firstname} onChange={(event) => this.setState({firstname:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name="pseudo" placeholder="Nom d'utilisateur" value={this.state.username} onChange={(event) => this.setState({username:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="mail" name="email" placeholder="Adresse email" value={this.state.email} onChange={(event) => this.setState({email:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="password" placeholder="Mot de passe" value={this.state.password1} onChange={(event) => this.setState({password1:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" name="rePassword" placeholder="Confirmez votre mot de passe" value={this.state.password2} onChange={(event) => this.setState({password2:event.target.value})}/>
                        </FormGroup>
                    </Form>
                    <span style={{ color: "red" }}>{this.state.errMess}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.signup}>
                        S'INSCRIRE
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalInscription;