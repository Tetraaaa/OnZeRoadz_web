import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from "./components/Menu";
import MenuCo from "./components/MenuCo";
import Home from "./components/Home";
import Space from "./components/Space";
import Circuit from './components/Circuit';
import MyCircuits from './components/MyCircuits';
import Recapitulatif from './components/Recapitulatif';

class App extends Component
{

    componentDidMount()
    {
        this.whoami()
    }

    whoami = () =>
    {
        let currentUser = localStorage.getItem("username");
        if(currentUser)
        {
            fetch("https://www.api.onzeroadz.fr/index.php/whoami", {
                "credentials":"include"
            })
            .then(response => {
                if(response.ok)
                {
                    response.text().then(text => console.log(text))
                    response.json().then(json => {
                        localStorage.setItem("username", json)
                    })
                }
                else
                {
                    localStorage.setItem("username", null);
                }
            })
            .catch(error => {
                localStorage.setItem("username", null);
            })
        }
        
    }
    render()
    {
        return (
            <Router>
                <div>
                    { localStorage.getItem("username") ? <MenuCo/> : <Menu/>}
                    <Route exact path="/" component={Home} />
                    <Route path="/space" component={Space} />
                    <Route path="/circuit" component={Circuit} />
                    <Route path="/circuits" component={MyCircuits} />
                    <Route path="/recapitulatif" component={Recapitulatif} />
                </div>
            </Router>

        );
    }

}


export default App;


