// ─────────────────────────────────────────────────────────────
//  Book signup → Google Sheets
//  Uses image beacon — bypasses all CORS/redirect restrictions
// ─────────────────────────────────────────────────────────────

var GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzWlGTIWTgT5qDYGIPp3yeRhy32kzqyhITIwTF51FGDckiwy0n69EG68zZa_2FWKTWm/exec';

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

  // Image beacon: browser fires the GET request with zero CORS friction
  var beacon = new Image();
  beacon.src = GOOGLE_SHEET_URL
    + '?email='  + encodeURIComponent(email)
    + '&source=' + encodeURIComponent(source);

  // Show confirmation after a short delay (enough for the request to fire)
  setTimeout(function() {
    _done(form, btn, confirmId, originalLabel);
  }, 800);
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
