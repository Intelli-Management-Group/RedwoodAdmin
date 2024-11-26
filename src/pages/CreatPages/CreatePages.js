import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from '../Component/ButtonComponents/ButtonComponents';
import PageServices from "../../Services/PageServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";

const CreatePages = () => {
  const [loading, setLoading] = useState(false);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("publications");
  const [postingYear, setPostingYear] = useState("2024");

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const validationError = validateForm(selectedFile, documentType, postingYear);
    if (validationError) {
      notifyError(validationError, { position: "top-center", autoClose: 3000 });
      setLoading(false);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("file", selectedFile, selectedFile.name);
      formdata.append("type", documentType);
      formdata.append("year", postingYear);

      const resp = await PageServices.uploadPages(formdata);

      if (resp?.status_code === 200) {
        console.log(resp);
        resetFormFields();
        notifySuccess(resp?.message || "File uploaded successfully!");
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

  const validateForm = (file, type, year) => {
    if (!file) return "Please select a file before submitting.";
    if (!type || type.trim() === "") return "Please select a valid document type.";
    if (!year || isNaN(year) || year <= 0) return "Please provide a valid posting year.";
    return null;
  };

  const resetFormFields = () => {
    setSelectedFile(null);
    setDocumentType("publications");
    setPostingYear("2024");
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
                <div className="upload-box mt-5 mb-5"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
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
                      type="button"
                      onClick={() => document.getElementById("documentUpload").click()}
                    />
                  </div>
                  <small className="form-text text-muted">Only PDF files are allowed.</small>
                </div>
                <div className="text-center">
                  <Button
                    text={loading ? "Submitting..." : "Submit"}
                    className="btn-primary"
                    type="submit"
                    disabled={loading}
                  />
                  {/* {loading && <div className="spinner-border text-primary" role="status"></div>} */}
                </div>
              </form>
            </div>

          </div>
        </div>
      </div >
    </React.Fragment >
  );
};

export default CreatePages;
