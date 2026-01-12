import dashboardIcon from "../../public/Group (4).svg";
import frame3 from "../../public/Frame (3).svg";
import blkIcon from "../../public/Group (5).svg";
import unblkIcon from "../../public/unblk.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, Button, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search, ChevronDown } from "lucide-react";
import { useGetUsersQuery, useToggleBlockUserMutation } from "../store/api/userApi";
import { toast } from "sonner";

interface UserData {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: string;
    isBlocked: boolean;
    image?: string;
}

export default function ManageUsers() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [toggleBlockUser] = useToggleBlockUserMutation();

    const path = useLocation();
    const pathName = path.pathname;

    let isBlocked = undefined;
    if (statusFilter === "Inactive") isBlocked = true;
    if (statusFilter === "Active") isBlocked = false;

    const { data, isLoading } = useGetUsersQuery({
        page,
        limit,
        search: searchText,
        isBlocked
    });

    const handleBlockToggle = async (userId: string, shouldBlock: boolean) => {
        const action = shouldBlock ? "Blocking" : "Unblocking";
        const toastId = toast.loading(`${action} user...`);
        try {
            const res = await toggleBlockUser(userId).unwrap();
            if (res.success) {
                toast.success(res.message || `User ${shouldBlock ? "blocked" : "unblocked"} successfully`, { id: toastId });
            } else {
                toast.error(res.message || `Failed to ${action.toLowerCase()} user`, { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || `Failed to ${action.toLowerCase()} user`, { id: toastId });
        }
    };

    console.log("user data", data)

    const columns: ColumnsType<UserData> = [
        {
            title: "User Name",
            dataIndex: "fullName",
            key: "fullName",
            render: (fullName: string, record: UserData) => (
                <div className="flex items-center gap-2">
                    {record.image ? (
                        <img
                            src={record.image}
                            alt="user"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                            {fullName ? fullName.charAt(0) : "U"}
                        </div>
                    )}
                    <span className="text-[#333333] text-[16px]">{fullName || "N/A"}</span>
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
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => <span className="text-[14px] text-[#333333]">{text ? new Date(text).toLocaleDateString() : "N/A"}</span>
        },
        {
            title: "Status",
            dataIndex: "isBlocked",
            key: "isBlocked",
            render: (_: boolean | string, record: UserData) => {
                const isUserBlocked = record.isBlocked === true || String(record.isBlocked) === "true";
                return (
                    <span
                        className={`text-[14px] ${!isUserBlocked ? "text-[#22C55E]" : "text-[#EF4444]"
                            }`}
                    >
                        {!isUserBlocked ? "Active" : "Inactive"}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: UserData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => navigate(`/manage_users/${record._id}`)}
                        className="p-0 border-[#5D5D5D] rounded-[4px] w-8 h-8 flex justify-center items-center"
                        style={{ padding: 0 }}
                    >
                        <img src={frame3} alt="user" className="w-[18px] h-[18px]" />
                    </Button>

                    {!record.isBlocked ? (
                        <Button
                            onClick={() => handleBlockToggle(record._id, !record.isBlocked)}
                            className="p-0 border-[#EF4444] rounded-[4px] w-8 h-8 flex justify-center items-center bg-[#EF4444]/5"
                            style={{ padding: 0, borderColor: '#EF4444' }}
                        >
                            <img src={blkIcon} alt="block" className="w-[18px] h-[18px]" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleBlockToggle(record._id, !record.isBlocked)}
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

    const displayData = data?.data?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                {
                    pathName === "/manage_users" ? (
                        <div className="flex gap-2">
                           <Link to="/">
                             <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                           </Link>
                            <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Users</h1>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <h1 className="text-md text-black m-0 leading-none">Recently joined Users</h1>
                        </div>
                    )
                }

                {
                    pathName === "/manage_users" ? (
                        <div className="flex gap-4">
                            <Select
                                placeholder="Filter by Status"
                                allowClear
                                onChange={(value) => {
                                    setStatusFilter(value);
                                    setPage(1);
                                }}
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
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setPage(1);
                                }}
                                className="w-[250px] h-10 border-[#3B82F6] hover:border-[#3B82F6] focus:border-[#3B82F6] rounded-[8px]"
                            />
                        </div>
                    ) : (
                        <div>
                            <Link to="/manage_users" className="text-[#2563EB]">See all</Link>
                        </div>
                    )
                }
            </div>

            <Table
                loading={isLoading}
                dataSource={displayData}
                columns={columns}
                rowKey="_id"
                pagination={pathName === "/manage_users" ? {
                    current: page,
                    pageSize: limit,
                    total: data?.data?.meta?.total || 0,
                    onChange: (p) => setPage(p),
                    position: ["bottomCenter"],
                    showSizeChanger: false,
                } : false}
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
