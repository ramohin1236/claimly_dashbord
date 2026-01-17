// removed unused import
import dashboardIcon from "../../public/Group (4).svg";
import unblkIcon from "../../public/unblk.svg";
import blkIcon from "../../public/Group (5).svg";
import { Link, useParams } from "react-router-dom";
import { useGetSingleUserQuery, useToggleBlockUserMutation } from "../store/api/userApi";
import { toast } from "sonner";

export default function UserDetails() {
    const params = useParams();
    const id = params.id;
    console.log("params id", id)

    if (!id) {
        return <div>Loading...</div>;
    }

    const { data: user } = useGetSingleUserQuery(id);
    console.log("user", user?.data?.user)

    const [toggleBlockUser] = useToggleBlockUserMutation();

    const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
        const action = shouldBlock ? "Blocking" : "Unblocking";
        const toastId = toast.loading(`${action} user...`);
        try {
            const res = await toggleBlockUser(userId).unwrap();
            if (res.success) {
                toast.success(res.message || `User ${shouldBlock ? "blocked" : "unblocked"} successfully`, { id: toastId });
            } else {
                toast.error(res.message || `Failed to ${action.toLowerCase()} user`, { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || `Failed to ${action.toLowerCase()} user`, { id: toastId });
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const details = [
        { label: "Name", value: user?.data?.user?.fullName },
        { label: "Email", value: user?.data?.user?.email },
        { label: "Phone Number", value: user?.data?.user?.phone },
        {
            label: "Joined Date",
            value: user?.data?.user?.createdAt
                ? formatDate(user.data.user.createdAt)
                : "—",
        },
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
                    {user?.data?.user?.profile_image ? (
                        <div className="w-24 h-24 rounded-full border border-[#BFDBFE]/50 p-0.5 shadow-sm">
                            {(() => {
                                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://claimly-insurance-server-eight.vercel.app/api/v1';
                                const domain = new URL(apiBaseUrl).origin;
                                return (
                                    <img
                                        src={`${domain}/${user.data.user.profile_image.replace(/\\/g, '/')}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] text-3xl font-bold shadow-sm">
                            {user?.data?.user?.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
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
                    <div className="px-4 py-3 font-bold bg-white border-2 border-[#BFDBFE] rounded-lg">
                        <span className={`text-xs ${user?.data?.user?.isBlocked ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}>
                            {user?.data?.user?.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    {!user?.data?.user?.isBlocked ? (
                        <button
                            onClick={() => handleBlockToggle(user?.data?.user?._id, true)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-[#EF4444] rounded-lg !text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors text-sm"
                        >
                            <img src={blkIcon} alt="block" className="w-4 h-4" />
                            <span className="font-medium !text-[#EF4444]">Block this User</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleBlockToggle(user?.data?.user?._id, false)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-[#22C55E] rounded-lg !text-[#22C55E] hover:bg-[#22C55E]/5 transition-colors text-sm"
                        >
                            <img src={unblkIcon} alt="unblock" className="w-4 h-4" />
                            <span className="font-medium !text-[#22C55E]">Unblock this User</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
