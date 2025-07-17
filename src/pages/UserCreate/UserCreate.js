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
import MetaTitle from "../Component/MetaTitleComponents/MetaTitleComponents";
function UserCreate() {
    // Add custom error style
    const errorStyle = `
        .custom-error-text {
            color: #d32f2f;
            font-size: 0.95em;
            margin-top: 2px;
        }
    `;
    // Helper for length check
    const checkLength = (value, min, max) => {
        if (value.length < min) return `must be at least ${min} characters.`;
        if (value.length > max) return `must be at most ${max} characters.`;
        return null;
    };
    // Name regex: letters, numbers, spaces, hyphens, apostrophes
    const nameRegex = /^[A-Za-z0-9\s\-']+$/;
    const [validationErrors, setValidationErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location)
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
        const newValue = type === "checkbox" ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
        // Validate only the changed field
        const error = validateField(name, newValue);
        setValidationErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };
    const validateField = (name, value) => {
        switch (name) {
            case "first_name": {
                if (!value) return "First name is required.";
                const err = checkLength(value, 3, 30);
                if (err) return `First name ${err}`;
                if (!nameRegex.test(value)) return "First name can only contain letters, spaces, hyphens, and apostrophes.";
                return null;
            }
            case "last_name": {
                if (!value) return "Last name is required.";
                const err = checkLength(value, 3, 30);
                if (err) return `Last name ${err}`;
                if (!nameRegex.test(value)) return "Last name can only contain letters, spaces, hyphens, and apostrophes.";
                return null;
            }
            case "email": {
                if (!value || !value.trim()) return "Email is required.";
                if (!/\S+@\S+\.\S+/.test(value)) return "A valid email address is required.";
                return null;
            }
            case "password": {
                if (!value || !value.trim()) return "Password is required.";
                if (value.length < 6) return "Password must be at least 6 characters long.";
                return null;
            }
            case "confirmPassword": {
                if (!value || !value.trim()) return "Confirm Password is required.";
                if (value !== formData.password) return "Passwords do not match.";
                return null;
            }
            case "role": {
                if (!value || !value.trim()) return "Role is required.";
                return null;
            }
            case "contact": {
                if (!value) return "Contact number is required.";
                if (!/^[0-9]+$/.test(value)) return "Contact number must contain only numbers.";
                if (value.length < 8 || value.length > 15) return "Contact number must be between 8 and 15 digits.";
                return null;
            }
            case "companyName": {
                if (value) {
                    const err = checkLength(value, 3, 30);
                    if (err) return `Company name ${err}`;
                }
                return null;
            }
            case "position": {
                if (value) {
                    const err = checkLength(value, 3, 30);
                    if (err) return `Position ${err}`;
                }
                return null;
            }
            default:
                return null;
        }
    };

    const validateForm = () => {
        const errors = {};
        errors.first_name = validateField("first_name", formData.first_name);
        errors.last_name = validateField("last_name", formData.last_name);
        errors.email = validateField("email", formData.email);
        errors.role = validateField("role", formData.role);
        errors.contact = validateField("contact", formData.contact);
        if (!formData?.id) {
            errors.password = validateField("password", formData.password);
            errors.confirmPassword = validateField("confirmPassword", formData.confirmPassword);
        }
        // Do not remove null errors, keep undefined or null so isInvalid works
        return errors;
    };

    const handleSubmit = async (e) => {
        //console.log("call")
        e.preventDefault();
        setFormSubmitted(true);
        const errors = validateForm();
        //console.log(errors)
        setValidationErrors(errors);
        // if (Object.keys(errors).length > 0) {
        //     setLoading(false);
        //     return;
        // } 
        if (Object.values(errors).some((err) => err)) {
    setLoading(false);
    return;
}
        setLoading(true);
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
            <MetaTitle pageTitle={"User Management - Redwood Peak Limited"} />
            <style>{errorStyle}</style>
            <div style={{ height: '100vh' }}>
                <div className="">
                    <Sidebar isVisible={isSidebarVisible} />
                    <div className={`main-content bodyBg ${isSidebarVisible ? 'shifted' : ''}`}>
                        <Navbar toggleSidebar={toggleSidebar} />
                        <div className="dashboard-content">
                            <div className="container-fluid">
                                <div className="container mt-5">
                                    <h2 className="mb-4">{userData ? "Edit User" : "Add User"}</h2>
                                    <form onSubmit={handleSubmit} className="custom-form">
                                        <div className="mb-3">
                                            <label htmlFor="first_name" className="form-label">First Name <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className={`form-control${formSubmitted && validationErrors.first_name ? ' is-invalid' : ''}`}
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.first_name && (
                                                <div className="custom-error-text">{validationErrors.first_name}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className={`form-control${formSubmitted && validationErrors.last_name ? ' is-invalid' : ''}`}
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.last_name && (
                                                <div className="custom-error-text">{validationErrors.last_name}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`form-control${formSubmitted && validationErrors.email ? ' is-invalid' : ''}`}
                                                value={formData.email}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.email && (
                                                <div className="custom-error-text">{validationErrors.email}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Role <span style={{ color: "red" }}>*</span></label>
                                            <div className="role-dropdown-wrapper">
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className={`form-control custom-dropdown${formSubmitted && validationErrors.role ? ' is-invalid' : ''}`}
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                    onClick={toggleRoleDropdown}
                                                >
                                                    <option value="">Select role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="siteAdmin">Site Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                                <FontAwesomeIcon
                                                    icon={isRoleOpen ? faChevronUp : faChevronDown}
                                                    className="dropdown-arrow"
                                                />
                                            </div>
                                            {formSubmitted && validationErrors.role && (
                                                <div className="custom-error-text">{validationErrors.role}</div>
                                            )}
                                        </div>
                                        {/* <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Role <span style={{ color: "red" }}>*</span></label>
                                            <select
                                                id="role"
                                                name="role"
                                                className={`form-control custom-dropdown${formSubmitted && validationErrors.role ? ' is-invalid' : ''}`}
                                                value={formData.role}
                                                onChange={handleChange}
                                                onClick={toggleRoleDropdown}
                                            >
                                                <option value="">Select role</option>
                                                <option value="admin">Admin</option>
                                                <option value="siteAdmin">Site Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                            {formSubmitted && validationErrors.role && (
                                                <div className="custom-error-text">{validationErrors.role}</div>
                                            )}
                                            <FontAwesomeIcon
                                                icon={isRoleOpen ? faChevronUp : faChevronDown}
                                                className="dropdown-arrow position-absolute"
                                            />
                                        </div> */}
                                        {userData && (
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">User Status</label>
                                                <select
                                                    id="status"
                                                    name="status"
                                                    className="form-control custom-dropdown"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    onClick={toggleStatusDropdown}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approve">Approve</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="inActive">Inactive</option>
                                                </select>
                                                <FontAwesomeIcon
                                                    icon={isStatusOpen ? faChevronUp : faChevronDown}
                                                    className="dropdown-arrow position-absolute"
                                                />
                                            </div>
                                        )}
                                        {!userData && (
                                            <>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password <span style={{ color: "red" }}>*</span></label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className={`form-control${formSubmitted && validationErrors.password ? ' is-invalid' : ''}`}
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                    />
                                                    {formSubmitted && validationErrors.password && (
                                                        <div className="custom-error-text">{validationErrors.password}</div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        className={`form-control${formSubmitted && validationErrors.confirmPassword ? ' is-invalid' : ''}`}
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                    />
                                                    {formSubmitted && validationErrors.confirmPassword && (
                                                        <div className="custom-error-text">{validationErrors.confirmPassword}</div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        <div className="mb-3">
                                            <label htmlFor="contact" className="form-label">Contact <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                id="contact"
                                                name="contact"
                                                className={`form-control${formSubmitted && validationErrors.contact ? ' is-invalid' : ''}`}
                                                value={formData.contact}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.contact && (
                                                <div className="custom-error-text">{validationErrors.contact}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="country" className="form-label">Country</label>
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
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="companyName" className="form-label">Company Name</label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                className={`form-control${formSubmitted && validationErrors.companyName ? ' is-invalid' : ''}`}
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.companyName && (
                                                <div className="custom-error-text">{validationErrors.companyName}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="position" className="form-label">Position</label>
                                            <input
                                                type="text"
                                                id="position"
                                                name="position"
                                                className={`form-control${formSubmitted && validationErrors.position ? ' is-invalid' : ''}`}
                                                value={formData.position}
                                                onChange={handleChange}
                                                autoComplete="off"
                                            />
                                            {formSubmitted && validationErrors.position && (
                                                <div className="custom-error-text">{validationErrors.position}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="sendEmail" className="form-label">
                                                <input
                                                    type="checkbox"
                                                    id="sendEmail"
                                                    name="sendEmail"
                                                    checked={formData.sendEmail}
                                                    onChange={handleChange}
                                                />
                                                {' '}Send User Notification
                                            </label>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {userData ? "Update User" : "Add User"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserCreate;