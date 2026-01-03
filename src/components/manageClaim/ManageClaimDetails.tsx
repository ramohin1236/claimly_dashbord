import documents from "../../../public/Frame (11).svg";
import { useState } from "react";
import SupportingReport from "./SupportingReport";
import UpdateStatusModal from "./UpdateStatusModal";

export default function ManageClaimDetails() {

    const [claimStatus, setClaimStatus] = useState("Failed");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdateStatus = (status: string, reportFiles?: File[], failureNote?: string) => {
        setClaimStatus(status);
        console.log("Updated Status:", status);
        if (reportFiles && reportFiles.length > 0) {
            console.log("Report Files:", reportFiles);
        }
        if (failureNote) {
            console.log("Failure Note:", failureNote);
        }
        // Here you can add API call to update the status in backend
    };

    return (
        <div className="p-10 min-h-[90vh] rounded-3xl">
            <div className="flex flex-col gap-4">


                <SupportingReport claimStatus={claimStatus} />

                {/* supporting report */}

                <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4">
                    <p>Supporting Documents</p>
                    <div className="flex flex-col gap-4">
                        {/* first */}
                        <div className="bg-[#DBEAFE] flex items-center gap-2 py-3 px-4 rounded-lg">
                            <div> <img src={documents} alt="" /> </div>
                            <div> <p>Documents 01.pdf</p> </div>
                        </div>
                        {/* first */}
                        <div className="bg-[#DBEAFE] flex items-center gap-2 py-3 px-4 rounded-lg">
                            <div> <img src={documents} alt="" /> </div>
                            <div> <p>Documents 01.pdf</p> </div>
                        </div>
                        {/* first */}
                        <div className="bg-[#DBEAFE] flex items-center gap-2 py-3 px-4 rounded-lg">
                            <div> <img src={documents} alt="" /> </div>
                            <div> <p>Documents 01.pdf</p> </div>
                        </div>

                    </div>
                </div>

                {claimStatus === "Report Ready" && (
                    <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4">
                        <p>Claim Evaluation Report</p>
                        <div className="flex flex-col gap-4">
                            <div className="bg-[#DBEAFE] flex items-center gap-2 py-3 px-4 rounded-lg">
                                <div>
                                    <img src={documents} alt="" />
                                </div>
                                <div>
                                    <p>Documents 01.pdf</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {claimStatus === "Failed" && (
                    <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4">
                        <p className="text-[#EF4444]">Failure Note</p>
                        <div className="flex flex-col gap-4">
                            <p className="text-[#64748B]">
                                The documents provided don't clearly relate to the claim decision.
                            </p>
                        </div>
                    </div>
                )}

                {/*status update button */}
                <div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#2563EB] text-white! cursor-pointer px-4 py-2 rounded-lg py-[13px] px-[28px] font-medium"
                    >
                        Update Status
                    </button>
                </div>

                {/* Update Status Modal */}
                <UpdateStatusModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentStatus={claimStatus}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </div>
    );
}