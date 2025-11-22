import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PatientSidebar from './PatientSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import { Bar, Doughnut } from 'react-chartjs-2';
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

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Report Uploaded',
      message: 'Your lab report has been uploaded successfully',
      time: '5 minutes ago',
      read: false,
      type: 'success'
    },
    {
      id: 2,
      title: 'New Prescription',
      message: 'Dr. Ahmed has prescribed new medicine for you',
      time: '1 hour ago',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Khan is tomorrow at 2:00 PM',
      time: '2 hours ago',
      read: true,
      type: 'warning'
    }
  ]);
  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const stats = [
    { label: 'No of reports uploaded', value: '19', compare: '2300 last quarter' },
    { label: 'No of Downloaded Reports', value: '15', compare: '2300 last quarter' },
  ];

  const reports = [
    { name: 'Dr. Sara Khan', hospital: 'Aga Khan University', diagnosis: 'Seasonal Allergy', prescription: 'Cetirizine 10mg', notes: 'Avoid dust exposure' },
    { name: 'Dr. Imman Ahmed', hospital: 'Indus Hospital', diagnosis: 'Knee Pain', prescription: 'Ibuprofen 400mg', notes: 'Recommended physiotherapy' },
    { name: 'Dr. Maryam Raza', hospital: 'Services Hospital', diagnosis: 'Skin rash', prescription: 'Hydrocortisone Cream', notes: 'Review in 1 week' },
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
      <PatientSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BellIcon className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  {/* Header */}
                  <div className={`px-4 py-3 border-b flex items-center justify-between ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <BellIcon className={`w-12 h-12 mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`px-4 py-3 border-b cursor-pointer transition ${
                            darkMode
                              ? `border-gray-700 hover:bg-gray-700 ${!notification.read ? 'bg-blue-900 bg-opacity-30' : ''}`
                              : `border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className={`font-medium text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                  {notification.title}
                                </h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(notification.type)}`}>
                                  {notification.type}
                                </span>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                )}
                              </div>
                              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {notification.time}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className={`transition ${darkMode ? 'text-gray-500 hover:text-red-500' : 'text-gray-400 hover:text-red-600'}`}
                            >
                              <XMarkIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className={`px-4 py-3 border-t text-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button 
                        onClick={() => navigate('/patient/notifications')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* REPORTS UPLOAD CHART */}
            <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
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

          {/* REPORTS LIST */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm transition-all`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Reports List</h3>
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
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Doctor Name</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hospital</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Diagnosis</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Prescription</th>
                    <th className={`text-left py-3 px-4 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, i) => (
                    <tr key={i} className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{report.name}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.hospital}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.diagnosis}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.prescription}</td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.notes}</td>
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
