import { useState, useEffect } from "react";
import { X } from "lucide-react";


interface UpdateStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStatus: string;
    onUpdateStatus: (status: string, cloudinaryUrls?: string[], failureNote?: string) => void;
}

export default function UpdateStatusModal({
    isOpen,
    onClose,
    currentStatus,
    onUpdateStatus,
}: UpdateStatusModalProps) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [reportUrls, setReportUrls] = useState<string[]>([]);
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

    const handleSaveUpdate = () => {
        onUpdateStatus(selectedStatus, reportUrls.length > 0 ? reportUrls : undefined, failureNote);
        onClose();
    };

    const handleCancel = () => {
        setSelectedStatus(currentStatus);
        setReportUrls([]);
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
