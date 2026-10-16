// src/dc/fields.jsx
import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// 1. Hint Component
const Hint = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-borderLine rounded bg-[#090D0F]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2.5 font-mono text-xs text-textMuted hover:text-spark transition-colors flex items-center gap-2"
      >
        <span className="text-spark font-medium">{open ? '▾ Hint:' : '▸ Hint:'}</span> {title}
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-borderLine bg-surface/50">
          <MD>{children}</MD>
        </div>
      )}
    </div>
  );
};

// 2. Answer / Solution Component
const Solution = ({ title = 'View Solution', children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border border-borderLine rounded bg-[#090D0F]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2.5 font-mono text-xs text-textMuted hover:text-accent transition-colors flex items-center gap-2"
      >
        <span className="text-accent font-medium">{open ? '▾ Solution:' : '▸ Solution:'}</span> {title}
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-borderLine bg-surface/50">
          <MD>{children}</MD>
        </div>
      )}
    </div>
  );
};

// Universal parser for both Reading blocks and Question blocks
const SmartText = ({ text }) => {
  if (!text) return null;

  // Split on <Hint>...</Hint>, <Solution>...</Solution>, <Answer>...</Answer>, or <Fig ... />
  const parts = text.split(/(<(?:Hint|Solution|Answer)\s+title="[^"]+">[\s\S]*?<\/(?:Hint|Solution|Answer)>|<Fig\s+[^>]*\/>)/g);

  return (
    <div className="space-y-4">
      {parts.map((part, i) => {
        if (!part || !part.trim()) return null;

        const hintMatch = part.match(/<Hint title="([^"]+)">([\s\S]*?)<\/Hint>/);
        if (hintMatch) return <Hint key={i} title={hintMatch[1]}>{hintMatch[2].trim()}</Hint>;

        const solMatch = part.match(/<(?:Solution|Answer)\s+title="([^"]+)">([\s\S]*?)<\/(?:Solution|Answer)>/);
        if (solMatch) return <Solution key={i} title={solMatch[1]}>{solMatch[2].trim()}</Solution>;

        if (part.startsWith('<Fig')) {
          const getAttr = (name) => {
            const m = part.match(new RegExp(`${name}="([^"]*)"`));
            return m ? m[1] : undefined;
          };
          return (
            <Fig
              key={i}
              src={getAttr('src')}
              caption={getAttr('caption')}
              width={getAttr('width')}
              align={getAttr('align')}
              my={getAttr('my')}
            />
          );
        }

        return <MD key={i}>{part}</MD>;
      })}
    </div>
  );
};
export const MD = ({ children }) => (
  <div className="
    prose prose-invert max-w-none font-sans
    text-[16px] text-textMain/90 leading-relaxed
    prose-p:my-3 prose-p:leading-[1.7]
    prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
    prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4
    prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
    prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
    prose-ul:my-3 prose-ol:my-3 prose-li:my-1
    prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary/80
    prose-strong:text-white prose-strong:font-semibold
    prose-code:before:content-none prose-code:after:content-none
  ">
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // 1. Override links to open in a new tab
        a({ href, children, ...props }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
        // 2. Override the outer box (Fixes the double box and indentation)
        pre({ children }) {
          return (
            <pre className="my-8 w-full block rounded-md border border-[#222C35] bg-[#101519] p-4 text-[13.5px] font-mono leading-relaxed text-[#E5E7EB] overflow-x-auto not-prose shadow-sm">
              {children}
            </pre>
          );
        },
        // 3. Override inline code styling
        code({ node, className, children, ...props }) {
          const isMultiLine = String(children).includes('\n');
          if (!isMultiLine && !className) {
            return (
              <code
                className="font-mono text-[13.5px] bg-[#161D24] text-[#7DD3FC] border border-[#22303C]/80 px-1.5 py-0.5 rounded font-normal mx-0.5 select-all"
                {...props}
              >
                {children}
              </code>
            );
          }
          // Just return plain code text if it's inside a <pre> block
          return <code className={className} {...props}>{children}</code>;
        },
        table({ children }) {
          return (
            <div className="my-6 w-full overflow-x-auto rounded border border-borderLine not-prose">
              <table className="w-full text-left border-collapse text-sm">{children}</table>
            </div>
          );
        },
        thead({ children }) { return <thead className="bg-[#151C22] border-b border-borderLine text-white font-medium">{children}</thead>; },
        tbody({ children }) { return <tbody className="divide-y divide-borderLine bg-[#0D1216]">{children}</tbody>; },
        th({ children }) { return <th className="px-4 py-3 text-xs uppercase tracking-wider font-semibold text-textMain">{children}</th>; },
        td({ children }) { return <td className="px-4 py-3 text-sm text-[#D1D5DB] align-top">{children}</td>; }
      }}
    >
      {typeof children === 'string' ? children : String(children || '')}
    </Markdown>
  </div>
);

const Fig = ({ src, caption, alt, width, align = 'center', my = 'my-6' }) => {
  const alignClass =
    align === 'left' ? 'mr-auto text-left' :
      align === 'right' ? 'ml-auto text-right' :
        'mx-auto text-center';

  return (
    <figure className={`${my} max-w-full overflow-hidden ${alignClass}`}>
      <div
        className="inline-block rounded-md border border-borderLine bg-[#090D0F] p-3 text-center"
        style={{ width: width || 'auto' }}
      >
        <img
          src={src}
          alt={alt || caption || "Figure"}
          className="mx-auto rounded object-contain max-h-[500px]"
          style={{ width: width ? '100%' : 'auto' }}
          loading="lazy"
        />
        {caption && (
          <figcaption className="mt-2.5 font-mono text-[11px] text-textMuted tracking-wide">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
};

const patterns = {
  codeforces: /^https:\/\/codeforces\.com\/(contest\/\d+\/submission\/\d+|problemset\/submission\/\d+\/\d+)/,
  gist: /^https:\/\/gist\.github\.com\/[\w-]+\/[0-9a-f]+/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+\$/,
};

export const isValid = (b, v, allAnswers = {}) => {
  const s = (v || '').trim();
  if (!s) return true;

  if (b.id === 'email' || b.type === 'email') {
    return Boolean(String(allAnswers.roll || '').trim());
  }

  return (patterns[b.validate] || (b.type === 'link' ? /^https?:\/\/.+/ : /./)).test(s);
};

export const isDone = (b, v, allAnswers = {}) =>
  !b.required || (!!(v || '').trim() && isValid(b, v, allAnswers));

const Q = ({ b, value, children }) => (
  <div className="bg-surface border border-borderLine rounded-md p-6 space-y-4">
    {b.required && <span className="font-mono text-xs text-textMuted uppercase tracking-wider">Required</span>}
    <SmartText text={b.body} />
    <div className="pt-2">{children}</div>
  </div>
);

const VerifiedLink = ({ b, value, onChange }) => {
  const valid = isValid(b, value);
  const showWarning = b.validate && value && !valid;

  let placeholder = "";
  if (b.validate === 'codeforces') placeholder = "codeforces.com/contest/...";
  if (b.validate === 'gist') placeholder = "gist.github.com/...";

  return (
    <Q b={b} value={value}>
      <div className="space-y-1.5">
        <input
          type="text"
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
          <span className="font-mono text-[11px] text-textMuted" />
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