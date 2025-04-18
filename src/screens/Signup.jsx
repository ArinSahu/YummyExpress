import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Signup() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json=await response.json()
        console.log(json);
        if(!json.success){
            alert("enter valid credentials");
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" name='email' value={credentials.email}onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation}  onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/loginuser" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </>

    )
}
