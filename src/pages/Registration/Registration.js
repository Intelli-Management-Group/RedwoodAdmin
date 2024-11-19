import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer/Footer";
import HeaderComponents from "../Component/HeaderComponents/HeaderComponents";
import Button from "../Component/ButtonComponents/ButtonComponents";

const Registration = () => {
  const navigate = useNavigate();

  // Form state and error state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    companyName: "",
    contact: "",
    position: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Client-side validation
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.contact || isNaN(formData.contact))
      newErrors.contact = "Contact must be a valid number.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.companyName) newErrors.companyName = "Company name is required.";
    if (!formData.position) newErrors.position = "Position is required.";

    if (Object.keys(newErrors).length === 0) {
      // Simulate form submission
      alert("Form submitted successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } else {
      setErrors(newErrors); // Set errors for rendering
    }
  };

  // Handle redirect to login page
  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <React.Fragment>
      <HeaderComponents />
      <div className="container">
        <div className="container-custom mb-5 p-2 min-heights">
          <h1 className="header-post-title-class">Register</h1>
          <div className="mt-4 inside-container">
            <div className="text-center">
              <span
                style={{
                  color: "#823535",
                  fontSize: "22px",
                }}
              >
                Register for member-level access
              </span>
            </div>
            <div className="pt-3 text-center">
              <span style={{ color: "#823535" }}>
                Your password must contain at least one small letter, one capital letter and one number
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* First Name & Last Name */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              {/* Email & Country */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                  </select>
                  {errors.country && (
                    <div className="invalid-feedback">{errors.country}</div>
                  )}
                </div>
              </div>

              {/* Company Name & Contact */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    id="companyName"
                    type="text"
                    className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                  {errors.companyName && (
                    <div className="invalid-feedback">{errors.companyName}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="contact">Contact</label>
                  <input
                    id="contact"
                    type="text"
                    className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                  {errors.contact && (
                    <div className="invalid-feedback">{errors.contact}</div>
                  )}
                </div>
              </div>

              {/* Position */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="position">Position</label>
                  <input
                    id="position"
                    type="text"
                    className={`form-control ${errors.position ? "is-invalid" : ""}`}
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                  {errors.position && (
                    <div className="invalid-feedback">{errors.position}</div>
                  )}
                </div>
              </div>

              {/* Footer information */}
              <div className="mt-5">
                <div style={{ fontSize: "17px" }}>
                  * For investor-level access please{" "}
                  <b>
                    <i>
                      <Link to="/contact-us" target="_blank" rel="noopener noreferrer">
                        contact us
                      </Link>
                    </i>
                  </b>
                  &nbsp;to ascertain your status as a professional investor.
                </div>
              </div>

              {/* Submit & Redirect buttons */}
              <div className="form-group row mb-0 mt-2">
                <Button
                  text="Register"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  type="submit"
                />
                <Button
                  text="Login"
                  onClick={redirectToLogin}
                  className="btn btn-secondary ms-3 button-gap"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Registration;
