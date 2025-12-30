import { BarChart3, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Claims', value: '1,234', change: '+12%', icon: BarChart3, color: 'text-blue-500' },
        { label: 'Active Users', value: '856', change: '+5%', icon: Users, color: 'text-purple-500' },
        { label: 'Revenue', value: '$45,231', change: '+23%', icon: TrendingUp, color: 'text-green-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-2 bg-slate-50 rounded-lg ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 font-medium">{stat.change}</span>
                            <span className="text-slate-400 ml-2">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
                <div className="flex items-center justify-center h-full text-slate-400">
                    Chart Placeholder
                </div>
            </div>
        </div>
    );
}
