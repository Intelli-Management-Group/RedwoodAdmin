
import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';


import { Navbar, Nav, Button } from 'react-bootstrap';
import Image from '../ImagesComponets/ImagesComponets';
import Logo from "../../../Assetes/images/logo.png"

const HeaderComponents = () => {
    const navigate = useNavigate();

    const handleAuth  = () =>{
        navigate('/login');
    }
     return (
        <Navbar expand="lg" className="container px-4 mx-sm-3 mx-md-4 mx-lg-5">
            <Navbar.Brand href="/">
                <Image
                    src={Logo}
                    alt="Logo"
                    className=""
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className=" d-flex justify-content-between ps-md-5" >
                    <ul className="navbar-nav mr-auto ">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Abouts Us
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/our-mission">Over Mission</Link>
                                <Link className="dropdown-item" to="/overview">Overview</Link>
                                <Link className="dropdown-item" to="/senior-team">Senior Team</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Investment Management
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/hedge-fund">Hedge Fund</Link>
                                <Link className="dropdown-item" to="/managed-account">Managed Account</Link>
                                {/* <div className="dropdown-divider"></div> */}
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/our-approach">Our Approach</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Publication & Updates
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/publications">Publications</Link>
                                <Link className="dropdown-item" to="/news">News</Link>
                                <Link className="dropdown-item" to="/visits">Visits</Link>
                                {/* <div className="dropdown-divider"></div> */}
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Investor Resources
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/hedge-fund-reports">Hedge Fund Reports</Link>
                                <Link className="dropdown-item" to="/managed-account-reports">Managed Account Reports</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-us">Contact Us</Link>
                        </li>                
                    </ul>
                </Nav >
                <Button variant="primary" className="ms-auto w-auto" onClick={handleAuth}>Sign In</Button>

            </Navbar.Collapse >
        </Navbar >

    );
};

export default HeaderComponents;