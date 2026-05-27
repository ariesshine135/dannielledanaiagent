// ─────────────────────────────────────────────────────────────
//  Book signup → Google Sheets
//
//  SETUP (one-time, ~5 min):
//  1. Open this sheet in your browser:
//       https://sheets.google.com  → create a new sheet named "Book Signups"
//  2. In that sheet go to Extensions → Apps Script
//  3. Delete any code there and paste the contents of js/signup-script.gs
//  4. Click "Deploy" → "New deployment" → type: Web app
//       Execute as: Me | Who has access: Anyone → Deploy
//  5. Copy the web app URL and paste it below (replace the placeholder)
// ─────────────────────────────────────────────────────────────

var GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwGlFDXgk7PQM0cN7Am5yQH6M4U4OpZdexTw0AY128k1kp0k18jmbPZdzuL0tfLua8S/exec';

function handleSignup(e, confirmId) {
  e.preventDefault();
  var form   = e.target;
  var email  = form.querySelector('input[type="email"]').value.trim();
  var btn    = form.querySelector('button');
  var source = form.getAttribute('data-source') || 'unknown';

  if (!email) return;

  var originalLabel = btn.textContent;
  btn.textContent = 'Saving…';
  btn.disabled = true;

  // mode:'no-cors' suppresses the response body but the POST
  // still reaches Apps Script and the row is written to your sheet.
  fetch(GOOGLE_SHEET_URL, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email: email, source: source })
  })
  .then(function()  { _done(form, btn, confirmId, originalLabel); })
  .catch(function() { _done(form, btn, confirmId, originalLabel); });
}

function _done(form, btn, confirmId, originalLabel) {
  if (confirmId) {
    var el = document.getElementById(confirmId);
    if (el) el.style.display = 'block';
  }
  form.querySelector('input').value = '';
  btn.textContent = '✓ You\'re on the list!';
  btn.disabled = false;
  setTimeout(function() { btn.textContent = originalLabel; }, 4000);
}
