import React from 'react';

const Sidebar = ({ onViewChange, currentView }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Nexus<span className="accent">App</span></h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={currentView === 'dashboard' ? 'active' : ''}>
                        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('dashboard'); }}>Dashboard</a>
                    </li>

                    <li className={currentView === 'webhooks' ? 'active' : ''}>
                        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('webhooks'); }}>Webhooks</a>
                    </li>

                    <li className="nav-section">
                        <span className="nav-section-title">Product Management</span>
                        <ul className="nav-submenu">
                            <li className={currentView === 'products' ? 'active' : ''}>
                                <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('products'); }}>Products</a>
                            </li>
                            <li className={currentView === 'ai-chatbox' ? 'active' : ''}>
                                <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('ai-chatbox'); }}>AI Chatbox</a>
                            </li>
                        </ul>
                    </li>

                    <li><a href="#analytics">Analytics</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">JD</div>
                    <div>
                        <p className="user-name">John Doe</p>
                        <p className="user-role">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
