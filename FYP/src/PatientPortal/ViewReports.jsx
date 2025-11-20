import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, BellIcon, PlusIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import PatientSidebar from './PatientSidebar';
import { useDarkMode } from '../context/DarkModeContext';

export default function ViewReports() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Patient Services', 'Diagnostic Services', 'Pharmacy Services'];

  const reports = [
    { no: 994, name: 'Diabetes Management Report.pdf', type: '10 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { no: 556, name: 'Hypertension Monitoring Report.pdf', type: '11 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { no: 154, name: 'Cardiac Patient History Report.pdf', type: '10 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { no: 274, name: 'Asthma & Allergy Progress Report.pdf', type: '8 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { no: 536, name: 'Tuberculosis Treatment Report.pdf', type: '187 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { no: 556, name: 'Arthritis & Joint Pain Report.pdf', type: '123 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { no: 826, name: 'Dengue Fever Case Report.pdf', type: '89 kb', dateModified: '2023/18/16', permission: 'View Only', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  ];

  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <PatientSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col ml-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>View Reports</h1>
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

            {/* Search Bar */}
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
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                <PlusIcon className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm overflow-hidden transition-colors`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b transition-colors`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded" />
                      </div>
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>FILE NAME</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TYPE</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>LAST MODIFIED</th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>FILE PERMISSION</th>
                    <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ACTION</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredReports.map((report) => (
                    <tr key={report.no} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm`}>
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className={`px-6 py-4 text-sm`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📄</span>
                          <span className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{report.name}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.type}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.dateModified}</td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.permission}</td>
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
