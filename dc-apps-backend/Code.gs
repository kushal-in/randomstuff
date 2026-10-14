// Setup: create a Drive folder + a Sheet from the CLUB Google account, paste their IDs below.
// script.google.com > New project > paste > Deploy > New deployment > Web app
// (Execute as: Me, Access: Anyone). To change code later: Deploy > Manage deployments > edit (keeps the URL).
const FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID', SHEET_ID = 'PASTE_SHEET_ID', NOTIFY = 'club@example.com';
const DEADLINE = new Date('2026-12-31T23:59:00+05:30'), MAX = 5e6;

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    if (new Date() > DEADLINE) return out({ ok: false, error: 'Deadline passed' });
    const d = JSON.parse(e.postData.contents);
    if (!d.roll || !d.email || !d.zip || d.zip.length > MAX) return out({ ok: false, error: 'Invalid payload' });
    const fname = String(d.filename).replace(/[^\w.-]/g, '_');
    const f = DriveApp.getFolderById(FOLDER_ID).createFile(Utilities.newBlob(Utilities.base64Decode(d.zip), 'application/zip', fname));
    SpreadsheetApp.openById(SHEET_ID).getSheets()[0].appendRow([new Date(), d.name, d.roll, d.email, f.getUrl()]);
    MailApp.sendEmail(NOTIFY, 'DC submission: ' + d.roll, f.getUrl());
    return out({ ok: true, id: f.getId(), timestamp: new Date().toISOString() });
  } catch (err) { return out({ ok: false, error: String(err) }); }
  finally { lock.releaseLock(); }
}
const out = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
