import documents from "../../../public/Frame (11).svg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SupportingReport from "./SupportingReport";
import UpdateStatusModal from "./UpdateStatusModal";
import { useGetSingleInsurerQuery } from "../../store/api/insurerApi";

export default function ManageClaimDetails() {

    const { id } = useParams();

    const { data: insurerData, isLoading, isError } = useGetSingleInsurerQuery(id as string)
    const claim = insurerData?.data;

    const [claimStatus, setClaimStatus] = useState("Under Review");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Update claimStatus when data is loaded
    useEffect(() => {
        if (claim?.status) {
            const statusMap: Record<string, string> = {
                "UNDER_REVIEW": "Under Review",
                "REPORT_READY": "Report Ready",
                "FAILED": "Failed"
            };
            setClaimStatus(statusMap[claim.status] || "Under Review");
        }
    }, [claim?.status]);

    if (isLoading) {
        return <div className="p-10 flex justify-center items-center min-h-[90vh]">Loading...</div>;
    }

    if (isError) {
        return <div className="p-10 flex justify-center items-center min-h-[90vh] text-red-500">Error loading claim details.</div>;
    }

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


                <SupportingReport claim={claim} claimStatus={claimStatus} />

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
                                {claim?.failureNote || "No failure note provided."}
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