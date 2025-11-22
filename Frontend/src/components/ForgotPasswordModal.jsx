import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ForgotPasswordModal({ isOpen, onClose, portalType }) {
  const [step, setStep] = useState('email'); // 'email' or 'code'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Simulate sending email
    setSentEmail(email);
    setMessage(`Code sent to ${email}`);
    setStep('code');
    setEmail('');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter the code');
      return;
    }

    if (code.length !== 6) {
      setError('Code must be 6 digits');
      return;
    }

    // Simulate code verification
    setMessage('✓ Code verified! Your password has been reset.');
    setTimeout(() => {
      resetModal();
      onClose();
    }, 2000);
  };

  const resetModal = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setMessage('');
    setSentEmail('');
    setError('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Forgot Password?</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'email' ? (
            <form onSubmit={handleSendCode}>
              <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we'll send you a code to reset your password.
              </p>
              
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 mb-4"
              />

              {error && (
                <div className="mb-4 p-3 rounded text-sm bg-red-100 text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
              >
                Send Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <p className="text-sm text-gray-600 mb-4">
                Enter the 6-digit code we sent to <strong>{sentEmail}</strong>
              </p>

              {message && !error && (
                <div className="mb-4 p-3 rounded text-sm bg-green-100 text-green-700">
                  {message}
                </div>
              )}

              <input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 mb-4 text-center text-2xl tracking-widest"
              />

              {error && (
                <div className="mb-4 p-3 rounded text-sm bg-red-100 text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
              >
                Verify Code
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError('');
                }}
                className="w-full mt-2 bg-gray-200 text-gray-700 font-bold py-2 rounded hover:bg-gray-300 transition"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
