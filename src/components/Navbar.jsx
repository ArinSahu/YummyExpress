import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export default function Navbar(props) {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate("/loginuser")
    }

    const items = useCart();

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top" style={{zIndex:'30',backgroundColor: 'white', boxShadow: '0px 4px 14px rgba(0,0,0,0.3)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fst-italic text-warning" to="/" style={{ fontWeight: 600 }}>
                        YummyExpress
                    </Link>

                    <button
                        className="navbar-toggler text-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-black fs-5 mx-2" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("authToken") && (
                                <li className="nav-item">
                                    <Link className="nav-link text-black fs-5 mx-2" to="/myorder">My Orders</Link>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center">
                            {!localStorage.getItem("authToken") ? (
                                <>
                                    <Link className="btn btn-outline-warning mx-2" to="/loginuser">Login</Link>
                                    <Link className="btn btn-outline-warning mx-2" to="/createuser">Signup</Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-warning text-dark position-relative mx-2"
                                        onClick={() => setCartView(true)}
                                    >
                                        <Badge color="secondary" badgeContent={items.length}>
                                            <ShoppingCartIcon />
                                        </Badge>
                                        <span className="ms-1">Cart</span>
                                    </button>

                                    {cartView && <Modal onClose={() => setCartView(false) }><Cart /></Modal>}

                                    <button onClick={handleLogout} className="btn btn-outline-dark mx-2">Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
