import { CONFIG } from './config';

export const submit = async (answers, blocks, otp) => {
  // Format the Q&A nicely for the backend PDF generator
  const qna = blocks
    .filter(b => b.type !== 'reading' && b.id !== 'name' && b.id !== 'roll' && b.id !== 'email')
    .map(b => ({
      question: b.body.split('\n')[0].replace(/[#*`]/g, '').trim(),
      answer: answers[b.id] || '(Blank)'
    }));

  const payload = {
    action: 'submit',
    name: answers.name,
    roll: answers.roll,
    otp: otp,
    qna: qna // This is what the Apps Script is looking for!
  };

  const res = await fetch(CONFIG.SUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
  return data;
};