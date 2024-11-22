import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { Link, useNavigate } from "react-router-dom";
import "../Users/userStyle.css"
import AddUserModal from "../Component/UserModal/UserModal";
import Skeleton from "../Component/UserSkeleton/UserSkeleton";

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
  const [user, setuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



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
  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setuser([
        {
          all: 120,
          pending: 25,
          approved: 80,
          awaiting_email_confirmation: 10,
          rejected: 3,
          inactive: 2,
        }
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);


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
                <div className="card mb-4" id="users-overview-card">
                  <div className="card-header d-flex justify-content-between">
                    <h2>Users Overview</h2>
                    <span>
                      <Button
                        text="Add User"
                        onClick={() => setIsModalVisible(true)}
                        className={"btn btn-primary me-2"}
                        type="button"
                      />

                    </span>
                  </div>
                  <div className="card-body">
                    <table id="um-users-overview-table" className="table table-striped">
                      <tbody>
                      {isLoading ? (
                        <>
                          <Skeleton type="row" />

                        </>
                      ) : user.length > 0 ? (
                        user.map((user) => (
                          <tr key={user.id}>
                            <td>
                            <span>
                              <Link
                                to={`/usersManagement?status=all`}
                                className="filter-link"
                              >
                                Users
                              </Link>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=all`}
                              >
                                {userCounts.all}
                              </a>

                            </span>
                            </td>
                            <td>
                            <span>
                              <a
                                href={`/usersManagement?status=pending`}
                                className="filter-link"
                              >
                                Pending Review
                              </a>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=pending`}
                              >
                                {userCounts.pending}
                              </a>

                            </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No user available yet.</td>
                        </tr>
                      )}
                      {isLoading ? (
                        <>
                          <Skeleton type="row" />
                        </>
                      ) : user.length > 0 ? (
                        user.map((user) => (
                          <tr key={user.id}>
                            <td>
                            <span>
                              <a
                                href={`/usersManagement?status=approved`}
                                className="filter-link"
                              >
                                Approved
                              </a>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=approved`}
                              >
                                {userCounts.approved}
                              </a>

                            </span>
                            </td>
                            <td>
                            <span >
                              <a
                                href={`/usersManagement?status=awaiting_email_confirmation`}
                                className="filter-link"
                              >
                                Awaiting Email Confirmation
                              </a>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=awaiting_email_confirmation`}
                              >
                                {userCounts.awaiting_email_confirmation}
                              </a>

                            </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No user available yet.</td>
                        </tr>
                      )}
                      {isLoading ? (
                        <>
                          <Skeleton type="row" />
                        </>
                      ) : user.length > 0 ? (
                        user.map((user) => (
                          <tr key={user.id}>
                            <td className="text-left">
                            <span>
                              <a
                                href={`/usersManagement?status=rejected`}
                                className="filter-link"
                              >
                                Rejected
                              </a>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=rejected`}
                              >
                                {userCounts.rejected}
                              </a>

                            </span>
                            </td>
                            <td>
                            <span>
                              <a
                                href={`/usersManagement?status=inactive`}
                                className="filter-link"
                              >
                                Inactive
                              </a>
                            </span>
                              <span className="ps-1">
                              <a
                                className="count filter-link"
                                href={`/usersManagement?status=inactive`}
                              >
                                {userCounts.inactive}
                              </a>

                            </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No user available yet.</td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* {isModalVisible && (
              <AddUserModal
                show={isModalVisible}
                onHide={closeModal} // Pass the close function to handle modal closing
              />
            )} */}
            <AddUserModal
              show={isModalVisible}
              onHide={() => setIsModalVisible(false)}
            // userData={selectedUser}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
