import dashboardIcon from "../../public/Group (4).svg";
import useIcon from "../../public/Frame (13).svg";
import save from "../../public/Group (17).svg";
import { Camera } from "lucide-react";
import { useState } from "react";


export default function UpdateProfile() {
    const [name, setName] = useState("Mojahid Islam");
    const [email] = useState("mojahidislam@gmail.com");
    const [profileImage, setProfileImage] = useState<string>(useIcon);
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const handleUpdate = () => {
        console.log("Updated Name:", name);
        console.log("Updated Email:", email);
        if (imageFile) {
            console.log("Updated Image:", imageFile);
        }
        // Here you can add API call to update profile
        alert("Profile updated successfully!");
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
            <div>
                <div className="flex flex-col gap-4">
                    <div className="w-26 h-26 flex items-center justify-center relative">
                        <div className="relative border border-[#DBEAFE] p-1 w-26 h-26 rounded-full overflow-hidden">
                            <img src={profileImage} alt="use" className="object-cover w-full h-full" />
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

                    {/* update button and password update button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleUpdate}
                            className="bg-[#2563EB] h-11 px-6 text-white! py-2 rounded-lg border-none flex items-center gap-2 text-sm font-medium"
                        >
                            <img src={save} alt="update" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
