import { useState } from 'react'
import './App.css'
import Home from './screens/Home'
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrders from './screens/MyOrders.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
      <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/loginuser" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myorder" element={<MyOrders/>} />
        </Routes>
      </div>
    </Router> 
      </CartProvider>
  )
}

export default App
