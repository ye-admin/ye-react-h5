import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { RouteWithSubRoutes, routes } from './router';

function App () {

  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
