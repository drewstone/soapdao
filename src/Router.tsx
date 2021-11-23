import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';

export default function Routers(props) {
  return (
    <Router>
			{ props.children }
			<Switch>
        <Route exact path="/">
          <Home {...props}/>
        </Route>
			</Switch>
    </Router>
  );
}