import SideBar from './components/navigation/SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import FOUROFOUR from './pages/FOUROFOUR';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Router>
        <SideBar />
        <Switch>
          <Route exact path="/" render={() => <DataEntry />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route render={() => <FOUROFOUR />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
