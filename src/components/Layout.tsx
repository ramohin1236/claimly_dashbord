import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar isCollapsed={isCollapsed} />
            <div className={`min-h-screen transition-all duration-300 flex flex-col ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <Navbar onToggleSidebar={toggleSidebar} />
                <main className="flex-1 p-8">
                    <div className="max-w-8xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
