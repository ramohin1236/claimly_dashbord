import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EditGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, title: string, discrimination: string) => void;
    guide: {
        key: string;
        guidesTitle: string;
        guidesDiscrimination: string;
    } | null;
}

export default function EditGuideModal({
    isOpen,
    onClose,
    onSave,
    guide,
}: EditGuideModalProps) {
    const [guidesTitle, setGuidesTitle] = useState("");
    const [guidesDiscrimination, setGuidesDiscrimination] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            if (guide) {
                setGuidesTitle(guide.guidesTitle);
                setGuidesDiscrimination(guide.guidesDiscrimination);
            }
        }
    }, [isOpen, guide]);

    if (!isOpen || !guide) return null;

    const handleSave = () => {
        if (!guidesTitle.trim()) {
            alert("Please enter a guides title");
            return;
        }
        if (!guidesDiscrimination.trim()) {
            alert("Please enter guides discrimination");
            return;
        }
        onSave(guide.key, guidesTitle, guidesDiscrimination);
        handleClose();
    };

    const handleClose = () => {
        setGuidesTitle("");
        setGuidesDiscrimination("");
        setIsAnimating(false);
        setTimeout(() => onClose(), 200);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className={`bg-white rounded-lg p-6 w-full max-w-lg relative transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-[#1E293B] mb-2 text-center">
                    Update Guides
                </h2>

                {/* Description */}
                <p className="text-sm text-[#64748B] mb-6 text-center">
                    Edit the Guides content as needed. The changes will be reflected in the user interface immediately after saving.
                </p>

                {/* Guides Title Input */}
                <div className="mb-6 mt-4">
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Guides Title
                    </label>
                    <input
                        type="text"
                        value={guidesTitle}
                        onChange={(e) => setGuidesTitle(e.target.value)}
                        placeholder="Enter the Guides Title"
                        className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] text-sm"
                    />
                </div>

                {/* Guides Discrimination Textarea */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Guides Discrimination
                    </label>
                    <textarea
                        value={guidesDiscrimination}
                        onChange={(e) => setGuidesDiscrimination(e.target.value)}
                        placeholder="Enter the Guides Discrimination"
                        className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] resize-none text-sm"
                        rows={6}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 border border-[#EF4444] text-[#EF4444]! rounded-lg font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-3 bg-[#2563EB] text-white! rounded-lg font-medium hover:bg-[#1d4ed8]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
