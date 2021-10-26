import logo from "./logo.svg";
import "./App.css";
import GoogleMap from "./components/GoogleMap";

function App() {
  return (
    <div className="App">
      <h1>Test</h1>

      <div className="mapSection">
        <GoogleMap />
      </div>
    </div>
  );
}

export default App;
