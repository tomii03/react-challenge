import { Button } from './../components/Button';
import './../styles/app.css';

function App() {
  return (
    <div className="App d-flex">
      <div className="container">
        <div className="row min-vh-100">
          <div className="col-6 m-auto">
            <Button onClick={() => alert("ACA")}> Cargar Información </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
