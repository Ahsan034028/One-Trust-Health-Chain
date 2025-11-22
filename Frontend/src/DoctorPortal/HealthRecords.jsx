import React, { useState } from 'react';
import { XMarkIcon, DocumentTextIcon, ChevronDownIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import Sidebar from '../components/Sidebar';

export default function HealthRecords() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Patient Services', 'Diagnostic Services', 'Pharmacy Services'];

  const records = [
    { no: 994, name: 'Wade Warren', type: 'Patient', status: 'Submitted', updated: '10/28/12', created: '8/21/15', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { no: 556, name: 'Aremu Femi', type: 'Patient', status: 'Revised', updated: '9/4/12', created: '11/7/16', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { no: 154, name: 'Cody Fisher', type: 'Patient', status: 'Submitted', updated: '9/4/12', created: '4/4/18', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { no: 274, name: 'Eleanor Pena', type: 'Patient', status: 'Submitted', updated: '8/16/13', created: '5/30/14', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { no: 536, name: 'Bessie Cooper', type: 'Patient', status: 'Revised', updated: '10/6/13', created: '7/18/17', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { no: 556, name: 'Kristin Watson', type: 'Patient', status: 'Revised', updated: '5/19/12', created: '7/27/13', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { no: 826, name: 'Aremu Femi', type: 'Patient', status: 'Submitted', updated: '4/21/12', created: '9/23/16', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { no: 185, name: 'Jane Cooper', type: 'Patient', status: 'Revised', updated: '2/11/12', created: '6/21/19', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { no: 556, name: 'Kristin Watson', type: 'Patient', status: 'Revised', updated: '2/11/12', created: '12/4/17', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { no: 536, name: 'Albert Flores', type: 'Patient', status: 'Submitted', updated: '7/27/13', created: '3/4/16', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  const filteredRecords = records.filter(record => 
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-screen h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 md:ml-64 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Health records</h1>
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
                  placeholder="Search records"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 rounded-lg text-sm border transition-colors ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none'
                  }`}
                />
              </div>
              <button className={`px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                darkMode
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                <PlusIcon className="w-5 h-5" />
                Add records
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
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>FULL-NAME</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>RECORD TYPE</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>STATUS</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DATE UPDATED</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DATE CREATED</th>
                    <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ACTION</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredRecords.map((record) => (
                    <tr key={record.no} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{record.no}</td>
                      <td className={`px-6 py-4 text-sm`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={record.avatar}
                            alt={record.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{record.name}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{record.type}</td>
                      <td className={`px-6 py-4 text-sm`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === 'Submitted'
                            ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                            : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{record.updated}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{record.created}</td>
                      <td className={`px-6 py-4 text-right`}>
                        <button className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}>
                          •••
                        </button>
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
