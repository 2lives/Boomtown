import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from '../containers/Login';
import Items from '../containers/Items';
import Profile from '../containers/Profile';
import NotFound from '../containers/NotFound';
import Share from '../containers/Share';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Items} />
            <Route path="/profile/:itemownerId" component={Profile} />
            <Route path="/share" component={Share} />
            <Route path="/*" component={NotFound} />
        </Switch>
    );
};

export default Routes;
