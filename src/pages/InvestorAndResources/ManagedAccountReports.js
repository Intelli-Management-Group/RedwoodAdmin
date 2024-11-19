import React, { useEffect, useState } from 'react';
import Image from '../Component/ImagesComponets/ImagesComponets';
import HedgeFundReportsnBanner from "../../Assetes/images/banner_investor_resources.jpg"
import HeaderComponents from '../Component/HeaderComponents/HeaderComponents';
import Footer from '../Component/Footer/Footer';
import pdfIcon from "../../Assetes/images/pdf_icon1.png"
import MetaTitle from '../Component/MetaTitleComponents/MetaTitleComponents';
// PDF data for each year
const HedgeFundReportData = {
    'China': [
        'China Outlook Q1 2023',
        'China Outlook Q2 2023',
        'Test Summary – July 2023',
        'Testing Summary – July 2023',
    ],

};

const ManagedAccountReports = () => {
    const [visibleYear, setVisibleYear] = useState(null);

    useEffect(() => {
        console.log('component mounted');
    }, []);
    const toggleVisibility = (year) => {
        setVisibleYear(visibleYear === year ? null : year);
    };

    return (
        <div>
            <HeaderComponents />
            <MetaTitle pageTitle={'Managed Account Reports – Redwood Peak Limited'} />
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
                        Managed Account Reports
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

export default ManagedAccountReports;
