import React, { useState } from 'react';
import './Home.css';
import '../../Assetes/Css/style.css'
import { Link } from 'react-router-dom';
import Logo from "../../Assetes/images/logo.png"
import Image from '../Component/ImagesComponets/ImagesComponets';
import Button from '../Component/ButtonComponents/ButtonComponents';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        if (email && password) {

            setToastMessage('Login successful!');
            setShowToast(true);
        } else {
            setToastMessage('Please enter both email and password.');
            setShowToast(true);
        }
    };

    return (
        <div class="login-page">
            <div class="login-container whiteBg">
                <div className='centerLogo mb-5'>
                    <Link>
                        <Image
                            src={Logo}
                            className="d-inline-block align-top"
                            alt="Our Mission Banner"
                        />
                    </Link>
                </div>
                <form>
                    <input type="text" class="form-control" placeholder="Username" />
                    <input type="password" class="form-control" placeholder="Password" />
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <div class="footer-text">Don't have an account? <a href="#">Sign up</a></div>
            </div>
        </div>

    );
};

export default Home;
