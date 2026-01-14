import dayjs from "dayjs";


export default function SupportingReport({ claim, claimStatus }: { claim: any, claimStatus: string }) {
    const user = claim?.normalUserId;
    console.log("single claim",claim)

    const imageUrl = user?.profile_image
        ? `https://6dxv0gtk-4444.inc1.devtunnels.ms/${user.profile_image.replace(/\\/g, '/')}`
        : null;

    return (
        <div >
            <div className="flex flex-col gap-4">

                {/* topppp */}
                <div className="flex gap-4">


                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">
                            <div className=" rounded-full ">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Profile" className="w-[45px] h-[45px] object-cover rounded-full" />
                                ) : (
                                    <div className="w-[45px] h-[45px] rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] font-bold">
                                        {user?.fullName?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">{user?.fullName || "N/A"}</p>
                                <p className="text-[#64748B] text-[14px]">{user?.email || "N/A"}</p>
                            </div>
                        </div>

                        {/* <div>
                            <button className="cursor-pointer">
                                <img src={righticon} alt="" />
                            </button>
                        </div> */}
                    </div>

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Claim Status</p>
                                <p
                                    className={`text-[16px] font-medium ${claimStatus === "Under Review"
                                        ? "text-[#F59E0B]"
                                        : claimStatus === "Report Ready"
                                            ? "text-[#22C55E]"
                                            : claimStatus === "Failed"
                                                ? "text-[#F43F5E]"
                                                : "text-[#64748B]"
                                        }`}
                                >
                                    {claimStatus}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* second */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Insured With</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.insurerName || "N/A"}</p>
                            </div>
                        </div>

                    </div>

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Policy Type</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.policyType || "N/A"}</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* third */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Incident Date</p>
                                <p className="text-[#64748B] text-[14px]">
                                    {claim?.incidentDate ? dayjs(claim.incidentDate).format("DD MMM YYYY") : "N/A"}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Reported to Insurer On</p>
                                <p className="text-[#64748B] text-[14px]">
                                    {claim?.firstNotifiedDate ? dayjs(claim.firstNotifiedDate).format("DD MMM YYYY") : "N/A"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* fourth */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Incident Description</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.incidentDescription || "N/A"}</p>
                            </div>
                        </div>

                    </div>


                </div>
                {/* fifth */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Insurer Decision / Response</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.insurerResponse || "N/A"}</p>
                            </div>
                        </div>

                    </div>


                </div>
                {/* seventh */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Has a complaint been made?</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.complaintMade}</p>
                            </div>
                        </div>

                    </div>


                </div>
                {/* eighth */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">User Concern / Expected Outcome</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.userConcern || "N/A"}</p>
                            </div>
                        </div>

                    </div>


                </div>
                {/* ninth */}
                <div className="flex gap-4">

                    <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">

                            <div className="flex flex-col gap-1">
                                <p className="text-[16px] text-[#1E293B] font-medium">Current complaint status</p>
                                <p className="text-[#64748B] text-[14px]">{claim?.complaintStatus || "N/A"}</p>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}