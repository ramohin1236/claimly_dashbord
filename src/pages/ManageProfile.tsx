import dashboardIcon from "../../public/Group (4).svg";
import updateIcon from "../../public/Group (15).svg";
import updateIconblue from "../../public/Group (16).svg";
import { Link } from "react-router-dom";
import { useGetAdminProfileQuery } from "../store/api/adminApi";


export default function ManageProfile() {
    const { data, isLoading } = useGetAdminProfileQuery()
    const firstLetter = data?.data?.fullName?.trim().charAt(0).toUpperCase();
    console.log(firstLetter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between mb-10">
                <div className="flex gap-2">
                    <Link to="/privacy_policy">
                        <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    </Link>
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Profile </h1>
                </div>

            </div>

            {/* contenttttttt */}


            {
                isLoading ? (
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="w-26 h-26 flex items-center justify-center rounded-full border border-[#DBEAFE] bg-[#2563eb]">
                                {data?.data?.profileImage ? (
                                    <img
                                        src={
                                            data.data.profileImage.startsWith("http")
                                                ? data.data.profileImage
                                                : `https://claimly-insurance-server.vercel.app/${data.data.profileImage}`
                                        }
                                        alt="user"
                                        className="object-cover w-full h-full rounded-full p-1"
                                    />
                                ) : (
                                    <span className="text-white text-4xl font-bold select-none">
                                        {firstLetter}
                                    </span>
                                )}
                            </div>


                            <div className="flex gap-4">
                                {/* name email */}
                                <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                                    <p className="text-md text-[#1E293B] font-semibold">Name</p>
                                    <p className="text-[#64748B] text-sm">{data?.data?.fullName}</p>
                                </div>
                                {/* name email */}
                                <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                                    <p className="text-md text-[#1E293B] font-semibold">Email</p>
                                    <p className="text-[#64748B] text-sm">{data?.data?.email}</p>
                                </div>
                            </div>

                            {/* update button and password updaate butn */}
                            <div className="flex gap-4">
                                <Link to="/update_profile" className="bg-[#2563EB] h-11 px-6 text-white! py-2 rounded-lg border-none flex items-center gap-2 text-sm font-medium">
                                    <img src={updateIcon} alt="update" />
                                    Update
                                </Link>
                                <Link to="/update_password" className="border! border-[#2563EB]! h-11 px-6 text-[#2563EB]! py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                                    <img src={updateIconblue} alt="update" />
                                    Update Password
                                </Link>
                            </div>



                        </div>
                    </div>
                )
            }


        </div>
    );
}
