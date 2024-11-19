import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
const Pages = () => {
  const navigate = useNavigate();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    console.log('component mounted');
  }, []);
  const redirectToCreatePage = () => {
    navigate('/uploadDocument');
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
                    <Button
                      onClick={redirectToCreatePage}
                      text="Upload New Document"
                      className="btn btn-primary"
                      type="button"
                    >
                      Upload New Document
                    </Button>

                <div className="px-2 mb-3 mt-5 row d-flex justify-content-between">
                  <div className="col-md-3 p-1">
                    <select id="tableActions" className="form-control" style={{ height: 'auto' }}>
                      <option value="">Table Action...</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </div>

                  <div className="col-md-3 p-1">
                    <select id="postCategories" className="form-control" style={{ height: 'auto' }}>
                      <option value="">All Categories</option>
                      <option value="news">News</option>
                      <option value="visit">Visit</option>
                    </select>
                  </div>
                  <div className="col-md-3 p-1">
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
                    <th>Document Title</th>
                    <th>Document types</th>
                    <th>Years</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><input type="checkbox" className="user-select" data-username="user1" /></td>
                    <td>China Outlook Q1 2023	</td>
                    <td>Publications	</td>
                    <td>2018</td>
                    <td>
                      <button id="performAction" className="btn btn-primary ml-3" >
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td><input type="checkbox" className="user-select" data-username="user2" /></td>
                    <td>Master Fund – Portfolio Summary June 2024	</td>
                    <td>Hedge Fund Reports	</td>
                    <td>2021</td>
                    <td>
                      <button id="performAction" className="btn btn-primary ml-3" >
                        Edit
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td><input type="checkbox" className="user-select" data-username="user2" /></td>
                    <td>Portfolio Summary – July 2024		</td>
                    <td>Managed Account Reports		</td>
                    <td>2021</td>
                    <td>
                      <button id="performAction" className="btn btn-primary ml-3" >
                        Edit
                      </button>
                    </td>
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

export default Pages;
