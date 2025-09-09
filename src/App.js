import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/navbar';
import Footer from './components/shared/footer';

import Home from './components/home/Home';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Sportscove from './components/sportscove/sportscove';
import Consultcove from './components/consultcove/consultcove';
import Sctribe from './components/sctribe/sctribe';
import TermsConditions from './components/termscondition/tc';
import PrivacyPolicy from './components/privacypolicy/pp';
import Insights from './components/insights/insights';
import BeACoach from './components/beacoach/beacoach';

import CoachProfile from './components/coachprofile/coachprofile';
import './App.css';

function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer for special pages if needed
  const hideLayout = location.pathname.startsWith('/supercoaches/');

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/sportscove" element={<Sportscove />} />
        <Route path="/products/consultcove" element={<Consultcove />} />
        <Route path="/sctribe" element={<Sctribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/termscondition" element={<TermsConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/beacoach" element={<BeACoach />} />



        
        <Route path="/supercoaches/:coachId" element={<CoachProfile />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
