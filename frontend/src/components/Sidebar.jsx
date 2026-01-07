import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Sidebar = ({ onViewChange, currentView }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userInitials = user.fullName
        ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'G';

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

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
                            <li className={currentView === 'orders' ? 'active' : ''}>
                                <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('orders'); }}>My Orders</a>
                            </li>
                        </ul>
                    </li>

                    <li><a href="#analytics">Analytics</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar" title={user.fullName}>{userInitials}</div>
                    <div style={{ flex: 1 }}>
                        <p className="user-name">{user.fullName || 'Guest User'}</p>
                        <p className="user-role">{user.email || 'No Email'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                        title="Sign Out"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '0.375rem',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'var(--error)';
                            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = 'var(--text-muted)';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
