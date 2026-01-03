import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="header-actions">
                    <button className="btn-secondary">Export</button>
                    <button className="btn-primary">+ New Project</button>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p className="stat-value">12,345</p>
                    <span className="stat-change positive">+5.2%</span>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p className="stat-value">$45,678</p>
                    <span className="stat-change positive">+12.8%</span>
                </div>
                <div className="stat-card">
                    <h3>Active Sessions</h3>
                    <p className="stat-value">1,234</p>
                    <span className="stat-change negative">-2.1%</span>
                </div>
                <div className="stat-card">
                    <h3>Server Load</h3>
                    <p className="stat-value">42%</p>
                    <span className="stat-change neutral">Normal</span>
                </div>
            </div>

            <div className="content-section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <span className="dot blue"></span>
                        <p>User <strong>Alice</strong> updated project <strong>Alpha</strong></p>
                        <span className="time">2m ago</span>
                    </div>
                    <div className="activity-item">
                        <span className="dot green"></span>
                        <p>New invoice generated for <strong>Client X</strong></p>
                        <span className="time">15m ago</span>
                    </div>
                    <div className="activity-item">
                        <span className="dot card"></span>
                        <p>System updated to version <strong>2.4.0</strong></p>
                        <span className="time">1h ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
