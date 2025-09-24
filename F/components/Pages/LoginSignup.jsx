import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export default function LoginSignup() {
  const [state, setState] = useState("Log In");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("execution of login function", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("./");
    }
    else{
      alert(responseData.errors)
    }
  }
  const signup = async () => {
    console.log("exrcution of signup function", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("./");
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeandler} type="text" placeholder='Your Username' /> : <></>}
          <input name='email' value={formData.email} onChange={changeandler} type="email" placeholder='Your Email Address' />
          <input name='password' value={formData.password} onChange={changeandler} type="password" placeholder='Your Password' />
        </div>
        <button onClick={() => { state === "Log In" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account <span onClick={() => { setState('Log In') }}>Log In Here</span> </p> :
          <p className='loginsignup-login'>Create an Acount <span onClick={() => { setState("Sign Up") }}>Click Here</span> </p>}
        <div className='loginsignup-agree'>
          <input type="checkbox" />
          <p>I agree with terms and conditions</p>
        </div>
      </div>
    </div>
  )
}
