import React from 'react';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import Sidebar from '../components/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import blueLogo from '../assets/Bluelogo.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const stats = [
    { label: 'No of admitted patients', value: '1070', compare: '2300 last quarter' },
    { label: 'Number of Upload Reports', value: '1070', compare: '2300 last quarter' },
    { label: 'Number of staffs on duty', value: '19', compare: '2300 last quarter' },
    { label: 'No of Discharged patients', value: '2022', compare: '2300 last quarter' },
  ];

  const patients = [
    { name: 'Ola Akintola', date: '12-09-2023', room: 'UI/201', id: '02566', doctor: 'Dr Alimi James' },
    { name: 'Janet Paul', date: '12-09-2023', room: 'AC/32', id: '07634', doctor: 'Dr Rita Areogun' },
    { name: 'Areogun Joe', date: '12-09-2023', room: 'AG/45', id: '02990', doctor: 'Dr Aaron Lekan' },
  ];

  const barChartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE'],
    datasets: [
      {
        label: 'Upload',
        data: [65, 55, 100, 70, 85, 75],
        backgroundColor: '#2147d9',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Pending',
        data: [40, 50, 30, 55, 45, 50],
        backgroundColor: '#cfe0ff',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
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
    labels: ['Patient Services', 'Pharmacy Services', 'Diagnostic Services'],
    datasets: [
      {
        data: [53, 31, 16],
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
      <Sidebar />

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
            {/* REPORTS UPLOAD CHART */}
            <div className={`col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Reports Upload</h3>
              </div>
              
              <div className="h-56">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>

            {/* REPORTS STATISTICS DONUT */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Reports Statistics</h3>
              
              <div className="flex items-center justify-center h-48">
                <div className="w-40 h-40">
                  <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>53% Patient Services</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>31% Pharmacy Services</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>16% Diagnostic Services</span>
                </div>
              </div>
            </div>
          </div>

          {/* PATIENT LIST */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Patient List</h3>
              <div className={`flex gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <button className={`underline transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Weekly</button>
                <button className={`transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Monthly</button>
                <button className={`transition-colors ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-900'}`}>Quarterly</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Name</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Admission Date</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Room Number</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Patient ID</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Primary Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, i) => (
                    <tr key={i} className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{patient.name}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{patient.date}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{patient.room}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{patient.id}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{patient.doctor}</td>
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
