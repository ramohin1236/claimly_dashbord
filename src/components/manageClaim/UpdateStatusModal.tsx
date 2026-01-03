import { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import pdfIcon from "../../../public/Group (13).svg"

interface UpdateStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStatus: string;
    onUpdateStatus: (status: string, reportFiles?: File[], failureNote?: string) => void;
}

export default function UpdateStatusModal({
    isOpen,
    onClose,
    currentStatus,
    onUpdateStatus,
}: UpdateStatusModalProps) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [reportFiles, setReportFiles] = useState<File[]>([]);
    const [failureNote, setFailureNote] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const statusOptions = [
        { value: "Under Review", label: "Under Review", color: "text-[#F59E0B]" },
        { value: "Report Ready", label: "Report Ready", color: "text-[#22C55E]" },
        { value: "Failed", label: "Failed", color: "text-[#F43F5E]" },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setReportFiles([...reportFiles, ...newFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setReportFiles(reportFiles.filter((_, i) => i !== index));
    };

    const handleSaveUpdate = () => {
        if (selectedStatus === "Report Ready" && reportFiles.length === 0) {
            alert("Please upload at least one report document");
            return;
        }
        if (selectedStatus === "Failed" && !failureNote.trim()) {
            alert("Please provide a failure note");
            return;
        }
        onUpdateStatus(selectedStatus, reportFiles, failureNote);
        onClose();
    };

    const handleCancel = () => {
        setSelectedStatus(currentStatus);
        setReportFiles([]);
        setFailureNote("");
        setIsAnimating(false);
        setTimeout(() => onClose(), 200);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className={`bg-white rounded-lg p-6 w-full max-w-md relative transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-[#1E293B] mb-2">
                    Update Request Status
                </h2>

                {/* Description */}
                <p className="text-sm text-[#64748B] mb-6">
                    Select The Current Status And Provide The Required Details To Continue.
                </p>

                {/* Status Dropdown */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Request Status
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-[#2563EB] focus:outline-none focus:border-[#2563EB]"
                        >
                            <span
                                className={
                                    statusOptions.find((opt) => opt.value === selectedStatus)
                                        ?.color || "text-[#1E293B]"
                                }
                            >
                                {selectedStatus}
                            </span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Options */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-200">
                                {statusOptions.map((option, index) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setSelectedStatus(option.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left transition-all duration-150 hover:bg-gray-50 ${option.color} ${index === 0 ? "rounded-t-lg" : ""
                                            } ${index === statusOptions.length - 1 ? "rounded-b-lg" : ""
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Report Ready - Upload Document */}
                {selectedStatus === "Report Ready" && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                            Upload Report Documents
                        </label>

                        <label className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-[#2563EB] flex flex-col items-center justify-center mb-4">
                            <Upload className="text-[#2563EB] mb-2" size={24} />
                            <span className="text-sm text-[#2563EB]">Upload Documents</span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,image/*"
                                multiple
                            />
                        </label>

                        {/* Display uploaded files */}
                        {reportFiles.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {reportFiles.map((file, index) => (
                                    <div key={index} className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {file.type.startsWith('image/') ? (
                                                // Image Icon
                                                <div className="bg-blue-100 p-2 rounded">
                                                    <svg
                                                        className="w-6 h-6 text-blue-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                // PDF Icon
                                                <div className="bg-red-100 p-2 rounded">
                                                    <img src={pdfIcon} alt="PDF" className="w-6 h-6" />
                                                </div>
                                            )}
                                            <span className="text-sm text-[#1E293B]">
                                                {file.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Failed - Failure Note */}
                {selectedStatus === "Failed" && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                            Failure Note
                        </label>
                        <textarea
                            value={failureNote}
                            onChange={(e) => setFailureNote(e.target.value)}
                            placeholder="Briefly explain why this request was marked as failed."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2563EB] resize-none"
                            rows={4}
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#1E293B] font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveUpdate}
                        className="flex-1 px-4 py-3 bg-[#2563EB] text-white! rounded-lg font-medium hover:bg-[#1d4ed8]"
                    >
                        Save Update
                    </button>
                </div>
            </div>
        </div>
    );
}
