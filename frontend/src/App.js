// App.js


// #e5993f
// #385850
// #f3f3f3

// Style - regular
// Font - helvetica
// Font - verdana
// Font - times


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Hostel from './Hostel';
import AddingHostel from './admin/AddingHostel';
import AddBuddie from './admin/AddBuddie';
import AddRoom from './admin/AddRoom';
import HostelProfile from './admin/HostelProfile';
import ThankYouScreen from './admin/ThankYouScreen';
import Hostels from './Hostels';
import AboutUs from './AboutUs';
import Login from './Login';

import ProtectedRoute from './ProtectedRoute';
import BuddieProtectedRoute from './BuddieProtectedRoute';

import TermsAndConditions from './TermsAndConditions';
import Settings from './admin/settings';
import HostelFees from './admin/HostelFees';
import FoodMenu from './admin/FoodMenu';
import BuddieLogin from './buddie/BuddieLogin';
import BuddieHome from './buddie/BuddieHome';
import BuddieProfile from './buddie/BuddieProfile';
import Payments from './buddie/Payments';
import AdminPayments from './admin/AdminPayments';
import Complaints from './admin/AdminComplaints';
import Complaint from './buddie/Complaint';
import BuddieRating from './buddie/BuddieRating';
import AddingBuddie from './AddingBuddie';
import UnapprovedBuddies from './admin/UnapprovedBuddies';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const isBuddieAuthenticated = !!localStorage.getItem('buddieAuthToken');
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostel/:id" element={<Hostel />} />
        <Route path="/addBuddie/:hostel_id" element={<AddingBuddie />} />

        <Route path="/a" element={<AddingHostel />} />
        <Route path="/thanks" element={<ThankYouScreen />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/buddie-login" element={<BuddieLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        



        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="pendingRequests" element={<UnapprovedBuddies />} />



          </Route>


                 {/* Protected Routes */}
         <Route path="/buddie/*" element={<BuddieProtectedRoute isBuddieAuthenticated={isBuddieAuthenticated} />}>
          <Route path="home" element={<BuddieHome />} />
          <Route path="profile" element={<BuddieProfile />} />
          <Route path="payments" element={<Payments />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="rating" element={<BuddieRating />} />



          {/* <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} /> */}
          </Route>
  
      </Routes>
    </Router>
  );
};

export default App;
