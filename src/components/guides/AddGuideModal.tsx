import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useCreateClaimlyGuidesMutation } from "../../store/api/claimlyGuidesApi";
import { toast } from "sonner";

interface AddGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, details: string) => void;
}

interface Inputs {
    title: string;
    details: string;
}

export default function AddGuideModal({
    isOpen,
    onClose,
}: AddGuideModalProps) {
     const {
        register,
        handleSubmit,
        reset
       } = useForm<Inputs>()

    const [ createClaimlyGuides, { isLoading }] = useCreateClaimlyGuidesMutation()


    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
     
        setIsAnimating(false);
        setTimeout(() => onClose(), 200);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

   
    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        try {
            const response = await createClaimlyGuides(data)
            if(response.data.success){
                toast.success(response.data.message)
                reset()
                handleClose()
            }
            console.log(response)
        } catch (error : any) {
            toast.error(error.data.message)
        }
    }

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
                    Add New Guides
                </h2>

                {/* Description */}
                <p className="text-sm text-[#64748B] mb-6 text-center">
                    Fill out the details below to add a Add New Guides. Ensure the Guides provides clarity and helps users quickly resolve their queries.
                </p>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Guides Title Input */}
                        <div className="mb-6 mt-4">
                            <label className="block text-sm font-medium text-[#1E293B] mb-2">
                                Guides Title
                            </label>
                            <input
                                type="text"
                                {...register("title")}
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
                                {...register("details")}
                                placeholder="Enter the Guides Discrimination"
                                className="w-full px-4 py-3 border border-[#DBEAFE] rounded-lg focus:outline-none focus:border-[#2563EB] resize-none text-sm"
                                rows={6}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                 type="button"
                                className="flex-1 px-4 py-3 border border-[#EF4444] text-[#EF4444]! rounded-lg text-[#EF4444] font-medium hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-3 bg-[#2563EB] text-white! rounded-lg font-medium hover:bg-[#1d4ed8] cursor-pointer"
                            >
                                {isLoading ? 'Adding...' : 'Add Guides'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
