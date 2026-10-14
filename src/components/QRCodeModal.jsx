import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * QRCodeModal
 *
 * Shows a scannable QR code in a centered modal instead of exposing the raw
 * invite URL as a clickable link. This keeps the link out of the page's
 * static HTML/DOM text, which is what web crawlers and link-scraping spam
 * bots actually parse — so it isn't picked up and blasted with join spam.
 *
 * Props:
 *  - isOpen: boolean, whether the modal is visible
 *  - onClose: () => void
 *  - value: string, the URL/text to encode in the QR code
 *  - label: string, small caption under the QR code (optional)
 */
const QRCodeModal = ({ isOpen, onClose, value, label = 'Scan to join the community' }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative bg-surface/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-8 max-w-sm w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close QR code dialog"
            >
              <X size={20} />
            </button>

            <h3 className="font-sora font-bold text-xl text-white mb-6 text-center">
              Join the Community
            </h3>

            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value={value}
                size={220}
                bgColor="#ffffff"
                fgColor="#0a0a0a"
                level="M"
              />
            </div>

            <p className="mt-6 text-sm font-mono uppercase tracking-widest text-textMuted text-center">
              {label}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default QRCodeModal;
