import dashboardIcon from "../../public/Group (4).svg";
import updateIcon from "../../public/Group (18).svg";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


export default function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSavePassword = () => {
        if (!oldPassword.trim()) {
            alert("Please enter your old password");
            return;
        }
        if (!newPassword.trim()) {
            alert("Please enter a new password");
            return;
        }
        if (!confirmPassword.trim()) {
            alert("Please confirm your new password");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        // Here you can add API call to update password
        alert("Password updated successfully!");

        // Reset fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-10">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Update Password</h1>
                </div>
            </div>

            {/* Content */}
            <div >
                <div className="flex flex-col gap-6 p-8 rounded-lg ">
                    {/* Old Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[#1E293B]">Old Password</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password and Confirm Password */}
                    <div className="flex gap-4">
                        {/* New Password */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium text-[#1E293B]">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium text-[#1E293B]">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Save Password Button */}
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={handleSavePassword}
                            className="bg-[#2563EB] h-11 px-6 text-white! py-2 rounded-lg border-none flex items-center gap-2 text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
                        >
                            <img src={updateIcon} alt="update" />
                            Save Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
