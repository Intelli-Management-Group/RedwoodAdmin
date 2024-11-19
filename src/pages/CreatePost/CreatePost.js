import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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
    setTimeout(() => navigate('/post'), 5000);
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
          <div className={`main-content ${isSidebarVisible ? 'shifted' : ''}`}>
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Dashboard Content */}
            <div className="dashboard-content">
              <div className="container-fluid">
                <div className="container mt-5">
                  <h2 className="mb-4">Create New Post</h2>

                  {successMessage && <Alert variant="success">{successMessage}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="postTitle" className="mb-3">
                      <Form.Label>Post Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="postCategories" className="mb-3">
                      <Form.Label>Choose Post Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">All Categories</option>
                        <option value="news">News</option>
                        <option value="visit">Visit</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="postThumbnail" className="mb-3">
                      <Form.Label>Select Post Thumbnail</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/jpeg, image/png"
                      />
                      <Form.Text className="text-muted">Only JPEG/JPG and PNG are allowed.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="postContent" className="mb-3">
                      <Form.Label>Post Content</Form.Label>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="Write your post content here..."
                      />
                    </Form.Group>

                    {/* <Button variant="primary" type="submit">
                      Create Postdsdas
                    </Button> */}
                    <Button
                      text="Create Post"
                      // onClick={handleNavigations}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Create Post
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;
