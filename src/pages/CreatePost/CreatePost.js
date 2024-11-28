import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import { ToastContainer } from "react-toastify";



const CreatePost = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [defaultContent, setDefaultContent] = useState()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null); 

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('component mounted');
  }, []);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };


  const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    multiple: true,
  });

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const updatedFiles = [...selectedFiles];
    const draggedFile = updatedFiles[draggedIndex];
    updatedFiles.splice(draggedIndex, 1);
    updatedFiles.splice(index, 0, draggedFile);

    setSelectedFiles(updatedFiles);
    setDraggedIndex(null);
  };
  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const validateForm = (title, category, content,images) => {
    if (!title || title.trim() === "") return "Title is required.";
    if (!category || category.trim() === "") return "Category is required.";
    if (!content || content.trim() === "") return "Content cannot be empty.";
    if (!images || images.length === 0) return 'At least one file is required';
    
    return null;
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm(title, editorContent, category,selectedFiles);

    if (validationError) {
      notifyError(validationError);
      return;
    }
    

    //  validation passes, log content to the console
    console.log('Post Content:', editorContent);
    console.log('Post title:', title);
    console.log('Post category:', category);
    console.log('Post selectedFiles:', selectedFiles);

  
  };




 

  const handleEditorChange = (data) => {
    console.log(data)
    var encodedString = encodeURIComponent(data);
    // var encodedString = btoa(data);
    // setDescription(encodedString);
    setEditorContent(encodedString)
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

                    <div className="file-upload-container">
                      {/* Dropzone area */}
                      <div
                        {...getRootProps()}  // Bind dropzone props to the container
                        className="dropzone-area"
                        style={{
                          border: '2px dashed #007bff',
                          padding: '20px',
                          textAlign: 'center',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                      >
                        <input {...getInputProps()} />  {/* Hidden file input */}
                        <p>Drag and drop some images here, or click to select files</p>
                      </div>

                      {/* Preview selected files */}
                      {selectedFiles.length > 0 && (
                        <div className="file-preview">
                          <h4>Selected Files:</h4>
                          <div className="preview-images" style={{ display: 'flex', marginTop: '10px' }}>
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                style={{ position: 'relative', marginRight: '10px', cursor: 'move' }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)} // Trigger the drag start event
                                onDragOver={handleDragOver} // Allow the item to be dragged over other items
                                onDrop={(e) => handleDrop(e, index)} // Handle drop to update position
                              >
                                <img
                                  src={URL.createObjectURL(file)} // Preview the image
                                  alt={file.name}
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '5px',
                                    display: 'block', // Ensure the image behaves as a block element
                                  }}
                                />
                                <button
                                  className="cancleButton"
                                  onClick={() => handleRemoveFile(index)} // Remove file when button clicked
                                  style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: '#531515',
                                    border: 'none',
                                    borderRadius: '50%',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    color: 'white',
                                    zIndex: 10,  // Ensure the button stays on top
                                  }}
                                >
                                  &#10005; {/* Close icon */}
                                </button>

                                {/* Set the first file as the thumbnail and label it */}
                                {index === 0 && (
                                  <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}>
                                    Thumbnail Image
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Default image label */}
                      {selectedFiles.length === 0 && (
                        <div className="default-label">
                          <p>No files selected. Please upload an image.</p>
                        </div>
                      )}

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
                  </Form>
                  <Button
                    text="Create Post"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div >
    </React.Fragment >
  );
};

export default CreatePost;
