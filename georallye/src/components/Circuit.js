import React, { Component } from 'react'
import '../App.css';
import Sidebar from "react-sidebar";

class Circuit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
    
      onSetSidebarOpen() {
        if(this.state.sidebarOpen===false)
            this.setState({ sidebarOpen: true })
        else
            (this.setState({ sidebarOpen: false }));
      }
    
      render() {
        return (
          <Sidebar
            sidebar={<b>Sidebar content</b>}
            docked={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
            pullRight
          >
            <button onClick={() => this.onSetSidebarOpen()}>
              Open sidebar
            </button>
          </Sidebar>
        );
      }
    }

export default Circuit;
