import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import HomePage from './AppPages/HomePage';
import SessionInfo from './AppPages/SessionInfo';
import EditPage from './AppPages/EditPage';
import Analyzer from './AppPages/Analyzer';
import AttendeeTabs from './AppPages/AttendeeTabs';
import SettingsPage from './AppPages/SettingsPage';

const AppRouter = () => (
    <HashRouter >
        <Switch>
            <Route exact path='/' >
                <HomePage />
            </Route>
            <Route exact path="/sessioninfo">
                <SessionInfo />
            </Route>
            <Route exact path="/editpage">
                <EditPage />
            </Route>
            <Route exact path="/analyzer">
                <Analyzer />
            </Route>
            <Route exact path="/tabspage">
                <AttendeeTabs />
            </Route>
            <Route exact path="/settings">
                <SettingsPage />
            </Route>
        </Switch>
    </HashRouter>
)

export default AppRouter;