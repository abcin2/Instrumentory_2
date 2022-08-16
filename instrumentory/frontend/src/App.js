import { Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect } from 'react';

import './App.css';
// import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './teacherPages/Dashboard';

import PrivateRoute from './utils/PrivateRoute';
import LoggedInRoute from './utils/LoggedInRoute';
import { AuthProvider } from './context/AuthContext';
import AvailableInstruments from './teacherPages/AvailableInstruments';
import LoanedInstruments from './teacherPages/LoanedInstruments';
import BrokenInstruments from './teacherPages/BrokenInstruments';
import VerifyEmailSent from './pages/VerifyEmailSent';
import AccountConfirmEmail from './pages/AccountConfirmEmail';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AddInstrument from './teacherPages/AddInstrument';
import AllInstruments from './teacherPages/AllInstruments';
import UpdateInstrument from './teacherPages/UpdateInstrument';
import WhatsNext from './pages/WhatsNext';
import Account from './pages/Account';

function App() {

  // add all routes to 'models.py'  

  return (
    <div id="test" className="App">
      {/* <Header /> */}
      <Routes>
        {/* Example of using Header on only certain pages */}
        {/* <Route exact path="/" element={<><Header /><ExampleListPage /></>} /> */}
        {/* General Routes */}
        <Route exact path="/" element={<AuthProvider><LoggedInRoute><Home /></LoggedInRoute></AuthProvider>} />
        <Route exact path="contact/" element={<AuthProvider><Contact /></AuthProvider>} />
        <Route exact path="whats_next/" element={<AuthProvider><WhatsNext /></AuthProvider>} />
        <Route exact path="account/" element={<AuthProvider><Account /></AuthProvider>} /> 
        {/* Auth Routes */}
        <Route exact path="login/" element={<AuthProvider><Login /></AuthProvider>} />
        <Route exact path="register/" element={<Register />} />
        <Route exact path="forgot_password/" element={<ForgotPassword />} />
        <Route exact path="verify_email_sent/" element={<VerifyEmailSent />} />
        <Route exact path="account_confirm_email/:key/" element={<AccountConfirmEmail />} />
        <Route exact path="account_change_password/:id/:pk/:key" element={<ChangePassword />} />
        {/* Teacher Routes */}
        <Route exact path="dashboard/" element={<AuthProvider><PrivateRoute><Dashboard /></PrivateRoute></AuthProvider>} />
        <Route exact path="dashboard_test/" element={<AuthProvider><Dashboard /></AuthProvider>} />
        <Route exact path="full_inventory/" element={<AuthProvider><PrivateRoute><AllInstruments /></PrivateRoute></AuthProvider>} />
        <Route exact path="available_instruments/" element={<AuthProvider><PrivateRoute><AvailableInstruments /></PrivateRoute></AuthProvider>} />
        <Route exact path="loaned_instruments/" element={<AuthProvider><PrivateRoute><LoanedInstruments /></PrivateRoute></AuthProvider>} />
        <Route exact path="broken_instruments/" element={<AuthProvider><PrivateRoute><BrokenInstruments /></PrivateRoute></AuthProvider>} />
        <Route exact path="add_instrument/" element={<AuthProvider><PrivateRoute><AddInstrument /></PrivateRoute></AuthProvider>} />
        <Route exact path="update_instrument/:id/" element={<AuthProvider><PrivateRoute><UpdateInstrument /></PrivateRoute></AuthProvider>} />
        {/* EXAMPLE ROUTE FOR SPECIFIC ID */}
        {/* <Route exact path="example/:id" element={<ExamplePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
