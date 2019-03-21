import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom';

import { routes } from './routes';


const App = props => (
    <Router>
        <>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/categories">Categories List</Link>
                </li>
            </ul>
        <Switch>
           {routes.map((route,key)=>(
               <Route 
                   key={key}
                   exact
                   path={route.path}
                   component={route.component} 
               />
           ))}
        </Switch>

        </>
    </Router>
);


if(document.querySelector('#root')){
    ReactDom.render(<App />,document.querySelector('#root'));

}