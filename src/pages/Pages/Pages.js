import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";

const Pages = () => {
  const navigate = useNavigate();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setpage] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    console.log('component mounted');
  }, []);
  const redirectToCreatePage = () => {
    navigate('/uploadDocument');
  };
  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setpage([
        {
          id: 1,
          title: "China Outlook Q1 2023",
          type: "Publications",
          year: "2018"
        },
        {
          id: 2,
          title: "Master Fund – Portfolio Summary June 2024",
          type: "Hedge Fund Reports",
          year: "2021"
        },
        {
          id: 2,
          title: "Portfolio Summary – July 2024",
          type: "Managed Account Reports",
          year: "2021"
        }
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);
  const handleCheckboxChange = (pageId, isChecked) => {
    if (isChecked) {
      // Add the postId to selectedCheckboxes if checked
      setSelectedCheckboxes((prev) => [...prev, pageId]);
    } else {
      // Remove the postId from selectedCheckboxes if unchecked
      setSelectedCheckboxes((prev) =>
        prev.filter((id) => id !== pageId)
      );
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
            <div className="dashboard-content">
              <div className="container-fluid">
                    <Button
                      onClick={redirectToCreatePage}
                      text="Upload New Document"
                      className="btn btn-primary"
                      type="button"
                    >
                      Upload New Document
                    </Button>

                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                  <div className="custom-select-wrapper col-md-3 p-1">
                    <select id="tableActions" className="form-control" style={{ height: 'auto' }}>
                      <option value="">Table Action...</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </div>

                  <div className="custom-select-wrapper col-md-3 p-1">
                    <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                      <option value="">All Categories</option>
                      <option value="news">News</option>
                      <option value="visit">Visit</option>
                    </select>
                  </div>
                  <div className="custom-select-wrapper col-md-3 p-1">
                    <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                      <option value="">All Years</option>
                      <option value="news">2015</option>
                      <option value="visit">2016</option>
                      <option value="visit">2017</option>
                      <option value="visit">2018</option>
                      <option value="visit">2019</option>
                      <option value="visit">2020</option>
                      <option value="visit">2021</option>
                      <option value="visit">2022</option>
                      <option value="visit">2023</option>
                      <option value="visit">2024</option>
                    </select>
                  </div>


                  <div className="col-md-3 p-1">
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        id="searchPages"
                        className="form-control search-input"
                        placeholder="Search page..."
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
                    <th><input type="checkbox" id="select-all" /></th>
                    <th>Document Title</th>
                    <th>Document types</th>
                    <th>Years</th>
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
                  ) : page.length > 0 ? (
                    page.map((page) => (
                      <tr key={page.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="user-select"
                            checked={selectedCheckboxes.includes(page.id)}
                            onChange={(e) =>
                              handleCheckboxChange(page.id, e.target.checked)
                            }
                          />
                        </td>
                        <td>{page.title}</td>
                        <td>{page.type}</td>
                        <td>{page.year}</td>
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
                      <td colSpan="5">No page available yet.</td>
                    </tr>
                  )}
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

export default Pages;
