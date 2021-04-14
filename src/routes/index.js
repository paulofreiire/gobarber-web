import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Appointment from "~/pages/Appointment";

export default function Routes() {
    return (
        <Switch>
            <Route path="/register" component={SignUp}/>
            <Route path="/" exact component={SignIn}/>

            <Route path="/dashboard" component={Dashboard} isPrivate/>
            <Route path="/appointments" component={Appointment} isPrivate/>
            <Route path="/profile" component={Profile} isPrivate/>
        </Switch>
    );
}
