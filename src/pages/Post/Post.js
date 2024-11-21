import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Component/ConfirmationModal/ConfirmationModal";
const SkeletonRow = () => (
    <tr>
        <td><div className="skeleton-box" style={{ width: '20px', height: '20px', color: 'red' }} /></td>
        <td><div className="skeleton-box" style={{ width: '50px', height: '50px' }} /></td>
        <td><div className="skeleton-box" style={{ width: '150px', height: '20px' }} /></td>
        <td><div className="skeleton-box" style={{ width: '100px', height: '20px' }} /></td>
        <td><div className="skeleton-box" style={{ width: '80px', height: '30px' }} /></td>
    </tr>
);
const Post = () => {
    const navigate = useNavigate();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [tableActions, setTableActions] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);



    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const redirectToCreatePage = () => {
        navigate('/post/create');
    };

    useEffect(() => {
        // Simulate data fetch
        setTimeout(() => {
            setPosts([
                {
                    id: 1,
                    image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png",
                    title: "Sunshine Action for elderly people",
                    category: "Latest News"
                },
                {
                    id: 2,
                    image: "http://localhost/redwood/wp-content/uploads/2017/06/Mastercard-e1498551571139-150x150.jpg",
                    title: "Sunshine Action for hundreds of homeless people",
                    category: "Visit"
                }
            ]);
            setIsLoading(false);
        }, 2000);
    }, []);
    const handleTableAction = (action) => {
        if (action === "Delete") {
            const checkedItems = Array.from(
                document.querySelectorAll(".user-select:checked")
            ).map((checkbox) => checkbox.value);

            if (checkedItems.length > 0) {
                setSelectedPosts(checkedItems); // Save checked items
                setIsModalVisible(true); // Show confirmation modal
            } else {
                alert("No items selected!");
            }
        }
    };



    const handleConfirmDelete = () => {
        console.log("Deleted items:", selectedPosts);

        // Clear selected checkboxes and reset table action
        clearSelectedCheckboxes();
        setTableActions("");
        setIsModalVisible(false);
    };

    const handleCancelDelete = () => {
        console.log("Deletion canceled.");

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
                                    <div className="col-md-10">
                                        <h3>Post</h3>
                                    </div>
                                    <div className="col-md-2 d-flex justify-content-end">
                                        <button
                                            onClick={redirectToCreatePage}
                                            className="btn btn-primary"
                                        >
                                            Add New Post
                                        </button>
                                    </div>
                                </div>

                                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                                    <div className="col-md-4 p-1">
                                        <div className="custom-select-wrapper">
                                            <select
                                                id="tableActions"
                                                className="form-control custom-select"
                                                value={tableActions}
                                                onChange={(e) => {
                                                    setTableActions(e.target.value);
                                                    handleTableAction(e.target.value);
                                                }}
                                            >
                                                <option value="">Table Action...</option>
                                                <option value="Delete">Delete</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <div className="custom-select-wrapper">
                                            <select
                                                id="postCategories"
                                                className="form-control custom-select"
                                            >
                                                <option value="">All Categories</option>
                                                <option value="news">News</option>
                                                <option value="visit">Visit</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <div className="search-input-wrapper">
                                            <input
                                                type="text"
                                                id="searchPages"
                                                className="form-control search-input"
                                                placeholder="Search post..."
                                            />
                                            <svg
                                                className="search-icon"
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
                                            <th>Post Image</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <>
                                                <SkeletonRow />
                                                <SkeletonRow />
                                                <SkeletonRow />
                                            </>
                                        ) : posts.length > 0 ? (
                                            posts.map((post) => (
                                                <tr key={post.id}>
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
                                                            src={post.image}
                                                            style={{ width: '50px' }}
                                                            className="bannerHeight"
                                                            alt="News Banner"
                                                        />
                                                    </td>
                                                    <td>{post.title}</td>
                                                    <td>{post.category}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary ml-3"
                                                            onClick={redirectToCreatePage}
                                                        >
                                                            Edit
                                                        </button>
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
            />
        </React.Fragment>
    );
};

export default Post;
