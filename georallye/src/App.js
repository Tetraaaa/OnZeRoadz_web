import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Menu from "./components/Menu";
import MenuCo from "./components/MenuCo";
import Home from "./components/Home";
import Space from "./components/Space";
import Circuit from './components/Circuit';
import MyCircuits from './components/MyCircuits';
import Recapitulatif from './components/Recapitulatif';
import { withAuth } from './components/AuthContext';

class App extends Component
{
    render()
    {
        return (
                <div>
                    { this.props.auth.username ? <MenuCo/> : <Menu/> }
                    <Route exact path="/" component={Home} />
                    <Route path="/space" component={Space} />
                    <Route path="/circuit" component={Circuit} />
                    <Route path="/circuits" component={MyCircuits} />
                    <Route path="/recapitulatif" component={Recapitulatif} />
                </div>
        );
    }

}

export default withAuth(App);
