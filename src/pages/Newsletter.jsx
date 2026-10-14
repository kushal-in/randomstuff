import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsletter } from '../data/newsletterData';
import SectionBackground from '../components/SectionBackground';

const Newsletter = () => {
    return (
        <SectionBackground variant="cyan" intensity={0.07}>
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        {/* <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
              <BookOpen size={32} />
            </div> */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Technical Blog &{' '}
                            <span className="text-gradient-brand">
                                Newsletter
                            </span>
                        </h1>
                        <p className="text-xl text-textMuted max-w-2xl mx-auto mb-8">
                            Deep dives, tutorials, and write-ups from our community members.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {newsletter.map((post) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link
                                    to={`/newsletter/${post.slug}`}
                                    className="block glass-card p-8 group hover:border-accent/40 transition-colors"
                                >
                                    <div className="flex items-center gap-4 text-sm font-mono text-textMuted mb-4">
                                        {/* Conditionally render the date and separator dot */}
                                        {post.date && (
                                            <>
                                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                            </>
                                        )}
                                        <span className="text-primary">{post.author}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 mb-5 leading-relaxed">
                                        {post.summary}
                                    </p>

                                    <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
                                        Read Full Article <ArrowRight size={18} className="ml-1" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
};

export default Newsletter;