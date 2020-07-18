import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from "./containers/NotFound";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Signup from "./containers/Signup";
import ResendConfirmationEmail from "./containers/ResendConfirmationEmail";
import Settings from "./containers/Settings";
import NewNote from "./containers/NewNote";

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/signup'>
                <Signup />
            </Route>
            <Route exact path='/login'>
                <Login />
            </Route>
            <Route exact path='/login/resend'>
                <ResendConfirmationEmail />
            </Route>
            <Route exact path='/login/reset'>
                <ResetPassword />
            </Route>
            <Route exact path='/settings'>
                <Settings />
            </Route>
            <Route exact path='/settings/password'>
                <ChangePassword />
            </Route>
            <Route exact path='/settings/email'>
                <ChangeEmail />
            </Route>
            <Route exact path='/notes/new'>
                <NewNote />
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}