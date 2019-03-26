import React from 'react';

import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';

import { routes } from './routes';

import axios from 'axios';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            user: {},
            token: {},
            loading: false,
        };
    }
    fetchAuthUser = async token => {
        this.setState({ loading: true });
        try {
            const response = await axios('/api/auth/user', {
                method: 'GET',
                params: { auth_token: token.auth_token },
            });
            if (!this.state.user) {
                return;
            }
            this.storeAuthToken(JSON.stringify(token));
            this.setState({
                authenticated: true,
                token,
                loading: false,
                user: response.data,
            });
        } catch (error) {
            this.setState({ loading: false, authenticated: false });
        }
    };

    signOutUser = async () => {
        if (!this.state.authenticated) {
            return;
        }
        try {
            await axios.post('/api/auth/signOutUser');

            this.setState({
                authenticated: false,
            });
            window.localStorage.removeItem('token');
        } catch (error) {}
    };

    storeAuthToken = tokenString => {
        window.localStorage.setItem('token', tokenString);
    };
    /**
     * @param{object}
     */
    authenticateUser = async token => {
        if (!token) {
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${
            token.auth_token
        }`;

        await this.fetchAuthUser(token);
    };

    async componentDidMount() {
        const token = JSON.parse(window.localStorage.getItem('token'));

        await this.authenticateUser(token);
    }

    render() {
        const { authenticated, loading } = this.state;

        if (loading) {
            return 'loading...';
        }
        return (
            <Router>
                <Switch>
                    {routes.map((route, key) => (
                        <Route
                            key={key}
                            exact
                            path={route.path}
                            // component={route.component}
                            render={componentProps => {
                                if (route.auth) {
                                    if (!authenticated) {
                                        return <Redirect to="/signin" />;
                                    }
                                }
                                if (!route.auth) {
                                    if (authenticated) {
                                        return <Redirect to="/home" />;
                                    }
                                }

                                const View = route.component;
                                return (
                                    <View
                                        {...componentProps}
                                        pageProps={{
                                            signOutUser: this.signOutUser,
                                            authenticateUser: this
                                                .authenticateUser,
                                        }}
                                    />
                                );
                            }}
                        />
                    ))}
                </Switch>
            </Router>
        );
    }
}
export default Admin;
