import React, { useEffect, useState } from 'react';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import MediaServices from '../../Services/MediaServices';
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import { useNavigate } from 'react-router-dom';


function UploadMedia() {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [loading, setLoading] = useState(true)

    const [previewUrl, setPreviewUrl] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
    }, [])


    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const gotoMedia = (e) => {
        navigate('/media')

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadLoading(true);

        if (!selectedFile) {
            notifyError("Please select an image to upload.",);
            setUploadLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const resp = await MediaServices.MediaUpload(formData);

            if (resp?.status_code === 200) {
                notifySuccess(resp?.message,);

                setSelectedFile(null);
                setPreviewUrl("");

                setTimeout(() => handleClose, 3000);
            } else {
                notifyError("Upload failed. Please try again.",);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            notifyError("An error occurred during upload. Please try again.",);
        } finally {
            setUploadLoading(false);
        }
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
                            <div className='mt-2'>

                                <Button
                                    text={"Back to Media"}
                                    className="btn-primary"
                                    type="submit"
                                    onClick={gotoMedia}
                                    // disabled={loading}
                                />
                            </div>
                            <div className='upload-box mt-3'>
                                <h2 className=" mt-1 mb-1">Upload Media</h2>

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
                            </div>
                            <div className="text-center">
                                <Button
                                    text="Upload"
                                    className="btn-primary"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>


    );
}

export default UploadMedia;
