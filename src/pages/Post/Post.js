import React, { useEffect, useState, useRef } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Component/ConfirmationModal/ConfirmationModal";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import PostServices from "../../Services/PostServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import Pagination from "react-js-pagination";
import { faPencilSquare, faTrash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from 'react-bootstrap';

const Post = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [searchString, setSearchString] = useState("");
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [tableActions, setTableActions] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const perPageRecords = (10);
    const [totalRecords, setTotalRecords] = useState();
    const [isConfirmedAlertLoading, setIsConfirmedAlertLoading] = useState(false);


    const actionsRef = useRef();
    const categoryRef = useRef();

    useEffect(() => {
        fetchPost();
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    useEffect(() => {

        if (category || searchString) {
            fetchPost(1,);
        } else {
            setCategory('')
            fetchPost(currentPage);
        }
    }, [category, searchString])
    const fetchPost = async (pageNumbers) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            if (category) formData.append("category", category);
            if (searchString) formData.append("text", searchString);



            const resp = await PostServices.getPostList({
                page: pageNumbers ? pageNumbers : currentPage,
                perPageRecords,
                body: formData,
            });
            if (resp?.status_code === 200) {
                //console.log(resp);

                setPosts(resp?.list?.data || [])
                setTotalRecords(resp?.list?.total)
                setCurrentPage(resp?.list?.current_page);

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchPost(pageNumber);

    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };


    const redirectToCreatePage = (id) => {
        navigate('/post/create', { state: { id: id } });
    };

    const handleTableAction = (action) => {
        if (action === "Delete") {
            const checkedItems = Array.from(
                document.querySelectorAll(".user-select:checked")
            ).map((checkbox) => checkbox.value);

            if (checkedItems.length > 0) {
                setSelectedPosts(checkedItems); // Save checked items
                setIsModalVisible(true); // Show confirmation modal
            } else {
                notifyError("No items selected for deletion.");
            }
        }
    };



    const handleConfirmDelete = async () => {
        //console.log("Deleted items:", selectedCheckboxes);
        setIsConfirmedAlertLoading(true);

        const formData = new FormData();

        const idsAsString = selectedCheckboxes.join(",");

        formData.append("ids", idsAsString);
        const resp = await PostServices.multiDeletePost(formData);
        if (resp?.status_code === 200) {
            notifySuccess(resp?.message,);
            setTimeout(() =>
                setIsLoading(true),
                fetchPost(currentPage,),
                setIsConfirmedAlertLoading(false),
                3000);

        } else {
            notifyError("Please try again.",);
            setIsConfirmedAlertLoading(false);
        }
        // Clear selected checkboxes and reset table action
        clearSelectedCheckboxes();
        setTableActions("");
        setIsModalVisible(false);
    };

    const handleCancelDelete = () => {
        //console.log("Deletion canceled.");

        // Clear selected checkboxes and reset table action
        clearSelectedCheckboxes();
        setTableActions("");
        setIsModalVisible(false);
    };

    const clearSelectedCheckboxes = () => {
        const checkboxes = document.querySelectorAll(".user-select");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
        setSelectedPosts([]); // Clear the selected posts state
    };
    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            // Select all
            const allPostIds = posts.map((post) => post.id);
            setSelectedCheckboxes(allPostIds);
        } else {
            // Deselect all
            setSelectedCheckboxes([]);
        }
    };
    const handleCheckboxChange = (postId, isChecked) => {
        if (isChecked) {
            // Add the postId to selectedCheckboxes if checked
            setSelectedCheckboxes((prev) => [...prev, postId]);
        } else {
            // Remove the postId from selectedCheckboxes if unchecked
            setSelectedCheckboxes((prev) =>
                prev.filter((id) => id !== postId)
            );
        }
    };
    const handleDelete = (id) => {
        //console.log("page.id", id)
        deletePost(id)
    };
    const deletePost = async (id) => {
        try {
            const resp = await PostServices.deletePost(id);
            if (resp?.status_code === 200) {
                //console.log(resp);
                notifySuccess(resp?.message,);
                setTimeout(() =>
                    setIsLoading(true),
                    fetchPost(currentPage),
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

    const toggleTableActionsDropdown = () => setIsActionsOpen(!isActionsOpen);
    const toggleTableCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

    const handleClickOutside = (e) => {
        if (actionsRef.current && !actionsRef.current.contains(e.target)) {
            setIsActionsOpen(false);
        }
        if (categoryRef.current && !categoryRef.current.contains(e.target)) {
            setIsCategoryOpen(false);
        }
    };

    // Check if all are selected
    const areAllSelected =
        posts.length > 0 && selectedCheckboxes.length === posts.length;

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
                                <div className="row mt-5 align-items-center">
                                    <div className="col-3">
                                        <h3>Post</h3>
                                    </div>
                                    <div className="col-9 d-flex justify-content-end">
                                        <Button
                                            text="Add New Post"
                                            onClick={() => redirectToCreatePage(null)}
                                            className="btn btn-primary"
                                            type="button"
                                        />
                                    </div>
                                </div>

                                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                                    <Form className="">
                                        <Form.Group className="row d-flex justify-content-between">
                                            <div className="col-md-4 p-1">
                                                <div className="custom-select-wrapper" ref={actionsRef}>
                                                    <Form.Control
                                                        as="select"
                                                        id="tableActions"
                                                        className="custom-dropdown"
                                                        value={tableActions}
                                                        onChange={(e) => {
                                                            setTableActions(e.target.value);
                                                            handleTableAction(e.target.value);
                                                        }}
                                                        onClick={toggleTableActionsDropdown}
                                                    >
                                                        <option value="">Table Action...</option>
                                                        <option value="Delete">Delete</option>
                                                    </Form.Control>
                                                    <FontAwesomeIcon
                                                        icon={isActionsOpen ? faChevronUp : faChevronDown}
                                                        className="dropdown-arrow position-absolute"
                                                    />
                                                </div>
                                            </div>

                                            {/* Post Category Dropdown */}
                                            <div className="col-md-4 p-1">
                                                <div className="custom-select-wrapper" ref={categoryRef}>
                                                    <Form.Control
                                                        as="select"
                                                        id="postCategory"
                                                        className="custom-dropdown"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        onClick={toggleTableCategoryDropdown}
                                                    >
                                                        <option value="">All Categories</option>
                                                        <option value="news">News</option>
                                                        <option value="visit">Visit</option>
                                                    </Form.Control>
                                                    <FontAwesomeIcon
                                                        icon={isCategoryOpen ? faChevronUp : faChevronDown}
                                                        className="dropdown-arrow position-absolute"
                                                    />
                                                </div>
                                            </div>

                                            {/* Search Input */}
                                            <div className="col-md-4 p-1">
                                                <div className="search-input-wrapper">
                                                    <Form.Control
                                                        type="text"
                                                        id="searchPages"
                                                        className="form-control search-input"
                                                        placeholder="Search post..."
                                                        value={searchString}
                                                        onChange={(e) => setSearchString(e.target.value)}
                                                    />
                                                    <svg
                                                        className="search-icon position-absolute"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="20"
                                                        height="20"
                                                    >
                                                        <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2" fill="none" />
                                                        <line x1="15" y1="15" x2="20" y2="20" stroke="black" strokeWidth="2" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Form>
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
                                                <th>Post Image</th>
                                                <th>Title</th>
                                                <th>Category</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading ? (
                                                <>
                                                    <Skeleton type="row" columns={5} />
                                                    <Skeleton type="row" columns={5} />
                                                    <Skeleton type="row" columns={5} />
                                                </>
                                            ) : posts.length > 0 ? (
                                                posts.map((post) => (
                                                    <tr key={post.id} className="customWhiteBg">
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                className="user-select"
                                                                checked={selectedCheckboxes.includes(post.id)}
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(post.id, e.target.checked)
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <img
                                                                src={post?.thumbnail?.path}
                                                                style={{ width: '50px' }}
                                                                className="bannerHeight"
                                                                alt="News Banner"
                                                            />
                                                        </td>
                                                        <td>
                                                            <span
                                                                className="file-name-tooltip"
                                                                title={post.title}
                                                            >
                                                                {post.title.length > 60 ? `${post.title.substring(0, 60)}...` : post.title}
                                                            </span>
                                                        </td>
                                                        <td>{post.category}</td>
                                                        <td className=" align-items-center">
                                                            <Button
                                                                text=""
                                                                onClick={() => redirectToCreatePage(post.id)}
                                                                className="btn btn-sm btn-primary mb-2 mx-2 mb-sm-0"
                                                                icon={faPencilSquare}
                                                                iconSize="lg"
                                                                disabled={false}
                                                            />
                                                            <Button
                                                                text=""
                                                                onClick={() => handleDelete(post.id)}
                                                                className="btn btn-sm btn-danger mx-2 "
                                                                icon={faTrash}
                                                                iconSize="lg"
                                                                disabled={false}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No post available yet.</td>
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
                    </div>
                </div>
            </div>

            <ConfirmationDialog
                isVisible={isModalVisible}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isConfirmedAlertLoading}
            />
        </React.Fragment>
    );
};

export default Post;
