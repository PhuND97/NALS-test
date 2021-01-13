import React, { useState } from 'react';
import './Header.css';
import RoyalUILogo from '../asset/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((open) => !open);
  };

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
        <Avatar onClick={handleToggle}/>
        <Dropdown drop='down' show={open}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleToggle}>Settings</Dropdown.Item>
            <Dropdown.Item onClick={logoutOfApp}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
