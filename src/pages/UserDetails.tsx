import { useState } from "react";
import userIcon from "../../public/Ellipse 2033 (1).svg";
import dashboardIcon from "../../public/Group (4).svg";
import unblkIcon from "../../public/unblk.svg";
import blkIcon from "../../public/Group (5).svg";
import { Link } from "react-router-dom";

export default function UserDetails() {


    const [status, setStatus] = useState<"Active" | "Blocked">("Active");

    const handleToggleStatus = () => {
        setStatus(prev => prev === "Active" ? "Blocked" : "Active");
    };

    const details = [
        { label: "Name", value: "Mojahid Islam" },
        { label: "Email", value: "Mojahid@gmail.com" },
        { label: "Phone Number", value: "+880 1737705577" },
        { label: "Joined Date", value: "12 March 2024" },
    ];

    return (
        <div className="p-10 bg-white min-h-[90vh] rounded-3xl">
            {/* Header */}
            <div className="flex gap-2">
                <Link to="/manage_users">
                             <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                           </Link>
                <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Users</h1>
            </div>

            <div className="max-w-7xl">
                {/* Profile Image */}
                <div className="flex mb-12 ml-4">
                    <div className="w-24 h-24 rounded-full border border-[#BFDBFE]/50 p-0.5 shadow-sm">
                        <img src={userIcon} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    {details.map((detail, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[#1E293B]">
                                {detail.label}
                            </label>
                            <div className="px-4 py-3 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs">
                                {detail.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Box */}
                <div className="mb-10">
                    <label className="text-sm font-semibold text-[#1E293B] block mb-2">
                        Status
                    </label>
                    <div className="px-4 py-3 bg-white border-2 border-[#BFDBFE] rounded-lg">
                        <span className={`text-xs ${status === 'Active' ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    {status === "Active" ? (
                        <button
                            onClick={handleToggleStatus}
                            className="flex items-center gap-2 px-5 py-2.5 border border-[#EF4444] rounded-lg !text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors text-sm"
                        >
                            <img src={blkIcon} alt="block" className="w-4 h-4" />
                            <span className="font-medium !text-[#EF4444]">Block this CR</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleToggleStatus}
                            className="flex items-center gap-2 px-5 py-2.5 border border-[#22C55E] rounded-lg !text-[#22C55E] hover:bg-[#22C55E]/5 transition-colors text-sm"
                        >
                            <img src={unblkIcon} alt="unblock" className="w-4 h-4" />
                            <span className="font-medium !text-[#22C55E]">Unblock this CR</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
