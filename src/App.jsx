import DcApps from './pages/DcApps';
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Newsletter from './pages/Newsletter';
import Team from './pages/Team';
import NewsletterDetail from './pages/NewsletterDetail';

// ─── Scroll To Top Component ─────────────────────────────────────────
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Only scroll to top if we ARE NOT explicitly navigating to a specific team project
    if (!state?.scrollToProject) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

// ─── Main App ────────────────────────────────────────────────────────
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter/:slug" element={<NewsletterDetail />} />
          <Route path="team" element={<Team />} />
          <Route path="dc-apps" element={<DcApps />} />
          <Route path="dc-apps/:part" element={<DcApps />} />
          <Route path="dc-apps/:part/:sub" element={<DcApps />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
