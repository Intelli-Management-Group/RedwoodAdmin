import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const CreatePost = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [defaultContent, setDefaultContent] = useState()

  // const [description, setDescription] = useState()

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
    console.log('Post Content:', editorContent);

    // Optionally, save content to local storage
    localStorage.setItem('postContent', editorContent);

    // Show success message and clear the form
    setSuccessMessage('Post created successfully!');
    setTitle('');
    setCategory('');
    setThumbnail(null);
    setEditorContent('');

    // Redirect to another page if desired
    setTimeout(() => navigate('/post'), 5000);
  };


  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    console.log('component mounted');
  }, []);
  const handleEditorChange = (data) => {
    console.log(data)
    var encodedString = encodeURIComponent(data);
    // var encodedString = btoa(data);
    // setDescription(encodedString);
    setEditorContent(encodedString)
  };

  // function CustomUploadAdapterPlugin(editor) {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
  //     return new UploadAdapter(loader);
  //   };
  // }

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



                    <div controlId="postThumbnail" className="upload-box mt-5 mb-5"
                      style={{ border: "3px dashed #007bff", padding: "20px", textAlign: "center", borderRadius: "5px" }}>
                      <h4>drag and drop your post thumbnail image  here or click to upload</h4>
                      <br />
                      <Button
                        text="Select Image"
                        className="btn-primary"
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/jpeg, image/png"
                      >Select image</Button>
                      <div className="text-muted">Only JPEG/JPG and PNG are allowed.</div>
                    </div>

                    <Form.Group controlId="postContent" className="mb-3">
                      <Form.Label>Post Content</Form.Label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          toolbar: [
                            'heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList',
                            'imageUpload', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter',
                            'imageStyle:alignRight', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells',
                            'mediaEmbed', '|', 'undo', 'redo', 'Subscript'],
                          heading: {
                            options: [
                              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                            ]
                          },
                        }}
                        data={defaultContent ? defaultContent : ""}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          handleEditorChange(data);
                        }}
                      />

                    </Form.Group>


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
