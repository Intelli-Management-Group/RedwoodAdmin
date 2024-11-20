import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from '../Component/ButtonComponents/ButtonComponents';
import 'react-quill/dist/quill.snow.css';


const CreatePages = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("publications");
  const [postingYear, setPostingYear] = useState("2024");

  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      setSelectedFile(files[0]);
    }
    event.target.classList.remove("drag-over");
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("File uploaded:", selectedFile.name);
      // Add logic to upload the file to the server
    } else {
      alert("Please select a file before submitting.");
    }
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
            <div className="container-fluid">
              <h2 className="mt-5 mb-3">Upload Documents</h2>

              <form className="mt-5 mb-5" onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col-md-4">
                    <label htmlFor="postType" className="col-form-label">
                      Documents Type
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="postType"
                        className="form-control custom-select"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        <option value="publications">Publications</option>
                        <option value="hedgeFundReports">Hedge Fund Reports</option>
                        <option value="managedAccountReports">Managed Account Reports</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
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
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = 2015 + i;
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
                <div
                  className="upload-box mt-5 mb-5"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label htmlFor="documentUpload" className="upload-label">
                    <h4>
                      {selectedFile ? selectedFile.name : "Drag and drop your PDF here or click to upload"}
                    </h4>
                  </label>
                  <input
                    type="file"
                    id="documentUpload"
                    className="form-control"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div className="upload-button">
                    <Button
                      text="Select PDF"
                      className="btn-primary"
                      type="submit"
                      onClick={() => document.getElementById("documentUpload").click()}

                    />
                  </div>
                  <small className="form-text text-muted ">Only PDF files are allowed.</small>
                </div>
                <Button
                  text="Upload"
                  className="btn-primary"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreatePages;
