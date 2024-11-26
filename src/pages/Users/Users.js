import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { Link, } from "react-router-dom";
import "../Users/userStyle.css"
import AddUserModal from "../Component/UserModal/UserModal";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import AdminServices from "../../Services/AdminServices";
import { notifyError } from "../Component/ToastComponents/ToastComponents";

// const userCounts = {
//   all: 120,
//   pending: 25,
//   approved: 80,
//   awaiting_email_confirmation: 10,
//   rejected: 3,
//   inactive: 2,
// };
const Users = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [user, setuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    console.log('component mounted');
    getUserWiseCounts()
  }, []);


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
        setuser(processedData)
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

  // useEffect(() => {
  //   // Simulate data fetch
  //   setTimeout(() => {
  //     setuser([
  //       {
  //         all: 120,
  //         pending: 25,
  //         approved: 80,
  //         awaiting_email_confirmation: 10,
  //         rejected: 3,
  //         inactive: 2,
  //       }
  //     ]);
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);


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
                            <Skeleton columns={2} /> 
                            <Skeleton columns={2} />
                            <Skeleton columns={2} />
                          </>
                        ) : user.length > 0 ? (
                          // user.map((user) => (
                          //   <>
                          //     <tr key={user.id}>
                          //       <td>
                          //         <span>
                          //           <Link
                          //             to={`/usersManagement?status=all`}
                          //             className="filter-link"
                          //           >
                          //             Users
                          //           </Link>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=all`}
                          //           >
                          //             {userCounts.all}
                          //           </a>

                          //         </span>
                          //       </td>
                          //       <td>
                          //         <span>
                          //           <a
                          //             href={`/usersManagement?status=pending`}
                          //             className="filter-link"
                          //           >
                          //             Pending Review
                          //           </a>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=pending`}
                          //           >
                          //             {userCounts.pending}
                          //           </a>

                          //         </span>
                          //       </td>
                          //     </tr>
                          //     <tr key={user.id}>
                          //       <td>
                          //         <span>
                          //           <a
                          //             href={`/usersManagement?status=approved`}
                          //             className="filter-link"
                          //           >
                          //             Approved
                          //           </a>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=approved`}
                          //           >
                          //             {userCounts.approved}
                          //           </a>

                          //         </span>
                          //       </td>
                          //       <td>
                          //         <span >
                          //           <a
                          //             href={`/usersManagement?status=awaiting_email_confirmation`}
                          //             className="filter-link"
                          //           >
                          //             Awaiting Email Confirmation
                          //           </a>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=awaiting_email_confirmation`}
                          //           >
                          //             {userCounts.awaiting_email_confirmation}
                          //           </a>

                          //         </span>
                          //       </td>
                          //     </tr>
                          //     <tr key={user.id}>
                          //       <td className="text-left">
                          //         <span>
                          //           <a
                          //             href={`/usersManagement?status=rejected`}
                          //             className="filter-link"
                          //           >
                          //             Rejected
                          //           </a>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=rejected`}
                          //           >
                          //             {userCounts.rejected}
                          //           </a>

                          //         </span>
                          //       </td>
                          //       <td>
                          //         <span>
                          //           <a
                          //             href={`/usersManagement?status=inactive`}
                          //             className="filter-link"
                          //           >
                          //             Inactive
                          //           </a>
                          //         </span>
                          //         <span className="ps-1">
                          //           <a
                          //             className="count filter-link"
                          //             href={`/usersManagement?status=inactive`}
                          //           >
                          //             {userCounts.inactive}
                          //           </a>

                          //         </span>
                          //       </td>
                          //     </tr>
                          //   </>
                          // ))
                          user.map((item, index) => (
                            // <tr key={index}>
                            //   <td>{item.status}</td>
                            //   <td>{item.total}</td>
                            // </tr>
                            <tr key={index}>
                            <td>
                              <span>
                                <Link
                                to={`/usersManagement?status=all`}
                                  // to={`/usersManagement?status=${item.status}`}
                                  className="filter-link"
                                >
                                  {item.status}
                                </Link>
                              </span>
                              <span className="ps-1">
                                <a
                                  className="count filter-link"
                                  href={`/usersManagement?status=all`}
                                  // href={`/usersManagement?status=${item.status}`}

                                >
                                  {item.total}
                                </a>
                              </span>
                            </td>
                            <td>
                              {/* Add more status-specific logic here if necessary */}
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
