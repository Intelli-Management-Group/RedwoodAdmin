import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap"; // Import React Bootstrap components

function AddUserModal({ show, onHide, userData }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    role: "Administrator",
    password: "",
    confirmPassword: "",
    sendEmail: false
  });

  // Pre-fill form fields when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
        name: userData.name || "",
        role: userData.role || "Administrator",
        password: "",
        confirmPassword: "",
        sendEmail: false
      });
    }
  }, [userData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Call a function to save the data or perform an API call
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{userData ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body style={{ height: 400, overflow: "auto" }}>
          {/* Username */}
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Name */}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Role */}
          <Form.Group controlId="role" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Administrator">Administrator</option>
              <option value="Editor">Editor</option>
              {/* Add other roles here */}
            </Form.Control>
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Confirm Password */}
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

          {/* Send Email Checkbox */}
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
          <Button type="submit" variant="primary">
            {userData ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddUserModal;
