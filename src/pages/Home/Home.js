import React, { useState } from 'react';
import './Home.css';
import '../../Assetes/Css/style.css'
import { Link } from 'react-router-dom';
import Logo from "../../Assetes/images/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Component/ButtonComponents/ButtonComponents';
import Input from '../Component/InputComponents/InputComponents';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (event) => {
        event.preventDefault();

        if (email.trim() && password.trim()) {
            toast.success('Login successful!', { position: "top-center", autoClose: 3000 });
        } else {
            toast.error('Please enter both email and password.', { position: "top-center", autoClose: 3000 });
        }
    };
    return (
        <div className="login-page">
            <div className="login-container whiteBg">
                <div className="centerLogo mb-5">
                    <Link to="#">
                        <img
                            src={Logo}
                            className="d-inline-block align-top"
                            alt="Our Mission Banner"
                        />
                    </Link>
                </div>
                <form onSubmit={handleLogin}>
                    <Input
                        label="Your Name"
                        id="user_name"
                        type="text"
                        name="userName"
                        placeholder="Enter User Name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        text="Login"
                        className="btn-primary"
                        type="submit"
                    />

                </form>
                <div className="footer-text">
                    Don't have an account? <a href="#">Sign up</a>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default Home;
