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
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import axios from 'axios';
import CustomLoader from '../Component/LoaderComponent/LoaderComponent';

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
        if (token) {
            try {
                setLoading(true)
                const decodedToken = atob(token);
                console.log(decodedToken);
                if (decodedToken) {
                    //Currently Direct  Access Admin without Api
                    // localStorage.setItem("authToken", token);
                    // getTokenVerify(decodedToken)
                    staticAPiCall(decodedToken)
                    // login();
                    // navigate("/dashboard")
                }
            } catch (error) {
                console.error("Invalid token:", error);
                notifyError("Invalid token in URL.");
            }
        }
    }, [location]);
    const staticAPiCall = async (tokens) => {
        const apiUrl = "https://dev.jackychee.com/api/authenticate";
        const headers = {
            Authorization: `Bearer ${tokens}`,
        };

        axios
            .post(apiUrl, {}, { headers })
            .then((response) => {
                // console.log("API Response:", response.data);
                // console.log("OBJ",JSON.stringify(response?.data?.message))
                console.log("This Token set",tokens)
                localStorage.setItem("authToken", tokens);
                localStorage.setItem("tokens", JSON.stringify({token:tokens}));
                localStorage.setItem('userData',JSON.stringify(response?.data?.message));
                login();
                navigate("/dashboard");
                // console.log("HERE")

                setLoading(false)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // const getTokenVerify = async (token) => {
    //     console.log('Token:', token);
    //     try {
    //         const resp = await AdminServices.tokenVerify(`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi5qYWNreWNoZWUuY29tL2FwaS9jdXN0b21lci9sb2dpbiIsImlhdCI6MTczOTYwMzA2MCwiZXhwIjoxNzM5NjA2NjYwLCJuYmYiOjE3Mzk2MDMwNjAsImp0aSI6InlRRmxZdEtkcGFJWlBKTUsiLCJzdWIiOiIxNzEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Y1-qSzD_BpzKF8gbtGFCNkIqfksxPOPm8nn7di_OExs`);
    //         if (resp?.status_code === 200) {
    //             setTimeout(() => navigate("/dashboard"), 1500);
    //         } else {
    //             notifyError(resp?.message || "Invalid email or password");
    //         }
    //     } catch (error) {
    //         console.error("Token verification error:", error);
    //         notifyError("An error occurred during token verification. Please try again.");
    //     }
    // };


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
                    const { token, user } = response;
                    if (user?.role === "admin") {
                        localStorage.setItem("authToken", token);
                        localStorage.setItem('userData', JSON.stringify(user));
                        login();
                        notifySuccess("Login successful!");
                        setTimeout(() => navigate("/dashboard"), 1500);
                    } else {
                        notifyError(`${user?.email} is not authenticated to access the Admin site.`);
                    }
                } else {
                    notifyError(response?.message || "Invalid email or password",);
                }
            } catch (error) {
                console.error("Login Error:", error);
                notifyError("An error occurred during login. Please try again.",);
            } finally {
                setLoading(false)
            }
        } else {
            notifyError("Please enter both email and password.",);
        }
    };
    return (
        <div className="login-page">
            {loading && <CustomLoader />} {/* Show the custom loader when loading */}

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
                        disabled={loading}
                        className="btn-primary"
                        type="submit"
                    />
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
