import React from 'react';

import { HashRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import { routes } from './routes';

import axios from 'axios';


class Admin extends React.Component{ 
    constructor(props){
        super(props);

        this.state = {
            authenticated:false,
            user: {},
            token:{},
        };
    }
    fetchAuthUser = async token => {
        try{
            const response = await axios ('/api/auth/user',{
                method: 'GET',
                params:{ token: token.auth_token },
            })

            this.setState({user:response.data});
        }catch(error){}
       
    };
    authenticateUser = async token => {
        if(!token){
            return;
        }
        await this.fetchAuthUser(token);
        this.setState({
            authenticated:true,
            token,
        });
           
    };

    render(){
        const { authenticated } = this.state;
        return(
            <Router>
       
                <Switch>
                    {routes.map((route,key)=>(
                        <Route 
                           
                            key={key}
                            exact
                            path={route.path}
                           // component={route.component} 
                            render={componentProps => {
                                if(route.auth){
                                    if(!authenticated){
                                        return <Redirect to='/signin' />
                                    }
                                }
                                if(!route.auth){
                                    if(authenticated){
                                        return <Redirect to='/home' />
                                    }
                                }


                                const View = route.component;
                                return (
                                    <View  
                                        {...componentProps}
                                        pageProps={{
                                            authenticateUser: this.authenticateUser,
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