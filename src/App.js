import './App.css';
import AuthProvider from './Context/AuthProvider';
import Signup from './Components/Signup';
import Main from './MaterialUI/Main';
import Ioa from './Components/Ioa';
function App() {
  return (
    // <AuthProvider>
    //   <div className="App">
    //     <Signup />
    //   </div>
    // </AuthProvider>
    <Ioa />
  );
}

export default App;
