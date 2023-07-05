import './App.css';
import { CartProvider } from './components/ContextReducer';
import Home from './screens/Home';
import Login from './screens/Login';
// import MyOrder from './screens/MyOrder';
import Signup from './screens/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <CartProvider>
      <Router>
      <div> 
        <Routes>
          <Route exact path='/' element = {<Home/>}></Route>
          <Route exact path='/login' element = {<Login/>}></Route>
          <Route exact path='/createuser' element = {<Signup/>}></Route>
          {/* <Route exact path='/myorder' element = {<MyOrder/>}></Route> */}

          </Routes> </div>
    </Router>
    </CartProvider>  
  );
}

export default App;
