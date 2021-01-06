import React, { useState } from 'react';
import './Register.css';
import RoyalUILogo from '../asset/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="register">
      <div className="register__header">
        <img src={RoyalUILogo} alt=""/>
        <h4>New here?</h4>
        <h6>Signing up is easy. It only takes a few steps</h6>
      </div>

      <div className="register__form">
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" 
            type="text"
          />

          <select
            className="form-control" 
            value={country} 
            onChange={e => setCountry(e.target.value)} 
          >
            <option value="Country">Country</option>
            <option value="United States Of American">United States Of American</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="Germany">Germany</option>
            <option value="Argentina">Argentina</option>
          </select>

          <input
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" 
            type="text"
          />
          
          <label>
            <input type="checkbox"/>
            I agree to all Terms & Conditions
          </label>  

          <button className="btn-lg" type="submit">
                  SIGN UP
          </button>
        </form>
      </div>

      <p>Already have an account?
        <Link style={{textDecoration: 'none'}} to="/">
          <span className="register__login"> Login</span>
        </Link>
      </p>
    </div>
  );
}

export default Register;
