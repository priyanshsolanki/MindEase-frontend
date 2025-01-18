import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardContainer from './components/DashboardContainer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        <Route path="/">
          {isLoggedIn ? <DashboardContainer /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;