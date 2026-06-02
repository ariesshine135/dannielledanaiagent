// ─────────────────────────────────────────────────────────────
//  Book signup → Google Sheets
//  Uses GET + URL params (more reliable with no-cors than POST/JSON)
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

  // GET with URL params avoids CORS preflight issues entirely
  var url = GOOGLE_SHEET_URL
    + '?email='  + encodeURIComponent(email)
    + '&source=' + encodeURIComponent(source);

  fetch(url, { method: 'GET', mode: 'no-cors' })
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
