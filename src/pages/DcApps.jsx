// src/pages/DcApps.jsx
import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import SectionBackground from '../components/SectionBackground';
import { CONFIG, PAGES } from '../dc/config';
import { blocks, steps, stepOf } from '../dc/content';
import { registry, isDone, isValid, EmailInput } from '../dc/fields';
import { load, save } from '../dc/storage';
import { submit } from '../dc/submit';

const same = (a, b) => a.part === b.part && a.slug === b.slug;
const pathOf = s => ['/dc-apps', ...(s.part === 'apply' && !s.slug ? [] : [s.part]), ...(s.slug ? [s.slug] : [])].join('/');
const blocksOf = s => blocks.filter(b => same(stepOf(b), s));
const slugify = s => s.toLowerCase().replace(/\W+/g, '-');

export default function DcApps() {
  const { part = 'apply', sub = '' } = useParams();
  const [st, setSt] = useState(load);
  const [saved, setSaved] = useState(null);
  const [status, setStatus] = useState({});

  const raw = st.answers || {};
  const cleanRoll = (raw.roll || '').trim().toUpperCase();
  const expectedSmail = cleanRoll ? `${cleanRoll.toLowerCase()}@smail.iitm.ac.in` : '';
  const a = { ...raw, email: expectedSmail };

  const [otpState, setOtpState] = useState({ sent: false, verifiedRoll: null, code: '' });
  const isRollVerified = Boolean(otpState.verifiedRoll && otpState.verifiedRoll === cleanRoll);

  let cur = steps.find(s => s.part === part && s.slug === sub);
  const firstSub = !cur && !sub ? steps.find(s => s.part === part) : null;
  if (!cur && firstSub) {
    cur = firstSub;
  }

  useEffect(() => {
    document.title = `\${cur?.title || 'DC Application'} | Programming Club IITM`;
  }, [cur]);

  useEffect(() => {
    const t = setTimeout(() => setSaved(save(st) ? new Date() : false), 400);
    return () => clearTimeout(t);
  }, [st]);

  if (!cur) return <Navigate to="/dc-apps" replace />;
  if (!sub && cur.slug) return <Navigate to={pathOf(cur)} replace />;

  const i = steps.indexOf(cur);

  // Check if step has any questions/inputs
  const hasInputs = s => {
    if (s.part === 'review') return false;
    return blocksOf(s).some(b => b.type !== 'reading');
  };

  // Only consider done if it has inputs AND all of them are answered
  const done = s => {
    if (!hasInputs(s)) return false;
    const inputs = blocksOf(s).filter(b => b.type !== 'reading');
    return inputs.every(b => {
      const val = (a[b.id] || '').trim();
      return val.length > 0 && isValid(b, val, a);
    });
  };

  const allInputs = blocks.filter(b => b.type !== 'reading');
  const filledInputs = allInputs.filter(b => {
    const val = (a[b.id] || '').trim();
    return val.length > 0 && isValid(b, val, a);
  });
  const pct = Math.round((100 * filledInputs.length) / (allInputs.length || 1));

  const missing = blocks.filter(b => !isDone(b, a[b.id], a));
  const closed = Date.now() > new Date(CONFIG.DEADLINE);
  const setAns = (id, v) => setSt(s => ({ ...s, answers: { ...s.answers, [id]: v } }));
  const clear = () => { if (window.confirm('Clear all your answers on this device?')) setSt({ answers: {} }); };

  const handleSendOtp = async () => {
    if (!cleanRoll) {
      alert("Please enter your Roll Number in the Overview section first.");
      return;
    }

    const enteredEmail = (a.email || '').trim().toLowerCase();
    if (!enteredEmail) {
      alert("Please enter your Smail ID in the Overview section.");
      return;
    }

    if (enteredEmail !== expectedSmail) {
      alert(`Roll number and Smail mismatch!\n\nRoll: ${cleanRoll}\nExpected: ${expectedSmail}\nEntered:${enteredEmail}`);
      return;
    }

    setOtpState(s => ({ ...s, sent: true }));
    try {
      const res = await fetch(CONFIG.SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'sendOtp', roll: cleanRoll, email: enteredEmail })
      });
      const data = await res.json();
      if (!data.ok) {
        alert("Error: " + data.error);
        setOtpState(s => ({ ...s, sent: false }));
      }
    } catch (err) {
      alert("Network error. Could not dispatch verification code.");
      setOtpState(s => ({ ...s, sent: false }));
    }
  };

  const send = async () => {
    setStatus({ busy: true });
    try {
      const receipt = await submit(a, blocks, otpState.code);
      setSt(s => ({ ...s, receipt }));
      setStatus({});
      setOtpState({ sent: false, verifiedRoll: null, code: '' });
    } catch (e) {
      setStatus({ err: e.message });
      setOtpState({ sent: false, verifiedRoll: null, code: '' });
    }
  };

  const groups = [];
  blocksOf(cur).forEach(b => {
    let g = groups.find(x => x.s === (b.section || ''));
    if (!g) groups.push(g = { s: b.section || '', items: [] });
    g.items.push(b);
  });

  const item = (s, text) => {
    const isActive = same(s, cur);
    return (
      <Link
        key={pathOf(s)}
        to={pathOf(s)}
        className={`flex items-center justify-between px-4 py-2 text-sm transition-all border-l-2 \${isActive
            ? 'border-primary bg-primary/10 text-primary font-semibold'
            : 'border-transparent text-textMuted hover:text-white hover:bg-white/5 font-medium'
          }`}
      >
        <span className="truncate">{text}</span>
        {done(s) && <Check size={14} className={isActive ? 'text-primary' : 'text-textMuted'} />}
      </Link>
    );
  };

  return (
    <SectionBackground intensity={0.05} variant="cyan">
      <div className="py-24">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">DC Application {CONFIG.YEAR}</h1>
            <p className="text-textMuted">Programming Club IITM. Closes {new Date(CONFIG.DEADLINE).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          </header>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Replace the existing <aside> in DcApps.jsx with this: */}
            <aside className="lg:sticky lg:top-24 space-y-2 border border-borderLine bg-surface rounded-md p-4">
              <div className="px-4 pb-2 space-y-2">
                <div className="relative w-full h-1.5 rounded-full bg-[#182026] overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between items-center font-mono text-[11px] text-textMuted">
                  <span>Progress</span>
                  <span className={pct === 100 ? "text-primary font-semibold" : "text-textMain"}>{pct}%</span>
                </div>
              </div>

              {PAGES.filter(p => p.key !== 'review').map(p => {
                const ss = steps.filter(s => s.part === p.key);
                if (!ss.length) return null;

                const hasSubpages = ss.some(s => Boolean(s.slug));

                if (!hasSubpages) {
                  const s = ss[0];
                  const isActive = cur.part === s.part && cur.slug === s.slug;
                  return (
                    <Link
                      key={pathOf(s)}
                      to={pathOf(s)}
                      className={`flex items-center justify-between px-4 py-2 text-sm transition-all border-l-2 ${isActive
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-transparent text-textMuted hover:text-white hover:bg-white/5 font-medium'
                        }`}
                    >
                      <span className="truncate">{p.label}</span>
                      {done(s) && <Check size={14} className={isActive ? 'text-primary' : 'text-textMuted'} />}
                    </Link>
                  );
                }

                return (
                  <div key={p.key} className="space-y-1">
                    <p className="mt-5 mb-4 px-4 text-sm font-bold tracking-wider text-white uppercase opacity-80">
                      {p.label}
                    </p>
                    <div className="space-y-0.5">
                      {ss.map(s => {
                        const isActive = cur.part === s.part && cur.slug === s.slug;
                        return (
                          <Link
                            key={pathOf(s)}
                            to={pathOf(s)}
                            className={`flex items-center justify-between pl-6 pr-4 py-1.5 text-sm transition-all border-l-2 ${isActive
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
                              : 'border-transparent text-textMuted hover:text-white hover:bg-white/5 font-medium'
                              }`}
                          >
                            <span className="truncate">{s.title}</span>
                            {done(s) && <Check size={14} className={isActive ? 'text-primary' : 'text-textMuted'} />}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="pt-4">
                <Link
                  to={pathOf(steps[steps.length - 1])}
                  className={`flex items-center justify-between px-4 py-2 text-sm transition-all border-l-2 ${cur.part === 'review'
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-transparent text-textMuted hover:text-white hover:bg-white/5 font-medium'
                    }`}
                >
                  Review and submit
                </Link>
              </div>

              <p className="px-4 pt-4 font-mono text-[11px] text-textMuted/60">
                {saved === false ? 'Could not save.' : saved ? `Saved ${saved.toLocaleTimeString()}` : ''}
              </p>
            </aside>

            <motion.div key={pathOf(cur)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8 min-w-0">
              <div className="space-y-2">
                <p className="font-mono text-xs text-textMuted">Page {i + 1} of {steps.length}</p>
                <h2 className="text-3xl text-white">{cur.title}</h2>
              </div>
              {closed && <p className="text-spark">Applications are closed.</p>}

              {groups.map(g => (
                <section key={g.s} id={slugify(g.s)} className="space-y-6">
                  {g.s && <h3 className="text-xl text-white border-b border-borderLine pb-2">{g.s}</h3>}

                  {g.items.map((b, idx) => {
                    const C = b.id === 'email' ? EmailInput : (registry[b.type] || (() => <p className="text-spark">Unknown block type: {b.type}</p>));

                    return (
                      <C
                        key={b.id || `${g.s || 'section'}-${idx}`}
                        b={b}
                        value={a[b.id] || ''}
                        onChange={v => setAns(b.id, v)}
                        allAnswers={a}
                      />
                    );
                  })}
                </section>
              ))}

              {cur.part === 'review' && (
                <div className="bg-surface border border-borderLine rounded-md p-6 space-y-6">
                  {missing.length ? (
                    <div className="space-y-4">
                      <p className="text-sm text-spark border-b border-borderLine pb-2">Some required fields are missing:</p>
                      <ul className="space-y-2 text-[15px] text-textMuted">
                        {missing.map(b => {
                          const s = steps.find(x => same(x, stepOf(b)));
                          return (
                            <li key={b.id} className="flex gap-2">
                              <span className="text-spark">-</span>
                              <Link className="text-textMain underline decoration-borderLine hover:decoration-accent transition-colors" to={pathOf(s)}>
                                {s.title}
                              </Link>: {b.body.replace(/[#*`\$]/g, '').split('\n')[0]}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-sm text-primary border-b border-borderLine pb-2">
                        Everything looks good. You're ready to submit.
                      </div>

                      {st.receipt && (
                        <div className="border border-primary/30 bg-primary/5 p-5 rounded-md space-y-4">
                          <h3 className="text-primary font-medium text-lg">Submission successful!</h3>
                          <p className="text-sm text-textMuted leading-relaxed">
                            We've received your application. If you realize you want to change an answer, you can simply edit your responses and resubmit anytime before the deadline. We'll only review your latest submission.
                          </p>
                          <div className="pt-2">
                            <a
                              href={st.receipt.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-primary text-[#090D0F] px-4 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                              Download PDF
                            </a>
                          </div>
                        </div>
                      )}

                      {!isRollVerified ? (
                        <div className="bg-[#090D0F] border border-borderLine rounded p-5 space-y-4">
                          <div>
                            <p className="text-sm text-textMain font-medium">
                              {st.receipt ? 'Verify your identity to resubmit' : 'Verify your identity to submit'}
                            </p>
                            <p className="text-xs text-textMuted mt-1">
                              We'll send a quick verification code to {expectedSmail || 'your smail'}.
                            </p>
                          </div>

                          {!otpState.sent ? (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="bg-textMain text-background px-4 py-2 rounded font-medium text-sm hover:bg-white transition-colors disabled:opacity-50"
                              disabled={!cleanRoll}
                            >
                              Send code
                            </button>
                          ) : (
                            <div className="flex flex-wrap gap-3 items-center">
                              <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                className="w-32 font-mono tracking-widest bg-surface border border-borderLine px-3 py-2 rounded text-center focus:border-accent outline-none text-textMain"
                                value={otpState.code}
                                onChange={e => setOtpState(s => ({ ...s, code: e.target.value }))}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (otpState.code.trim().length === 6) {
                                    setOtpState(s => ({ ...s, verifiedRoll: cleanRoll }));
                                  } else {
                                    alert("Please enter the full 6-digit code.");
                                  }
                                }}
                                className="bg-accent text-white px-4 py-2 rounded font-medium text-sm"
                              >
                                Verify
                              </button>
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                className="text-xs font-medium text-textMuted underline hover:text-white"
                              >
                                Resend code
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between bg-[#090D0F] border border-borderLine p-3 rounded">
                            <span className="text-sm text-primary flex items-center gap-2">
                              <Check size={16} /> Verified as {cleanRoll}
                            </span>
                            <button
                              type="button"
                              onClick={() => setOtpState({ sent: false, verifiedRoll: null, code: '' })}
                              className="text-xs text-textMuted hover:text-white"
                            >
                              Change
                            </button>
                          </div>
                          <button
                            className="w-full bg-primary text-[#090D0F] font-bold py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                            disabled={closed || status.busy}
                            onClick={send}
                          >
                            {status.busy && <Loader2 size={16} className="animate-spin" />}
                            {status.busy ? 'Submitting...' : st.receipt ? 'Submit Updated Application' : 'Submit Application'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {status.err && (
                    <div className="border border-spark/30 bg-spark/5 p-4 rounded-md">
                      <p className="text-sm text-spark">Submission failed: {status.err}</p>
                      <p className="text-xs text-textMuted mt-1">
                        Please try clicking submit again, or contact progclub@smail.iitm.ac.in if the issue persists.
                      </p>
                    </div>
                  )}

                  <button className="block text-xs text-textMuted hover:text-spark transition-colors mt-6" onClick={clear}>
                    Clear local storage
                  </button>
                </div>
              )}

              <div className="flex justify-between pt-2">
                {i > 0 ? <Link to={pathOf(steps[i - 1])} className="px-4 py-2 rounded border border-borderLine text-textMuted hover:text-white hover:border-textMuted transition-colors text-sm">Back</Link> : <span />}
                {i < steps.length - 1 && <Link to={pathOf(steps[i + 1])} className="bg-textMain text-background px-4 py-2 rounded font-medium text-sm hover:bg-white transition-colors">Next</Link>}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}