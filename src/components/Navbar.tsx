import { Bell, PanelLeft, User } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Left side - Toggle */}
            <div className="flex items-center">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200">
                    <PanelLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200">
                    <Bell className="w-5 h-5" />
                </button>

                <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-200">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Mojahid</span>
                </button>
            </div>
        </header>
    );
}
