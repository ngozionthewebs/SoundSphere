import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useAuthToken from './Auth';
import SoundNavBar from './navbarBS';
import Homepage from './homepage';
import Comparison from './Comparison';
import Timeline from './Timeline';

function App() {
  const accessToken = useAuthToken(); // Call the custom hook to get the token

  return (
    <Router>
      <div className="App">
        <SoundNavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/comparison">
              {/* Pass accessToken as a prop to Comparison */}
              <Comparison accessToken={accessToken} />
            </Route>
            <Route path="/timeline">
              <Timeline />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
