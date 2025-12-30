
import dashbordIcon from "../../public/dashbordPage.svg"
import TopDash from '../components/dashboard/TopDash';
import StackedBarChart from '../components/dashboard/StackedBarChart';

export default function Dashboard() {


    return (
        <div className="space-y-6">
            <div className='flex items-center gap-2 '>
                <img src={dashbordIcon} alt="" />
                <h1 className="text-base text-[#1E293B]/80">Dashboard</h1>
            </div>


            <div>
                <TopDash />
                <StackedBarChart />
            </div>

        </div>
    );
}
