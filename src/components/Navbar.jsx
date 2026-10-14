import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { assetPath,getAllEvents } from '../data/eventsData';
// ─── Desktop Events Dropdown ─────────────────────────────────────────
const EventsDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const allEvents = getAllEvents();
  const sortedEvents = [...allEvents].sort((a, b) => new Date(b.date) - new Date(a.date));
  const upcomingEvents = sortedEvents.filter((e) => e.category === 'upcoming');
  const recentEvents = sortedEvents.filter((e) => e.category === 'past').slice(0, 3); // Only show top 3 recent

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative flex items-center" ref={ref}>
      {/* Split trigger: Text links to page, Arrow opens dropdown */}
      <NavLink
        to="/events"
        className={({ isActive }) =>
          `pl-3 pr-1.5 py-2 rounded-l-md text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
          }`
        }
      >
        Events
      </NavLink>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`pr-3 pl-1.5 py-2 rounded-r-md transition-colors flex items-center ${open ? 'text-primary' : 'text-gray-300 hover:text-white'
          }`}
        aria-label="Toggle Events Dropdown"
      >
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-64 bg-surface/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <Link
              to="/events"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm font-bold text-white hover:text-primary hover:bg-white/5 transition-colors border-b border-white/[0.06]"
            >
              View All Events →
            </Link>

            <div className="py-2">
              {/* Upcoming Section */}
              {upcomingEvents.length > 0 && (
                <div className="mb-2">
                  <span className="block px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-primary/80">
                    Upcoming
                  </span>
                  {upcomingEvents.map((event) => (
                    <Link
                      key={event.slug}
                      to={`/events/${event.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {event.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Recent Archive Section */}
              <div>
                <span className="block px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-textMuted/60">
                  Recent Archive
                </span>
                {recentEvents.map((event) => (
                  <Link
                    key={event.slug}
                    to={`/events/${event.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Mobile Events Expandable ────────────────────────────────────────
const MobileEventsSection = ({ onClose }) => {
  const [expanded, setExpanded] = useState(false);

  const allEvents = getAllEvents();
  const sortedEvents = [...allEvents].sort((a, b) => new Date(b.date) - new Date(a.date));
  const upcomingEvents = sortedEvents.filter((e) => e.category === 'upcoming');
  const recentEvents = sortedEvents.filter((e) => e.category === 'past').slice(0, 3);

  return (
    <div>
      <div className="flex items-center w-full">
        <NavLink
          to="/events"
          onClick={onClose}
          className={({ isActive }) =>
            `flex-1 px-3 py-2 text-base font-medium rounded-l-md transition-colors ${isActive
              ? 'text-primary bg-surface/50'
              : 'text-gray-300 hover:text-white hover:bg-surface/50'
            }`
          }
        >
          Events
        </NavLink>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="px-4 py-2 rounded-r-md text-gray-400 hover:text-white hover:bg-surface/50 transition-colors"
          aria-label="Expand Events"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Link
              to="/events"
              onClick={onClose}
              className="block pl-6 py-2 text-sm text-white font-bold hover:text-primary transition-colors"
            >
              View All Events →
            </Link>

            {upcomingEvents.length > 0 && (
              <div className="mt-1">
                <span className="block pl-6 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-primary/80">
                  Upcoming
                </span>
                {upcomingEvents.map((event) => (
                  <Link
                    key={event.slug}
                    to={`/events/${event.slug}`}
                    onClick={onClose}
                    className="block pl-9 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-1 pb-2">
              <span className="block pl-6 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-textMuted/60">
                Recent Archive
              </span>
              {recentEvents.map((event) => (
                <Link
                  key={event.slug}
                  to={`/events/${event.slug}`}
                  onClick={onClose}
                  className="block pl-9 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {event.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// ─── Navbar ──────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const simpleLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    // Events handled by dropdown
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Team', path: '/team' },
    { name: 'DC App', path: '/dc-apps' },
  ];

  return (
    <nav className="glass-nav fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center gap-2.5 text-xl font-bold text-white hover:text-primary transition-colors"
            >
              <img
                src={logo}
                alt="Programming Club IITM logo"
                className="h-9 w-auto"
              />
              <span>
                Programming Club{' '}
                <span className="text-primary">IITM</span>
              </span>
            </NavLink>
          </div>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-baseline space-x-4">
            {simpleLinks.slice(0, 2).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <EventsDropdown />

            {simpleLinks.slice(2).map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          {/* ── Mobile Menu Toggle Button (ADD THIS) ── */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle main menu"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass-nav border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              {simpleLinks.slice(0, 2).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-primary bg-surface/50'
                        : 'text-gray-300 hover:text-white hover:bg-surface/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <MobileEventsSection onClose={() => setIsOpen(false)} />

              {simpleLinks.slice(2).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'text-primary bg-surface/50'
                        : 'text-gray-300 hover:text-white hover:bg-surface/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
