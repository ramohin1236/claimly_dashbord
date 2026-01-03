import userIcon from "../../../public/Ellipse 2033 (1).svg";
import righticon from "../../../public/Vector (4).svg";


export default function SupportingReport({claimStatus}: {claimStatus: string}) {

 ;

    return (
        <div >
           <div className="flex flex-col gap-4">

                    {/* topppp */}
                    <div className="flex gap-4">


                        <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                                <div className=" rounded-full ">
                                    <img src={userIcon} alt="Profile" className="w-[45px] h-[45px] object-cover rounded-full" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] text-[#1E293B] font-medium">Mojahid Islam</p>
                                    <p className="text-[#64748B] text-[14px]">Mojahid@gmail.com</p>
                                </div>
                            </div>

                            <div>
                                <button className="cursor-pointer">
                                    <img src={righticon} alt="" />
                                </button>
                            </div>
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
                                    <p className="text-[#64748B] text-[14px]">NRMA</p>
                                </div>
                            </div>

                        </div>

                        <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">

                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] text-[#1E293B] font-medium">Policy Type</p>
                                    <p className="text-[#64748B] text-[14px]">Comprehensive</p>
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
                                    <p className="text-[#64748B] text-[14px]">12 March 2025</p>
                                </div>
                            </div>

                        </div>

                        <div className="px-4 py-5 bg-white border-2 border-[#BFDBFE] rounded-lg text-[#64748B] text-xs flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">

                                <div className="flex flex-col gap-1">
                                    <p className="text-[16px] text-[#1E293B] font-medium">Reported to Insurer On</p>
                                    <p className="text-[#64748B] text-[14px]">16 March 2025</p>
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
                                    <p className="text-[#64748B] text-[14px]">Vehicle was rear-ended while stationary at a traffic light. Rear bumper and boot sustained visible damage. No injuries reported at the scene.</p>
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
                                    <p className="text-[#64748B] text-[14px]">NRMA initially offered partial coverage citing pre-existing scratches. Requested additional photos and repair estimates.</p>
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
                                    <p className="text-[#64748B] text-[14px]">Yes—Insurer</p>
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
                                    <p className="text-[#64748B] text-[14px]">Unsure whether the insurer’s reliance on pre-existing damage is reasonable and what evidence could challenge this decision.</p>
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
                                    <p className="text-[#64748B] text-[14px]">Insurer has acknowledged the complaint and advised a response within 30 days.</p>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
        </div>
    );
}