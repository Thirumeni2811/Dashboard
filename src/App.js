import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Mentions from './components/Mentions';
import Replies from './components/Replies';
import Keywords from './components/Keywords';
import NegativeKeywords from './components/NegativeKeywords';
import Settings from './components/Settings';
import Billing from './components/Billing';
import AffiliateProgram from './components/AffiliateProgram';
import Contact from './components/Contact';
import Overview from './components/Overview';
import Account from './components/Account';
function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<Overview />} /> 
          <Route path="/overview" element={<Overview />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/replies" element={<Replies />} />
          <Route path="/keywords" element={<Keywords />} />
          <Route path="/negative-keywords" element={<NegativeKeywords />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/affiliate-program" element={<AffiliateProgram />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;
