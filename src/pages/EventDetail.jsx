import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  Code2,
  ClipboardList,
  FileCode2,
  Lightbulb
} from 'lucide-react';
import { assetPath, getEventBySlug } from '../data/eventsData';
import SectionBackground from '../components/SectionBackground';

// ─── Detail row helper ───────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <Icon size={20} className="text-primary mt-0.5 shrink-0" />
    <div>
      <span className="text-xs font-mono uppercase tracking-widest text-textMuted/60 block mb-1">
        {label}
      </span>
      <span className="text-white text-base font-medium">{children}</span>
    </div>
  </div>
);

// ─── Action button ───────────────────────────────────────────────────
const ActionButton = ({ href, icon: Icon, children, variant = 'secondary' }) => {
  if (!href) return null;

  const baseStyle = "inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto";
  const variants = {
    primary: "bg-primary text-[#0d1312] hover:bg-highlight hover:scale-105 hover:shadow-[0_0_20px_rgba(47,189,165,0.4)]",
    accent: "bg-accent text-[#0d1312] hover:bg-highlight hover:scale-105 hover:shadow-[0_0_20px_rgba(242,169,59,0.4)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyle} ${variants[variant]}`}
    >
      <Icon size={18} />
      {children}
    </a>
  );
};

// ─── Reusable PDF Viewer Section ─────────────────────────────────────
const PdfViewerSection = ({ title, emoji, pdfData, itemLabel, children }) => {
  if (!pdfData) return null;

  const pdfs = Array.isArray(pdfData) ? pdfData : [pdfData];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay:0.3 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">
        {title}
      </h2>

      {/* This renders anything we pass inside the component tags! */}
      {children && <div className="mb-8">{children}</div>}

      <div className="space-y-12">
        {pdfs.map((pdf, index, arr) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              {arr.length > 1 ? (
                <h3 className="text-xl font-bold text-accent">
                  {itemLabel} {index + 1}
                </h3>
              ) : (
                <div />
              )}

              <a
                href={assetPath(pdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-highlight text-sm font-semibold transition-colors bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg"
              >
                Open PDF <ExternalLink size={16} />
              </a>
            </div>

            <div className="w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden border border-white/10 shadow-2xl glass-card">
              <iframe
                src={assetPath(pdf)}
                className="w-full h-full"
                title={`${title} ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Event Detail Page ──────────────────────────────────────────
const EventDetail = () => {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  // 404 fallback
  if (!event) {
    return (
      <div className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-textMuted mb-8">
            The event you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/events" className="btn-primary">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <SectionBackground variant="cyan" intensity={0.06}>
      <div className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          {/* Header (Title only) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              {event.title}
            </h1>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-12"
          >

            {/* Split Layout: Poster (Left) & Description (Right) */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {event.poster && (
                <div className="w-full md:w-1/3 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={assetPath(event.poster)}
                    alt={`${event.title} poster`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className={`w-full ${event.poster ? 'md:w-2/3' : ''}`}>
                <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-highlight">
                  <ReactMarkdown>{event.description}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Info Grid (Date, Time, Venue, Team) */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-l-2 border-l-primary">
              <InfoRow icon={Calendar} label="Date">{formattedDate}</InfoRow>
              {event.time && <InfoRow icon={Clock} label="Time">{event.time}</InfoRow>}
              {event.venue && <InfoRow icon={MapPin} label="Venue">{event.venue}</InfoRow>}

              {event.teamConducted && event.teamConducted.length > 0 && (
                <InfoRow icon={Users} label="Conducted By">
                  <div className="flex flex-col gap-1">
                    {event.teamConducted.map((person, idx) => (
                      <span key={idx} className="truncate">{person}</span>
                    ))}
                  </div>
                </InfoRow>
              )}
            </div>

            {/* Action Buttons */}
            {(event.registrationLink || event.contestLink || event.problemsetLink) && (
              <div className="flex flex-wrap gap-4">
                <ActionButton href={event.registrationLink} icon={ClipboardList} variant="primary">
                  Register Now
                </ActionButton>
                <ActionButton href={event.problemsetLink} icon={Code2} variant="accent">
                  Problemset Link
                </ActionButton>
                <ActionButton href={event.contestLink} icon={ExternalLink} variant="secondary">
                  Contest Link
                </ActionButton>
              </div>
            )}

            {/* Extended Details */}
            {event.details && (
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-highlight">
                <ReactMarkdown>{event.details}</ReactMarkdown>
              </div>
            )}

            {/* Upcoming Event Placeholder Banner */}
            {event.category === 'upcoming' && !event.slidesPdf && !event.problemsetPdf && !event.solutionsPdf && (!event.posters || event.posters.length === 0) && (
              <div className="bg-surface border border-primary/20 rounded-xl p-6 text-center shadow-[0_0_15px_rgba(47,189,165,0.1)]">
                <p className="text-primary font-medium">
                  ✨ Slides, problemsets, and gallery will be uploaded here after the event concludes.
                </p>
              </div>
            )}

            {/* Dynamic PDF Viewers */}
            <div className="space-y-4">
              <PdfViewerSection
                title="Presentation Slides"
                pdfData={event.slidesPdf}
                itemLabel="Slide Deck"
              />

              <PdfViewerSection
                title="Problem Set"
                pdfData={event.problemsetPdf}
                itemLabel="Problem Set"
              >
                {event.problemSetters && event.problemSetters.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 w-fit">
                    <span className="text-textMuted text-sm font-medium flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      Problem Setters:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {event.problemSetters.map((setter, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-md text-sm font-semibold">
                          {setter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </PdfViewerSection>

              <PdfViewerSection
                title="Editorial / Solutions"
                pdfData={event.solutionsPdf}
                itemLabel="Solution"
              />
            </div>

            {/* Photo Gallery Collage */}
            {event.posters?.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-white/[0.06]">
                <h3 className="text-xl font-bold text-white px-2">Event Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[160px] sm:auto-rows-[200px]">
                  {event.posters.map((src, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl overflow-hidden border border-white/10 group ${i === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                    >
                      <img
                        src={assetPath(src)}
                        alt={`${event.title} gallery photo ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default EventDetail;