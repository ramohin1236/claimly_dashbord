import dashboardIcon from "../../public/Group (4).svg";
import plusIcon from "../../public/Vector (5).svg";
import editIcon from "../../public/Group (14).svg";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import AddGuideModal from "../components/guides/AddGuideModal";
import EditGuideModal from "../components/guides/EditGuideModal";

interface GuideData {
    key: string;
    sl: number;
    guidesTitle: string;
    guidesDiscrimination: string;
}

const dataSource: GuideData[] = [
    {
        key: "1",
        sl: 1,
        guidesTitle: "How insurers assess motor accident claims How insurers assess motor accident claims How insurers assess motor accident claims",
        guidesDiscrimination: "Non-disclosure refers to situations where an insurer believes relevant information was n...",
    },
    {
        key: "2",
        sl: 2,
        guidesTitle: "Repair vs write-off: how insurers usually decide",
        guidesDiscrimination: "Non-disclosure refers to situations where an insurer believes relevant information was n...",
    },
    {
        key: "3",
        sl: 3,
        guidesTitle: "What Non-Disclosure is in insurance Claims",
        guidesDiscrimination: "Non-disclosure refers to situations where an insurer believes relevant information was n...",
    },
    {
        key: "4",
        sl: 4,
        guidesTitle: "How the insurance complaints process works...",
        guidesDiscrimination: "Non-disclosure refers to situations where an insurer believes relevant information was n...",
    },
];

export default function ClaimlyGuides() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);
    const [guides, setGuides] = useState<GuideData[]>(dataSource);

    const handleAddGuide = (title: string, discrimination: string) => {
        const newGuide: GuideData = {
            key: String(guides.length + 1),
            sl: guides.length + 1,
            guidesTitle: title,
            guidesDiscrimination: discrimination,
        };
        setGuides([...guides, newGuide]);
        console.log("New Guide Added:", newGuide);
    };

    const handleEditGuide = (id: string, title: string, discrimination: string) => {
        const updatedGuides = guides.map((guide) =>
            guide.key === id
                ? { ...guide, guidesTitle: title, guidesDiscrimination: discrimination }
                : guide
        );
        setGuides(updatedGuides);
        console.log("Guide Updated:", { id, title, discrimination });
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
            dataIndex: "guidesTitle",
            key: "guidesTitle",
            render: (text: string) => (
                <span className="text-[#1E293B] text-[14px] block whitespace-normal">
                    {text}
                </span>
            ),
        },
        {
            title: "Guides Discrimination",
            dataIndex: "guidesDiscrimination",
            key: "guidesDiscrimination",
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
                        <img src={editIcon} alt="" />
                    </Button>
                    <Button
                        className="p-0 B border border-[#EF4444]! rounded-[4px] w-8 h-8 flex justify-center items-center"
                        style={{ padding: 0 }}
                    >
                        <Trash2 size={16} className="text-[#EF4444]" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
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
                onSave={handleAddGuide}
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
