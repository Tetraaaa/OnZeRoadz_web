import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from "./components/Menu";
import MenuCo from "./components/MenuCo";
import Home from "./components/Home";
import Space from "./components/Space";
import Circuit from './components/Circuit';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          {/*TODO : if co alors Menu sinon MenuCo*/}
          {/* <Menu /> */}
          <MenuCo />
          <Route exact path="/" component={Home} />
          <Route path="/space" component={Space} />
          <Route path="/circuit" component={Circuit} />
        </div>
      </Router>

    );
  }

}


export default App;


