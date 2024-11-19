import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
const Post = () => {
    const navigate = useNavigate();

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    useEffect(() => {
        console.log('component mounted');
    }, []);
    const redirectToCreatePage = () => {
        navigate('/post/create');
    };
    return (
        <React.Fragment>
            <div style={{ height: '100vh' }}> {/* Set height to 100vh to ensure full page */}
                <div className="">
                    {/* Sidebar */}
                    <Sidebar isVisible={isSidebarVisible} />

                    {/* Main Content */}
                    <div className={`main-content ${isSidebarVisible ? 'shifted' : ''}`}>
                        <Navbar toggleSidebar={toggleSidebar} />

                        {/* Dashboard Content */}
                        <div className="dashboard-content">
                            <div className="container-fluid">
                                <div className="row mt-5 align-items-center">
                                    <div className="col-md-10">
                                        <h3>Post</h3>
                                    </div>
                                    <div className="col-md-2 d-flex justify-content-end">
                                        <Button
                                            text="Add New Post"
                                            onClick={redirectToCreatePage}
                                            className="btn btn-primary"
                                            type="button"
                                        >
                                            Add New Post
                                        </Button>
                                    </div>

                                </div>

                                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                                    <div className="col-md-4 p-1">
                                        <select id="tableActions" className="form-control" style={{ height: 'auto' }}>
                                            <option value="">Table Action...</option>
                                            <option value="Delete">Delete</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                                            <option value="">All Categories</option>
                                            <option value="news">News</option>
                                            <option value="visit">Visit</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 p-1">
                                        <input
                                            type="text"
                                            id="searchPages"
                                            className="form-control"
                                            placeholder="Search post..."
                                        />
                                    </div>
                                </div>


                                <table className="table table-striped" id="user-data-table" style={{ border: '1px solid #ccc' }}>
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" id="select-all" /></th>
                                            <th>Post Image</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" className="user-select" data-username="user1" /></td>
                                            <td>
                                                <img
                                                    src="http://localhost/redwood/wp-content/uploads/2019/08/Picture2-1-150x150.png"
                                                    style={{ width: '50px' }}
                                                    className="bannerHeight"
                                                    alt="News Banner"
                                                />
                                            </td>
                                            <td>Sunshine Action for elderly people</td>
                                            <td>Latest News</td>
                                            <td>
                                                <button id="performAction" className="btn btn-primary ml-3" onClick={redirectToCreatePage}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><input type="checkbox" className="user-select" data-username="user2" /></td>
                                            <td>
                                                <img
                                                    src="http://localhost/redwood/wp-content/uploads/2017/06/Mastercard-e1498551571139-150x150.jpg"
                                                    style={{ width: '50px' }}
                                                    className="bannerHeight"
                                                    alt="News Banner"
                                                />
                                            </td>
                                            <td>Sunshine Action for hundreds of homeless people</td>
                                            <td>Visit</td>
                                            <td>
                                                <button id="performAction" className="btn btn-primary ml-3" onClick={redirectToCreatePage}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan="7">No post available yet.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Post;
