// src/dc/content.js
import { PAGES } from './config';

const files = import.meta.glob('./content/**/*.md', { query: '?raw', import: 'default', eager: true });

export const slug = s => (s || '').toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

const parseFrontmatter = (fmStr) => {
  const meta = {};
  fmStr.split('\n').forEach(line => {
    const cleanLine = line.split(/#(?!.*['"])/)[0].trim();
    const idx = cleanLine.indexOf(':');
    if (idx < 1) return;

    const key = cleanLine.slice(0, idx).trim();
    let val = cleanLine.slice(idx + 1).trim().replace(/^["']|["']\$/g, '');

    if (val === 'true') meta[key] = true;
    else if (val === 'false') meta[key] = false;
    else if (val !== '' && !isNaN(val)) meta[key] = Number(val);
    else meta[key] = val;
  });
  return meta;
};

const parseMulti = (raw, filePath = '') => {
  const clean = (raw || '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
  const fileFallback = filePath.split('/').pop()?.replace(/\.md\$/, '') || 'content';

  if (!clean.startsWith('---')) {
    return [{ id: `${fileFallback}-0`, page: 'apply', type: 'reading', order: 9999, body: clean }];
  }

  // Smart split: Only split on '---' if the very next line contains a valid frontmatter key (e.g., 'id:', 'page:')
  const sections = clean.split(/^---(?=[ \t]*\n+[a-zA-Z0-9_-]+:)/gm).filter(s => s.trim());

  const parsedBlocks = [];
  let defaultPage = 'apply';
  let defaultSub = '';
  let baseOrder = 9999;

  sections.forEach((section, idx) => {
    // Split each section by its FIRST closing '---' to cleanly separate metadata from the markdown body
    const parts = section.split(/^---[ \t]*(?:\n|\$)/m);
    const fmStr = parts[0] || '';

    // Rejoin the rest just in case the body text naturally contains '---' horizontal rules
    const bodyStr = parts.slice(1).join('---').trim();

    const meta = parseFrontmatter(fmStr);

    if (idx === 0) {
      if (meta.page) defaultPage = meta.page;
      if (meta.sub) defaultSub = meta.sub;
      if (meta.order !== undefined) baseOrder = Number(meta.order) || 9999;
    }

    parsedBlocks.push({
      type: 'reading', // Default to reading if type is omitted
      ...meta,
      id: meta.id || `${fileFallback}-${idx}`,
      page: meta.page || defaultPage,
      sub: meta.sub !== undefined ? meta.sub : defaultSub,
      order: meta.order !== undefined ? Number(meta.order) : (baseOrder + idx * 0.005),
      body: bodyStr
    });
  });

  return parsedBlocks;
};

export const blocks = Object.entries(files)
  .flatMap(([path, raw]) => parseMulti(raw, path))
  .sort((a, b) => a.order - b.order);

if (import.meta.env.DEV) {
  const ids = blocks.map(b => b.id).filter(Boolean);
  ids.filter((x, i) => ids.indexOf(x) !== i).forEach(x => console.error('[dc] duplicate block id:', x));
  ['name', 'roll', 'email'].forEach(x => ids.includes(x) || console.error('[dc] required block missing:', x));
}

export const stepOf = b => ({
  part: b.page || 'apply',
  slug: b.sub ? slug(b.sub) : ''
});

export const steps = [];

PAGES.forEach(p => {
  if (p.key === 'review') return;
  const pageBlocks = blocks.filter(b => b.page === p.key);

  const distinctSubs = [];
  pageBlocks.forEach(b => {
    const subTitle = b.sub ? b.sub.trim() : '';
    const subSlug = subTitle ? slug(subTitle) : '';
    if (!distinctSubs.some(x => x.slug === subSlug)) {
      distinctSubs.push({ slug: subSlug, title: subTitle || p.label });
    }
  });

  if (distinctSubs.length === 0) {
    steps.push({ part: p.key, slug: '', title: p.label });
  } else {
    distinctSubs.forEach(s => {
      steps.push({ part: p.key, slug: s.slug, title: s.title });
    });
  }
});

steps.push({ part: 'review', slug: '', title: 'Review and submit' });