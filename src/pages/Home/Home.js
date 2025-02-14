import React, { useEffect, useState } from 'react';
import './Home.css';
import '../../Assetes/Css/style.css'
import { Link, useNavigate, useLocation, json } from 'react-router-dom';
import Logo from "../../Assetes/images/logo.png"
import Button from '../Component/ButtonComponents/ButtonComponents';
import Input from '../Component/InputComponents/InputComponents';
import AdminServices from '../../Services/AdminServices';
import { useAuth } from '../Component/AuthContext/AuthContextComponents';
import { ToastContainer } from 'react-toastify';
import {notifyError, notifySuccess} from "../Component/ToastComponents/ToastComponents";

const Home = () => {
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();    

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const id = params.get('id');
        if (token && id) {
            try {
                getUserDetila(id)
                const decodedToken = atob(token);
                console.log(decodedToken);
                if (decodedToken) {
                    //Currently Direct  Access Admin without Api
                    // localStorage.setItem("authToken", token);
                    login();
                    navigate("/dashboard")
                }
            } catch (error) {
                console.error("Invalid token:", error);
                notifyError("Invalid token in URL.");
            }
        }
    }, [location]);
    const getUserDetila = async (id) => {
        try {
            const resp = await AdminServices.getUserDetails(id);
            if (resp?.status_code === 200) {
                // console.log(resp);
                if (resp?.data) {
                    localStorage.setItem('userData', JSON.stringify(resp?.data));

                } else {
                    notifyError("No data found. Please try again.");
                }
            } else {
                console.error("Failed to fetch data: ", resp?.message);
                notifyError("Please try again.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            notifyError("An error occurred during fetching data. Please try again.");
        } finally {
        }

    };
    const getTokenVerify = async (token) => {
        const resp = await AdminServices.tokenVerify(token);
        if (resp?.status_code === 200) {
            setTimeout(() => navigate("/dashboard"), 1500);
        }else {
            notifyError(resp?.message || "Invalid email or password",);
        }
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (email.trim() && password.trim()) {
            try {
                const loginData = {
                    email,
                    password,
                };

                const response = await AdminServices.adminLogin(loginData);

                if (response?.status_code === 200) {
                    const { token,user } = response;
                    if(user?.role === "admin") {
                    localStorage.setItem("authToken", token);
                    localStorage.setItem('userData', JSON.stringify(user));
                    login();
                    notifySuccess("Login successful!");
                    setTimeout(() => navigate("/dashboard"), 1500);
                    }else{
                        notifyError(`${user?.email} is not authenticated to access the Admin site.`);
                    }
                } else {
                    notifyError(response?.message || "Invalid email or password",);
                }
            } catch (error) {
                console.error("Login Error:", error);
                notifyError("An error occurred during login. Please try again.",);
            }finally{
                setLoading(false)
            }
        } else {
            notifyError("Please enter both email and password.",);
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
                        text={loading ? "Submitting..." : "Login"}
                        disabled={loading ? true : false}
                        className="btn-primary"
                        type="submit"
                    />
                </form>
            </div>
            <ToastContainer/>
        </div>

    );
};

export default Home;
