import SoundNavBar from "./navbarBS"
import Homepage from './homepage';
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";
import Comparison from "./Comparison";
import Timeline from "./Timeline";

function App() {
  return (
    <Router>
        <div className="App">
          <SoundNavBar/>
          <div className="content">

            <Switch>
              <Route exact path="/">
                <Homepage/>
              </Route>

              <Route path="/comparison">
                <Comparison/>
              </Route>

              <Route path="/timeline">
                <Timeline/>
              </Route>


            </Switch>

          </div>
        </div>
    </Router>
  );
}

export default App;

