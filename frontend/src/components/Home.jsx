import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Products from './Products';
import Webhooks from './Webhooks';
import AIChatbox from './AIChatbox';

const Home = () => {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'webhooks':
                return <Webhooks />;
            case 'products':
                return <Products />;
            case 'ai-chatbox':
                return <AIChatbox />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="app-layout">
            <Sidebar onViewChange={setCurrentView} currentView={currentView} />
            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default Home;
