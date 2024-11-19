import React, { useEffect, useState } from 'react';
import Image from '../Component/ImagesComponets/ImagesComponets';
import HedgeFundReportsnBanner from "../../Assetes/images/banner_investor_resources.jpg"
import HeaderComponents from '../Component/HeaderComponents/HeaderComponents';
import Footer from '../Component/Footer/Footer';
import pdfIcon from "../../Assetes/images/pdf_icon1.png"
import MetaTitle from '../Component/MetaTitleComponents/MetaTitleComponents';
// PDF data for each year
const HedgeFundReportData = {
  '2023': [
    'China Outlook Q1 2023',
    'China Outlook Q2 2023',
    'Test Summary – July 2023',
    'Testing Summary – July 2023',
  ],
  '2022': [
    'China Outlook Q4 2022',
    'China Outlook Q5 2022',
    'China Outlook Q6 2022',
    'China Outlook Q7 2022',
  ],
  '2021': ['China Outlook Q8 2021'],
};

const HedgeFundReports = () => {
  const [visibleYear, setVisibleYear] = useState(null); // Keeps track of the currently visible year

  useEffect(() => {
        console.log('component mounted');
    }, []);
  // Toggle visibility of the year
  const toggleVisibility = (year) => {
    setVisibleYear(visibleYear === year ? null : year); // Toggle between showing and hiding
  };

  return (
    <div>
        <HeaderComponents/>
        <MetaTitle pageTitle={'Hedge Fund Reports – Redwood Peak Limited'} />
      <div>
          <Image
                    src={HedgeFundReportsnBanner}
                    className="w-100 bannerHeight"
                    alt="OverView Banner"
                />
      </div>
      <div className="container">
        <div className="container-custom mt-1 mb-5 p-4">
          <h1 className="header-post-title-class" style={{ top: 0 }}>
            Hedge Fund Reports
          </h1>
          <div>
            {/* Render each year */}
            {Object.keys(HedgeFundReportData).map((year) => (
              <div key={year} id={`year-${year}`}>
                <div
                  className="year-header pt-1 pb-1"
                  onClick={() => toggleVisibility(year)}
                  style={{ cursor: 'pointer' }}
                >
                  {year}
                </div>

                {/* Conditionally render the PDFs for the year */}
                {visibleYear === year && (
                  <div className="ml-5">
                    {HedgeFundReportData[year].map((title, index) => (
                      <div key={index} className="pdf-row p-3">
                        <div className="pdf-title">
                          <span>                           
                            <Image
                                src={pdfIcon}
                                // className="w-100 bannerHeight"
                                alt="PDF icon"
                            />
                          </span>
                          {title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HedgeFundReports;
