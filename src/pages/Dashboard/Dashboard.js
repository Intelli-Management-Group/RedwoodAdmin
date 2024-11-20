import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './Dashboard.css';
import Sidebar from '../Component/Sidebar/Sidebar';
import Navbar from '../Component/Navbar/Navbar';

function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
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
                            <div>
                                <h1>Dashboard</h1>
                                <p>Welcome to your dashboard! Here you can manage your site.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
      

    );
}

export default Dashboard;
