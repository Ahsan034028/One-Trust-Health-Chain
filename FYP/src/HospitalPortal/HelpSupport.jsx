import React, { useState } from 'react';
import { ChevronDownIcon, XMarkIcon, Squares2X2Icon, PlusIcon, BuildingLibraryIcon, ChartBarIcon, QuestionMarkCircleIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import HospitalSidebar from './HospitalSidebar';

export default function HelpSupport() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I add a new hospital to the system?',
      answer: 'Navigate to the Add Hospital section from the sidebar. Fill in the required details including hospital name, type, address, contact information, and registration number. Upload necessary verification documents and click submit. Your hospital will be verified and added to the system.'
    },
    {
      question: 'How can I manage multiple hospitals?',
      answer: 'Go to the Manage Hospitals section from the sidebar. Here you can view all registered hospitals, edit their details, update status, and manage hospital-specific information. You can also search for specific hospitals by name or status.'
    },
    {
      question: 'How do I view hospital analytics?',
      answer: 'Click on Analytics in the sidebar to view detailed statistics and reports about your hospitals. This includes admission data, patient statistics, bed availability, and operational metrics. You can filter data by date range and hospital.'
    },
    {
      question: 'How do I update my hospital profile?',
      answer: 'Click on Profile in the sidebar. Edit hospital information such as contact details, departments, emergency availability, and admin details. Make sure to save your changes before leaving the page.'
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'On the login page, click "Forgot Password?" and enter your email address. You will receive a password reset link via email within 5 minutes.'
    },
    {
      question: 'How are hospital statistics calculated?',
      answer: 'Statistics are generated from admission records, patient interactions, bed management, and system usage patterns. Navigate to Analytics to view detailed insights about your hospital operations.'
    },
  ];

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Ahsanali034028@gmail.com',
      icon: '✉️'
    },
    {
      title: 'Phone Support',
      description: '+923462851289',
      icon: '📞'
    },
    {
      title: 'Live Chat',
      description: 'Available 24/7',
      icon: '💬'
    },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* SIDEBAR */}
      <HospitalSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col ml-64">
        {/* TOP BAR */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Help & Support</h1>
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

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto">
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
            {/* Contact Methods */}
            <div className="mb-12">
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6 text-center hover:shadow-lg transition`}
                  >
                    <div className="text-4xl mb-3">{method.icon}</div>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{method.title}</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden`}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className={`w-full flex items-center justify-between p-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition`}
                    >
                      <h3 className={`font-semibold text-left ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{faq.question}</h3>
                      <ChevronRightIcon className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'rotate-90' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    {expandedFaq === index && (
                      <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12">
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Additional Resources</h2>
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
                <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center gap-3">
                    <ChevronRightIcon className="w-4 h-4 text-blue-600" />
                    <a href="#" className="hover:text-blue-600">User Documentation & Guides</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRightIcon className="w-4 h-4 text-blue-600" />
                    <a href="#" className="hover:text-blue-600">Video Tutorials</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRightIcon className="w-4 h-4 text-blue-600" />
                    <a href="#" className="hover:text-blue-600">Community Forum</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRightIcon className="w-4 h-4 text-blue-600" />
                    <a href="#" className="hover:text-blue-600">Report a Bug</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRightIcon className="w-4 h-4 text-blue-600" />
                    <a href="#" className="hover:text-blue-600">Feature Requests</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
