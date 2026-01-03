import sidenavcollapseIcon from "../../public/Group (19).svg"
import bellIcon from "../../public/Frame (14).svg"
import userIcon from "../../public/Frame (15).svg"

interface NavbarProps {
    onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
    return (
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
            {/* Left side - Toggle */}
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer"
                >
                    <img src={sidenavcollapseIcon} alt="sidenavcollapse" className="w-5 h-5" />
                </button>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer">
                    <img src={bellIcon} alt="" />
                </button>

                <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer">
                    <img src={userIcon} alt="" />
                    <span className="font-medium text-[#2563EB]">Mojahid</span>
                </button>
            </div>
        </header>
    );
}
