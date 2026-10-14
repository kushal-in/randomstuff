import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Users } from 'lucide-react';
import { projects } from '../data/projectsData';
import SectionBackground from '../components/SectionBackground';

const StatusBadge = ({ status }) => {
  const styles =
    status === 'active'
      ? 'bg-primary/20 text-primary border-primary/30'
      : 'bg-surface text-textMuted border-white/10';
  const label = status === 'active' ? 'Active' : 'Completed';

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles}`}
    >
      {label}
    </span>
  );
};

const Projects = () => {
  return (
    <SectionBackground variant="lime" intensity={0.06}>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our{' '}
              <span className="text-gradient-brand">
                Projects
              </span>
            </h1>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">
              Discover the open-source projects and tools built by our community at CFI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 group relative overflow-hidden flex flex-col min-h-[22rem] h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={project.status} />
                    {/* {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <GitBranch size={20} />
                      </a>
                    )} */}
                    {/* <a href="#" className="text-gray-400 hover:text-primary transition-colors" title="Project Details">
                      <ExternalLink size={20} />
                    </a> */}
                  </div>
                </div>

                <p className="text-textMuted mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Link to team section */}
                <Link
                  to="/team"
                  state={{ scrollToProject: project.teamId }}
                  className="inline-flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors mt-auto"
                >
                  <Users size={16} />
                  View Project Team
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionBackground>
  );
};

export default Projects;
