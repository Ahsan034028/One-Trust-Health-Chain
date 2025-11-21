import React from 'react';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const stats = [
    { label: 'PERSONNEL', value: '#250 Million' },
    { label: 'SUPPLIES', value: '#241 Million' },
    { label: 'UTILITIES', value: '#78 Million' },
  ];

  const admissionData = [
    { date: 'Sep 9, 2023', admissions: 123, discharges: 600023, status: 'Confirmed', avgStay: '3.5 days', change: '+10' },
    { date: 'Sep 10, 3033', admissions: 80, discharges: 600023, status: 'Pending', avgStay: '4.2 days', change: '+13' },
    { date: 'Sep 11, 2023', admissions: 80, discharges: 600023, status: 'Declined', avgStay: '3.8 days', change: '-7' },
    { date: 'Sep 12, 2023', admissions: 78, discharges: 600023, status: 'Confirmed', avgStay: '4.0 days', change: '+10' },
    { date: 'Sep 13, 2023', admissions: 83, discharges: 600023, status: 'Declined', avgStay: '3.8 days', change: '-7' },
    { date: 'Sep 14, 2023', admissions: 79, discharges: 600023, status: 'Pending', avgStay: '4.2 days', change: '+13' },
    { date: 'Sep 12, 2023', admissions: 80, discharges: 600023, status: 'Confirmed', avgStay: '4.0 days', change: '+10' },
  ];

  const statisticsData = {
    labels: ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE'],
    datasets: [
      {
        label: 'In-Patient',
        data: [65, 55, 100, 70, 85, 75],
        backgroundColor: '#2147d9',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Out-Patient',
        data: [40, 50, 30, 55, 45, 50],
        backgroundColor: '#cfe0ff',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: darkMode ? '#d1d5db' : '#6b7280',
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
      }
    },
    scales: {
      y: {
        display: true,
        grid: {
          color: darkMode ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        }
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        }
      }
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col ml-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Analytics</h1>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <button 
              onClick={() => toggleDarkMode()}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Statistics Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Statistics to date</span>
              <span className="text-orange-500 text-sm">📅 April 2023</span>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
                  <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Statistics Chart */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Statistics</h3>
              <div className="h-64">
                <Bar data={statisticsData} options={chartOptions} />
              </div>
            </div>

            {/* Demographics Chart */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Patient Demographics</h3>
                <button className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>⋮</button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age 18-30</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>35%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-2 rounded-full bg-blue-600" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age 30-50</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>45%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-2 rounded-full bg-blue-400" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age 50+</span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>20%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-2 rounded-full bg-blue-300" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Table */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm overflow-hidden`}>
            <div className="p-6 border-b" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
              <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Admission and Discharge Rates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DATE</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TOTAL ADMISSIONS</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TOTAL DISCHARGES</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>STATUS</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AVERAGE LENGTH OF STAY</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NET ADMISSION CHANGE</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {admissionData.map((item, i) => (
                    <tr key={i} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.date}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.admissions}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.discharges}</td>
                      <td className={`px-6 py-4 text-sm`}>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Confirmed'
                            ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                            : item.status === 'Pending'
                            ? darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                            : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            item.status === 'Confirmed' ? 'bg-green-500' : item.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></span>
                          {item.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.avgStay}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
