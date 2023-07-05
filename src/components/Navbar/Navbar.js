// import { hover } from '@testing-library/user-event/dist/hover'
import React, { useState } from 'react';
import "./Navbar.css";
import Badge from 'react-bootstrap/Badge'
import logo from "../../images/logo1.png"
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../../Modal';
import Cart from '../../screens/Cart';
import { useCart } from '../ContextReducer';


export default function Navbar(props) {
  let data = useCart();
  const [ cartView, setCartView]= useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <header>
      <nav>
  <div className="logo">
    <img src={ logo } alt="Logo" width="55px" />
    <div className="tracker">
      <p className="labtracker">
        Lab
        <br />
        Tracker
      </p>
    </div>

    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contact">ContactUs</Link></li>
      {/* <li><Link to="/orderData">MyProfile</Link></li> */}
    </ul>
    <div className="space">
      <p className="spacebar"></p>
    </div>

    {(!localStorage.getItem("authToken"))?
    <div className="regi">
      <form>
        <Link to="/createuser" className="signup">Sign Up</Link>
        <Link to="/login" className="login">Login</Link>
      </form>
  </div>:
  <div className="regi">
      <ul>
      <li><div className="signup" onClick={()=>{setCartView(true)}}>My Cart  {""}
      <Badge pill bg='danger'> {data.length} </Badge>   </div></li>
      {cartView ? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>: ""}
      <li><Link className="login" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  }
    
  </div>
</nav>
      </header>
    </div>
  )
}
