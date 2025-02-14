import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  let token;
  if (Cookies.get('userToken')) {
    token = JSON.parse(Cookies.get('userToken'));
  }
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    toast.success('You have logged out successfully!', {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };
  const encodeToken = (token) => {
    return btoa(token);
};
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg customWhiteBg shadow-sm">
        <a className="navbar-brand ps-2" href="#">My Admin</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse me-2" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link`}
                href={`http://localhost:3001/?token=${encodeToken(token)}&id=${userData?.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site</a>
            </li>
            {location.pathname !== '/profile' && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>

      </nav>
      <ToastContainer />
    </React.Fragment>

  );
};

export default Navbar;
