import dashboardIcon from "../../public/Group (4).svg";
import plusIcon from "../../public/Vector (5).svg";
import editIcon from "../../public/Group (14).svg";
import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import AddGuideModal from "../components/guides/AddGuideModal";
import EditGuideModal from "../components/guides/EditGuideModal";
import { Link } from "react-router-dom";
import {
    useGetClaimlyGuidesQuery,
    useUpdateClaimlyGuideMutation,
    useDeleteClaimlyGuideMutation
} from "../store/api/claimlyGuidesApi";
import { toast } from "sonner";

interface GuideData {
    _id: string;
    sl: number;
    title: string;
    details: string;
}

export default function ClaimlyGuides() {
    const { data: guidesData, isLoading } = useGetClaimlyGuidesQuery<any>();
    const [updateGuide] = useUpdateClaimlyGuideMutation();
    const [deleteGuide] = useDeleteClaimlyGuideMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);

    const guides = guidesData?.data?.map((item: any, index: number) => ({
        ...item,
        key: item._id,
        sl: index + 1
    })) || [];
    console.log("guidesssssss===>>",guides);
    const handleEditGuide = async (id: string, title: string, details: string) => {
        const toastId = toast.loading("Updating guide...");
        try {
            const res = await updateGuide({ id, data: { title, details } }).unwrap();
            if (res.success) {
                toast.success(res.message || "Guide updated successfully", { id: toastId });
            } else {
                toast.error(res.message || "Failed to update guide", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update guide", { id: toastId });
        }
    };

    const handleDeleteGuide = async (id: string) => {
        const toastId = toast.loading("Deleting guide...");
        try {
            const res = await deleteGuide(id).unwrap();
            if (res.success) {
                toast.success(res.message || "Guide deleted successfully", { id: toastId });
            } else {
                toast.error(res.message || "Failed to delete guide", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete guide", { id: toastId });
        }
    };

    const handleEditClick = (guide: GuideData) => {
        setSelectedGuide(guide);
        setIsEditModalOpen(true);
    };

    const columns: ColumnsType<GuideData> = [
        {
            title: "SL",
            dataIndex: "sl",
            key: "sl",
            width: 80,
            render: (sl: number) => <span className="text-[#1E293B] text-[14px]">{sl}</span>,
        },
        {
            title: "Guides Title",
            dataIndex: "title",
            key: "title",
            render: (text: string) => (
                <span className="text-[#1E293B] text-[14px] block whitespace-normal">
                    {text}
                </span>
            ),
        },
        {
            title: "Guides Discrimination",
            dataIndex: "details",
            key: "details",
            render: (text: string) => (
                <span className="text-[#1E293B] text-[14px] block whitespace-normal">
                    {text}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_: unknown, record: GuideData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleEditClick(record)}
                        className="p-0 border-[#64748B]! rounded-[4px] w-8 h-8 flex justify-center items-center"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" />
                    </Button>
                    <Popconfirm
                        title="Delete the guide"
                        description="Are you sure to delete this guide?"
                        onConfirm={() => handleDeleteGuide(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className="p-0 border border-[#EF4444]! rounded-[4px] w-8 h-8 flex justify-center items-center"
                            style={{ padding: 0 }}
                        >
                            <Trash2 size={16} className="text-[#EF4444]" />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <Link to="/manage_claims">
                        <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    </Link>
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Claimly Guides</h1>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#2563EB] text-white! h-10 px-4 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                >
                    <img src={plusIcon} alt="plus" className="w-4 h-4" />
                    Add New Guides
                </button>
            </div>

            <Table<GuideData>
                loading={isLoading}
                dataSource={guides}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    position: ["bottomCenter"],
                    showSizeChanger: false,
                }}
                className="custom-pagination guides-table"
            />

            <style>{`
                .guides-table .ant-table-thead > tr > th {
                    background-color: #DBEAFE !important;
                    color: #1E293B;
                    font-weight: 500;
                }
                .guides-table .ant-table-tbody > tr > td {
                    white-space: normal;
                    word-wrap: break-word;
                }
            `}</style>

            {/* Add Guide Modal */}
            <AddGuideModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={() => { }}
            />

            {/* Edit Guide Modal */}
            <EditGuideModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditGuide}
                guide={selectedGuide}
            />
        </div>
    );
}
