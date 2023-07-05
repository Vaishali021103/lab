import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    email: "",
    confirmpass: ""
  });

  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        password: credentials.password,
        email: credentials.email,
        confirmpass: credentials.confirmpass
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      navigate("/login");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://stories.freepiklabs.com/api/vectors/sign-up/amico/render?color=407BFFFF&background=complete&hide="
                className="img-fluid" alt="Login form illustration" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="divider d-flex align-items-center my-2">
                  <p className="text-center fw-bold mx-3 mb-0">Please Fill out form to Register!</p>
                </div>

                {/* Name input */}
                <div className="form-outline  mb-3">
                  <label className="form-label" htmlFor="form3Example3">User Name</label>
                  <input type="text" id="form3Example3" className="form-control form-control-lg" name='name' value={credentials.name} onChange={onChange}
                    placeholder="Enter user name" />
                </div>

                {/* Email input */}
                <div className="form-outline  mb-3">
                  <label className="form-label" htmlFor="form3Example3">Email address</label>
                  <input type="email" id="form3Example3" className="form-control form-control-lg" name='email' value={credentials.email} onChange={onChange}
                    placeholder="Enter a valid email address" />
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">Password</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg" name='password' value={credentials.password} onChange={onChange}
                    placeholder="Enter password" />
                </div>

                <div className="form-outline">
                  <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
                  <input type="password" id="form3Example4" className="form-control form-control-lg" name='confirmpass' value={credentials.confirmpass} onChange={onChange}
                    placeholder="Confirm password" />
                </div>

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button type="submit" className="btn btn-light"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', borderRadius: '20px', borderColor: '#3399ff', width: '425px' }}>Register</button>
                  <label className="small fw-bold mt-2 pt-1 mb-0">Yes i have an account?</label>
                  <Link to="/login" className="small fw-bold mt-2 pt-1 mb-0">Login</Link>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

//<Link to="/login" className="small fw-bold mt-2 pt-1 mb-0">Yes i have an account? <a href="#!" className="link-danger">Login</a></Link>
