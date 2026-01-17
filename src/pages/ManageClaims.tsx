import dashboardIcon from "../../public/Group (4).svg";
import frame3 from "../../public/Vector (3).svg";

import { useState } from "react";
import { Table, Button, Select, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChevronDown, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeleteInsurerMutation, useGetInsurerClaimsQuery } from "../store/api/insurerApi";
import dayjs from "dayjs";
import { toast } from "sonner";

interface ClaimData {
    _id: string;
    key: string;
    fullName: string;
    email: string;
    profile_image: string;
    insurerName: string;
    policyType: string;
    submittedOn: string;
    status: "UNDER_REVIEW" | "REPORT_READY" | "FAILED";
}

export default function ManageClaims() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const limit = 10;

    const [deleteInsurer] = useDeleteInsurerMutation();
    const { data: claimsData, isLoading } = useGetInsurerClaimsQuery<any>({
        page,
        limit,
        status: statusFilter,
    });

    console.log("first", claimsData)
    const claims = claimsData?.data?.data?.map((item: any) => ({
        ...item,
        key: item._id,
        fullName: item.normalUserId?.fullName || "N/A",
        email: item.normalUserId?.email || "N/A",
        profile_image: item.normalUserId?.profile_image,
        submittedOn: dayjs(item.createdAt).format("MMM DD, YYYY"),
    })) || [];

      const handleDeleteGuide = async (id: string) => {
        const toastId = toast.loading("Deleting guide...");
        try {
            const res = await deleteInsurer(id).unwrap();
            if (res.success) {
                toast.success(res.message || "Guide deleted successfully", { id: toastId });
            } else {
                toast.error(res.message || "Failed to delete guide", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete guide", { id: toastId });
        }
    };

    const columns: ColumnsType<ClaimData> = [
        {
            title: "User Info",
            key: "userInfo",
            render: (_: unknown, record: any) => {
                const apiBaseUrl = 'https://claimly-insurance-server-eight.vercel.app/api/v1';
                const domain = new URL(apiBaseUrl).origin;

                const imageUrl = record.profile_image
                    ? `${domain}/${record.profile_image.replace(/\\/g, '/')}`
                    : null;

                return (
                    <div className="flex items-center gap-2">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB] font-semibold text-base">
                                {record.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-[#333333] text-[16px] font-medium">{record.fullName}</span>
                            <span className="text-[#64748B] text-[14px]">{record.email}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Insured With",
            dataIndex: "insurerName",
            key: "insurerName",
            render: (text: string) => <span className="text-[14px] text-[#1E293B]">{text || "N/A"}</span>,
        },
        {
            title: "Policy Type",
            dataIndex: "policyType",
            key: "policyType",
            render: (text: string) => <span className="text-[14px] text-[#1E293B]">{text || "N/A"}</span>,
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
            render: (status: string) => {
                let color = "#F59E0B";
                let label = "Under Review";

                if (status === "REPORT_READY") {
                    color = "#22C55E";
                    label = "Report Ready";
                } else if (status === "FAILED") {
                    color = "#F43F5E";
                    label = "Failed";
                }

                return (
                    <span className="text-[14px]" style={{ color }}>
                        {label}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: ClaimData) => (
                <div className="flex items-center gap-2">
                    <Link to={`/manage_claims/${record._id}`}>
                        <Button
                            className="p-0 border-none rounded-[4px] w-8 h-8 flex justify-center items-center"
                            style={{ padding: 0 }}
                        >
                            <img src={frame3} alt="view" className="w-[18px] h-[18px]" />
                        </Button>
                    </Link>
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
                    <Link to="/manage_users">
                        <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    </Link>
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Manage Claims</h1>
                </div>
                <div className="flex gap-4">
                    <Select
                        placeholder="Filter by Status"
                        allowClear
                        onChange={(value) => setStatusFilter(value)}
                        className="w-[200px] h-10 custom-select"
                        suffixIcon={<ChevronDown className="text-[#3B82F6] w-4 h-4" />}
                        defaultValue={undefined}
                    >
                        <Select.Option value="UNDER_REVIEW">Under Review</Select.Option>
                        <Select.Option value="REPORT_READY">Report Ready</Select.Option>
                        <Select.Option value="FAILED">Failed</Select.Option>
                    </Select>
                </div>
            </div>

            <Table<ClaimData>
                loading={isLoading}
                dataSource={claims}
                columns={columns}
                rowKey="_id"
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: claimsData?.data?.meta?.total || 0,
                    onChange: (p) => setPage(p),
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
