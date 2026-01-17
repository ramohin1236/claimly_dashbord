import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useGetUserChartDataQuery } from '../../store/api/webApi';

const StackedBarChart = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: chartResponse, isLoading } = useGetUserChartDataQuery(selectedYear);

  const chartData = chartResponse?.data?.chartData || [];
  const yearsDropdown = chartResponse?.data?.yearsDropdown || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Year Dropdown */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-medium'>Users Join growth</p>
        </div>
        <div className="flex justify-end mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 font-medium"
          >
            {yearsDropdown.map((year: number) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
            {yearsDropdown.length === 0 && (
              <option value={currentYear}>{currentYear}</option>
            )}
            {!yearsDropdown.includes(Number(currentYear)) && yearsDropdown.length > 0 && (
              <option value={currentYear}>{currentYear}</option>
            )}
          </select>
        </div>
      </div>

      <div style={{ width: '100%', height: '50vh', maxHeight: '700px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="totalUser" name="Total Users" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            <RechartsDevtools />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;
