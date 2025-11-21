import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Screens
const Welcome = lazy(() => import('./MainScreens/Welcome.jsx'));
const PatientLogin = lazy(() => import('./MainScreens/PatientLogin.jsx'));
const DoctorLogin = lazy(() => import('./MainScreens/DoctorLogin.jsx'));
const HospitalLogin = lazy(() => import('./MainScreens/HospitalLogin.jsx'));
const HospitalSignup = lazy(() => import('./MainScreens/HospitalSignup.jsx'));

// Doctor Portal
const DoctorDashboard = lazy(() => import('./DoctorPortal/DoctorDashboard.jsx'));
const AddPatient = lazy(() => import('./DoctorPortal/AddPatient.jsx'));
const UploadReports = lazy(() => import('./DoctorPortal/UploadReports.jsx'));
const HealthRecords = lazy(() => import('./DoctorPortal/HealthRecords.jsx'));
const DoctorAnalytics = lazy(() => import('./DoctorPortal/Analytics.jsx'));
const DoctorProfile = lazy(() => import('./DoctorPortal/Profile.jsx'));
const DoctorSettings = lazy(() => import('./DoctorPortal/Settings.jsx'));
const HelpSupport = lazy(() => import('./DoctorPortal/HelpSupport.jsx'));

// Hospital Portal
const HospitalDashboard = lazy(() => import('./HospitalPortal/HospitalDashboard.jsx'));
const AddHospital = lazy(() => import('./HospitalPortal/AddHospital.jsx'));
const AddDoctor = lazy(() => import('./HospitalPortal/AddDoctor.jsx'));
const ManageHospitals = lazy(() => import('./HospitalPortal/ManageHospitals.jsx'));
const HospitalAnalytics = lazy(() => import('./HospitalPortal/Analytics.jsx'));
const HospitalProfile = lazy(() => import('./HospitalPortal/Profile.jsx'));
const HospitalSettings = lazy(() => import('./HospitalPortal/Settings.jsx'));
const HospitalHelpSupport = lazy(() => import('./HospitalPortal/HelpSupport.jsx'));

// Patient Portal
const PatientDashboard = lazy(() => import('./PatientPortal/PatientDashboard.jsx'));
const ViewReports = lazy(() => import('./PatientPortal/ViewReports.jsx'));
const DownloadReports = lazy(() => import('./PatientPortal/DownloadReports.jsx'));
const PatientProfile = lazy(() => import('./PatientPortal/PatientProfile.jsx'));
const PatientSettings = lazy(() => import('./PatientPortal/PatientSettings.jsx'));
const AllNotifications = lazy(() => import('./PatientPortal/AllNotifications.jsx'));

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p>Loading...</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Main Entry Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/hospital-signup" element={<HospitalSignup />} />

          {/* Doctor Portal Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/add-patient" element={<AddPatient />} />
          <Route path="/doctor/upload" element={<UploadReports />} />
          <Route path="/doctor/records" element={<HealthRecords />} />
          <Route path="/doctor/analytics" element={<DoctorAnalytics />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />
          <Route path="/doctor/help" element={<HelpSupport />} />
          
          {/* Hospital Portal Routes */}
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/hospital/add" element={<AddHospital />} />
          <Route path="/hospital/add-doctor" element={<AddDoctor />} />
          <Route path="/hospital/manage" element={<ManageHospitals />} />
          <Route path="/hospital/analytics" element={<HospitalAnalytics />} />
          <Route path="/hospital/profile" element={<HospitalProfile />} />
          <Route path="/hospital/settings" element={<HospitalSettings />} />
          <Route path="/hospital/help" element={<HospitalHelpSupport />} />

          {/* Patient Portal Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/view" element={<ViewReports />} />
          <Route path="/patient/download" element={<DownloadReports />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          <Route path="/patient/notifications" element={<AllNotifications />} />
        </Routes>
      </Suspense>
    </Router>
  );
}