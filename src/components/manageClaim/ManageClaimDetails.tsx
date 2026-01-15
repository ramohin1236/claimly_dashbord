import { useState, useEffect } from "react";
import { FileText, Image as ImageIcon, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import SupportingReport from "./SupportingReport";
import UpdateStatusModal from "./UpdateStatusModal";
import { useGetSingleInsurerQuery, useUpdateInsurerStatusMutation } from "../../store/api/insurerApi";
import { toast } from "sonner";

export default function ManageClaimDetails() {
    const baseURl = "https://claimly-insurance-server.vercel.app"

    const { id } = useParams();

    const { data: insurerData, isLoading, isError } = useGetSingleInsurerQuery(id as string)
    const claim = insurerData?.data;
    console.log("document", claim?.supporting_Documents)
    const supportingDocuments = claim?.supporting_Documents;

    const [claimStatus, setClaimStatus] = useState("Under Review");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateStatus] = useUpdateInsurerStatusMutation();

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


    const handleUpdateStatus = async (status: string, reportFiles?: File[], failureNote?: string) => {
        const toastId = toast.loading("Updating status...");
        try {
            const formData = new FormData();

            // Map labels to backend status values
            const statusMap: Record<string, string> = {
                "Under Review": "UNDER_REVIEW",
                "Report Ready": "REPORT_READY",
                "Failed": "FAILED"
            };

            const data = {
                status: statusMap[status] || status,
                failureNote: failureNote || ""
            };

            formData.append("data", JSON.stringify(data));

            if (reportFiles && reportFiles.length > 0) {
                // Assuming single file for report_Document as per screenshot
                formData.append("report_Document", reportFiles[0]);
            }

            const res = await updateStatus({ id: id as string, body: formData }).unwrap();

            if (res.success) {
                toast.success(res.message || "Status updated successfully", { id: toastId });
                setIsModalOpen(false);
            } else {
                toast.error(res.message || "Failed to update status", { id: toastId });
            }
        } catch (error: any) {
            console.error("Update failed:", error);
            toast.error(error?.data?.message || "An error occurred while updating status", { id: toastId });
        }
    };

    const handleDownload = async (fileUrl: string, fileName: string) => {
        try {
            // Get the base API URL and extract the domain
            const apiBaseUrl = 'https://claimly-insurance-server.vercel.app/api/v1';
            const domain = new URL(apiBaseUrl).origin;

            // If the URL is relative, prepend the domain
            const fullUrl = fileUrl.startsWith('http')
                ? fileUrl
                : `${domain}/${fileUrl.replace(/\\/g, '/')}`;

            const response = await fetch(fullUrl);
            console.log("Response:", response);
            // if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download file. Please check if the file exists on the server.");
        }
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
                        {
                            supportingDocuments?.map((document: string, index: number) => {
                                const isImage = document.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg|webp)$/);
                                const fileName = document.split(/[\\/]/).pop() || `Document ${index + 1}`;
                                return (
                                    <div key={index} className="bg-[#DBEAFE] flex items-center justify-between py-3 px-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#2563EB]">
                                                {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
                                            </div>
                                            <div>
                                                <p className="text-[#1E293B] text-sm">{fileName}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(document, fileName)}
                                            className="text-[#2563EB] cursor-pointer hover:text-[#1d4ed8] transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                );
                            })
                        }

                        <p><img src={`${baseURl}/${claim?.supporting_Documents[0]}`} alt="adsf" /></p>

                    </div>
                </div>

                {claimStatus === "Report Ready" && (
                    <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4">
                        <p>Claim Evaluation Report</p>
                        <div className="flex flex-col gap-4">
                            {claim?.evaluation_Report?.map((report: string, index: number) => {
                                const isImage = report.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg|webp)$/);
                                const fileName = report.split(/[\\/]/).pop() || `Report ${index + 1}`;
                                return (
                                    <div key={index} className="bg-[#DBEAFE] flex items-center justify-between py-3 px-4 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[#2563EB]">
                                                {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
                                            </div>
                                            <div>
                                                <p className="text-[#1E293B] text-sm">{fileName}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(report, fileName)}
                                            className="text-[#2563EB] cursor-pointer hover:text-[#1d4ed8] transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                );
                            })}
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
