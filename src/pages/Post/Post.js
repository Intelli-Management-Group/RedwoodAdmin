import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Component/ConfirmationModal/ConfirmationModal";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import PostServices from "../../Services/PostServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import Pagination from "react-js-pagination";

const Post = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [searchString, setSearchString] = useState("");

    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [tableActions, setTableActions] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const perPageRecords = (10);
    const [totalRecords, setTotalRecords] = useState();


    useEffect(() => {
        fetchPost()
    }, [])

    useEffect(() => {

        if (category || searchString) {
            fetchPost(currentPage, );
        }else{
            setCategory('')
            fetchPost(currentPage);
        }
    }, [category,searchString])
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
                console.log(resp);

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
        // fetchPost(pageNumber, documentType);

    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };


    const redirectToCreatePage = (id) => {
        navigate('/post/create', { state: { id: id } });
    };



    // useEffect(() => {
    //     // Simulate data fetch
    //     setTimeout(() => {
    //         setPosts([
    //             {
    //                 id: 1,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png",
    //                 title: "Post Title 1",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 2,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture3-1-150x150.png",
    //                 title: "Post Title 2",
    //                 category: "Visit"
    //             },
    //             {
    //                 id: 3,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture4-1-150x150.png",
    //                 title: "Post Title 3",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 4,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture5-1-150x150.png",
    //                 title: "Post Title 4",
    //                 category: "Visit"
    //             },

    //             {
    //                 id: 5,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png",
    //                 title: "Post Title 5",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 6,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture3-1-150x150.png",
    //                 title: "Post Title 6",
    //                 category: "Visit"
    //             },
    //             {
    //                 id: 7,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture4-1-150x150.png",
    //                 title: "Post Title 7",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 8,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture5-1-150x150.png",
    //                 title: "Post Title 8",
    //                 category: "Visit"
    //             },
    //             {
    //                 id: 9,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png",
    //                 title: "Post Title 9",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 10,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture3-1-150x150.png",
    //                 title: "Post Title 10",
    //                 category: "Visit"
    //             },
    //             {
    //                 id: 11,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture4-1-150x150.png",
    //                 title: "Post Title 11",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 12,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture5-1-150x150.png",
    //                 title: "Post Title 12",
    //                 category: "Visit"
    //             },

    //             {
    //                 id: 13,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png",
    //                 title: "Post Title 13",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 14,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture3-1-150x150.png",
    //                 title: "Post Title 14",
    //                 category: "Visit"
    //             },
    //             {
    //                 id: 15,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture4-1-150x150.png",
    //                 title: "Post Title 15",
    //                 category: "Latest News"
    //             },
    //             {
    //                 id: 16,
    //                 image: "http://localhost/redwood/wp-content/uploads/2019/08/Picture5-1-150x150.png",
    //                 title: "Post Title 16",
    //                 category: "Visit"
    //             }
    //         ]);
    //         setIsLoading(false);
    //     }, 2000);
    // }, []);
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
        console.log("Deleted items:", selectedCheckboxes);

        const formData = new FormData();

        const idsAsString = selectedCheckboxes.join(",");

        formData.append("ids", idsAsString);
        const resp = await PostServices.multiDeletePost(formData);
        if (resp?.status_code === 200) {
            notifySuccess(resp?.message,);
            setTimeout(() =>
                setIsLoading(true),
                fetchPost(currentPage,),
                3000);

        } else {
            notifyError("Please try again.",);
        }
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
    const handleDelete = (id) => {
        console.log("page.id", id)
        deletePost(id)
    };
    const deletePost = async (id) => {
        try {
            const resp = await PostServices.deletePost(id);
            if (resp?.status_code === 200) {
                console.log(resp);
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
                                                id="postCategory"
                                                className="form-control custom-select"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
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
                                                value={searchString}
                                                onChange={(e) => setSearchString(e.target.value)}
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
                                                <Skeleton type="row" />
                                                <Skeleton type="row" />
                                                <Skeleton type="row" />
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
                                                            src={post?.thumbnail?.path}
                                                            style={{ width: '50px' }}
                                                            className="bannerHeight"
                                                            alt="News Banner"
                                                        />
                                                    </td>
                                                    <td>{post.title}</td>
                                                    <td>{post.category}</td>
                                                    <td>

                                                        <Button
                                                            text="Edit"
                                                            onClick={() => redirectToCreatePage(post.id)}
                                                            className={"btn btn-primary btn-sm me-2"}
                                                            type="button"
                                                        />
                                                        <Button
                                                            text="Delete"
                                                            onClick={() => handleDelete(post.id)}
                                                            className="btn btn-danger btn-sm ms-1"
                                                            type="button"
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
            />
        </React.Fragment>
    );
};

export default Post;
