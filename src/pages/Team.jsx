import React from 'react';
import { motion } from 'framer-motion';
import { team } from '../data/teamData';
import SectionBackground from '../components/SectionBackground';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { assetPath } from '../data/eventsData';
// ─── Inline SVG Icons ────────────────────────────────────────────────
const LinkedinIcon = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Animation Variants ──────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Member Card ─────────────────────────────────────────────────────
const MemberCard = ({ member }) => {
  // Track if the card has been tapped once on mobile
  const [tapped, setTapped] = React.useState(false);

  const validLinkedin = member.linkedin && member.linkedin !== '#'
    ? (member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`)
    : undefined;

  const handleClick = (e) => {
    // Apply 2-tap logic only on mobile screens (under 640px)
    if (window.innerWidth < 640 && validLinkedin) {
      if (!tapped) {
        e.preventDefault(); // Stop navigation on first tap, letting browser apply hover flip
        setTapped(true);
      } else {
        // Second tap: let it navigate, then reset state so it's ready for next time
        setTimeout(() => setTapped(false), 500);
      }
    }
  };

  return (
    <motion.div variants={cardVariants} className="flex flex-col items-center w-full sm:w-48">
      {/* Flip card avatar */}
      <a
        href={validLinkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flip-card w-28 h-28 sm:w-44 sm:h-44 mb-3 sm:mb-5 block cursor-pointer group mx-auto"
        aria-label={`${member.name} on LinkedIn`}
        onClick={handleClick}
        onBlur={() => setTapped(false)}
        onMouseLeave={() => setTapped(false)}
      >
        <div className="flip-card-inner w-full h-full">
          {/* Front: Photo with glow ring */}
          <div className="flip-card-front flex items-center justify-center">
            <div className="glow-ring w-full h-full rounded-full">
              <img
                src={member.photo ? assetPath(member.photo) : member.avatar}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>
          {/* Back: LinkedIn icon */}
          <div className="flip-card-back flex items-center justify-center bg-[#0077b5]">
            <LinkedinIcon size={40} className="text-white" />
          </div>
        </div>
      </a>

      {/* Name */}
      <h3 className="text-sm sm:text-base font-semibold text-white text-center leading-tight px-1">
        {member.name}
      </h3>
    </motion.div>
  );
};
// ─── Member Grid ─────────────────────────────────────────────────────
const MemberGrid = ({ members }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    // The arbitrary Tailwind selector here centers the last item if the total count is odd
    className="grid grid-cols-2 [&>*:nth-child(odd):last-child]:col-span-2 sm:flex sm:flex-wrap sm:justify-center gap-x-2 gap-y-8 sm:gap-x-8 sm:gap-y-10 max-w-4xl mx-auto"
  >
    {members.map((member) => (
      <MemberCard key={member.id} member={member} />
    ))}
  </motion.div>
);
// ─── Section Header ──────────────────────────────────────────────────
// `as` only changes the heading level for semantics — every instance renders
// identically, so project sub-headings match "The Heads" / "Coordinators".
const SectionHeader = ({ title, as: Tag = 'h2' }) => (
  <div className="flex items-center gap-4 mb-8 sm:mb-10">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <Tag className="text-xl sm:text-2xl md:text-3xl font-bold text-white whitespace-nowrap">
      {title}
    </Tag>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

// ─── Team Section (glass panel wrapper) ──────────────────────────────
const TeamSection = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6 }}
  >
    {/* Reduced padding on mobile (p-4) to fit cards */}
    <div className="glass-panel p-4 sm:p-8 md:p-10">
      <SectionHeader title={title} />
      {children}
    </div>
  </motion.section>
);

// ─── Project Team ────────────────────────────────────────────────────
const ProjectTeam = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5 }}
    className="glass-panel p-4 sm:p-8 md:p-10 border-l-2 border-l-accent"
    id={`project-${project.id}`}
  >
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8 sm:mb-10 text-center">
      {project.name}
    </h3>

    {/* Leads */}
    <div className="mb-10">
      <SectionHeader as="h4" title="Project Leads" />
      <MemberGrid members={project.leads} />
    </div>

    {/* Members */}
    <div>
      <SectionHeader as="h4" title="Project Members" />
      <MemberGrid members={project.members} />
    </div>
  </motion.div>
);
// ─── Main Team Page ──────────────────────────────────────────────────
const Team = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToProject) {
      const el = document.getElementById(`project-${location.state.scrollToProject}`);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location.state]);

  return (
    <SectionBackground variant="teal" intensity={0.08}>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Meet the{' '}
              <span className="text-gradient-brand">
                Team
              </span>
            </h1>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">
              The dedicated individuals behind Programming Club IITM.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            <TeamSection title="The Heads">
              <MemberGrid members={team.heads} />
            </TeamSection>

            <div className="section-divider" />

            <TeamSection title="Dev Strategists">
              <MemberGrid members={team.devStrats} />
            </TeamSection>

            <div className="section-divider" />

            <TeamSection title="CP Strategists">
              <MemberGrid members={team.cpStrats} />
            </TeamSection>

            <div className="section-divider" />

            <TeamSection title="Coordinators">
              <MemberGrid members={team.coordinators} />
            </TeamSection>

            <div className="section-divider" />

            {/* Projects */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader title="Projects" />
              <div className="space-y-10">
                {team.projects.map((project) => (
                  <ProjectTeam key={project.id} project={project} />
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default Team;