import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import "../Users/userStyle.css"
import AddUserModal from "../Component/UserModal/UserModal";

const userCounts = {
  all: 120,
  pending: 25,
  approved: 80,
  awaiting_email_confirmation: 10,
  rejected: 3,
  inactive: 2,
};
const Users = () => {
  const navigate = useNavigate();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

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
                {/* <div className="card border" >
                  <div className="card-header row mt-5 align-items-center">
                    <div className="col-md-10">
                      <h1>Users Overview
                      </h1>
                    </div>
                    <div className="col-md-2 d-flex justify-content-end">
                      <Button
                        text="Add User"
                        className="btn btn-primary"
                        type="button"
                      >
                        Add User
                      </Button>
                    </div>

                  </div>
                  <div className="card-body" style={{lineHeight:"2.5"}}>
                    <table>
                      <tbody style={{  textOverflow: "30px;"}}>
                      <tr>
                        <td>
                          <a className="" href="#">500</a>
                          <a className="" href="#">Users</a>
                        </td>
                        <td>
                          <a className="" href="#">100</a>
                          <a className="" href="#">Pending Review</a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <a className="" href="#">200</a>
                          <a className="" href="#">Approved</a>
                        </td>
                        <td>
                          <a className="" href="#">50</a>
                          <a className="" href="#">Awaiting Email Confirmation</a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <a className="" href="#">50</a>
                          <a className="" href="#">Rejected</a>
                        </td>
                        <td>
                          <a className="" href="#">10</a>
                          <a className="" href="#">Inactive</a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}
                <div className="card mb-4" id="users-overview-card">
                  <div className="card-header d-flex justify-content-between">
                    <h2>Users Overview</h2>
                    <span>
                      {/* <button
                        id="open-add-user-modal"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#addUserModal"
                        onClick={openModal}
                      >
                        Add User
                      </button> */}
                      <AddUserModal
                        show={isModalVisible}
                        onHide={closeModal} // Pass the close function to handle modal closing
                      />
                    </span>
                  </div>
                  <div className="card-body">
                    <table id="um-users-overview-table" className="table table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <span>
                              <a
                                href={`/admin/users?status=all`}
                                className="filter-link"
                              >
                                Users
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=all`}
                              >
                                {userCounts.all}
                              </a>

                            </span>
                          </td>
                          <td>
                            <span>
                              <a
                                href={`/admin/users?status=pending`}
                                className="filter-link"
                              >
                                Pending Review
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=pending`}
                              >
                                {userCounts.pending}
                              </a>

                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>
                              <a
                                href={`/admin/users?status=approved`}
                                className="filter-link"
                              >
                                Approved
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=approved`}
                              >
                                {userCounts.approved}
                              </a>

                            </span>
                          </td>
                          <td>
                            <span >
                              <a
                                href={`/admin/users?status=awaiting_email_confirmation`}
                                className="filter-link"
                              >
                                Awaiting Email Confirmation
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=awaiting_email_confirmation`}
                              >
                                {userCounts.awaiting_email_confirmation}
                              </a>

                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-left">
                            <span>
                              <a
                                href={`/admin/users?status=rejected`}
                                className="filter-link"
                              >
                                Rejected
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=rejected`}
                              >
                                {userCounts.rejected}
                              </a>

                            </span>
                          </td>
                          <td>
                            <span>
                              <a
                                href={`/admin/users?status=inactive`}
                                className="filter-link"
                              >
                                Inactive
                              </a>
                            </span>
                            <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/admin/users?status=inactive`}
                              >
                                {userCounts.inactive}
                              </a>

                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {isModalVisible && (
              <AddUserModal
                show={isModalVisible}
                onHide={closeModal} // Pass the close function to handle modal closing
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
