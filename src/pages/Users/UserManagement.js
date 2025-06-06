import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import AddUserModal from "../Component/UserModal/UserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AdminServices from "../../Services/AdminServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import Pagination from "react-js-pagination";
import ConfirmationDialog from "../Component/ConfirmationModal/ConfirmationModal";
import { Form } from 'react-bootstrap';

const UserManagement = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isConfiremdModalVisible, setIsConfiremdModalVisible] = useState(false); // State to control modal visibility
    const [currentPage, setCurrentPage] = useState(1);
    const perPageRecords = (10)
    const [totalRecords, setTotalRecords] = useState()
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([])
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [filter, SetFilter] = useState("")
    const [deletedItemId, setDeletedItemId] = useState("")
    const [action, setAction] = useState("")
    const [roleAction, setRoleAction] = useState("")
    const [statusWiseUser, setStatusWiseUser] = useState([]);
    const { state } = location;
    const status = state?.status || "all";
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const [isRolesOpen, setIsRolesOpen] = useState(false);
    const filterRef = useRef();
    const actionsRef = useRef();
    const rolesRef = useRef()
    const totalUserCount = statusWiseUser?.reduce((acc, statusData) => acc + statusData.total, 0);

    useEffect(() => {
        fetchAllUser()
        getUserWiseCounts()
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])
    useEffect(() => {
        if (filter === "all") {
            fetchAllUser()
        } else {
            fetchAllUser(1, filter)
        }
    }, [filter])


    const fetchAllUser = async (pageNumbers, data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            if (filter && filter !== "all") formData.append("status", data);

            const resp = await AdminServices.getAllUser({
                page: pageNumbers ? pageNumbers : currentPage,
                perPageRecords,
                body: formData,
            });
            if (resp?.status_code === 200) {
                console.log(resp);

                setUserData(resp?.list?.data || [])
                setTotalRecords(resp?.list?.total)
                setCurrentPage(resp?.list?.current_page);

            } else {
                notifyError("Please try again.",);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            if (error?.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = '/';
            }
            notifyError("An error occurred during fetch Data. Please try again.",);
        } finally {
            setIsLoading(false);
        }
    };
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    })

    const handleDelete = (id) => {
        console.log("id", id)
        setIsConfiremdModalVisible(true)
        setDeletedItemId(id)
        // deleteUser(id)
    };
    const handleConfirmDelete = () => {
        if (deletedItemId) {
            deleteUser(deletedItemId)
        } else {
            multipleDeleteUser()
        }
        clearSelectedCheckboxes();
        setIsConfiremdModalVisible(false);
        setTimeout(() => {
            setDeletedItemId()
        }, 2000)

    };

    const handleCancelDelete = () => {
        setDeletedItemId()
        clearSelectedCheckboxes();
        setIsConfiremdModalVisible(false);
        setSelectedCheckboxes([]);
        setAction("")

    };
    const clearSelectedCheckboxes = () => {
        const checkboxes = document.querySelectorAll(".user-select");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
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
    };

    const multipleDeleteUser = async (id) => {
        try {
            const formData = new FormData();
            const idsAsString = selectedCheckboxes.join(",");
            formData.append("ids", idsAsString);
            const resp = await AdminServices.multipleDeleteUser(formData);
            if (resp?.status_code === 200) {
                notifySuccess(resp?.message,);
                setTimeout(() =>
                    setIsLoading(true),
                    fetchAllUser(),
                    setAction(""),
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
            const allPostIds = userData.map((post) => post.id);
            setSelectedCheckboxes(allPostIds);
        } else {
            setSelectedCheckboxes([]);
        }
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchAllUser(pageNumber, filter)
    };
    const handleRoleChange = async (action) => {
        if (selectedCheckboxes.length === 0) {
            notifyError("No Users selected for Role Update.");
            return;
        }
        await updateRoles(selectedCheckboxes, action);
    }
    const handleActionChange = async (action) => {
        console.log("Selected Action:", action); // Debugging log for selected action
        setAction(action); // Update the state with the selected action

        try {
            if (action === "Delete") {
                if (selectedCheckboxes.length === 0) {
                    notifyError("No items selected for deletion."); // Show error if no checkboxes are selected
                    return;
                }
                setIsConfiremdModalVisible(true);
                console.log("Deleting selected users:", selectedCheckboxes);
            } else if (["approve", "rejected", "deactivate",].includes(action)) {
                if (selectedCheckboxes.length === 0) {
                    notifyError("No users selected for this action.");
                    return;
                }
                // console.log("Updating status for selected users:", selectedCheckboxes);
                await updateStatus(selectedCheckboxes, action);
            }
            // else if (action === "resend") {
            //     notifyError("The 'Resend Activation Email' option is disabled.");
            // } else if (action === "pending") {
            //     notifyError("The 'Put as Pending Review' option is disabled.");
            // } 
            else {
                console.warn("Unhandled action selected:", action);
            }
        } catch (error) {
            console.error("Error handling action:", error);
            notifyError("An error occurred while processing the action. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const redirectToUserCreatePage = (data) => {
        console.log(data)
        navigate('/usersCreate', { state: { userData: data } });
    };

    const updateStatus = async (ids, status) => {
        console.log("here")
        try {
            const formData = new FormData();
            const idsAsString = ids.join(",");
            formData.append("ids", idsAsString);
            formData.append("status", status);
            const resp = await AdminServices.userUpdateStatus(formData);
            if (resp?.status_code === 200) {
                notifySuccess(resp?.message,);
                setTimeout(() =>
                    setIsLoading(true),
                    fetchAllUser(),
                    setAction(""),
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
    };
    const updateRoles = async (ids, role) => {
        console.log("here")
        try {
            const formData = new FormData();
            const idsAsString = ids.join(",");
            formData.append("ids", idsAsString);
            formData.append("role", role);
            const resp = await AdminServices.userUpdateRoles(formData);
            if (resp?.status_code === 200) {
                notifySuccess(resp?.message,);
                setTimeout(() =>
                    setIsLoading(true),
                    fetchAllUser(),
                    setRoleAction(""),
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
    };
    const getUserWiseCounts = async () => {
        setIsLoading(true);

        try {
            const resp = await AdminServices.getUserWiseCount();
            if (resp?.status_code === 200) {
                console.log(resp);

                const processedData = resp?.list.map((item) => ({
                    status: item.status || "Unknown", // Replace null with "Unknown"
                    total: item.total,
                }));
                setStatusWiseUser(processedData)
            } else {
                notifyError("Please try again.",);
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            if (error?.status === 401) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = '/';
            }
            notifyError("An error occurred during fetch Data. Please try again.",);
        } finally {
            setIsLoading(false);
        }
    };
    const filtersUsers = async (selectedStatus) => {
        SetFilter(selectedStatus)
    }
    const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);
    const toggleActionsDropdown = () => setIsActionsOpen(!isActionsOpen);
    const toggleRolesDropdown = () => setIsRolesOpen(!isRolesOpen);


    const handleClickOutside = (e) => {
        if (filterRef.current && !filterRef.current.contains(e.target)) {
            setIsFilterOpen(false);
        }
        if (actionsRef.current && !actionsRef.current.contains(e.target)) {
            setIsActionsOpen(false);
        }
        if (rolesRef.current && !rolesRef.current.contains(e.target)) {
            setIsRolesOpen(false);
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
                                    </div>


                                </div>
                                <div className="px-2 mb-2 mt-5 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="">
                                            <Form.Label
                                                onClick={() => filtersUsers("all")}
                                                style={{ cursor: 'pointer' }}
                                                className="mb-0 me-3"
                                            >
                                                All ({totalUserCount})
                                            </Form.Label>
                                        </div>

                                        {statusWiseUser?.map((statusData, index) => {
                                            return (
                                                <div key={index} className={"mx-3"}>
                                                    <Form.Label
                                                        onClick={() => filtersUsers(statusData.status)}
                                                        style={{ cursor: 'pointer' }}
                                                        className="mb-0"
                                                    >
                                                        {`${statusData.status.charAt(0).toUpperCase() + statusData.status.slice(1)} (${statusData.total})`}
                                                    </Form.Label>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="d-flex align-items-center me-0">
                                        <Button
                                            text="Add User"
                                            onClick={() => redirectToUserCreatePage()}
                                            className="btn btn-primary "
                                            type="button"
                                        />
                                    </div>
                                </div>


                                <div className="px-2 mb-3 mt-2 row d-flex justify-content-between">

                                    <div className="col-md-4 p-1">
                                        <Form.Group controlId="postCategories">
                                            <div className="custom-select-wrapper" ref={filterRef}>
                                                <Form.Control
                                                    as="select"
                                                    className="custom-select"
                                                    onChange={(e) => SetFilter(e.target.value)}
                                                    onClick={toggleFilterDropdown}

                                                >
                                                    <option value="all">Filter User...</option>
                                                    <option value="approve">Approve User</option>
                                                    <option value="rejected">Reject User</option>
                                                    <option value="deactivate">Deactivate</option>
                                                    <option value="pending">Pending User</option>
                                                    <option value="resend" disabled>Resend Activation Email</option>
                                                </Form.Control>
                                                <FontAwesomeIcon
                                                    icon={isFilterOpen ? faChevronUp : faChevronDown}
                                                    className="dropdown-arrow position-absolute"
                                                />
                                            </div>

                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4 p-1">
                                        <Form.Group controlId="userAction">
                                            <div className="custom-select-wrapper" ref={actionsRef}>
                                                <Form.Control
                                                    as="select"
                                                    value={action}
                                                    onChange={(e) => handleActionChange(e.target.value)}
                                                    className="custom-select"
                                                    onClick={toggleActionsDropdown}
                                                >
                                                    <option value="">User Action</option>
                                                    <option value="approve">Approve User</option>
                                                    <option value="rejected">Reject User</option>
                                                    <option value="deactivate">Deactivate</option>
                                                    <option value="pending" disabled>Put as Pending Review</option>
                                                    <option value="resend" disabled>Resend Activation Email</option>
                                                </Form.Control>
                                                <FontAwesomeIcon
                                                    icon={isActionsOpen ? faChevronUp : faChevronDown}
                                                    className="dropdown-arrow position-absolute"
                                                />
                                            </div>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4 p-1">
                                        <Form.Group controlId="roleAction">
                                            <div className="custom-select-wrapper" ref={rolesRef}>
                                                <Form.Control
                                                    as="select"
                                                    value={roleAction}
                                                    onChange={(e) => handleRoleChange(e.target.value)}
                                                    className="custom-select"
                                                    onClick={toggleRolesDropdown}

                                                >
                                                    <option value="">Change role to...</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="siteAdmin">Site Admin</option>
                                                    <option value="user">User</option>
                                                    <option value="Contributor" disabled>Contributor</option>
                                                    <option value="Subscriber" disabled>Subscriber</option>
                                                </Form.Control>
                                                <FontAwesomeIcon
                                                    icon={isRolesOpen ? faChevronUp : faChevronDown}
                                                    className="dropdown-arrow position-absolute"
                                                />
                                            </div>
                                        </Form.Group>

                                    </div>
                                </div>
                                <div className="table-responsive">
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
                                                {/* <th>Username</th> */}
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
                                                        <Skeleton columns={6} /> {/* 5 columns for the Post table */}
                                                        <Skeleton columns={6} />
                                                        <Skeleton columns={6} />
                                                    </>
                                                </>
                                            ) : userData.length > 0 ? (
                                                userData.map((user, index) => (
                                                    <tr key={index}>
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
                                                        {/* <td>{user.username}</td> */}
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {user.role === "user" && "User"}
                                                            {user.role === "admin" && "Admin"}
                                                            {user.role === "siteAdmin" && "Site Admin"}
                                                            {!(user.role === "user" || user.role === "admin" || user.role === "siteAdmin") && "Unknown"}
                                                        </td>
                                                        <td>
                                                            {user.status === "approve" && "Approve"}
                                                            {user.status === "pending" && "Pending"}
                                                            {user.status === "rejected" && "Rejected"}
                                                            {user.status === "deactivate" && "Deactivate"}

                                                            {!(user.status === "approve" || user.status === "deactivate" || user.status === "pending" || user.status === "rejected") && "Unknown Status"}

                                                        </td>
                                                        <td className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                                            <Button
                                                                text=""
                                                                onClick={() => redirectToUserCreatePage(user)}
                                                                className="btn btn-sm btn-primary mb-2 mb-sm-0"
                                                                icon={faPencilSquare}
                                                                iconSize="lg"
                                                                disabled={false}
                                                            />

                                                            <Button
                                                                text=""
                                                                onClick={() => handleDelete(user?.id)}
                                                                className="btn btn-sm btn-danger ms-0 ms-sm-2"
                                                                icon={faTrash}
                                                                iconSize="lg"
                                                                disabled={false}
                                                            />
                                                        </td>                                                     
                                                    </tr>
                                                ))) : (
                                                <tr>
                                                    <td colSpan="7">No user available yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={perPageRecords}
                                        totalItemsCount={totalRecords}
                                        pageRangeDisplayed={5}
                                        onChange={handlePageChange}
                                        itemClass="custom-page-item"
                                        linkClass="custom-page-link"
                                        activeClass="custom-active"
                                    />
                                </div>
                            </div>
                        </div>
    
                        <ConfirmationDialog
                            isVisible={isConfiremdModalVisible}
                            title="Confirm Deletion"
                            message="Are you sure you want to delete this item? This action cannot be undone."
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default UserManagement;
