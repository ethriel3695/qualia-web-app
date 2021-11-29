import logo from './logo.svg';
import './App.css';
import { Weather } from './Weather';

function App() {
  return (
    <div className="App">
      <div>
        <Weather logo={logo} />
      </div>
    </div>
  );
}

export default App;
