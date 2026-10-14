import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, User, ExternalLink, Video, BookText } from 'lucide-react';
import { getNewsletterBySlug } from '../data/newsletterData';
import { assetPath } from '../data/eventsData';
import SectionBackground from '../components/SectionBackground';

const NewsletterDetail = () => {
    const { slug } = useParams();
    const post = getNewsletterBySlug(slug);

    if (!post) {
        return (
            <div className="py-20 text-center">
                <div className="max-w-xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
                    <p className="text-textMuted mb-8">This newsletter issue doesn't exist.</p>
                    <Link to="/newsletter" className="btn-primary">← Back to Newsletter</Link>
                </div>
            </div>
        );
    }

    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : null;

    return (
        <SectionBackground intensity={0.05} variant="cyan">
            <div className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <Link to="/newsletter" className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-accent transition-colors mb-10">
                        <ArrowLeft size={16} />
                        Back to Articles
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 border-b border-white/10 pb-10"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-textMuted text-sm font-mono">
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-primary" />
                                {post.author}
                            </div>
                            {post.date && (
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    {formattedDate}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-accent hover:prose-a:text-highlight prose-pre:bg-[#0d1312] prose-pre:border prose-pre:border-white/10"
                    >
                        {/* Custom components map to intercept images and wrap them in assetPath */}
                        <ReactMarkdown
                            components={{
                                img: ({ node, ...props }) => (
                                    <img {...props} src={assetPath(props.src)} className="w-full h-auto rounded-xl border border-white/10 shadow-lg my-8" />
                                )
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </motion.div>

                    {/* Further Reading Section */}
                    {post.furtherReading && post.furtherReading.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 pt-10 border-t border-white/[0.06]"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Interesting Reads & Videos</h3>
                            <div className="grid gap-4">
                                {post.furtherReading.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass-card p-5 flex items-center justify-between group hover:border-accent/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textMuted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                                                {item.type === 'video' ? <Video size={20} /> : <BookText size={20} />}
                                            </div>
                                            <span className="font-medium text-white group-hover:text-accent transition-colors">
                                                {item.title}
                                            </span>
                                        </div>
                                        <ExternalLink size={18} className="text-textMuted group-hover:text-accent transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </SectionBackground>
    );
};

export default NewsletterDetail;