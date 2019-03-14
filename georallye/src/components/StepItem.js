import React, { Component } from 'react';
import { checkStatus } from '../resources/utils';

export default class StepItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null
        };
    }

    componentDidMount(){
        fetch(URL.step+"/"+this.props.stepId, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(checkStatus)
        .then((res) => res.json())
        .then((json) => this.setState({
            name : json.name 
        }))
        .catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                Etape: {this.state.name ? this.state.name : this.props.stepId}
            </div>
        )
    }
}
