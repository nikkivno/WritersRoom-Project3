import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import EyeClose from '../images/eye-close.png'
import EyeOpen from '../images/eye-open.png';

import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    }else if (name === 'email1') {
      setEmail1(value);
    } else if (name === 'password1') {
      setPassword1(value);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      //   alert with error
      if (response.status === 400) {
        alert(data.message);
      }

      //   if successful login, change page & set token
      if (response.status === 200) {
        console.log('Success logging in.');
        localStorage.setItem('jwt', data.token);
        history.push('/newwork');
      }
    } catch (error) {
      console.log('Error logging in: ', error);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email1,
          password: password1,
        }),
      });

      const data = response.json();

      //   alert user with error
      if (response.status === 400 || response.status === 409) {
        alert(data.message);
      }

      //   if successful, change page
      if (response.status === 200) {
        console.log('Success registering.');
        localStorage.setItem('jwt', JSON.stringify(data.token));
        history.push('/newwork');
      }
    } catch (error) {
      console.log('Error registering in: ', error);
    }
  };


  // password Visibility code

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <div>
      <div className="mainContainer">

        {/* Login Form */}
        <div className="login">
          <h1>Login</h1>
          <form id="loginform" onSubmit={handleLoginSubmit}>
            <input
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <div className='input-box'>
            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id='passwordIcon'
              required
            />
            {/* <img src={EyeClose} id='eyeicon'/> */}
            <img
              src={showPassword ? EyeOpen : EyeClose}
              id='eyeicon'
              onClick={togglePasswordVisibility}
            />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className="signup">
          <h1>Sign Up</h1>
          <form id="signupform" onSubmit={handleRegisterSubmit}>
            <input
              value={firstName}
              name="firstName"
              onChange={handleInputChange}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              name="lastName"
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              value={email1}
              name="email1"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <div className='input-box'>
            <input
              value={password1}
              name="password1"
              onChange={handleInputChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id='password1'
              required
            />
            <img
              src={showPassword ? EyeOpen : EyeClose}
              id='eyeicon'
              onClick={togglePasswordVisibility}
            />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
