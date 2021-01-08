import React, { useState } from 'react';
import './Register.css';
import RoyalUILogo from '../asset/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { login } from '../features/userSlice';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerm, setAgreeTerm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const register = () => {
    if (!agreeTerm) {
      return alert('Please tick Agree all Terms and Conditions!');
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user.updateProfile({
          username: username,
          country: country,
        })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                username: username,
                country: country,
              }));
          });
      })
      .then(() => {
        history.push('/');
      }).catch(error => alert(error));
  };

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
            type="password"
          />
          
          <label>
            <input 
              type="checkbox"
              onChange={e => setAgreeTerm(e.target.checked)}
            />
                &nbsp;I agree to all Terms & Conditions
          </label>  

          <button className="btn-lg" onClick={register}>
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
