// ─────────────────────────────────────────────────────────────
//  Paste this entire file into Google Apps Script.
//  (Extensions → Apps Script, from your "Book Signups" Google Sheet)
//
//  Columns written to your sheet:
//    A: Timestamp  |  B: Email  |  C: Source page
// ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if the sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    }

    var data   = JSON.parse(e.postData.contents);
    var email  = (data.email  || '').trim();
    var source = (data.source || 'unknown');

    if (!email) {
      return _json({ status: 'error', message: 'No email provided' });
    }

    sheet.appendRow([new Date(), email, source]);

    return _json({ status: 'success' });

  } catch (err) {
    return _json({ status: 'error', message: err.toString() });
  }
}

// Required so the deployment URL resolves correctly
function doGet() {
  return ContentService.createTextOutput('OK');
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
