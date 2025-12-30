import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="ml-64 min-h-screen transition-all duration-300 flex flex-col">
                <Navbar />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
