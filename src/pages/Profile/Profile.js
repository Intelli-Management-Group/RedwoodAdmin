import React, { useState } from 'react';
// import './UserProfile.css'; // Add custom styles if needed
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { Link, } from "react-router-dom";
import "../Users/userStyle.css"
import AddUserModal from "../Component/UserModal/UserModal";
import userImage from "../../Assetes/images/user.png";


const UserProfile = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('userData'));
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };
    // const handleEdit = () => {
    //     // Logic for editing user details
    //     alert("Edit profile functionality not implemented yet.");
    // };
console.log(user)
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
                                <div className="container-fluid profile-container mt-4">
                                    <div className="row justify-content-center">
                                        {/* Profile Card */}
                                        <div className="col-md-8 col-lg-6 profile-card p-4 customWhiteBg">
                                            <div className="text-center">
                                                {/* Profile Picture */}
                                                <div className="profile-picture">
                                                    <img
                                                        src={user.profilePicture ?user.profilePicture : userImage} 
                                                        alt={`${user.name}'s Profile`}
                                                        className="rounded-circle"
                                                    />
                                                </div>

                                                {/* User Name */}
                                                <h2 className="mt-3">{user?.username}</h2>
                                                <p className="text-muted">{user?.role}</p>
                                            </div>

                                            {/* User Details */}
                                            <div className="user-details mt-4">
                                                <div className="detail-item d-flex justify-content-between align-items-center">
                                                    <strong>Email:</strong>
                                                    <span>{user.email}</span>
                                                </div>
                                                {user.phone &&
                                                <div className="detail-item d-flex justify-content-between align-items-center mt-2">
                                                    <strong>Phone:</strong>
                                                    <span>{user.phone}</span>
                                                </div>}
                                            </div>

                                            {/* <div className="text-center mt-4">
                                                <Button variant="primary" onClick={handleEdit}>
                                                    Edit Profile
                                                </Button>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <AddUserModal
                                show={isModalVisible}
                                onHide={() => setIsModalVisible(false)}
                            // userData={selectedUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};

export default UserProfile;
