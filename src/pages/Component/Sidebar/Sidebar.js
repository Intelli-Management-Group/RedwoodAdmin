import React from 'react';
import { Link } from 'react-router-dom';
import "../Sidebar/Sidebar.css"
import Logo from "../../../Assetes/images/admin-logo.png"
import { Image } from 'react-bootstrap';

const Sidebar = ({ isVisible }) => {
  return (
    <div
      className={`col-md-3 col-lg-2 text-white p-3 sidebar ${isVisible ? 'show' : ''}`}
      style={{
        width:250,
        position: 'fixed',
        top: 0,
        left: isVisible ? '0' : '-250px',
        height: '100%',
        transition: 'left 0.3s ease',
      }}
    >
      {/* <h4 className="text-center">Dashboard</h4> */}
      <div className='mt-2 mb-4'>
        <Link>
          <Link>
            <Image
              src={Logo}
              className="d-inline-block align-top"
              alt="LOGO"
            />
          </Link>

        </Link>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white Links">
            Dashboard
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/media" className="nav-link text-white Links">
            Media
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/post" className="nav-link text-white Links">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/pages" className="nav-link text-white Links">
            Pages
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/usersManagement" className="nav-link text-white Links">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
