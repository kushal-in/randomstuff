import { CONFIG } from './config';
const empty = () => ({ answers: {} });
export const load = () => { try { return JSON.parse(localStorage.getItem(CONFIG.KEY)) || empty(); } catch { return empty(); } };
export const save = s => { try { localStorage.setItem(CONFIG.KEY, JSON.stringify(s)); return true; } catch { return false; } };
