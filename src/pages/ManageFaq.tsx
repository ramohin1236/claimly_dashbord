import dashboardIcon from "../../public/Group (4).svg";
import faqrightIcon from "../../public/Frame (7).svg";
import addFaqIcon from "../../public/Group (6).svg";
import faqBubbleIcon from "../../public/manageFaq.svg";
import { Popconfirm, Popover } from "antd";
import { useState } from "react";
import AddFaqModal from "../components/faq/AddFaqModal";
import UpdateFaqModal from "../components/faq/UpdateFaqModal";
import { PencilLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteFaqMutation, useGetFaqQuery, useUpdateFaqMutation } from "../store/api/webApi";
import { toast } from "sonner";



export default function ManageFaq() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<{ id: number; question: string; answer: string } | null>(null);
    const { data } = useGetFaqQuery()
    const [deleteFaq] = useDeleteFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const faqData = data?.data
    console.log("faqData", faqData)
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenUpdateModal = (faq: { id: number; question: string; answer: string }) => {
        setSelectedFaq(faq);
        setIsUpdateModalOpen(true);
    };
    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedFaq(null);
    };

    const handleDeleteFaq = async (id: string) => {
        const toastId = toast.loading("Deleting faq...");
        try {
            const res = await deleteFaq(id).unwrap();
            if (res.success) {
                toast.success(res.message || "Faq deleted successfully", { id: toastId });
            } else {
                toast.error(res.message || "Failed to delete faq", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete faq", { id: toastId });
        }
    };


    const handleUpdateFaq = async (values: { question: string; answer: string }) => {
        const toastId = toast.loading("Updating faq...");
        try {
            const res = await updateFaq({ id: selectedFaq?.id, ...values }).unwrap();
            if (res.success) {
                toast.success(res.message || "Faq updated successfully", { id: toastId });
                handleCloseUpdateModal();
            } else {
                toast.error(res.message || "Failed to update faq", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update faq", { id: toastId });
        }
    };

    const actionContent = (faq: { id: string; question: string; answer: string }) => (
        <div className="flex flex-col w-[140px] p-1 bg-white">
            <button
                onClick={() => handleOpenUpdateModal(faq as any)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group"
            >
                <div className="w-5 h-5 flex items-center justify-center">
                    <PencilLine className="w-4 h-4 text-[#475467] group-hover:text-[#1E293B]" />
                </div>
                <span className="text-sm font-medium text-[#475467] group-hover:text-[#1E293B]">Update</span>
            </button>
            <Popconfirm
                title="Delete the faq"
                description="Are you sure to delete this faq?"
                onConfirm={() => handleDeleteFaq(faq.id)}
                okText="Yes"
                cancelText="No"
            >
                <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="w-5 h-5 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-[#475467] group-hover:text-[#EF4444]" />
                    </div>
                    <span className="text-sm font-medium text-[#475467] group-hover:text-[#EF4444]">Delete</span>
                </button>
            </Popconfirm>
        </div>
    );

    return (
        <div className="space-y-6 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex gap-2">
                    <Link to="/claimly_guides">
                        <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    </Link>
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage FAQ</h1>
                </div>
                <button

                    onClick={handleOpenModal}
                    className="bg-[#2563EB] h-11 px-6 text-white! py-2 rounded-lg border-none flex items-center gap-2 text-sm font-medium"
                >
                    <img src={addFaqIcon} alt="plus" className="w-4 h-4" />
                    Add New FAQ
                </button>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
                {faqData?.map((faq: any) => (
                    <div
                        key={faq.id}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md group relative"
                    >
                        {/* Left Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                            <img src={faqBubbleIcon} alt="faq" className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-grow pt-1 pr-12">
                            <h3 className="text-base font-bold text-[#1E293B] mb-2">
                                {faq.question}
                            </h3>
                            <p className="text-sm text-[#64748B] leading-relaxed m-0">
                                {faq.answer}
                            </p>
                        </div>

                        {/* Right Icon Button */}
                        <Popover
                            content={actionContent(faq)}
                            trigger="click"
                            placement="bottomRight"
                            overlayClassName="faq-action-popover"
                            arrow={false}
                        >
                            <button className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <img src={faqrightIcon} alt="more" className="w-4 h-4" />
                            </button>
                        </Popover>
                    </div>
                ))}
            </div>

            <AddFaqModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            <UpdateFaqModal
                isOpen={isUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                onSave={handleUpdateFaq}
                initialData={selectedFaq || undefined}
            />

            <style>{`
                .faq-action-popover .ant-popover-inner {
                    padding: 4px !important;
                    border-radius: 12px !important;
                    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.1) !important;
                    border: 1px solid #F1F5F9 !important;
                }
            `}</style>
        </div>
    );
}
