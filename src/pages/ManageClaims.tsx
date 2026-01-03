import dashboardIcon from "../../public/Group (4).svg";
import userIcon from "../../public/Ellipse 2033.svg";
import frame3 from "../../public/Vector (3).svg";

import { useState } from "react";
import { Table, Button, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface ClaimData {
    key: string;
    username: string;
    email: string;
    insuredWith: string;
    policyType: string;
    submittedOn: string;
    status: "Under Review" | "Report Ready" | "Failed";
}

const dataSource: ClaimData[] = [
    {
        key: "1",
        username: "Ayesha Rahman",
        email: "rafiul.dev@gmail.com",
        insuredWith: "NRMA",
        policyType: "Comprehensive",
        submittedOn: "Jul 16, 2025",
        status: "Under Review",
    },
    {
        key: "2",
        username: "Chris Brown",
        email: "kamrul.tech@gmail.com",
        insuredWith: "AAMI",
        policyType: "Third Party Fire &...",
        submittedOn: "Jul 16, 2025",
        status: "Under Review",
    },
    {
        key: "3",
        username: "Linda Perez",
        email: "fahim.tech@gmail.com",
        insuredWith: "RACQ",
        policyType: "Comprehensive Ba...",
        submittedOn: "Jul 16, 2025",
        status: "Under Review",
    },
    {
        key: "4",
        username: "Emily Carter",
        email: "noman.bd@gmail.com",
        insuredWith: "AAMI",
        policyType: "Comprehensive",
        submittedOn: "Jul 16, 2025",
        status: "Under Review",
    },
    {
        key: "5",
        username: "Sophia White",
        email: "arif.design@gmail.com",
        insuredWith: "Suncorp",
        policyType: "Third Party Fire &...",
        submittedOn: "Jul 16, 2025",
        status: "Under Review",
    },
    {
        key: "6",
        username: "Olivia Martinez",
        email: "nahid.dev@gmail.com",
        insuredWith: "Allianz",
        policyType: "Comprehensive Ba...",
        submittedOn: "Jul 16, 2025",
        status: "Report Ready",
    },
    {
        key: "7",
        username: "Robert Davis",
        email: "rakib.dev@gmail.com",
        insuredWith: "Allianz",
        policyType: "Comprehensive",
        submittedOn: "Jul 16, 2025",
        status: "Report Ready",
    },
    {
        key: "8",
        username: "Sophia White",
        email: "mahmud.ui@gmail.com",
        insuredWith: "Budget Direct",
        policyType: "Comprehensive Ba...",
        submittedOn: "Jul 16, 2025",
        status: "Report Ready",
    },
    {
        key: "9",
        username: "Karen Thompson",
        email: "riyad.ui@gmail.com",
        insuredWith: "Suncorp",
        policyType: "Third Party Fire &...",
        submittedOn: "Jul 16, 2025",
        status: "Report Ready",
    },
    {
        key: "10",
        username: "Anthony Clark",
        email: "rafiul.dev@gmail.com",
        insuredWith: "Suncorp",
        policyType: "Third Party Proper...",
        submittedOn: "Jul 16, 2025",
        status: "Failed",
    },
    {
        key: "11",
        username: "Thomas Baker",
        email: "sakib.cse@gmail.com",
        insuredWith: "Budget Direct",
        policyType: "Comprehensive Pl...",
        submittedOn: "Jul 16, 2025",
        status: "Failed",
    },
    ...Array.from({ length: 4 }, (_, i) => ({
        key: `${i + 12}`,
        username: i % 2 === 0 ? "Ayesha Rahman" : "John Doe",
        email: i % 2 === 0 ? "william.davis05@gmail.com" : "john.doe@gmail.com",
        insuredWith: "NRMA",
        policyType: "Comprehensive",
        submittedOn: "Jul 16, 2025",
        status: (i % 3 === 0 ? "Failed" : "Under Review") as ClaimData["status"],
    })),
];

export default function ManageClaims() {
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const columns: ColumnsType<ClaimData> = [
        {
            title: "User Info",
            dataIndex: "username",
            key: "username",
            render: (username: string, record: ClaimData) => (
                <div className="flex items-center gap-2">
                    <img
                        src={userIcon}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-[#333333] text-[16px] font-medium">{username}</span>
                        <span className="text-[#64748B] text-[14px]">{record.email}</span>
                    </div>
                </div>
            ),
        },
        {
            title: "Insured With",
            dataIndex: "insuredWith",
            key: "insuredWith",
            render: (text: string) => <span className="text-[14px] text-[#1E293B]">{text}</span>,
        },
        {
            title: "Policy Type",
            dataIndex: "policyType",
            key: "policyType",
            render: (text: string) => <span className="text-[14px] text-[#1E293B]">{text}</span>,
        },
        {
            title: "Submitted On",
            dataIndex: "submittedOn",
            key: "submittedOn",
            render: (text: string) => <span className="text-[14px] text-[#1E293B]">{text}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: ClaimData["status"]) => (
                <span
                    className={`text-[14px] ${status === "Under Review"
                        ? "text-[#F59E0B] "
                        : status === "Report Ready"
                            ? "text-[#22C55E]"
                            : "text-[#F43F5E]"
                        }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <div className="flex items-center gap-2">
                    <Link to={`/manage_claims/:id`}>
                        <Button

                            className="p-0 border-[#5D5D5D] rounded-[4px] w-8 h-8 flex justify-center items-center"
                            style={{ padding: 0 }}
                        >
                            <img src={frame3} alt="view" className="w-[18px] h-[18px]" />
                        </Button>
                    </Link>

                </div>
            ),
        },
    ];

    const filteredData = dataSource.filter((item) => {
        const matchesStatus = statusFilter ? item.status === statusFilter : true;
        return matchesStatus;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Claims</h1>
                </div>
                <div className="flex gap-4">
                    <Select
                        placeholder="Filter by Status"
                        allowClear
                        onChange={(value) => setStatusFilter(value)}
                        className="w-[200px] h-10 custom-select"
                        suffixIcon={<ChevronDown className="text-[#3B82F6] w-4 h-4" />}
                        defaultValue={null}
                    >
                        <Select.Option value={null}>All</Select.Option>
                        <Select.Option value="Under Review">Under Review</Select.Option>
                        <Select.Option value="Report Ready">Report Ready</Select.Option>
                        <Select.Option value="Failed">Failed</Select.Option>
                    </Select>
                </div>
            </div>

            <Table<ClaimData>
                dataSource={filteredData}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    position: ["bottomCenter"],
                    showSizeChanger: false,
                }}
                className="custom-pagination guides-table"
            />
            <style>{`
                .custom-select .ant-select-selector {
                    border-color: #3B82F6 !important;
                    border-radius: 8px !important;
                    height: 40px !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .custom-select .ant-select-selection-placeholder {
                    color: #98A2B3 !important;
                }
            `}</style>
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
        </div>
    );
}
