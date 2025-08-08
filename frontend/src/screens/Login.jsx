import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://yummyexpress-backend.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh", backgroundColor: 'white' }}>
      <Navbar />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'white' }}>
        <div className="container mt-5">
          <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px", backgroundColor: 'whitesmoke' }}>
            <h3 className="text-center mb-4 text-warning">Login to Your Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark">Email address</label>
                <input type="email" name="email" className="form-control" value={credentials.email} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password</label>
                <input type="password" name="password" className="form-control" value={credentials.password} onChange={onChange} required />
              </div>
              <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
            <div className="text-center mt-3 text-dark">
              <span>Don't have an account?</span>
              <Link to="/createuser" className="btn btn-link text-decoration-none text-warning">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
