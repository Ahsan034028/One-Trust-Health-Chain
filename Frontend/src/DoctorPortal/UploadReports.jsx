import React, { useState } from 'react';
import { XMarkIcon, ChevronDownIcon, MoonIcon, SunIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import Sidebar from '../components/Sidebar';

export default function UploadReports() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const fileInputRef = React.useRef(null);
  
  const [files, setFiles] = useState([]);
  
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientWalletAddress, setPatientWalletAddress] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Sample patient data - in real app, this would come from database/API
  const patients = [
    { id: 1, name: 'Ahmed Ali', walletAddress: '0x1234567890123456789012345678901234567890' },
    { id: 2, name: 'Fatima Khan', walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' },
    { id: 3, name: 'Muhammad Hassan', walletAddress: '0x9876543210987654321098765432109876543210' },
  ];

  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    setSelectedPatient(patientId);
    const patient = patients.find(p => p.id === parseInt(patientId));
    if (patient) {
      setPatientWalletAddress(patient.walletAddress);
    }
  };

  const handleWalletAddressChange = (e) => {
    setPatientWalletAddress(e.target.value);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const newFile = {
          id: Math.max(...files.map(f => f.id), 0) + 1,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + 'KB'
        };
        setFiles(prev => [...prev, newFile]);
      }
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        const newFile = {
          id: Math.max(...files.map(f => f.id), 0) + 1,
          name: file.name,
          size: (file.size / 1024).toFixed(2) + 'KB'
        };
        setFiles(prev => [...prev, newFile]);
      }
    }
  };

  const handleDoneUpload = () => {
    // Validation
    if (!selectedPatient || !patientWalletAddress.trim()) {
      alert('Please select a patient and provide a wallet address');
      return;
    }

    if (files.length === 0) {
      alert('Please add at least one file to upload');
      return;
    }

    // Get patient name
    const patient = patients.find(p => p.id === parseInt(selectedPatient));
    const patientName = patient?.name || 'Unknown';

    // Upload simulation - log the data
    const uploadData = {
      patientName: patientName,
      patientId: selectedPatient,
      walletAddress: patientWalletAddress,
      files: files,
      timestamp: new Date().toLocaleString(),
    };

    console.log('Report Upload:', uploadData);
    
    // Set success message and show modal
    setSuccessMessage(`Successfully uploaded ${files.length} report(s) for ${patientName}`);
    setShowSuccessModal(true);

    // Reset form after showing success
    setTimeout(() => {
      setSelectedPatient('');
      setPatientWalletAddress('');
      setFiles([]);
      setShowSuccessModal(false);
      navigate('/doctor');
    }, 2500);
  };

  const handleCancel = () => {
    setSelectedPatient('');
    setPatientWalletAddress('');
    setFiles([]);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-bounce`}>
            <div className="text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                Upload Successful! ✓
              </h3>
              <p className={`text-base mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {successMessage}
              </p>

              {/* Loading Indicator */}
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-100"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-200"></div>
              </div>

              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Upload Reports</h1>
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
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl">
            {/* Modal Card */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-lg p-8 transition-colors`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Media Upload</h2>
                <button className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Add your documents here, and you can upload up to 5 files max</p>

              {/* Patient Selection Section */}
              <div className={`mb-8 p-6 rounded-xl border ${darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className={`text-base font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Select Patient</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Patient Selection */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Patient Name *</label>
                    <select
                      value={selectedPatient}
                      onChange={handlePatientChange}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-800 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                      }`}
                    >
                      <option value="">-- Select Patient --</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Wallet Address Input - Now Editable */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wallet Address</label>
                    <input
                      type="text"
                      value={patientWalletAddress}
                      onChange={handleWalletAddressChange}
                      placeholder="Paste or select patient wallet address"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.png,.svg,.zip"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-colors cursor-pointer ${
                darkMode 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-blue-400 bg-blue-50'
              }`}>
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${
                    darkMode ? 'bg-blue-900' : 'bg-blue-100'
                  }`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <p className={`font-medium mb-1 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Drag your file(s) to start uploading</p>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</p>
                <button
                  onClick={handleBrowseFiles}
                  type="button"
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  darkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  Browse files
                </button>
              </div>

              {/* File Info */}
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-6`}>Only support .jpg, .png and .svg and .zip files</p>

              {/* Files List */}
              <div className="space-y-3 mb-8">
                {files.map((file) => (
                  <div key={file.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                        darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
                      }`}>
                        <DocumentTextIcon className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{file.name}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className={`p-1 transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  type="button"
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}>
                  Cancel
                </button>
                <button
                  onClick={handleDoneUpload}
                  type="button"
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    darkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
