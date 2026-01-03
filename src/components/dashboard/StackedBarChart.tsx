import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data2024 = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data2025 = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 3400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 2398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 4908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 2800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 4800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 6300,
    amt: 2100,
  },
   {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    uv: 0,
    pv: 0,
    amt: 0,
  },
  {
    name: 'Dec',
    uv: 0,
    pv: 0,
    amt: 0,
  },
];

// #endregion
const StackedBarChart = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const data = selectedYear === '2024' ? data2024 : data2025;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Year Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 font-medium"
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div style={{ width: '100%', height: '70vh', maxHeight: '700px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            <XAxis dataKey="name" />
            <YAxis width={100} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="pv" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            <RechartsDevtools />
          </BarChart>

       
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;