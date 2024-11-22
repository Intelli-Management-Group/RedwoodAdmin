import React, { useEffect, useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import Modal from 'react-bootstrap/Modal';
import MediaServices from '../../Services/MediaServices';
import { ToastContainer, toast } from 'react-toastify';
import Skeleton from '../Component/SkeletonComponent/SkeletonComponent';

const mediaItems = [
  {
    id: 1,
    type: "images",
    title: "Image 3",
    src: "https://dev.jackychee.com/assets/dummy_Assetes/service_img1.jpg",
    alt: "Image 1",
    isImage: true,
  },
  {
    id: 2,
    type: "images",
    title: "Image 4",
    src: "https://dev.jackychee.com/assets/dummy_Assetes/service_img2.jpg",
    alt: "Image 2",
    isImage: true,
  },
  {
    id: 3,
    type: "videos",
    title: "Video 2",
    src: "https://dev.jackychee.com/assets/dummy_Assetes/video.mp4",
    isVideo: true,
  },
  {
    id: 4,
    type: "documents",
    title: "Document 2",
    src: "https://dev.jackychee.com/assets/dummy_Assetes/servdsice_img2.jpg",
    thumbnail: "/assets/dummy_Assetes/pdf.jpg",
    isDocument: true,
  },

];


const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"; // Path to a placeholder image
const placeholderVideo = "https://www.shutterstock.com/image-vector/no-video-available-sign-isolated-260nw-2227175051.jpg"; // Path to a video placeholder image
const placeholderDocument = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"; // Path to a placeholder image

function Media() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [filteredItems, setFilteredItems] = useState(mediaItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [mediaList, setMediaList] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true)
  const [modalContent, setModalContent] = useState({
    src: "",
    type: "",
    title: "",
    url: "",
  });
  useEffect(() => {
    setLoading(true)
    getMediaList()
  }, [])

  async function getMediaList() {
    try {

      const formdata = new FormData();
      formdata.append("pageSize", "50");
      const resp = await MediaServices.getMediaList(formdata);
      if (resp?.status_code === 200) {
        console.log(resp)
        // resp?.        
        setMediaList(resp?.list?.data)
        setTimeout(() => handleClose(), 3000);
      } else {
        toast.error("Please try again.", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("An error occurred during fetch Data. Please try again.", { position: "top-center", autoClose: 3000 });
    } finally {
      setLoading(false)
    }

  }

  const handleViewClick = (item) => {
    setModalContent({
      src: item.path,
      type: item.category,
      title: item.name,
      url: item.path,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const searchedItems = mediaItems.filter((item) =>
      item.title.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredItems(searchedItems);
  };

  const handleFilter = (type) => {
    if (type === "all") {
      setFilteredItems(mediaItems);
    } else {
      setFilteredItems(mediaItems.filter((item) => item.type === type));
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (!selectedFile) {
      toast.error("Please select an image to upload.", { position: "top-center", autoClose: 3000 });
      setUploadLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const resp = await MediaServices.MediaUpload(formData);

      if (resp?.status_code === 200) {
        toast.success(resp?.message, { position: "top-center", autoClose: 3000 });

        setSelectedFile(null);
        setPreviewUrl("");

        setTimeout(() => handleClose(), 3000);
      } else {
        toast.error("Upload failed. Please try again.", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("An error occurred during upload. Please try again.", { position: "top-center", autoClose: 3000 });
    } finally {
      setUploadLoading(false);
    }
  };




  console.log(modalContent)
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
                <div className="row mt-5 align-items-center customWhiteBg pt-3 pb-3">
                  <div className="col-md-9">
                    <h3>Media</h3>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <Button
                      text="Add New Media File"
                      className="btn btn-primary"
                      type="button"
                      onClick={handleShow}
                    >
                      Add New Media File
                    </Button>
                    {/* onHide={handleClose} OutSide click when modal close */}
                    <Modal show={show}  style={{marginTop:'5%' }}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload New Media</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {uploadLoading ? (
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                            <div className="spinner-border text-primary-color" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <form style={{ width: "100%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                          {/* Hidden File Input */}
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*,video/*,.pdf"
                            multiple
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        
                          {/* Preview Section */}
                          <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                            {selectedFile && (
                              <div style={{ width: "120px", textAlign: "center", position: "relative" }}>
                                {/* Image Preview */}
                                {selectedFile.type.startsWith("image/") && (
                                  <img
                                    src={previewUrl}
                                    alt="Image Preview"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                )}
                        
                                {/* Video Preview */}
                                {selectedFile.type.startsWith("video/") && (
                                  <video
                                    src={previewUrl}
                                    controls
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "8px",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  />
                                )}
                        
                                {/* PDF Preview */}
                                {selectedFile.type === "application/pdf" && (
                                  <div
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      backgroundColor: "#f0f0f0",
                                      borderRadius: "8px",
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <img
                                      src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                      alt="PDF Preview"
                                      style={{ width: "40px", height: "40px" }}
                                    />
                                  </div>
                                )}
                        
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedFile(null); 
                                    setPreviewUrl(""); 
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                    backgroundColor: "#ff0000",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    fontSize: "14px",
                                  }}
                                >
                                  X
                                </button>
                              </div>
                            )}
                          </div>
                        
                          <label
                            htmlFor="fileInput"
                            style={{
                              padding: "10px 20px",
                              color: "#fff",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "16px",
                              textAlign: "center",
                              display: "inline-block",
                              transition: "background-color 0.3s ease",
                              marginBottom: "20px",
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                            className="btn btn-primary mt-3"
                          >
                            Choose File(s)
                          </label>
                        
                          <p style={{ marginTop: "20px", color: "#888", fontSize: "14px" }}>
                            You can upload images, videos, or PDFs. Multiple files are supported.
                          </p>
                        </form>
                        )}

                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          text="Close"
                          className="btn-primary"
                          type="button"
                          variant="secondary"
                          onClick={handleClose}
                        >
                          Close
                        </Button>

                        <Button
                          text="Upload"
                          className="btn-primary"
                          type="button" 
                          onClick={handleSubmit} 
                        >
                          Upload
                        </Button>
                      </Modal.Footer>
                    </Modal>

                  </div>
                </div>
                <br />
                <div className='customWhiteBg row'>
                  <nav className="pt-3 pb-2">
                    <div className="row">
                      <div className="col-md-8">
                        <Button
                          variant="primary"
                          className="btn btn-outline-secondary ms-auto w-auto me-2"
                          type="button"
                          text="All"
                          onClick={() => handleFilter("all")}
                        />
                        <Button
                          variant="primary"
                          className="btn btn-outline-secondary ms-auto w-auto me-2"
                          type="button"
                          text="Images"
                          onClick={() => handleFilter("images")}
                        />
                        <Button
                          variant="primary"
                          className="btn btn-outline-secondary ms-auto w-auto me-2"
                          type="button"
                          text="Videos"
                          onClick={() => handleFilter("videos")}
                        />
                        <Button
                          variant="primary"
                          className="btn btn-outline-secondary ms-auto w-auto me-2"
                          type="button"
                          text="Documents"
                          onClick={() => handleFilter("documents")}
                        />
                        <Button
                          variant="primary"
                          className="btn btn-outline-danger ms-auto w-auto me-2"
                          type="button"
                          text="Reset All Filters"
                          onClick={() => handleFilter("all")}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search media..."
                            aria-label="Search media.."
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <div className="input-group-append">
                            <Button
                              variant="primary"
                              className="btn btn-outline-secondary ms-auto w-auto "
                              type="button"
                              text="search"
                              onClick={handleSearch}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </nav>
                  <br />
                  <div className="container">
                    {/* <div
                      className="row p-2"
                      id="mediaItems"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        height: "400px",
                        overflowY: "auto",
                      }}

                    >
                      {loading ? (
                        <>
                          <Skeleton type="row" columns={4} />
                          <Skeleton type="row" columns={4} />
                          <Skeleton type="row" columns={4} />
                          <Skeleton type="row" columns={4} />
                          <Skeleton type="row" columns={4} />
                          <Skeleton type="row" columns={4} />
                        </>
                      ) : (
                        <>
                          {mediaList.map((item) => (
                            <div className="col-md-3 media-item" key={item.id} data-type={item.type}>
                              <div className="card cardBorder mb-4">


                                {item.category === "image" && (
                                  <img
                                    src={item.path || placeholderImage}
                                    className="card-img-top"
                                    alt={item.alt || "Placeholder Image"}
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "contain",
                                    }}
                                    onError={(e) => (e.target.src = placeholderImage)}
                                  />
                                )}
                                {item.category === "video" && (
                                  <video className="card-img-top" controls>
                                    <source
                                      src={item.path || placeholderImage}
                                      type="video/mp4"
                                      onError={(e) => (e.target.src = placeholderVideo)}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                                {item.category === "application" && (
                                  <a href={item.path} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'}
                                      className="card-img-top"
                                      alt="Document Thumbnail"
                                      style={{ width: "100%" }}
                                      onError={(e) => (e.target.src = placeholderDocument)}
                                    />
                                  </a>
                                )}
                                <div className="card-body">
                                  <h6 className="card-title">
                                    {item.name ? item.name.split('.').slice(0, -1).join('.') : "Untitled"}
                                  </h6>
                                  <Button
                                    variant="primary"
                                    className="btn btn-primary ms-auto w-auto me-2"
                                    type="button"
                                    text="View"
                                    onClick={() => handleViewClick(item)}
                                  />
                                </div>

                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div> */}
                    <div
                      className="row p-2"
                      id="mediaItems"
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        height: "400px",
                        overflowY: "auto",
                      }}
                    >
                      {loading ? (
                        <>
                          {/* Skeleton Loader */}
                          {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="col-md-3 media-item">
                              <div className="card cardBorder mb-4">
                                {/* Skeleton Image */}
                                <div className="skeleton-box" style={{ width: "100%", height: "200px", backgroundColor: "#ddd" }}></div>

                                {/* Skeleton Card Body */}
                                <div className="card-body">
                                  <div className="skeleton-box" style={{ width: "60%", height: "20px", backgroundColor: "#ddd" }}></div>
                                  <div className="skeleton-box" style={{ width: "40%", height: "30px", backgroundColor: "#ddd", marginTop: "10px" }}></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {mediaList.map((item) => (
                            <div className="col-md-3 media-item" key={item.id} data-type={item.type}>
                              <div className="card cardBorder mb-4">
                                {item.category === "image" && (
                                  <img
                                    src={item.path || placeholderImage}
                                    className="card-img-top"
                                    alt={item.alt || "Placeholder Image"}
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "contain",
                                    }}
                                    onError={(e) => (e.target.src = placeholderImage)}
                                  />
                                )}
                                {item.category === "video" && (
                                  <video className="card-img-top" controls>
                                    <source
                                      src={item.path || placeholderImage}
                                      type="video/mp4"
                                      onError={(e) => (e.target.src = placeholderVideo)}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                                {item.category === "application" && (
                                  <a href={item.path} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'}
                                      className="card-img-top"
                                      alt="Document Thumbnail"
                                      style={{ width: "100%" }}
                                      onError={(e) => (e.target.src = placeholderDocument)}
                                    />
                                  </a>
                                )}
                                <div className="card-body">
                                  <h6 className="card-title">
                                    {item.name ? item.name.split('.').slice(0, -1).join('.') : "Untitled"}
                                  </h6>
                                  <Button
                                    variant="primary"
                                    className="btn btn-primary ms-auto w-auto me-2"
                                    type="button"
                                    text="View"
                                    onClick={() => handleViewClick(item)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                  </div>

                  {/* Modal */}
                  <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>{modalContent.title || "Details"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className='row'>
                        <div className='col-md-4'>
                          {modalContent.type === "image" && (
                            <img
                              src={modalContent.src || placeholderImage}
                              className="card-img-top"
                              alt={modalContent.title || "Media"}
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "contain",
                              }}
                              onError={(e) => (e.target.src = placeholderImage)}
                            />
                          )}
                          {modalContent.type === "video" && (
                            <video controls style={{ width: "100%" }}>
                              <source src={modalContent.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {modalContent.type === "application" && (
                            <img
                              src={'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'}
                              alt={modalContent.title || "Document"}
                              style={{ width: "100%", height: "auto", objectFit: "contain" }}
                            />
                          )}

                        </div>
                        <div className='col-md-8'>
                          <h6>File URL:</h6>
                          <a
                            href={modalContent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {modalContent.url}
                          </a>

                        </div>

                      </div>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <ToastContainer />


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>


  );
}

export default Media;
