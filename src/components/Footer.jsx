import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

// Custom inline Feather brand SVGs to match lucide icons style
const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-surface/80 border-t border-white/10 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Programming Club IITM</h3>
            <p className="text-textMuted mb-4">
              Fostering a community of developers, competitive programmers, and tech enthusiasts at IIT Madras.
            </p>
            <p className="text-textMuted text-sm">Centre for Innovation (CFI)</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-textMuted">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link></li>
              <li><Link to="/team" className="hover:text-primary transition-colors">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/programming-club-cfi-iit-madras/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="https://www.instagram.com/programmingclub_iitm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e1306c] transition-colors" title="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com/@programmingclub_iitm" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff0000] transition-colors" title="YouTube">
                <YoutubeIcon />
              </a>
              <a href="mailto:programmingclubiitm@gmail.com" className="text-gray-400 hover:text-[#ea4335] transition-colors" title="Email">
                <Mail size={24} />
              </a>
            </div>
            <div className="mt-4 text-textMuted text-sm">
              <p>Email: programmingclubiitm@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-textMuted text-sm">
          <p>&copy; {new Date().getFullYear()} Programming Club IITM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
