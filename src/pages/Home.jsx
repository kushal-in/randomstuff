import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import HeroBackground from "../components/HeroBackground";
import QRCodeModal from "../components/QRCodeModal";
import React, { useState, useEffect } from "react";

// Kept out of the rendered DOM as a plain href — see QRCodeModal usage below.
const COMMUNITY_INVITE_LINK =
  "https://chat.whatsapp.com/J30aMySIQQOIziFDcPXdBr";

const Home = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Network */}
        <div className="absolute inset-0 z-0 bg-[#0B0F15]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bgDark/50 to-bgDark z-10"></div>
          <HeroBackground />
        </div>

        {/* Main Content */}
        <div className="z-20 text-center px-4 max-w-5xl mx-auto w-full flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Title */}
            {/* Sora Bold, -0.03em, leading 0.98 — per the design doc.
                12.5vw keeps "Programming" inside the px-4 gutter on every phone
                down to 280px; capped at 7rem so it stays calm on desktop. */}
            <h1
              className="font-sora font-bold tracking-[-0.03em] mb-2 leading-[0.98] select-none pointer-events-none"
              style={{ fontSize: "clamp(2.25rem, 12.5vw, 7rem)" }}
            >
              <span className="text-white block mb-2">Programming</span>
              <span className="text-gradient-brand inline-block">Club</span>
            </h1>

            {/* Subtitles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-4 mb-8 flex flex-col items-center space-y-2 select-none pointer-events-none"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide ">
                <span className="text-gray-300">Centre </span>
                <span className="text-red-500 font-semibold">
                  for Innovation
                </span>
              </div>
              {/* Matches the "Centre for Innovation" line above: DM Sans Medium,
                  same size ramp, same tracking — balanced so it wraps evenly on phones. */}
              <span className="font-sans font-thin tracking-wide text-gray-300 text-lg sm:text-xl md:text-2xl  text-balance">
                Indian Institute of Technology Madras
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4"
            >
              <button
                type="button"
                onClick={() => setIsQrOpen(true)}
                className="btn-primary py-3 px-8 text-base shadow-[0_0_20px_rgba(47,189,165,0.3)] hover:shadow-[0_0_30px_rgba(47,189,165,0.5)]"
              >
                Join the Community
              </button>
              <Link
                to="/projects"
                className="btn-outline py-3 px-8 text-base bg-white/[0.03] backdrop-blur-sm group"
              >
                Explore Projects
                <ArrowRight
                  size={16}
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-20 z-30 flex flex-col items-center text-textMuted select-none pointer-events-none"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 text-textMuted/70">
            Discover
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── About & Mission Section ────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-bgDark">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="glass-panel p-10 md:p-12 relative overflow-hidden group"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  About Us
                </span>
              </h2>
              <p className="text-lg text-textMuted leading-relaxed">
                Part of the Centre for Innovation (CFI) at IIT Madras, the
                Programming Club is a vibrant community of developers, problem
                solvers, and tech enthusiasts. We aim to foster a culture of
                coding, open-source contribution, and competitive programming
                across the institute.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-panel p-10 md:p-12 relative overflow-hidden group"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent opacity-50"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-textMuted leading-relaxed">
                We are dedicated to strengthening the logical thinking that
                powers all great code. We channel this passion into the
                fast-paced, analytical challenges of Competitive Programming
                (CP) and the creative, hands-on world of Development (Dev).
                Whether solving a complex puzzle or launching a new project, our
                goal is to cultivate the essential skills of a programmer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        value={COMMUNITY_INVITE_LINK}
      />
    </div>
  );
};

export default Home;
