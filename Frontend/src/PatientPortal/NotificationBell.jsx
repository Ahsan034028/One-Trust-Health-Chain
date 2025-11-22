import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '../context/DarkModeContext';

export default function NotificationBell({ notifications: initialNotifications, onNotificationsChange }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications || [
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
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    onNotificationsChange?.(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    onNotificationsChange?.(updated);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    onNotificationsChange?.(updated);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${
          darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title="Notifications"
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
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
                onClick={() => {
                  navigate('/patient/notifications');
                  setIsOpen(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
