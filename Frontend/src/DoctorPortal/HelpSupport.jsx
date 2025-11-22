import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import NotificationBell from '../PatientPortal/NotificationBell';
import Sidebar from '../components/Sidebar';

export default function HelpSupport() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I upload medical reports?',
      answer: 'Navigate to the Upload Reports section from the sidebar. Click the upload button, select your medical report files (PDF, JPG, PNG), and click submit. Your reports will be processed and made available to patients.'
    },
    {
      question: 'How can I view patient health records?',
      answer: 'Go to the Health Records section from the sidebar. You can search for patients by name or ID. Click on any patient to view their complete health history, previous diagnoses, and medical notes.'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Click on Profile in the sidebar. Edit your information such as specialization, contact details, and biography. Make sure to save your changes before leaving the page.'
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'On the login page, click "Forgot Password?" and enter your email address. You will receive a password reset link via email within 5 minutes.'
    },
    {
      question: 'How are analytics calculated?',
      answer: 'Analytics are generated from your uploaded reports, patient interactions, and system usage patterns. Navigate to Analytics to view detailed insights about your activity.'
    },
    {
      question: 'Can I export patient records?',
      answer: 'Yes, you can export patient records in PDF format from the Health Records section. Select the patient and click the export button. The file will be downloaded to your device.'
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
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* TOP BAR */}
        <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 md:px-8 py-4 flex items-center justify-between`}>
          <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Help & Support</h1>
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

        {/* CONTENT AREA */}
        <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`p-4 md:p-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
      </main>
      </div>
    </div>
  );
}
