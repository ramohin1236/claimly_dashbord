import { Modal, Input, Button } from "antd";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface UpdateFaqModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: { question: string; answer: string }) => void;
    initialData?: { question: string; answer: string };
}

export default function UpdateFaqModal({ isOpen, onClose, onSave, initialData }: UpdateFaqModalProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (initialData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuestion(initialData.question);
            setAnswer(initialData.answer);
        }
    }, [initialData, isOpen]);

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
                <h2 className="text-[28px] font-bold text-[#1E293B] mb-4">Update FAQ</h2>
                <p className="text-[#64748B] text-sm leading-relaxed mx-auto">
                    Edit the FAQ content as needed. The changes will be reflected in the user interface immediately after saving.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E293B]">
                        Question for the FAQ
                    </label>
                    <Input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the FAQ"
                        className="h-12 border-[#BFDBFE] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-xl text-sm"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#1E293B]">
                        Answer to the FAQ
                    </label>
                    <Input.TextArea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the FAQ Answer"
                        rows={5}
                        className="border-[#BFDBFE] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-xl text-sm py-3"
                    />
                </div>

                <div className="flex gap-4 pt-4 pb-2">
                    <Button
                        onClick={onClose}
                        className="flex-1 h-12 border-[#FF4151] !text-[#FF4151] hover:!bg-[#FF4151]/5 rounded-xl font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => onSave({ question, answer })}
                        className="flex-1 h-12 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl font-medium border-none shadow-none"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

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
