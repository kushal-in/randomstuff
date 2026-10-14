export const CONFIG = {
  KEY: 'pcdc2026:v1',
  YEAR: 2026,
  DEADLINE: '2026-10-25T23:59:00+05:30', // UI only; the real check is in dc-apps-backend/Code.gs
  SUBMIT_URL: 'https://script.google.com/macros/s/AKfycby4QHCEQ6ktdJ8uFwR-MtJf_dWM15WypLZSZfq36KxN01iXBtzgqs2aQDW0ef_ImSsI/exec',
  // empty = Submit downloads the zip (local testing)
};
// Add a page: add an entry here, then add .md blocks with `page: <key>`.
export const PAGES = [
  { key: 'apply', label: 'Overview and details' },
  { key: 'cp', label: 'Competitive programming' },
  { key: 'dev', label: 'Software Development' },
];
