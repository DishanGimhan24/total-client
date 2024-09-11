import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ProfileIcon from '../assets/images/profile.png';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const UserNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const user = useSelector((state) => state.user);

  // Check if user is logged in
  if (!user.currentUser) {
    window.location.href = "/login";
  }

  const currentUser = user.currentUser;
  const date = new Date();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const menuToggle = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <div className="navbar-custom">
        <div className="search-container">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search..." />
        </div>

        <div className="icon-container">
          <div className="d-flex align-items-center">
            <i className="bi"></i>
            <CalendarMonthIcon />
            <span className="ms-2">{date.toDateString()}</span>
          </div>
        </div>

        <div className="notification-icon">
          <NotificationsNoneIcon />
        </div>

        <div className="profile-container action">
        <div className="profile-info">
            <span className="name">{currentUser.name}</span>
            <span className="role">{capitalizeFirstLetter(currentUser.role)}</span>
            </div>
          <div className="profile" onClick={menuToggle}>
            <img
              src={currentUser.img ? currentUser.img : ProfileIcon}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className={`menu ${menuActive ? 'active' : ''}`}>
            <ul>
              <li>
              <a href="#"> <AccountCircleIcon />My profile</a>
              </li>
              <li>
               <a href="#">Edit profile</a>
              </li>
              <li>
              <a href="#"><LogoutIcon/>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
