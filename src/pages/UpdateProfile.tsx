import dashboardIcon from "../../public/Group (4).svg";
import save from "../../public/Group (17).svg";
import { Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetAdminProfileQuery, useUpdateAdminProfileMutation } from "../store/api/adminApi";
import { toast } from "sonner";

export default function UpdateProfile() {
    const { data, isLoading } = useGetAdminProfileQuery()
    const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateAdminProfileMutation()


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState<string>();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const firstLetter = data?.data?.fullName?.trim().charAt(0).toUpperCase();


    useEffect(() => {
        if (data?.data) {
            setName(data.data.fullName || "");
            setEmail(data.data.email || "");
            if (data.data.profile_image) {
                // Check if it's already a full URL or needs a base path
                setProfileImage(data.data.profile_image.startsWith('http')
                    ? data.data.profile_image
                    : `https://claimly-insurance-server-eight.vercel.app/${data.data.profile_image}`);
            }
        }
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("fullName", name);
        if (imageFile) {
            formData.append("profile_image", imageFile);
        }

        try {
            await updateProfile(formData).unwrap();
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-10">
                <div className="flex gap-2 ">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Update Profile </h1>
                </div>
            </div>

            {/* contenttttttt */}
            {
                isLoading ? (
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="relative w-26 h-26 flex items-center justify-center">
                                {/* Avatar */}
                                <div className="relative w-26 h-26 rounded-full border border-[#DBEAFE] p-1 overflow-hidden flex items-center justify-center bg-[#2563EB]">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="user"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <span className="text-white text-4xl font-bold select-none">
                                            {firstLetter}
                                        </span>
                                    )}
                                </div>

                                {/* Camera Icon */}
                                <label className="absolute bottom-0 right-0 bg-[#2563EB] p-2 rounded-full cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-lg">
                                    <Camera size={20} className="text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>


                            <div className="flex gap-4">
                                {/* name */}
                                <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                                    <p className="text-md text-[#1E293B] font-semibold">Name</p>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-[#64748B] text-sm border-none outline-none bg-transparent"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                {/* email */}
                                <div className="border border-[#BFDBFE] p-4 rounded-md flex flex-col gap-3 w-full">
                                    <p className="text-md text-[#1E293B] font-semibold">Email</p>
                                    <p className="text-[#64748B] text-sm">{email}</p>
                                </div>
                            </div>

                            {/* update button */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleUpdate}
                                    disabled={updateProfileLoading}
                                    className="bg-[#2563EB] h-11 px-6 text-white! py-2 rounded-lg border-none flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updateProfileLoading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <img src={save} alt="update" />
                                    )}
                                    {updateProfileLoading ? "Updating..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
