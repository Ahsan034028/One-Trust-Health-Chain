import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon, BellIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import HospitalSidebar from './HospitalSidebar';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';

export default function ManageHospitals() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [hospitals, setHospitals] = useState([
    { no: 994, name: 'ISRA Hospital', type: 'Hospital', status: 'Active', dateUpdated: '10/28/12', dateCreated: '8/21/15', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { no: 556, name: 'Shifa Hospital', type: 'Hospital', status: 'Active', dateUpdated: '9/4/12', dateCreated: '11/7/16', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { no: 154, name: 'Aga Khan Hospital', type: 'Hospital', status: 'Active', dateUpdated: '9/4/12', dateCreated: '4/4/18', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { no: 274, name: 'Jinnah Hospital', type: 'Hospital', status: 'Verification Pending', dateUpdated: '8/16/13', dateCreated: '5/30/14', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { no: 536, name: 'Liaquat National', type: 'Hospital', status: 'Active', dateUpdated: '10/6/13', dateCreated: '7/18/17', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const filters = ['All', 'Active', 'Verification Pending', 'Inactive'];

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === 'All' || hospital.status === activeFilter)
  );

  const handleEdit = (hospital) => {
    setEditingId(hospital.no);
    setEditData(hospital);
  };

  const handleSave = () => {
    setHospitals(hospitals.map(h => h.no === editingId ? { ...h, ...editData } : h));
    setEditingId(null);
    alert('Hospital updated successfully!');
  };

  const handleDelete = (no) => {
    if (confirm('Are you sure you want to delete this hospital?')) {
      setHospitals(hospitals.filter(h => h.no !== no));
      alert('Hospital deleted successfully!');
    }
  };

  const handleAddNew = () => {
    alert('Redirect to Add Hospital page');
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
<<<<<<< HEAD
      <main className={`flex-1 flex flex-col w-full md:ml-64 pt-16 md:pt-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
=======
      <main className={`flex-1 flex flex-col w-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
>>>>>>> 4cb16abe25d827d6ac352ee8fe29b5c2d6076638
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Manage Hospitals</h1>
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Filter and Search Bar */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            {/* Filter Buttons */}
            <div className="flex gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search and Add Button */}
            <div className="flex gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className={`w-5 h-5 absolute left-3 top-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search Hospital"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 rounded-lg text-sm border transition-colors ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  }`}
                />
              </div>
              <button 
                onClick={handleAddNew}
                className={`px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                  darkMode
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <PlusIcon className="w-5 h-5" />
                Add Hospital
              </button>
            </div>
          </div>

          {/* Table */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm overflow-hidden transition-colors`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b transition-colors`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NO</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>HOSPITAL NAME</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>RECORD TYPE</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>STATUS</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DATE UPDATED</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DATE CREATED</th>
                    <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ACTION</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredHospitals.map((hospital) => (
                    <tr key={hospital.no} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{hospital.no}</td>
                      <td className={`px-6 py-4 text-sm`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={hospital.avatar}
                            alt={hospital.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{hospital.name}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.type}</td>
                      <td className={`px-6 py-4 text-sm`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          hospital.status === 'Active'
                            ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                            : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hospital.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.dateUpdated}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.dateCreated}</td>
                      <td className={`px-6 py-4 text-right`}>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(hospital)}
                            className={`px-3 py-1 rounded text-xs font-medium transition ${
                              darkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(hospital.no)}
                            className={`px-3 py-1 rounded text-xs font-medium transition ${
                              darkMode
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 max-w-md w-full`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Edit Hospital</h3>
            
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Hospital Name"
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                }`}
              />
              <select
                value={editData.status || ''}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:outline-none'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none'
                }`}
              >
                <option value="Active">Active</option>
                <option value="Verification Pending">Verification Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingId(null)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  darkMode
                    ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  darkMode
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
