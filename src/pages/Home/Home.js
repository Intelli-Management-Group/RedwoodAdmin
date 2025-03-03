import React, { useEffect, useState } from 'react'
import './Home.css'
import '../../Assetes/Css/style.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Assetes/images/logo.png'
import Button from '../Component/ButtonComponents/ButtonComponents'
import AdminServices from '../../Services/AdminServices'
import { useAuth } from '../Component/AuthContext/AuthContextComponents'
import { ToastContainer } from 'react-toastify'
import { notifyError, notifySuccess } from '../Component/ToastComponents/ToastComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [tokenLoading, setTokenLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTokenLoading(false)
    }, 7000)

    const handleTokenMessage = (event) => {
      const token = event?.data?.token
      if (token) {
        const decodedToken = atob(token)
        if (decodedToken) {
          getTokenVerify(decodedToken)
        }
      }
    }

    window.addEventListener('message', handleTokenMessage)
    return () => {
      window.removeEventListener('message', handleTokenMessage)
      clearTimeout(timeoutId)
    }
  }, [])

  const getTokenVerify = async (tokens) => {
    try {
      const resp = await AdminServices.tokenVerify(tokens)
      if (resp?.status_code === 200) {
        localStorage.setItem('authToken', tokens)
        localStorage.setItem('tokens', JSON.stringify({ token: tokens }))
        localStorage.setItem('userData', JSON.stringify(resp?.message))
        login()
        navigate('/dashboard')
        setTokenLoading(false)
      } else {
        notifyError(resp?.message || 'Invalid token.')
        setTokenLoading(false)
      }
    } catch (error) {
      console.error('Token verification error:', error)
      setTokenLoading(false)
      notifyError('An error occurred during token verification. Please try again.')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    if (email.trim() && password.trim()) {
      try {
        const loginData = { email, password }
        const response = await AdminServices.adminLogin(loginData)

        if (response?.status_code === 200) {
          const { token, user } = response
          if (user?.role === 'admin') {
            localStorage.setItem('authToken', token)
            localStorage.setItem('token', token)
            localStorage.setItem('userData', JSON.stringify(user))
            login()
            notifySuccess('Login successful!')
            setTimeout(() => navigate('/dashboard'), 1500)
          } else {
            notifyError(`${user?.email} is not authenticated to access the Admin site.`)
          }
        } else {
          notifyError(response?.message || 'Invalid email or password.')
        }
      } catch (error) {
        console.error('Login Error:', error)
        notifyError('An error occurred during login. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      notifyError('Please enter both email and password.')
    }
  }

  return (
    <div className="login-page">
      {tokenLoading ? (
        <div className="centered-logo-loading">
          <div className="logo-containerss">
            <img src={Logo} className="d-inline-block align-top" alt="Logo" />
            <p className="mt-3 text-center bouncing-dots">
              Loading<span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-container whiteBg">
          <div className="centerLogo mb-5">
            <Link to="#">
              <img src={Logo} className="d-inline-block align-top" alt="Logo" />
            </Link>
          </div>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input with Show/Hide Feature */}
            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <Button
              text={loading ? 'Submitting...' : 'Login'}
              disabled={loading}
              className="btn-primary"
              type="submit"
            />
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default Home
