import dashboardIcon from "../../public/Group (4).svg";
import useIcon from "../../public/Frame (13).svg";
import updateIcon from "../../public/Group (15).svg";
import updateIconblue from "../../public/Group (16).svg";
import { Link } from "react-router-dom";


export default function ManageProfile() {
    return (
        <div className="p-6">
            <div className="flex justify-between mb-10">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Profile </h1>
                </div>

            </div>

            {/* contenttttttt */}
            <div>
                <div className="flex flex-col gap-4">
                    <div className="w-26 h-26 flex items-center justify-center">
                        <img src={useIcon} alt="use" className="object-cover w-full h-full" />
                    </div>

                    <div className="flex gap-4">
                        {/* name email */}
                        <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                            <p className="text-md text-[#1E293B] font-semibold">Name</p>
                            <p className="text-[#64748B] text-sm">Mojahid Islam</p>
                        </div>
                        {/* name email */}
                        <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                            <p className="text-md text-[#1E293B] font-semibold">Email</p>
                            <p className="text-[#64748B] text-sm">mojahidislam@gmail.com</p>
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
        </div>
    );
}
