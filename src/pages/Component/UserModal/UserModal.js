import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button, Form, Modal } from "react-bootstrap"; // Import React Bootstrap components
import { toast } from 'react-toastify';
import AdminServices from "../../../Services/AdminServices";
import { notifyError, notifySuccess } from "../ToastComponents/ToastComponents";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import countryList from 'react-select-country-list'

function AddUserModal({ show, onHide, userData }) {
  const navigate = useNavigate()
  const options = useMemo(() => countryList().getData(), [])
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
  }, [])
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  const validateForm = () => {
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.first_name.trim()) return "FirstName is required.";
    if (!formData.last_name.trim()) return "LastName is required.";

    // if (!formData.username.trim()) return "Username is required.";
    // if (!formData.name.trim()) return "Name is required.";
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
    console.log("formData", formData)
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
      // formdata.append("name", formData?.name);
      formdata.append("country", formData.country);
      formdata.append("contact_no", formData.contact);
      formdata.append("company_name", formData.companyName);
      formdata.append("position", formData.position);
      formdata.append("role", formData?.role);
      formdata.append("status", formData?.id ? formData?.status : "approve");
      formdata.append("send_user_notification", "1");
      formdata.append("role_id", "");
      // Call API to register user
      const response = await AdminServices.addUser(formdata);
      console.log("res", response)
      if (response?.status_code === 200) {
        notifySuccess(formData?.id ? "User Updated SuccessFully!" : "User Created SuccessFully");
        setTimeout(() => {
          navigate(`/usersManagement?status=all`);
          onHide()

        }, 3000);

      } else {
        throw new Error(response.message || "Something went wrong!");
      }
    } catch (error) {
      notifyError(error.message || "Failed to register user.",);
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
    <Modal show={show} centered>
      <Modal.Header >
        <Modal.Title>{userData ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body style={{ height: 400, overflow: "auto" }}>
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
              >  <option value="">Select role</option>
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
                  options={options} // Country options from react-select-country-list
                  className={`basic-single`}
                  classNamePrefix="select"
                  onChange={handleCountryChange}
                  value={options.find((option) => option.value === formData.country)} // Set selected value
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
                <Form.Label>position</Form.Label>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary" >
            {userData ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Form>

    </Modal>
  );
}

export default AddUserModal;
