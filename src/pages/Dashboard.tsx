import { BarChart3, TrendingUp, Users } from 'lucide-react';
import dashbordIcon from "../../public/dashbordPage.svg"
import TopDash from '../components/dashboard/TopDash';

export default function Dashboard() {
    const stats = [
        { label: 'Total Claims', value: '1,234', change: '+12%', icon: BarChart3, color: 'text-blue-500' },
        { label: 'Active Users', value: '856', change: '+5%', icon: Users, color: 'text-purple-500' },
        { label: 'Revenue', value: '$45,231', change: '+23%', icon: TrendingUp, color: 'text-green-500' },
    ];

    return (
        <div className="space-y-6">
            <div className='flex items-center gap-2 '>
                <img src={dashbordIcon} alt="" />
                <h1 className="text-base text-[#1E293B]/80">Dashboard</h1>
            </div>

            
            <div>
                <TopDash/>
            </div>
           
        </div>
    );
}
