import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { getAllEvents } from '../data/eventsData';
import SectionBackground from '../components/SectionBackground';
import ReactMarkdown from 'react-markdown';

// ─── Small Event Card (links to detail page) ────────────────────────
const EventCard = ({ event }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    <Link
      to={`/events/${event.slug}`}
      className="glass-card p-6 flex flex-col h-full group block border-l-2 hover:border-l-primary transition-colors border-l-transparent"
    >
      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-3">
        {event.title}
      </h3>

      <div className="flex items-center gap-2 text-textMuted text-sm mb-3">
        <Calendar size={14} className="text-primary/70" />
        <span>
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="text-textMuted text-sm mb-4 flex-grow line-clamp-3 prose prose-invert prose-sm max-w-none prose-p:m-0">
        <ReactMarkdown>{event.description}</ReactMarkdown>
      </div>

      <div className="flex items-center text-primary text-sm font-medium group-hover:gap-1.5 transition-all mt-auto pt-4 border-t border-white/[0.05]">
        View Details <ArrowRight size={14} className="ml-1" />
      </div>
    </Link>
  </motion.div>
);

// ─── Main Events Page ────────────────────────────────────────────────
const Events = () => {
  const allEvents = getAllEvents();

  // Sort all events by date (newest first)
  const sortedEvents = [...allEvents].sort((a, b) => new Date(b.date) - new Date(a.date));

  const upcomingEvents = sortedEvents.filter((e) => e.category === 'upcoming');
  const pastEvents = sortedEvents.filter((e) => e.category === 'past');

  // Group past events by Year
  const pastEventsByYear = pastEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Get years in descending order
  const years = Object.keys(pastEventsByYear).sort((a, b) => b - a);

  return (
    <SectionBackground variant="teal" intensity={0.06}>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Events &{' '}
              <span className="text-gradient-brand">
                Workshops
              </span>
            </h1>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">
              Join us for hackathons, bootcamps, and weekly sessions to level up
              your skills.
            </p>
          </motion.div>

          {/* ── Upcoming Events ── */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">
                ✴
              </span>
              Upcoming Events
            </h2>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            ) : (
              <div className="glass-panel p-8 text-center text-textMuted max-w-xl mx-auto border-dashed border-2 border-white/10 bg-transparent">
                <p className="mb-2 font-semibold text-white">
                  No upcoming events scheduled right now.
                </p>
                <p className="text-sm">
                  We are cooking up some exciting events. Check back soon or
                  follow our socials for updates!
                </p>
              </div>
            )}
          </div>

          {/* ── Past Events Archive (Grouped by Year) ── */}
          <div>
            <h2 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-textMuted text-sm border border-white/10">
                ✹
              </span>
              Event Archive
            </h2>

            <div className="space-y-16">
              {years.map((year) => (
                <div key={year} className="relative">
                  {/* Year Divider */}
                  <div className="mb-8 pl-2">
                    <h3 className="text-4xl font-extrabold text-white/30 tracking-tight font-sans">
                      {year}
                    </h3>
                  </div>

                  {/* Grid of Events for this year */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEventsByYear[year].map((event) => (
                      <EventCard key={event.slug} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </SectionBackground>
  );
};

export default Events;