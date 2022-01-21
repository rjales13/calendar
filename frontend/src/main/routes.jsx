import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  HashRouter,
  Switch,
} from "react-router-dom";

import Calendar from "../calendar/calendar";
import Notes from "../notes/notes";

const Routes = (props) => (
  <Router history={HashRouter}>
    <Switch>
      <Route exact path="/" component={Calendar} />
      <Route path="/notes" component={Notes} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default Routes;
