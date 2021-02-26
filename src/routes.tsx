import React from 'react';

import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import {isAuthenticated} from './auth';

import login from './pages/Login';
import resetPassword from './pages/Login/resetPassword';
import menu from './pages/menu';

import users from './pages/users'
import newUser from './pages/users/newUser'

// Montagem Externa
import solicitacaoMontagem from './pages/montagemExterna/novaSolicitacaoMontagem/index';
import solicitacoesMontagem from './pages/montagemExterna/solicitacoesMontagem';

// Manutenção Interna
import Manutencoes from './pages/manutencaoInterna/solicitacoes';
import NovaManutencao from './pages/manutencaoInterna/novaSolicitacao'


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
            <Route exact path="/resetPassword/:userID" component={resetPassword} />


            <PrivateRoute exact path="/menu" component={menu} />

            {/* Usuários */}
                <PrivateRoute exact path="/users" component={users} />
                <PrivateRoute exact path="/newUser" component={newUser} />
                <PrivateRoute exact path="/newUser/:userID" component={newUser} />

            {/* Montagem Externa */}
                <PrivateRoute exact path="/solicitacaoMontagem" component={solicitacaoMontagem} />
                <PrivateRoute exact path="/solicitacoesMontagem" component={solicitacoesMontagem} />
                <PrivateRoute exact path="/solicitacaoMontagem/:idMount" component={solicitacaoMontagem} />

            {/* Manutenção Interna */}
                <PrivateRoute exact path="/manutencaoInterna" component={Manutencoes}/>
                <PrivateRoute exact path="/manutencaoInterna/new" component={NovaManutencao}/>
                <PrivateRoute exact path="/manutencaoInterna/:id" component={NovaManutencao}/>
            
        </Switch>
    </BrowserRouter>
    );
}

export default Routes;