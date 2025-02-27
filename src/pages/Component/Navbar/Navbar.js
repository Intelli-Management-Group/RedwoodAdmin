import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { notifySuccess } from '../ToastComponents/ToastComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation()
  const storedToken = localStorage.getItem('token')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    notifySuccess('You’ve been logged out successfully.!')

    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  const encodeToken = (token) => {
    return btoa(token)
  }

  const handleRedirectWithToken = () => {
    const token = encodeToken(storedToken)
    const targetDomain = 'https://frontend.jackychee.com/'

    const newWindow = window.open(targetDomain, '_blank')

    setTimeout(() => {
      newWindow.postMessage({ token }, targetDomain)
    }, 2000)
  }

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
    toggleSidebar()
  }

  useEffect(() => {
    // Close the dropdown if the user clicks outside of it
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    setIsDropdownOpen((prev) => !prev)
  }

  // Close sidebar when route changes only if screen width is ≤ 991px
  useEffect(() => {
    if (window.innerWidth <= 991) {
      toggleSidebar()
    }
  }, [location.pathname])

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg customWhiteBg shadow-sm">
        <a className="navbar-brand ps-2" href="#">
          My Admin
        </a>

        <button
          className="navbar-toggler me-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={false}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav ms-lg-auto ms-sm-0 d-flex align-items-center">
          <li className="nav-item dropdown position-relative">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
              onClick={handleDropdownToggle}
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
            <div
              ref={userDropdownRef}
              className={`dropdown-menu custom-admin-dropdown ${isDropdownOpen ? 'show' : ''}`}
              aria-labelledby="userDropdown"
              style={{ right: 0, left: 'auto', top: '100%', position: 'absolute', zIndex: 1050 }}
            >
              <a className="dropdown-item" href="#" onClick={handleRedirectWithToken}>
                Visit Site
              </a>
              {location.pathname !== '/profile' && (
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              )}
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </li>
        </div>
      </nav>
      <ToastContainer />
    </React.Fragment>
  )
}

export default Navbar
