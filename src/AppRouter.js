import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import HomePage from "./screens/home/HomeScreen";
import SessionInfo from "./screens/sessionInfo/SessionInfoScreen";
import EditPage from "./screens/editAttendee/EditAttendeeScreen";
import Analyzer from "./screens/session/SessionScreen";
import AttendeeTabs from "./screens/attendance/AttendeeTabs";
import SettingsPage from "./screens/settings/SettingsScreen";
import AboutPage from "./screens/about/AboutScreen";

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/">
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
      <Route exact path="/about">
        <AboutPage />
      </Route>
    </Switch>
  </HashRouter>
);

export default AppRouter;
