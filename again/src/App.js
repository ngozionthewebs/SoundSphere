import SoundNavBar from "./navbarBS"
import Homepage from './homepage';

function App() {
  return (
    <div className="App">
      <SoundNavBar/>
      <div className="content">
        <Homepage/>
      </div>
    </div>
  );
}

export default App;

