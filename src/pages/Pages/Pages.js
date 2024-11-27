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
  const [postingYear, setPostingYear] = useState("");
  const [hedgeFundReportstypes, setHedgeFundReportstypes] = useState("");
  const [searchString, setSearchString] = useState("");


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
  useEffect(() => {

    if (documentType || postingYear || searchString || hedgeFundReportstypes) {
      fetchPagesWithFilter(currentPage, documentType, postingYear, hedgeFundReportstypes, searchString);
    }
  }, [documentType, postingYear, hedgeFundReportstypes, searchString])

  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const fetchPagesWithFilter = async (page, documentType, year, hedgeFundReportstypes, search) => {
    try {
      const formData = new FormData();
      if (documentType) formData.append("type", documentType);
      if (year) formData.append("year", year);
      if (search) formData.append("text", search);
      if (hedgeFundReportstypes) formData.append("hedge_fund_report_type", hedgeFundReportstypes)

      logFormData(formData);

      const resp = await PageServices.getPageListFilter({
        page: currentPage,
        perPageRecords,
        body: formData,
      });
      if (resp?.status_code === 200) {
        console.log(resp);

        if (page === 1) {
          setpage(resp?.list?.data || []);
        } else {
          setpage(resp?.list?.data)
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

  const handleActionChange = async (action) => {
    if (action === "Delete") {
      try {
        if (selectedCheckboxes.length === 0) {
          notifyError("No items selected for deletion.");
          return;
        }
        const formData = new FormData();

        const idsAsString = selectedCheckboxes.join(",");

        formData.append("ids", idsAsString);
        const resp = await PageServices.multiDeletePages(formData);
        if (resp?.status_code === 200) {
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
    }
  };
  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      // Select all
      const allPostIds = page.map((post) => post.id);
      setSelectedCheckboxes(allPostIds);
    } else {
      // Deselect all
      setSelectedCheckboxes([]);
    }
  };

  const handleCheckboxChange = (pageId, isChecked) => {
    if (isChecked) {
      setSelectedCheckboxes((prev) => [...prev, pageId]);
    } else {
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
  const areAllSelected =
    page.length > 0 && selectedCheckboxes.length === page.length;
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
                    <select
                      id="tableActions"
                      className="form-control"
                      style={{ height: "auto" }}
                      onChange={(e) => handleActionChange(e.target.value)}
                    >
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
                    <select
                      id="HedgeFundReportstypes"
                      className="form-control custom-select"
                      value={hedgeFundReportstypes}
                      onChange={(e) => setHedgeFundReportstypes(e.target.value)}
                    >
                      <option value="">Hedge Fund Reports types</option>
                      <option value="monthlyPortfolioSummary">Monthly Portfolio Summary</option>
                      <option value="quarterlyPerformanceAnalysis">Quarterly Performance Analysis</option>
                      <option value="quarterlyShareholderLetter">Quarterly Shareholder Letter</option>
                      <option value="fundDocumentation">Fund Documentation</option>
                      <option value="auditedFinancialStatements">Audited Financial Statements</option>

                    </select>
                  </div>
                  <div className="custom-select-wrapper col-md-3 p-1">
                    <select
                      id="postingYears"
                      className="form-control custom-select"
                      value={postingYear}
                      onChange={(e) => setPostingYear(e.target.value)}
                    >
                      <option value="">Select a year</option>
                      {Array.from({ length: 15 }, (_, i) => {
                        const year = 2010 + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>


                  <div className="col-md-12 p-1">
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        id="searchPages"
                        className="form-control search-input"
                        placeholder="Search page..."
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


                <table className="table table-striped " id="user-data-table" style={{ border: '1px solid #ccc' }}>
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
                      <th>Document Title</th>
                      <th>Category</th>
                      <th>Reports types</th>
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
                          <td>
                            {(page?.hedge_fund_report_type === "monthlyPortfolioSummary" || page?.hedge_fund_report_type === null) && "Monthly Portfolio Summary"}
                            {page?.hedge_fund_report_type === "quarterlyPerformanceAnalysis" && "Quarterly Performance Analysis"}
                            {page?.hedge_fund_report_type === "quarterlyShareholderLetter" && "Quarterly Shareholder Letter"}
                            {page?.hedge_fund_report_type === "fundDocumentation" && "Fund Documentation"}
                            {page?.hedge_fund_report_type === "auditedFinancialStatements" && "Audited Financial Statements"}
                          </td>
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
                        <td colSpan="6">No page available yet.</td>
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
