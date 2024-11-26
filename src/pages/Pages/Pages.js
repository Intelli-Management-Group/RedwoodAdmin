import React, { useEffect, useState } from "react";
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';
import Button from "../Component/ButtonComponents/ButtonComponents";
import { useNavigate } from "react-router-dom";
import Skeleton from "../Component/SkeletonComponent/SkeletonComponent";
import PageServices from "../../Services/PageServices";
import { notifyError, notifySuccess } from "../Component/ToastComponents/ToastComponents";
import Pagination from "react-js-pagination";

const Pages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const perPageRecords = (10)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setpage] = useState([]);
  const [totalRecords, setTotalRecords] = useState()
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [documentType, setDocumentType] = useState("");


  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    setIsLoading(true);

    fetchPages(currentPage, documentType);
  }, []);
  const redirectToCreatePage = () => {
    navigate('/uploadDocument');
  };
useEffect(()=>{
if(documentType){
  fetchPages(1, documentType);
}
},[documentType])
  const fetchPages = async (page, documentType) => {
    try {
      const resp = await PageServices.getPageList({ page, perPageRecords, documentType });
      if (resp?.status_code === 200) {
        console.log(resp);

        if (page === 1) {
          setpage(resp?.list?.data || []);
        } else {
          setpage(resp?.list?.data)
          // setpage((prevList) => [...prevList, ...resp?.list?.data]);
        }
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
  const deletePages = async (id) => {
    try {
      const resp = await PageServices.deletePages(id);
      if (resp?.status_code === 200) {
        console.log(resp);
        notifySuccess(resp?.message,);
        setTimeout(() =>
          setLoading(true),
          fetchPages(currentPage, documentType),
          3000);

      } else {
        notifyError("Please try again.",);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      notifyError("An error occurred during fetch Data. Please try again.",);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      
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
  const handleDelete = (id) => {
    console.log("page.id", id)
    deletePages(id)
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPages(pageNumber, documentType);

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
                    <select
                      id="postCategories"
                      className="form-control"
                      style={{ height: 'auto' }}
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}>
                      <option value="all">All Categories</option>
                      <option value="publications">Publications</option>
                      <option value="hedgeFundReports">Hedge Fund Reports</option>
                      <option value="managedAccountReports">Managed Account Reports</option>
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


                <table className="table table-striped " id="user-data-table" style={{ border: '1px solid #ccc' }}>
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
                          <td>
                            {page.file_name.split('.').slice(0, -1).join('.').length > 30
                              ? page.file_name.split('.').slice(0, -1).join('.').substring(0, 30) + "..."
                              : page.file_name.split('.').slice(0, -1).join('.')}
                          </td>
                          <td>{page.type}</td>
                          <td>{page.year}</td>
                          <td>

                            <Button
                              variant="primary"
                              className="btn btn-primary btn-sm me-2"
                              type="button"
                              text="Edit"
                              onClick={redirectToCreatePage}

                            />
                            <Button
                              variant="primary"
                              className="btn btn-danger btn-sm ms-1"
                              type="button"
                              text="Delete"
                              onClick={() => handleDelete(page.id)}
                            />

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
    </React.Fragment>
  );
};

export default Pages;
