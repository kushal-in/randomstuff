import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import SectionBackground from '../components/SectionBackground';
import { CONFIG, PAGES } from '../dc/config';
import { blocks } from '../dc/content';
import { registry, isDone } from '../dc/fields';
import { load, save } from '../dc/storage';
import { submit, download } from '../dc/submit';

const keys = [...PAGES.map(p => p.key), 'review'];
const to = k => (k === 'apply' ? '/dc-apps' : `/dc-apps/${k}`);
const label = k => PAGES.find(p => p.key === k)?.label || 'Review and download';
const slug = s => s.toLowerCase().replace(/\W+/g, '-');
const sectionsOf = k => [...new Set(blocks.filter(b => b.page === k && b.section).map(b => b.section))];

export default function DcApps() {
  const { step = 'apply' } = useParams();
  const [st, setSt] = useState(load);
  const [saved, setSaved] = useState(null);
  const [status, setStatus] = useState({});
  useEffect(() => { document.title = 'DC Application | Programming Club IITM'; }, []);
  useEffect(() => { const t = setTimeout(() => setSaved(save(st) ? new Date() : false), 400); return () => clearTimeout(t); }, [st]);

  const i = keys.indexOf(step);
  if (i < 0) return <Navigate to="/dc-apps" replace />;
  const a = st.answers;
  const done = k => blocks.filter(b => b.page === k).every(b => isDone(b, a[b.id]));
  const missing = blocks.filter(b => !isDone(b, a[b.id]));
  const closed = Date.now() > new Date(CONFIG.DEADLINE);
  const setAns = (id, v) => setSt(s => ({ ...s, answers: { ...s.answers, [id]: v } }));
  const send = async () => {
    setStatus({ busy: true });
    try { const receipt = await submit(a, blocks); setSt(s => ({ ...s, receipt })); setStatus({}); }
    catch (e) { setStatus({ err: e.message }); }
  };
  const groups = [];
  blocks.filter(b => b.page === step).forEach(b => {
    let g = groups.find(x => x.s === (b.section || ''));
    if (!g) groups.push(g = { s: b.section || '', items: [] });
    g.items.push(b);
  });

  return (
    <SectionBackground intensity={0.05} variant="cyan">
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">DC Application {CONFIG.YEAR}</h1>
            <p className="text-textMuted">Programming Club IITM. Closes {new Date(CONFIG.DEADLINE).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          </header>

          <div className="grid lg:grid-cols-[256px_1fr] gap-8 items-start">
            <aside className="lg:sticky lg:top-24 space-y-2 border border-white/10 bg-surface/50 rounded-xl p-4">
              {keys.map(k => (
                <div key={k}>
                  <Link to={to(k)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${k === step ? 'bg-primary/10 text-primary' : 'text-textMuted hover:text-white'}`}>
                    {k !== 'review' && done(k) && <Check size={14} />}{label(k)}
                  </Link>
                  {k === step && sectionsOf(k).map(s => (
                    <button key={s} onClick={() => document.getElementById(slug(s))?.scrollIntoView({ behavior: 'smooth' })} className="block w-full text-left pl-8 pr-4 py-1 text-sm text-textMuted hover:text-white transition-colors">{s}</button>
                  ))}
                </div>
              ))}
              <p className="px-4 pt-2 font-mono text-xs text-textMuted">{saved === false ? 'Could not save. Do not use private mode.' : saved ? `Saved ${saved.toLocaleTimeString()}` : ''}</p>
            </aside>

            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8 min-w-0">
              {closed && <p className="text-spark">Applications are closed.</p>}
              {groups.map(g => (
                <section key={g.s} id={slug(g.s)} className="space-y-6 scroll-mt-24">
                  {g.s && <h2 className="text-2xl text-white">{g.s}</h2>}
                  {g.items.map(b => {
                    const C = registry[b.type] || (() => <p className="text-spark">Unknown block type: {b.type}</p>);
                    return <C key={b.id} b={b} value={a[b.id]} onChange={v => setAns(b.id, v)} />;
                  })}
                </section>
              ))}
              {step === 'review' && (
                <div className="bg-surface/50 border border-white/10 rounded-xl p-6 space-y-6">
                  <h2 className="text-2xl text-white">Review and download</h2>
                  {missing.length ? (
                    <ul className="space-y-2 text-textMuted">
                      {missing.map(b => <li key={b.id}><Link className="text-accent hover:text-highlight transition-colors" to={to(b.page)}>{label(b.page)}</Link>: {b.id}</li>)}
                    </ul>
                  ) : <p className="text-textMuted">All required items are complete. You can recompile until the deadline.</p>}
                  <button className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!!missing.length || closed || status.busy} onClick={send}>
                    {status.busy && <Loader2 size={16} className="animate-spin" />}{status.busy ? 'Submitting' : st.receipt ? 'Recompile' : 'Submit application'}
                  </button>
                  {status.err && <p className="text-spark">Submission failed: {status.err}. Your answers are saved. <button className="underline" onClick={() => download(a, blocks)}>Download a zip instead</button></p>}
                  {st.receipt && <p className="text-primary">Submitted. Reference {st.receipt.id}, {new Date(st.receipt.timestamp).toLocaleString('en-IN')}.</p>}
                </div>
              )}
              <div className="flex justify-between pt-2">
                {i > 0 ? <Link to={to(keys[i - 1])} className="btn-outline">Back</Link> : <span />}
                {i < keys.length - 1 && <Link to={to(keys[i + 1])} className="btn-primary">Next</Link>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}
