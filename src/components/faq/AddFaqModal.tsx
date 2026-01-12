import { Modal, Input } from "antd";
import { X } from "lucide-react";
import { useCreateFAQMutation } from "../../store/api/webApi";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";

interface AddFaqModalProps {
    isOpen: boolean;
    onClose: () => void;
}
type Inputs = {
    question: string
    answer: string
}
export default function AddFaqModal({ isOpen, onClose }: AddFaqModalProps) {
    const {
        control,
        handleSubmit,
        reset
    } = useForm<Inputs>();

    const [createFAQ, { isLoading }] = useCreateFAQMutation();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await createFAQ(data).unwrap();
            console.log(res);
            toast.success("FAQ added successfully!");
            reset();
            onClose();
        } catch (err: any) {
            console.error(err);
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            closeIcon={<X className="w-5 h-5 text-[#1E293B]" />}
            centered
            width={550}
            className="custom-modal"
        >
            <div className="text-center mb-8">
                <h2 className="text-[28px] font-bold text-[#1E293B] mb-4">Add FAQ</h2>
                <p className="text-[#64748B] text-sm leading-relaxed max-w-[400px] mx-auto">
                    Fill out the details below to add a new FAQ. Ensure the answer provides clarity and helps users quickly resolve their queries.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E293B]">
                        Question for the FAQ
                    </label>
                    <Controller
                        name="question"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter the FAQ"
                                className="h-12 border-[#BFDBFE] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-xl text-sm placeholder:text-[#94A3B8]"
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E293B]">
                        Answer to the FAQ
                    </label>
                    <Controller
                        name="answer"
                        control={control}
                        render={({ field }) => (
                            <Input.TextArea
                                {...field}
                                placeholder="Enter the FAQ Answer"
                                rows={5}
                                className="border-[#BFDBFE] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-xl text-sm placeholder:text-[#94A3B8] py-3 pb-8"
                            />
                        )}
                    />
                </div>

                <div className="flex gap-4 pt-4 pb-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="flex-1 h-12 border-[#FF4151] text-[#FF4151] hover:bg-[#FF4151]/5 rounded-md border text-[#EF4444]! font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md font-medium border-none text-white! shadow-none disabled:opacity-50"
                    >
                        {isLoading ? "Adding..." : "Add FAQ"}
                    </button>
                </div>
            </form>

            <style>{`
                .custom-modal .ant-modal-content {
                    padding: 40px 32px !important;
                    border-radius: 20px !important;
                }
                .custom-modal .ant-modal-close {
                    top: 24px !important;
                    right: 24px !important;
                }
            `}</style>
        </Modal>
    );
}
