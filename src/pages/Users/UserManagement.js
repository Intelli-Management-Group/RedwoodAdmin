import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Component/ConfirmationModal/ConfirmationModal";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import AddUserModal from "../Component/UserModal/UserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserManagement = () => {
    const location = useLocation();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [selectedUser, setSelectedUser] = useState(null);

    const { state } = location;
    const status = state?.status || "all";

    const dummyUsers = [
        { username: "john_doe", name: "John Doe", email: "john@example.com", role: "Editor", status: "approved" },
        { username: "jane_smith", name: "Jane Smith", email: "jane@example.com", role: "Author", status: "pending" },
        { username: "michael_brown", name: "Michael Brown", email: "michael@example.com", role: "Contributor", status: "rejected" },
    ];
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };

    const filteredUsers = dummyUsers.filter((user) => status === "all" || user.status === status);
    const openUserModal = (user) => {
        setSelectedUser(user); // Set the user to be edited
        setIsModalVisible(true); // Show the modal
    };

    // Function to close the modal
    const closeUserModal = () => {
        setIsModalVisible(false); // Hide the modal
        setSelectedUser(null); // Clear the selected user data
    };

    return (

        <React.Fragment>
            <div style={{ height: "100vh" }}>
                <div className="">
                    <Sidebar isVisible={isSidebarVisible} />
                    <div className={`main-content bodyBg ${isSidebarVisible ? "shifted" : ""}`}>
                        <Navbar toggleSidebar={toggleSidebar} />
                        <div className="dashboard-content">
                            <div className="container-fluid">
                                <div className="card mb-4" id="users-overview-card">
                                    <div className="card-header d-flex justify-content-between">
                                        <h2>Users Overview</h2>
                                        <span>
                                            <AddUserModal show={isModalVisible} onHide={closeModal} />
                                        </span>
                                    </div>


                                </div>
                                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                                    <div className="col-md-4 p-1">
                                        <div className="custom-select-wrapper">
                                            <select
                                                id="tableActions"
                                                className="form-control custom-select"
                                                value={''}
                                            // onChange={(e) => {
                                            //     setTableActions(e.target.value);
                                            //     handleTableAction(e.target.value);
                                            // }}
                                            >
                                                <option value="">Change role to...</option>
                                                <option value="Administrator">Administrator</option>
                                                <option value="Editor">Editor</option>
                                                <option value="Author">Author</option>
                                                <option value="Contributor">Contributor</option>
                                                <option value="Subscriber">Subscriber</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <div className="custom-select-wrapper">
                                            <select
                                                id="postCategories"
                                                className="form-control custom-select"
                                            >
                                                <option value="">User Action</option>
                                                <option value="approve">Approve Membership</option>
                                                <option value="reject">Reject Membership</option>
                                                <option value="pending">Put as Pending Review</option>
                                                <option value="resend">Resend Activation Email</option>
                                                <option value="deactivate">Deactivate</option>
                                                <option value="reactivate">Reactivate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <div className="search-input-wrapper">
                                            <Button
                                                text="Perform Action"
                                                onClick={''}
                                                className={"btn btn-primary me-2"}
                                                type="button"
                                            />

                                        </div>
                                    </div>
                                </div>

                                <table className="table table-striped" id="user-data-table" style={{ border: '1px solid #ccc' }}>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" id="select-all" /></th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.username}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        className="user-select"
                                                    // checked={selectedCheckboxes.includes(post.id)}
                                                    // onChange={(e) =>
                                                    //     handleCheckboxChange(post.id, e.target.checked)
                                                    // }
                                                    />
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>{user.status}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary" onClick={() => openUserModal(user)}>
                                                        <FontAwesomeIcon icon={faPencilSquare} size="lg" />
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-danger ms-2"
                                                        onClick={''}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} size="lg" />
                                                    </button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <AddUserModal isOpen={isModalVisible} onHide={closeModal} UserData={selectedUser}/> */}
                        <AddUserModal
                            show={isModalVisible}
                            onHide={() => setIsModalVisible(false)}
                            userData={selectedUser}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserManagement;
