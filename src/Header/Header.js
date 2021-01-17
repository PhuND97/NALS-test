import React, { useState } from 'react';
import './Header.css';
import RoyalUILogo from '../asset/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';

function Header() {
  const dispatch = useDispatch();
  const positionMenu = {
    mouseX: null,
    mouseY: null,
  };
  const [state, setState] = useState(positionMenu);

  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.currentTarget.getBoundingClientRect().left,
      mouseY: event.currentTarget.getBoundingClientRect().bottom,
    });
  };

  const handleClose = () => {
    setState(positionMenu);
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
        <Avatar onClick={handleClick}/>
        <Menu
          open={state.mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={ 
            state.mouseY !== null && state.mouseX !== null
              ? { top: state.mouseY, left: state.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logoutOfApp}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
