import SideBar from './components/navigation/SideBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import FOUROFOUR from './pages/FOUROFOUR';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Router>
        <SideBar />
        <Route exact path="/" render={() => <DataEntry />} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route exact path="*" render={() => <FOUROFOUR />} /> 
      </Router>
    </div>
  );
}

export default App;
