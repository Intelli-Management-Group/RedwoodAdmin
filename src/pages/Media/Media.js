import React, { useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import Modal from 'react-bootstrap/Modal';

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


  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    src: "",
    type: "",
    title: "",
    url: "",
  });

  const handleViewClick = (item) => {
    setModalContent({
      src: item.src,
      type: item.type,
      title: item.title,
      url: item.src,
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
                    <Modal show={show} onHide={handleClose} style={{ marginTop: "15%" }}>
                      <Modal.Header closeButton>
                        <Modal.Title>Upload New Media
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <label htmlFor="documentUpload" className="upload-label">
                          <div>
                            {selectedFile ? selectedFile.name : "Select Files"}
                          </div>
                        </label>
                        <div className="upload-button">
                          <Button
                            text="Choose File"
                            className="btn-primary"
                            type="submit"

                          />
                          <span> No File Chosen</span>
                        </div>

                      </Modal.Body>
                      <Modal.Footer>
                        <Button text="Close"
                          className="btn-primary"
                          type="submit"
                          variant="secondary"
                          onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          text="Upload"
                          className="btn-primary"
                          type="submit"
                        />
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
                      {filteredItems.map((item) => (
                        <div className="col-md-3 media-item" key={item.id} data-type={item.type}>
                          <div className="card cardBorder mb-4">
                            {item.isImage && (
                              <img
                                src={item.src || placeholderImage}
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
                            {item.isVideo && (
                              <video className="card-img-top" controls>
                                <source
                                  src={item.src}
                                  type="video/mp4"
                                  onError={(e) => (e.target.src = placeholderVideo)}
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            {item.isDocument && (
                              <a href={item.src} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={item.thumbnail || placeholderDocument}
                                  className="card-img-top"
                                  alt="Document Thumbnail"
                                  style={{ width: "100%" }}
                                  onError={(e) => (e.target.src = placeholderDocument)}
                                />
                              </a>
                            )}
                            <div className="card-body">
                              <h5 className="card-title">{item.title || "Untitled"}</h5>
                              {/* <button className="btn btn-primary mt-2">View</button> */}
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

                      {/* Modal */}
                      <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>{modalContent.title || "Details"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className='row'>
                            <div className='col-md-4'>
                            {modalContent.type === "images" && (
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
                              {modalContent.type === "document" && (
                                <img
                                  src={modalContent.src} // Assuming the thumbnail is shown
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
                          {/* <div className="d-flex">
                            <div style={{ flex: 1, marginRight: "20px" }}>
                              {modalContent.type === "images" && (
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
                              {modalContent.type === "document" && (
                                <img
                                  src={modalContent.src} // Assuming the thumbnail is shown
                                  alt={modalContent.title || "Document"}
                                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                                />
                              )}
                            </div>

                            <div style={{ flex: 1 }}>
                              <h6>File URL:</h6>
                              <a
                                href={modalContent.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {modalContent.url}
                              </a>
                            </div>
                          </div> */}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
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
