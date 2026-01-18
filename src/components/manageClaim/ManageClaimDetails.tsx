import { useState, useEffect } from "react";
import { FileText, Image as ImageIcon, Download, X } from "lucide-react";
import { useParams } from "react-router-dom";
import SupportingReport from "./SupportingReport";
import UpdateStatusModal from "./UpdateStatusModal";
import { useGetSingleInsurerQuery, useUpdateInsurerStatusMutation } from "../../store/api/insurerApi";
import { toast } from "sonner";


export default function ManageClaimDetails() {


    const { id } = useParams();

    const { data: insurerData, isLoading, isError } = useGetSingleInsurerQuery(id as string)
    const claim = insurerData?.data;
    console.log("document", claim?.supporting_Documents)
    const supportingDocuments = claim?.supporting_Documents;

    const [claimStatus, setClaimStatus] = useState("Under Review");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateStatus] = useUpdateInsurerStatusMutation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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


    const handleUpdateStatus = async (status: string, cloudinaryUrls?: string[], failureNote?: string) => {
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
                failureNote: failureNote || "",
                evaluation_Report: cloudinaryUrls || [] // Store Cloudinary URLs
            };

            formData.append("data", JSON.stringify(data));

            const res = await updateStatus({ id: id as string, body: formData }).unwrap();

            if (res.success) {
                toast.success(res.message || "Status updated successfully", { id: toastId });
                setIsModalOpen(false);
            } else {
                toast.error(res.message || "Failed to update status", { id: toastId });
            }
        } catch (error: unknown) {
            console.error("Update failed:", error);
            let errorMessage = "An error occurred while updating status";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (error && typeof error === 'object' && 'data' in error) {
                const errorObj = error as { data?: { message?: string } };
                errorMessage = errorObj.data?.message || errorMessage;
            }
            toast.error(errorMessage, { id: toastId });
        }
    };

    const handleDownload = async (fileUrl: string, fileName: string) => {
        let toastId: string | number | undefined;
        try {
            toastId = toast.loading("Downloading file...");
            
            // Clean the fileUrl - remove any JSON stringification artifacts
            let cleanUrl = String(fileUrl).trim();
            if (cleanUrl.startsWith('[') && cleanUrl.endsWith(']')) {
                try {
                    cleanUrl = JSON.parse(cleanUrl)[0];
                } catch {
                    // If parsing fails, just use the original
                }
            }
            cleanUrl = cleanUrl.replace(/\\/g, '/');

            // If URL is already absolute (http/https - like Cloudinary), open directly
            if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
                console.log("Opening download link (absolute URL):", cleanUrl);
                // Simple and reliable: open the link directly
                const link = document.createElement('a');
                link.href = cleanUrl;
                link.setAttribute('download', fileName);
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success(`${fileName} download started`, { id: toastId });
            } else {
                // For relative paths, fetch from server
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://claimly-insurance-server-eight.vercel.app/api/v1';
                const domain = new URL(apiBaseUrl).origin;
                const fullUrl = `${domain}/${cleanUrl.replace(/^\/+/, '')}`;

                console.log("Downloading from server (relative path):", fullUrl);
                const response = await fetch(fullUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }, 100);
                
                toast.success(`${fileName} downloaded successfully`, { id: toastId });
            }
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("Failed to download file. Please try again.", { id: toastId });
        }
    };





    return (
        <div className="p-10 min-h-[90vh] rounded-3xl">
            <div className="flex flex-col gap-4">


                <SupportingReport claim={claim} claimStatus={claimStatus} />

                {/* supporting report */}

                <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4 bg-white">
                    <p className="text-[#1E293B] font-semibold text-base">Supporting Documents</p>

                    <div className="flex flex-col gap-4">
                        {/* first */}
                        {
                            supportingDocuments?.map((document: string, index: number) => {
                                // Clean the document string first
                                let cleanDoc = String(document).trim();
                                if (cleanDoc.startsWith('[') && cleanDoc.endsWith(']')) {
                                    try {
                                        cleanDoc = JSON.parse(cleanDoc)[0];
                                    } catch {
                                        // Keep original
                                    }
                                }
                                cleanDoc = cleanDoc.replace(/\\/g, '/').trim();
                                
                                const isImage = cleanDoc.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg|webp)$/);
                                const fileName = cleanDoc.split('/').pop()?.split(']').shift()?.trim() || `Document ${index + 1}`;
                                
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

                                            onClick={() => handleDownload(cleanDoc, fileName)}
                                            className="text-[#2563EB] cursor-pointer hover:text-[#1d4ed8] transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                );
                            })
                        }

                        {/* <p><img src={`${baseURl}/${claim?.supporting_Documents[0]}`} alt="adsf" /></p> */}

                    </div>
                </div>

                {claimStatus === "Report Ready" && (
                    <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4 bg-white">
                        <p className="text-[#1E293B] font-semibold text-base">Claim Evaluation Report</p>
                        {claim?.evaluation_Report && claim.evaluation_Report.length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {claim.evaluation_Report.map((report: string, index: number) => {
                                    // Clean the report string
                                    let cleanReport = String(report).trim();
                                    if (cleanReport.startsWith('[') && cleanReport.endsWith(']')) {
                                        try {
                                            cleanReport = JSON.parse(cleanReport)[0];
                                        } catch {
                                            // Keep original
                                        }
                                    }
                                    cleanReport = cleanReport.replace(/\\/g, '/').trim();
                                    
                                    const isImage = cleanReport.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg|webp)$/);
                                    const fileName = cleanReport.split('/').pop()?.split(']').shift()?.trim() || `Report ${index + 1}`;
                                    
                                    if (isImage) {
                                        // Image preview thumbnail
                                        return (
                                            <img 
                                                key={index}
                                                src={cleanReport} 
                                                alt={fileName}
                                                className="w-32 h-32 object-cover rounded-lg border-2 border-[#2563EB] cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setSelectedImage(cleanReport)}
                                            />
                                        );
                                    } else {
                                        // File icon with name
                                        return (
                                            <div key={index} className="bg-[#DBEAFE] flex items-center justify-between py-3 px-4 rounded-lg w-full">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-[#2563EB]">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#1E293B] text-sm">{fileName}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDownload(cleanReport, fileName)}
                                                    className="text-[#2563EB] cursor-pointer hover:text-[#1d4ed8] transition-colors"
                                                    title="Download"
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        ) : (
                            <p className="text-[#64748B]">Status: <span className="text-[#22C55E] font-semibold">{claimStatus}</span></p>
                        )}
                    </div>
                )}

                {claimStatus === "Failed" && (
                    <div className="border border-[#DBEAFE] rounded-lg py-4 flex flex-col gap-4 px-4 bg-white">
                        <p className="text-[#EF4444] font-semibold text-base">Failure Note</p>
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

                {/* Image Lightbox Modal */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div 
                            className="relative max-w-4xl max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={selectedImage} 
                                alt="Preview"
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                                title="Close"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
