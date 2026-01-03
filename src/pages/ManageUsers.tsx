import dashboardIcon from "../../public/Group (4).svg";
import userIcon from "../../public/Ellipse 2033.svg";
import frame3 from "../../public/Frame (3).svg";
import blkIcon from "../../public/Group (5).svg";
import unblkIcon from "../../public/unblk.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search, ChevronDown } from "lucide-react";

interface UserData {
    key: string;
    username: string;
    email: string;
    phone: string;
    joinedOn: string;
    status: "Active" | "Inactive";
}

const dataSource: UserData[] = [

    ...Array.from({ length: 15 }, (_, i) => ({
        key: `${i + 3}`,
        username: i % 2 === 0 ? "Ayesha Rahman" : "John Doe",
        email: i % 2 === 0 ? "william.davis05@gmail.com" : "john.doe@gmail.com",
        phone: "+1 919-555-0284",
        joinedOn: "Jul 16, 2025",
        status: i % 3 === 0 ? ("Inactive" as const) : ("Active" as const),
    })),
];

export default function ManageUsers() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const columns: ColumnsType<UserData> = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
            render: (username: string) => (
                <div className="flex items-center gap-2">
                    <img
                        src={userIcon}
                        alt="user"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[#333333] text-[16px]">{username}</span>
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text: string) => <span className="text-[14px] text-[#333333]">{text}</span>
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (text: string) => <span className="text-[14px] text-[#333333]">{text}</span>
        },
        {
            title: "Joined On",
            dataIndex: "joinedOn",
            key: "joinedOn",
            render: (text: string) => <span className="text-[14px] text-[#333333]">{text}</span>
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: UserData["status"]) => (
                <span
                    className={`text-[14px] ${status === "Active" ? "text-[#22C55E]" : "text-[#EF4444]"
                        }`}
                >
                    {status === "Active" ? "Active" : "Blocked"}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: UserData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => navigate(`/manage_users/${record.key}`)}
                        className="p-0 border-[#5D5D5D] rounded-[4px] w-8 h-8 flex justify-center items-center"
                        style={{ padding: 0 }}
                    >
                        <img src={frame3} alt="user" className="w-[18px] h-[18px]" />
                    </Button>

                    {record.status === "Active" ? (
                        <Button
                            onClick={() => alert(`Blocking user: ${record.username}`)}
                            className="p-0 border-[#EF4444] rounded-[4px] w-8 h-8 flex justify-center items-center bg-[#EF4444]/5"
                            style={{ padding: 0, borderColor: '#EF4444' }}
                        >
                            <img src={blkIcon} alt="block" className="w-[18px] h-[18px]" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => alert(`Activating user: ${record.username}`)}
                            className="p-0 border-[#22C55E] rounded-[4px] w-8 h-8 flex justify-center items-center bg-[#22C55E]/5"
                            style={{ padding: 0, borderColor: '#22C55E' }}
                        >
                            <img src={unblkIcon} alt="unblock" className="w-[18px] h-[18px]" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];
    const filteredData = dataSource.filter((item) => {
        const matchesSearch = item.username.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter ? item.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Users</h1>
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
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Blocked</Select.Option>
                    </Select>
                    <Input
                        placeholder="Search By Name"
                        prefix={<Search className="text-[#98A2B3] w-4 h-4" />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-[250px] h-10 border-[#3B82F6] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-[8px]"
                    />
                </div>
            </div>

            <Table<UserData>
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
