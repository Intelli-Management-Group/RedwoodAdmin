import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Alert } from 'react-bootstrap';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import { ToastContainer } from "react-toastify";
import PostServices from "../../Services/PostServices";



const CreatePost = () => {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [id, setId] = useState(location.state?.id ? location.state?.id : '');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [postingYear, setPostingYear] = useState("2024");
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [defaultContent, setDefaultContent] = useState()
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [captions, setCaptions] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [deletedMediaList, setDeletedMediaList] = useState([])
  const [editCaptionsList, setEditCaptionsList] = useState([])
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('component mounted', id);
    if (id) {
      fetchPostData()
    }
  }, []);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const fetchPostData = async () => {
    // setIsLoading(true);
    try {
      const resp = await PostServices.getPostDetails(id);
      if (resp?.status_code === 200) {
        console.log(resp);
        setId(resp?.data[0]?.id)
        setTitle(resp?.data[0]?.title);
        setCategory(resp?.data[0]?.category);
        setPostingYear(resp?.data[0]?.year)
        var decodedString = decodeURIComponent(resp?.data[0]?.content);
        setDefaultContent(decodedString)

        const files = resp?.data[0]?.media.map((media) => ({
          id: media.id,
          name: media.name,
          path: media.path,
          isThumbnail: media.is_thumbnail,
          caption: media.caption || "",
        }));
        setSelectedFiles(files);

        // const thumbnailFile = files.find((file) => file.isThumbnail);
        // // setThumbnail(thumbnailFile || null);

        // Extract captions
        const captionsData = files.reduce((acc, file) => {
          acc[file.name] = file.caption || "";
          return acc;
        }, {});
        setCaptions(captionsData);


      } else {
        notifyError("Please try again.",);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      notifyError("An error occurred during fetch Data. Please try again.",);
    } finally {
      // setIsLoading(false);
    }
  };


  const onDrop = (acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    // Initialize captions for new files
    setCaptions((prevCaptions) => {
      const newCaptions = {};
      acceptedFiles.forEach((file) => {
        newCaptions[file.name] = ""; // Default caption is empty
      });
      return { ...prevCaptions, ...newCaptions };
    });
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
    const deletedMediaId = updatedFiles[index]?.id;
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    if (id && deletedMediaId) {
      setDeletedMediaList((prevList) => [...prevList, deletedMediaId]);
    }

  };

  const handleCaptionChange = (e, fileName) => {
    const newCaption = e.target.value;
      setCaptions((prevCaptions) => ({
      ...prevCaptions,
      [fileName]: newCaption,
    }));
      if (id) {
      const result = selectedFiles.find((item) => item.name === fileName);
        if (result && result.id) {
        const obj = { media_id: result.id, caption: newCaption };
  
        setEditCaptionsList((prevList) => {
          const existsIndex = prevList.findIndex((item) => item.media_id === obj.media_id);
  
          if (existsIndex > -1) {
            const updatedList = [...prevList];
            updatedList[existsIndex].caption = obj.caption;
            return updatedList;
          }
            return [...prevList, obj];
        });
      }
    }
  };
  


  const validateForm = (title, category, content, postingYear, images) => {
    if (!title || title.trim() === "") return "Title is required.";
    if (!category || category.trim() === "") return "Category is required.";
    if (!content || content.trim() === "") return "Content cannot be empty.";
    if (!postingYear || postingYear.trim() === "") return "Years cannot be empty.";
    if (!images || images.length === 0) return 'At least one file is required';
    return null;
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm(title, editorContent, category, postingYear, selectedFiles);

    if (validationError) {
      notifyError(validationError);
      setLoading(false);
      return;
    }
    try {
      console.log("selectedFiles", selectedFiles)

      console.log(captions)
      const captionData = JSON.stringify(captions);
      const formdata = new FormData();

      selectedFiles.forEach((file) => {
        return (
          formdata.append(`files[]`, file, file.name)
        )
      });

      formdata.append("title", title);
      formdata.append("category", category);
      formdata.append("year", postingYear);
      formdata.append("content", editorContent);
      if (selectedFiles.length > 0) {
        formdata.append("thumbnail_image", selectedFiles[0].name);
      }
      formdata.append("image_caption_data", captionData);

      // Debugging: Log FormData key-value pairs
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }


      const resp = await PostServices.uploadPost(formdata);

      if (resp?.status_code === 200) {
        console.log(resp);
        notifySuccess("Post uploaded successfully!");
      } else {
        notifyError(resp?.message || "Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notifyError("An error occurred during file upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm(title, editorContent, category, postingYear, selectedFiles);

    if (validationError) {
      notifyError(validationError);
      return;
    }
    try {
      console.log("selectedFiles", selectedFiles)
      const newImgesAdd = selectedFiles.filter(item =>
        Object.keys(item).length === 2 && 'path' in item && 'relativePath' in item
      );
      console.log(newImgesAdd)
      const captionData = JSON.stringify(captions);

      const formdata = new FormData();
      if (newImgesAdd?.length > 0) {
        newImgesAdd.forEach((file) => {
          return (
            formdata.append(`files[]`, file, file.name)
          )
        });
      }


      // Append other data
      formdata.append("title", title);
      formdata.append("category", category);
      formdata.append("year", postingYear);
      formdata.append("content", editorContent);
      if (selectedFiles.length > 0) {
        formdata.append("thumbnail_image", selectedFiles[0].name);
      }

      formdata.append("image_caption_data", captionData);
      formdata.append("edited_caption_data", JSON.stringify(editCaptionsList));
      formdata.append("id", id ? id : "");
      formdata.append("id_disabled", "");
      const deletedMediaString = deletedMediaList.join(",");
      formdata.append("delete_media", deletedMediaString);
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }
      const resp = await PostServices.updatePost(formdata)
      if (resp?.status_code === 200) {
        console.log(resp);
        notifySuccess("Post uploaded successfully!");
      } else {
        notifyError(resp?.message || "Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notifyError("An error occurred during file upload. Please try again.");
    } finally {
      setLoading(false);
    }
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

                  {/* <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="postTitle" className="mb-3">
                      <Form.Label>Post Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </Form.Group> */}
                  <div className="col-md-12 p-1">
                    <label htmlFor="postCategory" className="col-form-label">
                      Choose Post Category
                    </label>
                    <input
                      type="text"
                      id="postTitle"
                      className="form-control search-input"
                      placeholder="Enter post title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="px-2 mb-3 mt-2 row d-flex justify-content-between">
                    <div className="col-md-6 p-1">
                      <label htmlFor="postCategory" className="col-form-label">
                        Post Title
                      </label>
                      <div className="custom-select-wrapper">
                        <select
                          id="postCategory"
                          className="form-control custom-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">All Categories</option>
                          <option value="news">News</option>
                          <option value="visit">Visit</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 p-1">

                      <label htmlFor="postingYears" className="col-form-label">
                        Posting Years
                      </label>
                      <div className="custom-select-wrapper">
                        <select
                          id="postingYears"
                          className="form-control custom-select"
                          value={postingYear}
                          onChange={(e) => setPostingYear(e.target.value)}
                        >
                          {Array.from({ length: 15 }, (_, i) => {
                            const year = 2010 + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

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
                        <div className="preview-images" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                          {selectedFiles.map((file, index) => (
                            <>
                            <div
                              className="d-flex flex-column align-items-center"
                              key={index}
                              style={{
                                position: "relative",
                                marginRight: "10px",
                                cursor: "move",
                                width: "150px",
                              }}
                            >
                              <img
                                key={file.name}
                                src={file instanceof File ? URL.createObjectURL(file) : file.path} // Handle local or API-provided files
                                alt={file.name}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  marginBottom: "5px",
                                }}
                              />
                              <button
                                className="cancleButton"
                                onClick={() => handleRemoveFile(index)}
                                style={{
                                  position: "absolute",
                                  top: "5px",
                                  right: "5px",
                                  background: "#531515",
                                  border: "none",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  cursor: "pointer",
                                  color: "white",
                                  zIndex: 10,
                                }}
                              >
                                &#10005;
                              </button>
                              {/* Thumbnail label */}
                              {index === 0 && (
                                <p
                                  style={{
                                    textAlign: "center",
                                    fontSize: "12px",
                                    marginTop: "5px",
                                  }}
                                >
                                  Thumbnail Image
                                </p>
                              )}
                          
                              {/* Caption input */}
                              <input
                                type="text"
                                placeholder="Enter caption"
                                value={captions[file.name] || ""}
                                onChange={(e) => handleCaptionChange(e, file.name)}
                                style={{
                                  width: "100%",
                                  marginTop: "5px",
                                  padding: "5px",
                                  borderRadius: "4px",
                                  border: "1px solid #ccc",
                                  textAlign: "center", // Center-align text inside input
                                }}
                              />
                            </div>
                          </>
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

                  <div className="col-md-12 p-1">
                    <label htmlFor="postCategory" className="col-form-label">
                      Post Content
                    </label>
                    {/* <Form>

                    <Form.Group controlId="postContent" className="mb-3">
                      <Form.Label>Post Content</Form.Label> */}
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          'heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList',
                          // 'imageUpload', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter',
                          'imageStyle:alignRight', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells',
                          // 'mediaEmbed', 
                          '|', 'undo', 'redo', 'Subscript'],
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
                  </div>
                  {/* </Form.Group>
                  </Form> */}
                  <Button
                    text={loading ? "Submitting..." : id ? "Update Post" : "Create Post"}
                    onClick={id ? handleUpdate : handleSubmit}
                    className="btn btn-primary mt-2"
                    disabled={loading ? true : false}
                    type="submit"
                  />


                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer />/ */}
      </div >
    </React.Fragment >
  );
};

export default CreatePost;
