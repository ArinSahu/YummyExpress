import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.error);
    } else {
      navigate("/loginuser");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
     <>
        <div><Navbar /></div>
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 text-success">Create a New Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={credentials.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" value={credentials.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={credentials.password} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" name="geolocation" className="form-control" value={credentials.geolocation} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account?</span>
          <Link to="/loginuser" className="btn btn-link text-decoration-none">Login</Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
