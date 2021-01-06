import React, { useState } from 'react';
import './Login.css';
import RoyalUILogo from '../asset/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUserName] =useState('');
  const [password, setPassword] =useState('');

  const login = async (e) => {
    e.preventDefault();

    await fetch('', {
      method: 'POST',
      body: {
        username: username,
        password: password
      }
    });
  };

  return (
    <div className="login">
      <div className="login__header">
        <img src={RoyalUILogo} alt=""/>
        <h4>Hello! let&apos;s get started</h4>
        <h6>Sign in to continue.</h6>
      </div>

      <div className="login__form">
        <form>
          <input 
            className="form-control"
            value={username}
            onChange={e => setUserName(e.target.value)}
            placeholder="Username" 
            type="text"
          />

          <input
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" 
            type="text"
          />

          <button className="btn-lg" type="submit" onClick={login}>
                SIGN IN
          </button>
        </form>
      </div>

      <div className="login__keep__forgot">
        <label>
          <input type="checkbox"/>
              Keep me sign in
        </label>
        <a href="">Forgot password?</a>
      </div>

      <button className="login__usingfb">
            Connect using facebook
      </button>

      <p>Don&apos;t have an account?
        <Link style={{textDecoration: 'none'}} to="/register">
          <span className="login__create"> Create</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
