import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import AddUserModal from "../Component/UserModal/UserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminServices from "../../Services/AdminServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";

const UserManagement = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([])
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const { state } = location;
    const status = state?.status || "all";
    console.log(status)


    useEffect(() => {
        fetchAllUser()

    }, [])

    const fetchAllUser = async () => {
        setIsLoading(true);
        try {
            const resp = await AdminServices.getAllUser();
            if (resp?.status_code === 200) {
                console.log(resp);

                setUserData(resp?.list || [])
            } else {
                notifyError("Please try again.",);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            notifyError("An error occurred during fetch Data. Please try again.",);
        } finally {
            setIsLoading(false);
        }
    };
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // const filteredUsers = dummyUsers.filter((user) => status === "all" || user.status === status);
    const openUserModal = (user) => {
        setSelectedUser(user); // Set the user to be edited
        setIsModalVisible(true); // Show the modal
    };

    // Function to close the modal
    const closeUserModal = () => {
        setIsModalVisible(false); // Hide the modal
        setSelectedUser(null); // Clear the selected user data
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    })

    const handleDelete = (id) => {
        console.log("page.id", id)
        deleteUser(id)
    };

    const deleteUser = async (id) => {
        try {
            const resp = await AdminServices.userDelete(id);
            if (resp?.status_code === 200) {
                console.log(resp);
                notifySuccess(resp?.message,);
                setTimeout(() =>
                    setIsLoading(true),
                    fetchAllUser(),
                    3000);

            } else {
                notifyError("Please try again.",);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            notifyError("An error occurred during fetch Data. Please try again.",);
        } finally {
            setIsLoading(false);
        }
        const handleCheckboxChange = (pageId, isChecked) => {
            if (isChecked) {
                setSelectedCheckboxes((prev) => [...prev, pageId]);
            } else {
                setSelectedCheckboxes((prev) =>
                    prev.filter((id) => id !== pageId)
                );
            }
        };
    };
    const handleCheckboxChange = (pageId, isChecked) => {
        if (isChecked) {
            setSelectedCheckboxes((prev) => [...prev, pageId]);
        } else {
            setSelectedCheckboxes((prev) =>
                prev.filter((id) => id !== pageId)
            );
        }
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            // Select all
            const allPostIds = userData.map((post) => post.id);
            setSelectedCheckboxes(allPostIds);
        } else {
            // Deselect all
            setSelectedCheckboxes([]);
        }
    };
    const handleActionChange = async (action) => {
        if (action === "Delete") {
            try {
                if (selectedCheckboxes.length === 0) {
                    notifyError("No items selected for deletion.");
                    return;
                }
                const formData = new FormData();

                const idsAsString = selectedCheckboxes.join(",");

                formData.append("ids", idsAsString);
                const resp = await AdminServices.multipleDeleteUser(formData);
                if (resp?.status_code === 200) {
                    notifySuccess(resp?.message,);
                    setTimeout(() =>
                        setIsLoading(true),
                        fetchAllUser(),
                        3000);

                } else {
                    notifyError("Please try again.",);
                }
            } catch (error) {
                console.error("Error uploading images:", error);
                notifyError("An error occurred during fetch Data. Please try again.",);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const areAllSelected =
        userData.length > 0 && selectedCheckboxes.length === userData.length;
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
                                                onChange={(e) => handleActionChange(e.target.value)}
                                            >
                                                <option value="">User Action</option>
                                                <option value="approve">Approve Membership</option>
                                                <option value="reject">Reject Membership</option>
                                                <option value="pending">Put as Pending Review</option>
                                                <option value="resend">Resend Activation Email</option>
                                                <option value="deactivate">Deactivate</option>
                                                <option value="reactivate">Reactivate</option>
                                                <option vlaue="Delete">Delete</option>
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
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    id="select-all"
                                                    checked={areAllSelected}
                                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                                />
                                            </th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <>
                                                <>
                                                    <Skeleton columns={7} /> {/* 5 columns for the Post table */}
                                                    <Skeleton columns={7} />
                                                    <Skeleton columns={7} />
                                                </>
                                            </>
                                        ) : userData.length > 0 ? (
                                            userData.map((user) => (
                                                <tr key={user.username}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            className="user-select"
                                                            checked={selectedCheckboxes.includes(user.id)}
                                                            onChange={(e) =>
                                                                handleCheckboxChange(user.id, e.target.checked)
                                                            }
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
                                                            onClick={() => handleDelete(user.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} size="lg" />
                                                        </button></td>
                                                </tr>
                                            ))) : (
                                            <tr>
                                                <td colSpan="5">No user available yet.</td>
                                            </tr>
                                        )}
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
