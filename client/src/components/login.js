import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EyeClose from '../images/eye-close.png';
import EyeOpen from '../images/eye-open.png';
import '../styles/login.css';
import AuthService from '../utils/auth';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'loginEmail') {
      setLoginEmail(value);
    } else if (name === 'loginPassword') {
      setLoginPassword(value);
    } else if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'signUpEmail') {
      setSignUpEmail(value);
    } else if (name === 'signUpPassword') {
      setSignUpPassword(value);
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
          email: loginEmail.toLowerCase(),
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 400) {
        alert(data.message);
      } else if (response.status === 200) {
        console.log('Success logging in.');
        AuthService.login(data.token, data._id);
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
          email: signUpEmail,
          password: signUpPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 400 || response.status === 409) {
        alert(data.message);
      } else if (response.status === 200) {
        console.log('Success registering.');
        AuthService.login(data.token, data._id);
      }
    } catch (error) {
      console.log('Error registering: ', error);
    }
  };

  return (
    <div>
      <div className="mainContainer">
        <div className="login">
          <h1>Login</h1>
          <form id="loginform" onSubmit={handleLoginSubmit}>
            <input
              value={loginEmail}
              name="loginEmail"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <div className="input-box">
              <input
                value={loginPassword}
                name="loginPassword"
                onChange={handleInputChange}
                type={showLoginPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <img
                src={showLoginPassword ? EyeOpen : EyeClose}
                id="eyeicon"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              />
            </div>
            <button type="submit">log in</button>
          </form>
        </div>
        <div className="vertical-divider"></div>
        <div className="signup">
          <h1>sign up</h1>
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
              value={signUpEmail}
              name="signUpEmail"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              required
            />
            <div className="input-box">
              <input
                value={signUpPassword}
                name="signUpPassword"
                onChange={handleInputChange}
                type={showSignUpPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <img
                src={showSignUpPassword ? EyeOpen : EyeClose}
                id="eyeicon"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
              />
            </div>
            <button type="submit">sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
