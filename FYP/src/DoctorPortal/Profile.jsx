import React, { useState } from 'react';
import { ChevronDownIcon, XMarkIcon, Squares2X2Icon, DocumentArrowUpIcon, DocumentTextIcon, ChartBarIcon, QuestionMarkCircleIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import blueLogo from '../assets/Bluelogo.png';

export default function Profile() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});

  const [profileData, setProfileData] = useState({
    name: 'Nadiyaa Yaqoob',
    email: 'nadiyaa@gmail.com',
    specialization: 'Cardiologist',
    qualification: 'Add',
    contact: 'Add',
    license: 'Add',
    hospital: 'Add',
    consultationHours: 'Add',
    languages: 'Add',
    prescriptions: 'Add',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: Squares2X2Icon, path: '/doctor' },
    { label: 'Upload Reports', icon: DocumentArrowUpIcon, path: '/doctor/upload' },
    { label: 'Health records', icon: DocumentTextIcon, path: '/doctor/records' },
    { label: 'Analytics', icon: ChartBarIcon, path: '/doctor/analytics' },
    { label: 'Help & Support', icon: QuestionMarkCircleIcon, path: '/doctor/help' },
    { label: 'Profile', icon: UserCircleIcon, path: '/doctor/profile' },
    { label: 'Settings', icon: Cog6ToothIcon, path: '/doctor/settings' },
  ];

  const profileFields = [
    { label: 'Name', key: 'name', value: profileData.name },
    { label: 'Specialization', key: 'specialization', value: profileData.specialization },
    { label: 'Qualification & Experience', key: 'qualification', value: profileData.qualification },
    { label: 'Contact', key: 'contact', value: profileData.contact },
    { label: 'License / Registration ID', key: 'license', value: profileData.license },
    { label: 'Hospital/Clinic affiliation', key: 'hospital', value: profileData.hospital },
    { label: 'Consultation hours / availability', key: 'consultationHours', value: profileData.consultationHours },
    { label: 'Languages spoken', key: 'languages', value: profileData.languages },
    { label: 'Uploaded prescriptions / patient history', key: 'prescriptions', value: profileData.prescriptions },
  ];

  const rightSideItems = [
    { label: 'Current patients / active cases overview', action: 'View', key: 'currentPatients', type: 'view' },
    { label: 'Ratings / Feedback', action: 'View', key: 'ratings', type: 'view' },
    { label: 'Update profile', action: 'Update', key: 'profile', type: 'update' },
    { label: 'Change password / security settings', action: 'Update', key: 'password', type: 'update' },
    { label: 'Notification preferences', action: 'Set', key: 'notifications', type: 'set' },
  ];

  const handleEditField = (field) => {
    setEditingField(field.key);
    // Start with empty string if field value is 'Add', otherwise use current value
    setTempValue(field.value === 'Add' ? '' : field.value);
  };

  const handleSaveField = (key) => {
    if (tempValue.trim()) {
      setProfileData(prev => ({
        ...prev,
        [key]: tempValue
      }));
    }
    setEditingField(null);
    setTempValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const openModal = (type, key) => {
    setModalType(type);
    setModalData({ key });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalData({});
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full mx-4 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {modalType === 'view' && 'View Details'}
              {modalType === 'update' && 'Update Information'}
              {modalType === 'set' && 'Set Preferences'}
            </h3>
            <button onClick={closeModal} className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {modalType === 'view' && (
            <div className="space-y-4">
              {modalData.key === 'currentPatients' ? (
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Active Patients</h4>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg space-y-2`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>• Patient 1: John Doe (Admitted: 12-09-2023)</p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>• Patient 2: Janet Paul (Admitted: 12-09-2023)</p>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>• Patient 3: Areogun Joe (Admitted: 12-09-2023)</p>
                  </div>
                  <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Active Cases: 3</p>
                </div>
              ) : (
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Ratings & Feedback</h4>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg space-y-3`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>★★★★★</span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>4.8/5.0</span>
                    </div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Based on 127 patient reviews</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>"Excellent doctor with great communication skills"</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {modalType === 'update' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {modalData.key === 'profile' ? 'Update Profile Information' : 'New Password'}
                </label>
                <input
                  type={modalData.key === 'password' ? 'password' : 'text'}
                  placeholder={modalData.key === 'profile' ? 'Enter new information' : 'Enter new password'}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {modalData.key === 'password' ? 'Confirm Password' : 'Additional Details'}
                </label>
                <input
                  type={modalData.key === 'password' ? 'password' : 'text'}
                  placeholder={modalData.key === 'password' ? 'Confirm password' : 'Optional details'}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          )}

          {modalType === 'set' && (
            <div className="space-y-4">
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Notification Preferences</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Email notifications for new patients</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Push notifications for urgent cases</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Weekly summary reports</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Appointment reminders</span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={closeModal}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={closeModal}
              className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {modalType === 'view' ? 'Close' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 max-w-md w-full mx-4 shadow-lg text-center`}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Success!
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your profile changes have been saved successfully.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full px-4 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    );
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
                item.label === 'Profile'
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
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Profile</h1>
          <div className="flex items-center gap-4">
            <button className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <BellIcon className="w-5 h-5" />
            </button>
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
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {profileData.name}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Profile Fields */}
            <div className="col-span-2">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-sm`}>
                <div className="space-y-6">
                  {profileFields.map((field, idx) => (
                    <div key={idx} className={`flex items-center justify-between pb-6 ${idx < profileFields.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}>
                      {editingField === field.key ? (
                        <div className="flex-1 flex items-center gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              autoFocus
                              className={`w-full px-3 py-2 rounded-lg border ${
                                darkMode
                                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                                  : 'bg-gray-50 border-gray-300 text-gray-900'
                              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                          </div>
                          <button
                            onClick={() => handleSaveField(field.key)}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${
                              darkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {field.label}
                            </label>
                            <p className={`text-lg font-medium mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {field.value}
                            </p>
                          </div>
                          <button
                            onClick={() => handleEditField(field)}
                            className={`text-sm font-medium ${
                              field.value === 'Add' 
                                ? 'text-gray-500 hover:text-gray-700' 
                                : darkMode 
                                ? 'text-blue-400 hover:text-blue-300' 
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            {field.value === 'Add' ? 'Add' : 'Edit'}
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Save Change Button */}
                <button 
                  onClick={() => setShowSuccessModal(true)}
                  className="mt-8 bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Save Change
                </button>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="col-span-1">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-sm`}>
                <div className="space-y-4">
                  {rightSideItems.map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between py-4 ${idx < rightSideItems.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.label}
                      </p>
                      <button
                        onClick={() => openModal(item.type, item.key)}
                        className={`text-sm font-medium ${
                          darkMode 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {renderModal()}
      {renderSuccessModal()}
    </div>
  );
}
