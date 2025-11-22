import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import PatientSidebar from './PatientSidebar';
import { useDarkMode } from '../context/DarkModeContext';

export default function AllNotifications() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Report Uploaded',
      message: 'Your lab report has been uploaded successfully',
      time: '5 minutes ago',
      read: false,
      type: 'success',
      description: 'Blood test report from Aga Khan University Hospital has been successfully uploaded to your profile.'
    },
    {
      id: 2,
      title: 'New Prescription',
      message: 'Dr. Ahmed has prescribed new medicine for you',
      time: '1 hour ago',
      read: false,
      type: 'info',
      description: 'Dr. Imman Ahmed has prescribed Aspirin 500mg for your treatment. Please review and confirm.'
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Khan is tomorrow at 2:00 PM',
      time: '2 hours ago',
      read: true,
      type: 'warning',
      description: 'You have a scheduled appointment with Dr. Maryam Khan tomorrow (Nov 22) at 2:00 PM at Indus Hospital.'
    },
    {
      id: 4,
      title: 'Health Update',
      message: 'Your health metrics show improvement',
      time: '1 day ago',
      read: true,
      type: 'success',
      description: 'Your latest health check shows significant improvement in blood pressure levels.'
    },
    {
      id: 5,
      title: 'Medication Reminder',
      message: 'Time to refill your prescription',
      time: '2 days ago',
      read: true,
      type: 'warning',
      description: 'Your Metformin prescription is expiring soon. Please visit your doctor to get it refilled.'
    },
    {
      id: 6,
      title: 'Lab Results Available',
      message: 'Your test results are ready for review',
      time: '3 days ago',
      read: true,
      type: 'info',
      description: 'Your cholesterol panel results from Services Hospital are now available in your records.'
    }
  ]);

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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PatientSidebar />
      
      <main className={`flex-1 md:ml-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-6 flex items-center gap-4`}>
          <button
            onClick={() => navigate('/patient')}
            className={`p-2 rounded-lg transition ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              All Notifications
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          </div>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="p-4 md:p-8">
          {notifications.length === 0 ? (
            <div className={`text-center py-12 rounded-lg border-2 border-dashed ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-100'
            }`}>
              <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No notifications
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-6 rounded-lg border-l-4 transition cursor-pointer ${
                    !notification.read
                      ? darkMode
                        ? 'bg-blue-900 bg-opacity-20 border-blue-500'
                        : 'bg-blue-50 border-blue-500'
                      : darkMode
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getTypeColor(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div>
                          <h3 className={`font-semibold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-3 w-3 rounded-full bg-blue-600 ml-auto"></div>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {notification.description || notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className={`p-2 rounded-lg transition ${
                        darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-red-500' : 'hover:bg-gray-200 text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
