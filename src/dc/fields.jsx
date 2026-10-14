import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// 1. Simple, Clean Hint Component (No telemetry, just UI)
const Hint = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-borderLine rounded bg-[#090D0F]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2.5 font-mono text-[11px] text-textMuted hover:text-primary transition-colors flex items-center gap-2"
      >
        <span className="text-primary">{open ? 'Hint:' : 'Hint:'}</span> {title}
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-borderLine bg-surface">
          <MD>{children}</MD>
        </div>
      )}
    </div>
  );
};

// Universal parser for both Reading blocks and Question blocks
const SmartText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(<Hint title="[^"]+">[\s\S]*?<\/Hint>)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        const match = part.match(/<Hint title="([^"]+)">([\s\S]*?)<\/Hint>/);
        if (match) {
          return <Hint key={i} title={match[1]}>{match[2].trim()}</Hint>;
        }
        return part.trim() ? <MD key={i}>{part}</MD> : null;
      })}
    </div>
  );
};

export const MD = ({ children }) => (
  <div className="prose prose-invert max-w-none prose-a:text-accent hover:prose-a:text-accent/80 prose-pre:bg-[#090D0F] prose-pre:border prose-pre:border-borderLine prose-pre:text-[13px] prose-code:before:content-none prose-code:after:content-none leading-relaxed text-[15px]">
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // Allows coords to write: <Hint title="State Reduction">Notice K <= 10...</Hint> inside markdown!
        Hint: ({ node, ...props }) => <Hint {...props} />
      }}
    >
      {children}
    </Markdown>
  </div>
);

const patterns = {
  codeforces: /^https:\/\/codeforces\.com\/(contest\/\d+\/submission\/\d+|problemset\/submission\/\d+\/\d+)/,
  gist: /^https:\/\/gist\.github\.com\/[\w-]+\/[0-9a-f]+/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+\$/,
};

export const isValid = (b, v, allAnswers = {}) => {
  const s = (v || '').trim();
  if (!s) return true; // Handled by isDone for required fields

  if (b.id === 'email' || b.type === 'email') {
    return Boolean(String(allAnswers.roll || '').trim()); // Valid as long as a roll number exists
  }

  return (patterns[b.validate] || (b.type === 'link' ? /^https?:\/\/.+/ : /./)).test(s);
};

export const isDone = (b, v, allAnswers = {}) =>
  !b.required || (!!(v || '').trim() && isValid(b, v, allAnswers));
// 2. The Anti-Slop Question Block

const Q = ({ b, value, children }) => (
  <div className="bg-surface border border-borderLine rounded-md p-6 space-y-4">
    {b.required && <span className="font-mono text-xs text-textMuted uppercase tracking-wider">Required</span>}

    <SmartText text={b.body} />

    <div className="pt-2">{children}</div>
  </div>
);
// 3. Monospace Verified Link Input
const VerifiedLink = ({ b, value, onChange }) => {
  const valid = isValid(b, value);
  const showWarning = value && !valid;

  // Clean placeholder cues exactly as requested
  let placeholder = "Link here...";
  if (b.validate === 'codeforces') placeholder = "codeforces.com/contest/...";
  if (b.validate === 'gist') placeholder = "gist.github.com/...";

  return (
    <Q b={b} value={value}>
      <div className="space-y-1.5">
        <input
          type="text" // 'text' stops the browser from injecting its own 'https://' UI
          placeholder={placeholder}
          className={`w-full font-mono text-sm bg-[#090D0F] text-textMain px-4 py-2.5 rounded-md border focus:outline-none transition-colors ${showWarning ? 'border-spark/50 focus:border-spark' : valid && value ? 'border-primary/50 focus:border-primary' : 'border-borderLine focus:border-textMuted'
            }`}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <div className="flex justify-between items-center h-4 px-1">
          {showWarning ? (
            <span className="font-mono text-[11px] text-spark">Ensure full link matches: {placeholder}</span>
          ) : valid && value ? (
            <span className="font-mono text-[11px] text-primary">[Valid format]</span>
          ) : <span />}
        </div>
      </div>
    </Q>
  );
};
export const EmailInput = ({ b, value, allAnswers = {} }) => {
  const roll = String(allAnswers.roll || '').trim().toLowerCase();
  const smail = roll ? `${roll}@smail.iitm.ac.in` : '';

  return (
    <Q b={b} value={value}>
      <div className="space-y-1.5">
        <input
          type="text"
          readOnly
          disabled
          placeholder="Will auto-fill from Roll Number..."
          value={smail}
          className="w-full font-mono text-sm bg-[#090D0F] text-textMuted px-4 py-2.5 rounded-md border border-borderLine cursor-not-allowed"
        />
        <div className="min-h-[18px] px-1">
          <span className="font-mono text-[11px] text-textMuted">
            {/* Automatically derived from Roll Number. */}
          </span>
        </div>
      </div>
    </Q>
  );
};


const textInputCls = 'w-full rounded-md bg-[#090D0F] border border-borderLine px-4 py-2.5 text-[15px] text-textMain placeholder:text-textMuted/40 focus:outline-none focus:border-accent transition-colors';

export const registry = {
  reading: ({ b }) => <SmartText text={b.body} />,
  'short-text': ({ b, value = '', onChange }) => <Q b={b} value={value}><input className={textInputCls} value={value} onChange={e => onChange(e.target.value)} /></Q>,
  'long-text': ({ b, value = '', onChange }) => <Q b={b} value={value}><textarea rows={5} className={textInputCls} value={value} onChange={e => onChange(e.target.value)} /></Q>,
  link: VerifiedLink,
};