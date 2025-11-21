import React, { useState } from 'react';
import { ChevronDownIcon, EllipsisVerticalIcon, Squares2X2Icon, DocumentArrowUpIcon, DocumentTextIcon, ChartBarIcon, QuestionMarkCircleIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import blueLogo from '../assets/Bluelogo.png';
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
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export default function Analytics() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const admissionData = [
    { date: 'Sep 9, 2023', admissions: 123, discharges: '000023', status: 'Confirmed', avgStay: '3.5 days', change: '+10' },
    { date: 'Sep 10, 2033', admissions: 80, discharges: '000023', status: 'Pending', avgStay: '4.2 days', change: '+13' },
    { date: 'Sep 11, 2023', admissions: 80, discharges: '000023', status: 'Declined', avgStay: '3.8 days', change: '-7' },
    { date: 'Sep 12, 2033', admissions: 78, discharges: '000023', status: 'Confirmed', avgStay: '4.0 days', change: '+10' },
    { date: 'Sep 13, 2023', admissions: 83, discharges: '000023', status: 'Declined', avgStay: '3.8 days', change: '-7' },
    { date: 'Sep 14, 2033', admissions: 78, discharges: '000023', status: 'Pending', avgStay: '4.2 days', change: '+13' },
    { date: 'Sep 12, 2033', admissions: 80, discharges: '000023', status: 'Confirmed', avgStay: '4.0 days', change: '+10' },
  ];

  const lineChartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Statistics',
        data: [80000, 85000, 75000, 95000, 78000, 90000, 88000, 92000, 85000, 98000, 87000, 93000],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      }
    ]
  };

  const doughnutChartData = {
    labels: ['AGE', 'LOCATION', 'GENDER'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#1e40af', '#3b82f6', '#93c5fd'],
        borderColor: darkMode ? '#1f2937' : '#f3f4f6',
        borderWidth: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: darkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return 'P' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          color: darkMode ? '#4b5563' : '#e5e7eb',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
        }
      },
      y: {
        display: true,
        grid: {
          color: darkMode ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          callback: function(value) {
            return (value / 1000) + 'k';
          }
        }
      }
    }
  };

  const doughnutOptions = {
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
        borderColor: darkMode ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '%';
          }
        }
      }
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: Squares2X2Icon, path: '/doctor' },
    { label: 'Upload Reports', icon: DocumentArrowUpIcon, path: '/doctor/upload' },
    { label: 'Health records', icon: DocumentTextIcon, path: '/doctor/records' },
    { label: 'Analytics', icon: ChartBarIcon, path: '/doctor/analytics' },
    { label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/doctor/help' },
    { label: 'Profile', icon: UserCircleIcon, path: '/doctor/profile' },
    { label: 'Settings', icon: Cog6ToothIcon, path: '/doctor/settings' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Declined':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r p-6 flex flex-col gap-8`}>
        {/* Logo */}
        <div className="flex items-center">
          <img src={blueLogo} alt="One Trust Healthchain" className="w-40 h-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                item.label === 'Analytics'
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button 
          onClick={() => navigate('/doctor-login')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
          <div className="space-y-8">
            {/* Statistics to Date */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Statistics to date</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sept 2023</span>
                  </div>
                </div>
              </div>

              {/* Line Chart */}
              <div className="h-96 mb-6">
                <Line data={lineChartData} options={chartOptions} />
              </div>

              {/* Legend and Patient Demographics */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t" style={{ borderColor: darkMode ? '#4b5563' : '#e5e7eb' }}>
                <div>
                  <div className="flex gap-6">
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>PERSONNEL</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>P300 Million</div>
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>SUPPLIES</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>P31 Million</div>
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>UTILITIES</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>P18 Million</div>
                    </div>
                  </div>
                </div>

                {/* Patient Demographics Doughnut */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Patient Demographics</h3>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>AGE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>LOCATION</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>GENDER</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-32 h-32">
                    <Doughnut data={doughnutChartData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* Admission and Discharge Rates */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Admission and Discharge Rates</h2>
                <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Table */}
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
                    {admissionData.map((row, idx) => (
                      <tr key={idx} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition`}>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{row.date}</td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{row.admissions}</td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{row.discharges}</td>
                        <td className={`px-6 py-4 text-sm`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              row.status === 'Confirmed' ? 'bg-green-600' :
                              row.status === 'Pending' ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}></span>
                            <span className={getStatusColor(row.status)}>{row.status}</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{row.avgStay}</td>
                        <td className={`px-6 py-4 text-sm font-medium ${row.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
