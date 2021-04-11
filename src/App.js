import { Link, Route } from 'react-router-dom';
import './App.css';
import { Home, Alert }  from './components';

function App() {
  return (
    <div className="App">
        <div className="container text-center">
            <Link to="/" className="btn btn-link"> Single Alerts </Link>
        </div>
        <div className="jumbotron p-4">
          <div className="container text-center">
            <Alert />
            <Route exact path="/" component={Home} />
          </div>
        </div>
    </div>
  );
}

export default App;
