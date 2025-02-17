import React, { useEffect, useRef, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from '../Component/ButtonComponents/ButtonComponents';
import PageServices from "../../Services/PageServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import { Form } from 'react-bootstrap';
import { faChevronDown, faChevronUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreatePages = () => {
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const maxFileSizeInMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(1);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("publications");
  const startYear = 2010;
  const [postingYear, setPostingYear] = useState(new Date().getFullYear());
  const range = new Date().getFullYear() - startYear + 1;
  const [hedgeFundReportstypes, setHedgeFundReportstypes] = useState("monthlyPortfolioSummary");
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isYearsOpen, setIsYearsOpen] = useState(false);
  const [updatedFileName, setUpdatedFileName] = useState("")
  const [isEditing, setIsEditing] = useState(false);

  const documentRef = useRef();
  const reportsRef = useRef();
  const yearsRef = useRef();


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
      if (file.size > MAX_FILE_SIZE) {
        notifyError(`File size exceeds ${maxFileSizeInMB} MB. Please upload a smaller file.`);
        return;
      }
      setSelectedFile(file);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > MAX_FILE_SIZE) {
        notifyError(`File size exceeds ${maxFileSizeInMB} MB. Please upload a smaller file.`);
        return;
      }
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
      formdata.append("hedge_fund_report_type", hedgeFundReportstypes)
      formdata.append("name", updatedFileName ? updatedFileName : "")
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
  const normalize = (name) => 
    name.toLowerCase()
        .replace(/[-–]/g, " ") 
        .replace(/\s+/g, " ")
        .trim();  

  const validateFileName = (file, updatedFileName, requiredPrefix) => {
    const fileName = file.name;
    const updatedFilesName = updatedFileName || fileName;
  
    const normalizedFileName = normalize(updatedFilesName);
    const normalizedPrefix = normalize(requiredPrefix);
  
    if (!normalizedFileName.startsWith(normalizedPrefix)) {
      return `File name must start with '${requiredPrefix}' (case-insensitive, hyphens allowed).`;
    }
  };
  const validateForm = (file, type, year) => {
    if (!file) return "Please select a file before submitting.";
    if (!type || type.trim() === "") return "Please select a valid document type.";
    if (!year || isNaN(year) || year <= 0) return "Please provide a valid posting year.";
    if (type === "publications") {
      const fileName = file.name;
      const updatedFilesName = updatedFileName || fileName;
    
      const normalizedFileName = updatedFilesName.toLowerCase().replace(/-/g, " ");
    
      if (!normalizedFileName.startsWith("redwood peak china outlook")) {
        return "File name must start with 'Redwood Peak China Outlook' (case-insensitive, hyphens allowed).";
      }
    } else if (type === "hedgeFundReports") {    
      if (hedgeFundReportstypes === "monthlyPortfolioSummary") {
        const result = validateFileName(
          file,
          updatedFileName,
          "Redwood Peak Opportunities Master Fund Portfolio Summary"
        );
        if (result) {
          return result;
        }
      } else if (hedgeFundReportstypes === "quarterlyPerformanceAnalysis") {
        const result = validateFileName(
          file,
          updatedFileName,
          "Redwood Peak Opportunities Master Fund Performance Analysis"
        );
        if (result) {
          return result;
        }
      } else if (hedgeFundReportstypes === "quarterlyShareholderLetter") {
        const result = validateFileName(
          file,
          updatedFileName,
          "Redwood Peak Opportunities Master Fund Shareholders Letter"
        );
        if (result) {
          return result;
        }
      }
    }
    
    return null;
  };

  const resetFormFields = () => {
    setSelectedFile(null);
    setDocumentType("publications");
    // setPostingYear("2024");
    setUpdatedFileName("")
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handldeDocumentUpdate = (e) => {
    console.log("e", e.target.value)
    if (e.target.value !== "hedgeFundReports") {
      setHedgeFundReportstypes("monthlyPortfolioSummary")
    }
    setDocumentType(e.target.value)
  }
  useEffect(() => {
    console.log('component mounted');
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDocumnetsDropdown = () => setIsDocumentOpen(!isDocumentOpen);
  const toggleReportsDropdown = () => setIsReportsOpen(!isReportsOpen);
  const toggleYearsDropdown = () => setIsYearsOpen(!isYearsOpen);


  const handleClickOutside = (e) => {
    if (documentRef.current && !documentRef.current.contains(e.target)) {
      setIsDocumentOpen(false);
    }
    if (reportsRef.current && !reportsRef.current.contains(e.target)) {
      setIsReportsOpen(false);
    }
    if (yearsRef.current && !yearsRef.current.contains(e.target)) {
      setIsYearsOpen(false);
    }
  };
  const handleFileNameChange = (event) => {
    setUpdatedFileName(event.target.value);
  };
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleSaveFileName = () => {
    setIsEditing(false);
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
            <div className="container-fluid">
              <h2 className="mt-5 mb-3">Upload Documents</h2>
              <Form className="mt-5 mb-5" onSubmit={handleSubmit}>
                <div className="form-group row">

                  <div className="col-md-4 p-1">
                    <Form.Group controlId="postType">
                      <Form.Label>Documents Type</Form.Label>
                      <div className="custom-select-wrapper" ref={documentRef}>
                        <Form.Control
                          as="select"
                          className="form-control custom-select"
                          value={documentType}
                          onChange={(e) => handldeDocumentUpdate(e)}
                          onClick={toggleDocumnetsDropdown}

                        >
                          <option value="publications">Publications</option>
                          <option value="hedgeFundReports">Hedge Fund Reports</option>
                          <option value="managedAccountReports">Managed Account Reports</option>
                        </Form.Control>
                        <FontAwesomeIcon
                          icon={isDocumentOpen ? faChevronUp : faChevronDown}
                          className="dropdown-arrow position-absolute"
                        />
                      </div>
                    </Form.Group>
                  </div>

                  {documentType === 'hedgeFundReports' && (
                    <div className="col-md-4 p-1">
                      <Form.Group controlId="HedgeFundReportstypes">
                        <Form.Label>Hedge Fund Reports Types</Form.Label>
                        <div className="custom-select-wrapper" ref={reportsRef}>
                          <Form.Control
                            as="select"
                            className="form-control custom-select"
                            value={hedgeFundReportstypes}
                            onChange={(e) => setHedgeFundReportstypes(e.target.value)}
                            onClick={toggleReportsDropdown}
                          >
                            <option value="monthlyPortfolioSummary">Monthly Portfolio Summary</option>
                            <option value="quarterlyPerformanceAnalysis">Quarterly Performance Analysis</option>
                            <option value="quarterlyShareholderLetter">Quarterly Shareholder Letter</option>
                            <option value="fundDocumentation">Fund Documentation</option>
                            <option value="auditedFinancialStatements">Audited Financial Statements</option>
                          </Form.Control>
                          <FontAwesomeIcon
                            icon={isReportsOpen ? faChevronUp : faChevronDown}
                            className="dropdown-arrow position-absolute"
                          />
                        </div>
                      </Form.Group>
                    </div>
                  )}

                  <div className="col-md-4 p-1">
                    <Form.Group controlId="postingYears">
                      <Form.Label>Posting Years</Form.Label>
                      <div className="custom-select-wrapper" ref={yearsRef}>
                        <Form.Control
                          as="select"
                          className="form-control custom-select"
                          value={postingYear}
                          onChange={(e) => setPostingYear(e.target.value)}
                          onClick={toggleYearsDropdown}

                        >
                          {Array.from({ length: range }, (_, i) => {
                            const year = 2010 + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </Form.Control>
                        <FontAwesomeIcon
                          icon={isYearsOpen ? faChevronUp : faChevronDown}
                          className="dropdown-arrow position-absolute"
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="upload-box mt-5 mb-5"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  <Form.Group controlId="documentUpload">
                    <Form.Label className="upload-label">
                      <h4>
                        {selectedFile ? selectedFile.name : "Drag and drop your PDF here or click to upload"}
                      </h4>
                    </Form.Label>
                    <input
                      type="file"
                      id="documentUpload"
                      className="form-control"
                      accept="application/pdf"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <div className="upload-button">
                    <Button
                      text="Select PDF"
                      className="btn-primary"
                      type="button"
                      onClick={() => document.getElementById("documentUpload").click()}
                      disabled={isEditing}
                    />
                  </div>
                  <small className="form-text text-muted">
                    Note: Each file should not exceed 10 MB in size. Only PDF files are allowed.
                  </small>
                </div>

                <Form.Group>
                  <h4 className="text-center">
                    {selectedFile ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        {!isEditing && (
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={toggleEditing}
                            className="primaryColor"
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        )}

                        {isEditing ? (
                          <>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
                              <input
                                type="text"
                                value={updatedFileName}
                                placeholder="New files name here"
                                onChange={handleFileNameChange}
                                className="file-name-input"
                                style={{
                                  border: "none",
                                  borderBottom: "2px solid #000",
                                  outline: "none",
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  width: "400px",
                                  backgroundColor: 'transparent',
                                }}
                              />

                              <Button
                                text={"Update File Name"}
                                className="btn-primary"
                                type="submit"
                                onClick={handleSaveFileName}
                                style={{
                                  marginTop: "10px",
                                }}
                              />
                            </div>
                          </>

                        ) : (
                          <span>{updatedFileName ? updatedFileName : selectedFile.name}</span>
                        )}
                      </div>
                    ) : null}
                  </h4>
                </Form.Group>

                <div className="text-center">
                  <Button
                    text={loading ? "Submitting..." : "Submit"}
                    className="btn-primary"
                    type="submit"
                    disabled={loading || isEditing}
                  />
                  {/* {loading && <div className="spinner-border text-primary" role="status"></div>} */}
                </div>
              </Form>
            </div>

          </div>
        </div>
      </div >
    </React.Fragment >
  );
};

export default CreatePages;
