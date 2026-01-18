import sidenavcollapseIcon from "../../public/Group (19).svg"
import bellIcon from "../../public/Frame (14).svg"
import userIcon from "../../public/Frame (15).svg"
import { useGetAdminProfileQuery } from "../store/api/adminApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "lucide-react";

interface NavbarProps {
    onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
    const { data } = useGetAdminProfileQuery()
    const firstName = data?.data?.fullName
        ?.trim()
        ?.split(/\s+/)[0];
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('token');
        
        // Redirect to login
        navigate('/login');
    };
    return (
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Left side - Toggle */}
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer"
                >
                    <img src={sidenavcollapseIcon} alt="sidenavcollapse" className="w-5 h-5" />
                </button>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer">
                    <img src={bellIcon} alt="" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer"
                    >
                        <img
                            src={data?.data?.profileImage
                                ? (data.data.profileImage.startsWith('http')
                                    ? data.data.profileImage
                                    : `https://claimly-insurance-server-eight.vercel.app/${data.data.profileImage}`)
                                : userIcon}
                            alt="profile"
                            className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-medium text-[#2563EB]">{firstName || "Admin"}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <Link
                                to="/manage_profile"
                                onClick={() => setIsDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-[#1E293B] hover:bg-gray-50 transition-colors border-b border-gray-200"
                            >
                                <img
                                    src={userIcon}
                                    alt="profile"
                                    className="w-5 h-5"
                                />
                                <span className="text-sm font-medium">Manage Profile</span>
                            </Link>
                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                            >
                                <LogOut size={18} />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
