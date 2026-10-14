// Every .md under ./content becomes a block. Frontmatter: id, page, type, order, required, validate.
import { PAGES } from './config';
const files = import.meta.glob('./content/**/*.md', { query: '?raw', import: 'default', eager: true });
const parse = raw => {
  raw = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  (m?.[1] || '').split('\n').forEach(l => {
    const i = l.indexOf(':'); if (i < 1) return;
    const v = l.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    meta[l.slice(0, i).trim()] = v === 'true' ? true : v === 'false' ? false : v !== '' && !isNaN(v) ? Number(v) : v;
  });
  return { ...meta, body: (m?.[2] ?? raw).trim() };
};
export const blocks = Object.values(files).map(parse).sort((a, b) => a.order - b.order);

if (import.meta.env.DEV) {
  const ids = blocks.map(b => b.id);
  ids.filter((x, i) => ids.indexOf(x) !== i).forEach(x => console.error('[dc] duplicate block id:', x));
  ['name', 'roll', 'email'].forEach(x => ids.includes(x) || console.error('[dc] required block missing:', x));
}
export const slug = s => s.toLowerCase().replace(/\W+/g, '-').replace(/^-|-$/g, '');
export const stepOf = b => ({ part: b.page, slug: b.sub ? slug(b.sub) : '' });
export const steps = [];
PAGES.forEach(p => blocks.filter(b => b.page === p.key).forEach(b => {
  const s = stepOf(b);
  if (!steps.some(x => x.part === s.part && x.slug === s.slug)) steps.push({ ...s, title: b.sub || p.label });
}));
steps.push({ part: 'review', slug: '', title: 'Review and submit' });