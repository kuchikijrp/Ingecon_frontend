import React from 'react';

import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import {isAuthenticated} from './auth';

import login from './components/Login';
import menu from './pages/menu';

// Montagem Externa
import solicitacaoMontagem from './pages/solicitacaoMontagem';
import solicitacoesMontagem from './pages/solicitacoesMontagem';


interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    // isSignedIn: boolean;
    // isAuthenticated: boolean;
    exact: true; 
    path: string; 
    // component: FC<{}>;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;

    return (
        
        <Route
        {...rest}
        render={(routeProps) =>
            isAuthenticated() ? (
                <Component {...routeProps} />
                ) : (
                    <Redirect
                    to={{
                        pathname: '/',
                        state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};

// const PrivateRoute = ((props: PrivateRouteProps) => { component: Component, ...rest}) =>(
//     <Route {...rest} render={props =>(
//         isAuthenticated() ? (
//             <Component { ...props} />
//         ):(
//             <Redirect to={{pathname: '/'}} />
//         )
//     )} />
// )

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
        <Switch>

            <Route exact path="/" component={login} />
            <PrivateRoute exact path="/menu" component={menu} />

            {/* Montagem Externa */}
            <PrivateRoute exact path="/solicitacaoMontagem" component={solicitacaoMontagem} />
            <PrivateRoute exact path="/solicitacoesMontagem" component={solicitacoesMontagem} />

        </Switch>
    </BrowserRouter>
    );
}

export default Routes;