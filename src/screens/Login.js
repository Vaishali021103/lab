import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="divider d-flex align-items-center my-2">
                  <p className="text-center fw-bold mx-3 mb-0">Welcome Back!</p>
                </div>

                {/* Name input */}
                <div className="form-outline  mb-3">
                  <label className="form-label" htmlFor="form3Example3">Email I'd</label>
                  <input type="text" id="form3Example3" className="form-control form-control-lg" name='email' value={credentials.email} onChange={onChange}
                    placeholder="Enter email i'd" />
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg" name='password' value={credentials.password} onChange={onChange}
                    placeholder="Enter password" />
                </div>

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button type="submit" className="btn btn-light"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', borderRadius: '20px', borderColor: '#3399ff', width: '425px' }}>Login</button>
                  <label className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?</label>
                  <Link to="/createuser" className="small fw-bold mt-2 pt-1 mb-0">Register</Link>
                </div>
              </form>
            </div>
            <div className="col-md-9 col-lg-6 col-xl-5  offset-xl-1">
              <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?size=626&ext=jpg" style={{ width: '70%' }}
                className="img-fluid" alt="Login form illustration" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
