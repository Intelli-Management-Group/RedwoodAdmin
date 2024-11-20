import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePages = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle thumbnail validation and setting
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setThumbnail(file);
    } else {
      alert('Invalid file type. Please upload a JPEG or PNG image.');
      setThumbnail(null); // Clear the file
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log content to the console
    console.log('Post Content:', content);

    // Optionally, save content to local storage
    localStorage.setItem('postContent', content);

    // Show success message and clear the form
    setSuccessMessage('Post created successfully!');
    setTitle('');
    setCategory('');
    setThumbnail(null);
    setContent('');

    // Redirect to another page if desired
    setTimeout(() => navigate('/pages'), 5000);
  };


  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    console.log('component mounted');
  }, []);


  return (
    <React.Fragment>
      <div style={{ height: '100vh' }}> {/* Set height to 100vh to ensure full page */}
        <div className="">
          {/* Sidebar */}
          <Sidebar isVisible={isSidebarVisible} />

          {/* Main Content */}
          <div className={`main-content bodyBg ${isSidebarVisible ? 'shifted' : ''}`}>
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Dashboard Content */}
            <div className="dashboard-content">
              <div className="container-fluid">
                <div className="container mt-5">
                  <h2 className="mb-4">Upload Documents</h2>

                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  <div className="row">
                    <div className="col-md-4 p-1">
                      <Form.Label htmlFor="basic-url">Documents Type</Form.Label>
                      <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                        <option value="">Publications</option>
                        <option value="news">Hedge Fund Reports</option>
                        <option value="visit">Managed Account Reports</option>
                      </select>
                    </div>
                    <div className="col-md-4 p-1">
                      <Form.Label htmlFor="basic-url">Posting Years</Form.Label>
                      <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                        <option value="news">2015</option>
                        <option value="visit">2016</option>
                        <option value="visit">2017</option>
                        <option value="visit">2018</option>
                        <option value="visit">2019</option>
                        <option value="visit">2020</option>
                        <option value="visit">2021</option>
                        <option value="visit">2022</option>
                        <option value="visit">2023</option>
                        <option value="visit">2024</option>
                      </select>
                    </div>
                  </div>

                    <Form.Group controlId="postThumbnail" className="mb-3">
                      <Form.Label>drag and drop your PDF here on click to upload</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/jpeg, image/png"
                      />
                      <Form.Text className="text-muted">Only JPEG/JPG and PNG are allowed.</Form.Text>
                    </Form.Group>


                    {/* <Button variant="primary" type="submit">
                      Create Postdsdas
                    </Button> */}
                    <Button
                      text="Upload"
                      // onClick={handleNavigations}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Upload
                    </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePages;
