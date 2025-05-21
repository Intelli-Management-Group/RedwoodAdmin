import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import countryList from 'react-select-country-list';
import AdminServices from "../../Services/AdminServices";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from "../Component/Navbar/Navbar";
function UserCreate() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const userData = location.state?.userData || null;
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const options = useMemo(() => countryList().getData(), []);
    const [loading, setLoading] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const roleRef = useRef();
    const statusRef = useRef();
    const [formData, setFormData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
        sendEmail: false,
        country: "",
        companyName: "",
        contact: "",
        position: "",
        status: ''
    });

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData?.id || "",
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                username: userData?.username || "",
                email: userData?.email || "",
                name: userData?.name || "",
                role: userData?.role || "",
                status: userData?.status || "approve",
                country: userData?.country || "",
                companyName: userData?.company_name || "",
                contact: userData?.contact_no || "",
                position: userData?.position || "",
                password: "",
                confirmPassword: "",
                sendEmail: false
            });
        }
    }, [userData]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };
    const validateForm = () => {
        if (!formData.first_name.trim()) return "FirstName is required.";
        if (!formData.last_name.trim()) return "LastName is required.";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            return "A valid email address is required.";
        if (!formData?.id) {
            if (!formData.password.trim() || formData.password.length < 6)
                return "Password must be at least 6 characters long.";
            if (formData.password !== formData.confirmPassword)
                return "Passwords do not match.";
        }
        if (!formData.role.trim()) return "Role is required.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            toast.error(validationError, { position: "top-center", autoClose: 3000 });
            setLoading(false);
            return;
        }
        try {
            const formdata = new FormData();
            formdata.append("id", formData?.id ? formData?.id : "");
            formdata.append("first_name", formData?.first_name);
            formdata.append("last_name", formData?.last_name);
            formdata.append("email", formData?.email);
            if (!formData?.id) {
                formdata.append("password", formData?.password);
                formdata.append("confirm_password", formData?.confirmPassword);
            }
            formdata.append("username", "");
            formdata.append("country", formData.country);
            formdata.append("contact_no", formData.contact);
            formdata.append("company_name", formData.companyName);
            formdata.append("position", formData.position);
            formdata.append("role", formData?.role);
            formdata.append("status", formData?.id ? formData?.status : "approve");
            formdata.append("send_user_notification", "1");
            formdata.append("role_id", "");
            const response = await AdminServices.addUser(formdata);
            if (response?.status_code === 200) {
                notifySuccess(formData?.id ? "User Updated SuccessFully!" : "User Created SuccessFully");
                setTimeout(() => {
                    navigate(`/usersManagement?status=all`);
                }, 2000);
            } else {
                throw new Error(response.message || "Something went wrong!");
            }
        } catch (error) {
            notifyError(error.message || "Failed to register user.");
        } finally {
            setLoading(false);
        }
    };

    const toggleRoleDropdown = () => setIsRoleOpen(!isRoleOpen);
    const toggleStatusDropdown = () => setIsStatusOpen(!isStatusOpen);

    const handleClickOutside = (e) => {
        if (roleRef.current && !roleRef.current.contains(e.target)) {
            setIsRoleOpen(false);
        }
        if (statusRef.current && !statusRef.current.contains(e.target)) {
            setIsStatusOpen(false);
        }
    };
    const handleCountryChange = (selectedOption) => {
        setFormData({ ...formData, country: selectedOption ? selectedOption.value : "" });
    };

    return (
        <React.Fragment>
            <div style={{ height: '100vh' }}> {/* Set height to 100vh to ensure full page */}
                <div className="">
                    {/* Sidebar */}
                    <Sidebar isVisible={isSidebarVisible} />

                    {/* Main Content */}
                    <div className={`main-content bodyBg ${isSidebarVisible ? 'shifted' : ''}`}>
                        <Navbar toggleSidebar={toggleSidebar} />
                        {/* <Container className="py-4"> */}
                        <div className="dashboard-content">
                            <div className="container-fluid">
                                <div className="container mt-5">
                                    <h2 className="mb-4">{userData ? "Edit User" : "Add User"}</h2>
                                    <Row className="justify-content-center">
                                        <Col md={12} lg={12}>
                                            <Form onSubmit={handleSubmit} className="">
                                                <Form.Group controlId="firstName" className="mb-3">
                                                    <Form.Label>First Name <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="lastName" className="mb-3">
                                                    <Form.Label>Last Name <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="last_name"
                                                        value={formData.last_name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="email" className="mb-3">
                                                    <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="role" className="mb-3 position-relative">
                                                    <Form.Label>Role <span style={{ color: "red" }}>*</span></Form.Label>
                                                    <div className="custom-dropdown-wrapper" ref={roleRef}>
                                                        <Form.Control
                                                            as="select"
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleChange}
                                                            className="custom-dropdown"
                                                            onClick={toggleRoleDropdown}
                                                            required
                                                        >
                                                            <option value="">Select role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="siteAdmin">Site Admin</option>
                                                            <option value="user">User</option>
                                                        </Form.Control>
                                                        <FontAwesomeIcon
                                                            icon={isRoleOpen ? faChevronUp : faChevronDown}
                                                            className="dropdown-arrow position-absolute"
                                                        />
                                                    </div>
                                                </Form.Group>
                                                {userData && (
                                                    <Form.Group controlId="role" className="mb-3 position-relative">
                                                        <Form.Label>User Status</Form.Label>
                                                        <div className="custom-dropdown-wrapper" ref={statusRef}>
                                                            <Form.Control
                                                                as="select"
                                                                name="status"
                                                                value={formData.status}
                                                                onChange={handleChange}
                                                                className="custom-dropdown"
                                                                onClick={toggleStatusDropdown}
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="approve">Approve</option>
                                                                <option value="rejected">Rejected</option>
                                                                <option value="inActive">Inactive</option>
                                                            </Form.Control>
                                                            <FontAwesomeIcon
                                                                icon={isStatusOpen ? faChevronUp : faChevronDown}
                                                                className="dropdown-arrow position-absolute"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                )}
                                                {!userData ? (
                                                    <>
                                                        <Form.Group controlId="password" className="mb-3">
                                                            <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Form.Group controlId="confirmPassword" className="mb-3">
                                                            <Form.Label>Confirm Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </>
                                                ) : null}
                                                <Form.Group controlId="contact" className="mb-3">
                                                    <Form.Label>Contact</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="contact"
                                                        value={formData.contact}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="country" className="mb-3">
                                                    <Form.Label>Country</Form.Label>
                                                    <Select
                                                        id="country"
                                                        options={options}
                                                        className={`basic-single`}
                                                        classNamePrefix="select"
                                                        onChange={handleCountryChange}
                                                        value={options.find((option) => option.value === formData.country)}
                                                        placeholder="Select a country..."
                                                        isClearable
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="companyName" className="mb-3">
                                                    <Form.Label>Company Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="companyName"
                                                        value={formData.companyName}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="position" className="mb-3">
                                                    <Form.Label>Position</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="position"
                                                        value={formData.position}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="sendEmail">
                                                    <Form.Check
                                                        type="checkbox"
                                                        name="sendEmail"
                                                        label="Send User Notification"
                                                        checked={formData.sendEmail}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <div className="d-flex justify-content-between">
                                                    {/* <Button variant="secondary" onClick={() => navigate(-1)}>
                                                        Cancel
                                                    </Button> */}
                                                    <Button type="submit" variant="primary" disabled={loading}>
                                                        {userData ? "Update User" : "Add User"}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </React.Fragment >
    );
}

export default UserCreate;