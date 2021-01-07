import React, { useState } from 'react';
import './Login.css';
import RoyalUILogo from '../asset/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
  const [username, setUserName] =useState('');
  const [password, setPassword] =useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const loginToApp = async (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(username, password)
      .then(userAuth => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          username: userAuth.user.username,
          country: userAuth.user.country,
        }));
      })
      .then(() => {
        history.push('/table');
      }).catch(error => alert(error));

    console.log('success');
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
            type="password"
          />

          <span className="btn-lg" onClick={loginToApp}>
                SIGN IN
          </span>
        </form>
      </div>

      <div className="login__keep__forgot">
        <label>
          <input type="checkbox"/>
            &nbsp;Keep me sign in
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
