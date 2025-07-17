import React, { useState } from 'react';
import Navbar from '../Component/Navbar/Navbar';

function NotFound() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    
    return (
        <React.Fragment>
            <div className={`main-content bodyBg `} >
                <Navbar toggleSidebar={toggleSidebar} />
                <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '5rem', color: '#d32f2f', marginBottom: '1rem' }}>404</h1>
                    <h2 style={{ color: '#333', marginBottom: '1rem' }}>Page Not Found</h2>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Sorry, the page you are looking for does not exist.</p>
                    <a href="/dashboard" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 'bold' }}>Go to Dashboard</a>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotFound;
