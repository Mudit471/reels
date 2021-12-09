import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import Signup from './Components/Signup';
import Login from './Components/Login'
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed';
function App() {

  return (
    // <AuthProvider>
    //   <div className="App">
    //     <Signup />
    //   </div>
    // </AuthProvider>
    // // <Ioa />
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path = '/' component = {Feed}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/signup' component = {Signup}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
