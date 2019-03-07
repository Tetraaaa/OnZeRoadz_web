import React, { Component, createContext } from 'react';

const AuthContext = createContext();

class AuthContextProvider extends Component {

    componentDidMount() {
        this.whoami();
    }

    whoami = () => {
        fetch("https://www.api.onzeroadz.fr/index.php/whoami", {
            credentials:"include"
            // headers:{
            //     Authentication:"Bearer " + window.localStorage.getItem('token')
            // }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('whoami error');
            }
        })
        .then((json) => {
            this.setState({ username: json.username, userChecked: true });
        })
        .catch((error) => {
            this.setState({ userChecked: true });
        });
    };

    signin = (credentials) => {
        return fetch("https://www.api.onzeroadz.fr/index.php/login", {
            method:"POST",
            credentials:"include",
            body:JSON.stringify(credentials),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('auth failure');
            }
        })
        .then((json) => {
            this.setState({ username: json.username });
            // window.localStorage('token', json.token);
        });
    };

    signout = () => {
        return new Promise((resolve, reject) => {
            this.setState({ username: null }, () => { resolve(); });
            // window.localStorage.removeItem('token');
        });
    };

    state = {
        username: null,
        signin: this.signin,
        signout: this.signout,
        userChecked: false
    };

    render() {
        return !this.state.userChecked ?
            'Loading...' :
            <AuthContext.Provider value={this.state}>
                { this.props.children }
            </AuthContext.Provider>;
    }
}

export default AuthContextProvider;

export const withAuth = (Component) => (props) => {
    return <AuthContext.Consumer>
        { (auth) => {
            return <Component {...props} auth={auth} />;
        }}
    </AuthContext.Consumer>;
};
