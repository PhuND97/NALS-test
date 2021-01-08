import React from 'react';
import './Header.css';
import RoyalUILogo from '../asset/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';

function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className='header'>
      <div className="header__left">
        <img 
          src={RoyalUILogo} />
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search now" type="text"/>
        </div>
      </div>
      <div className="header__right">
        <Avatar onClick={logoutOfApp}/>
      </div>
    </div>
  );
}

export default Header;
