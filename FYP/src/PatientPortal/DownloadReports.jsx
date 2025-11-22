import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, BellIcon, MoonIcon, SunIcon, PlusIcon } from '@heroicons/react/24/outline';
import PatientSidebar from './PatientSidebar';
import NotificationBell from './NotificationBell';
import { useDarkMode } from '../context/DarkModeContext';

export default function DownloadReports() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Patient Services', 'Diagnostic Services', 'Pharmacy Services'];

  const reports = [
    { no: 1, name: 'Diabetes Management Report.pdf', size: '10 kb', dateModified: '2023/18/16' },
    { no: 2, name: 'Hypertension Monitoring Report.pdf', size: '11 kb', dateModified: '2023/18/16' },
    { no: 3, name: 'Cardiac Patient History Report.pdf', size: '10 kb', dateModified: '2023/18/16' },
    { no: 4, name: 'Asthma & Allergy Progress Report.pdf', size: '8 kb', dateModified: '2023/18/16' },
    { no: 5, name: 'Tuberculosis Treatment Report.pdf', size: '187 kb', dateModified: '2023/18/16' },
    { no: 6, name: 'Arthritis & Joint Pain Report.pdf', size: '123 kb', dateModified: '2023/18/16' },
    { no: 7, name: 'Dengue Fever Case Report.pdf', size: '89 kb', dateModified: '2023/18/16' },
  ];

  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (name) => {
    alert(`Downloading: ${name}`);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <PatientSidebar />

      {/* MAIN CONTENT */}
      <main className={`flex-1 flex flex-col w-full md:ml-64 pt-16 md:pt-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Download Reports</h1>
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
                      <button className="flex items-center gap-2">
                        FILE NAME <span>⇅</span>
                      </button>
                    </th>
                    <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <button className="flex items-center gap-2">
                        LAST MODIFIED <span>⇅</span>
                      </button>
                    </th>
                    <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      DOWNLOADED FILES
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredReports.map((report) => (
                    <tr key={report.no} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📄</span>
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{report.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{report.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.dateModified}</td>
                      <td className={`px-6 py-4 text-right`}>
                        <button
                          onClick={() => handleDownload(report.name)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            darkMode
                              ? 'text-blue-400 hover:text-blue-300'
                              : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          Download
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
