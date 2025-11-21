import React from 'react';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function HospitalDashboard() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const stats = [
    { label: 'Total Hospitals', value: '245', compare: '2300 total' },
    { label: 'Active Admissions', value: '8,524', compare: '9200 last quarter' },
    { label: 'Total Patients', value: '45,230', compare: '42,000 last quarter' },
    { label: 'Hospital Beds Available', value: '3,240', compare: '3,500 last quarter' },
  ];

  const hospitals = [
    { name: 'ISRA Hospital', type: 'General', patients: 1205, beds: 450, status: 'Active' },
    { name: 'Shifa Hospital', type: 'Specialized', patients: 890, beds: 320, status: 'Active' },
    { name: 'Aga Khan Hospital', type: 'Private', patients: 2340, beds: 580, status: 'Active' },
  ];

  const lineChartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Admissions',
        data: [1200, 1900, 1600, 2400, 2100, 2800, 3200, 2900, 3100, 3400, 3600, 3800],
        borderColor: '#2147d9',
        backgroundColor: 'rgba(33, 71, 217, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#2147d9',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4,
      }
    ]
  };

  const lineChartOptions = {
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

  const doughnutChartData = {
    labels: ['Active', 'Pending', 'Closed'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#2147d9', '#7FA0FF', '#CDE0FF'],
        borderColor: darkMode ? '#1f2937' : '#f6f8ff',
        borderWidth: 8,
      }
    ]
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar darkMode={darkMode} onDarkModeToggle={() => setDarkMode(!darkMode)} />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col ml-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Dashboard</h1>
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
          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:shadow-md'
                } border rounded-xl p-6 shadow-sm transition-all`}
              >
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                <p className={`text-3xl font-bold mt-3 ${darkMode ? 'text-blue-400' : 'text-gray-900'}`}>{stat.value}</p>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Compared to ({stat.compare})</p>
              </div>
            ))}
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* ADMISSIONS CHART */}
            <div className={`col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Admissions Trend</h3>
              </div>
              
              <div className="h-56">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>

            {/* HOSPITAL STATUS DONUT */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hospital Status</h3>
              
              <div className="flex items-center justify-center h-48">
                <div className="w-40 h-40">
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>60% Active</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>25% Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>15% Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* HOSPITALS LIST */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hospitals Overview</h3>
              <div className={`flex gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <button className={`underline transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Weekly</button>
                <button className={`transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Monthly</button>
                <button className={`transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Yearly</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hospital Name</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Type</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Patients</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available Beds</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hospital, i) => (
                    <tr key={i} className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{hospital.name}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.type}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.patients}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.beds}</td>
                      <td className={`py-3 px-4`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          hospital.status === 'Active'
                            ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                            : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hospital.status}
                        </span>
                      </td>
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
