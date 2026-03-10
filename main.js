/* ══ SMY STUDIO – main.js ══ */

/* ══ HTML Partials – inline inject (works with file://) ══ */

const HEADER_HTML = `
<!-- ══ HEADER ══ -->
<header id="hdr">
  <div class="wrap">
    <div class="hi">
      <a href="index.html" class="logo">SMY <em>STUDIO</em></a>
      <nav class="nd">
        <a href="index.html#mission">Über uns</a>
        <a href="index.html#angebot1">KI-Brandfotos</a>
        <a href="index.html#angebot-video">KI-Videos</a>
        <a href="index.html#angebot2">Kampagnen</a>
        <a href="index.html#angebot3">Ads Creatives</a>
        <a href="index.html#team">Über mich</a>
        <a href="index.html#testi">Kundenstimmen</a>
      </nav>
      <a href="index.html#ctaform" class="btn btn-r hdcta">Demo anfragen</a>
      <button class="brg" id="brg">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile overlay + drawer -->
<div class="dov" id="dov"></div>
<nav class="drw" id="drw">
  <a href="index.html#mission"       class="dl">Über uns</a>
  <a href="index.html#angebot1"      class="dl">KI-Brandfotos</a>
  <a href="index.html#angebot-video" class="dl">KI-Videos</a>
  <a href="index.html#angebot2"      class="dl">Kampagnen</a>
  <a href="index.html#angebot3"      class="dl">Ads Creatives</a>
  <a href="index.html#team"          class="dl">Über mich</a>
  <a href="index.html#testi"         class="dl">Kundenstimmen</a>
  <a href="index.html#ctaform" class="btn btn-r dl" style="justify-content:center;margin-top:1rem">Demo anfragen</a>
</nav>
`;

const FOOTER_HTML = `
<!-- ══ FOOTER ══ -->
<footer>
  <div class="wrap">
    <div class="ftop">
      <div class="fbrand">
        <a href="index.html" class="logo">SMY <em>STUDIO</em></a>
        <p>Premium KI-Brandfotos für Personal Brands, Beauty Clinics &amp; E-Commerce – in 48–72h.</p>
        <a href="index.html#ctaform" class="btn btn-ol" style="font-size:.8rem;padding:.75rem 1.8rem">Demo anfragen</a>
      </div>
      <div class="fcol">
        <h5>Leistungen</h5>
        <div class="flinks">
          <a href="index.html#angebot1">Personal Brand Visuals</a>
          <a href="index.html#angebot-video">KI-Brand Videos</a>
          <a href="index.html#angebot2">Brand Campaign Visuals</a>
          <a href="index.html#angebot3">Ads Creatives</a>
        </div>
      </div>
      <div class="fcol">
        <h5>Rechtliches</h5>
        <div class="flinks">
          <a href="impressum.html">Impressum</a>
          <a href="datenschutz.html">Datenschutz</a>
          <a href="index.html#ctaform">Kontakt</a>
        </div>
      </div>
    </div>
    <div class="fbot">
      <span>Copyright &copy; 2025 – SMY STUDIO</span>
      <div style="display:flex;gap:1.5rem">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
      </div>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const hp = document.getElementById('header-placeholder');
  const fp = document.getElementById('footer-placeholder');
  if (hp) hp.outerHTML = HEADER_HTML;
  if (fp) fp.outerHTML = FOOTER_HTML;

  // Init after partials are injected
  initHeader();
  initBurger();
  initReveal();
  initSmoothScroll();
});

function initHeader() {
  const hdr = document.getElementById('hdr');
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('sc', window.scrollY > 50);
  }, { passive: true });
}

function initBurger() {
  const brg = document.getElementById('brg');
  const drw = document.getElementById('drw');
  const dov = document.getElementById('dov');
  if (!brg) return;

  const openMenu = () => {
    brg.classList.add('on'); drw.classList.add('on'); dov.classList.add('on');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    brg.classList.remove('on'); drw.classList.remove('on'); dov.classList.remove('on');
    document.body.style.overflow = '';
  };

  brg.addEventListener('click', () => drw.classList.contains('on') ? closeMenu() : openMenu());
  dov.addEventListener('click', closeMenu);
  document.querySelectorAll('.dl').forEach(link => link.addEventListener('click', closeMenu));
}

function initReveal() {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 72,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ── Form helpers ──
function setError(fieldId, errId) {
  document.getElementById(fieldId).classList.add('er');
  const err = document.getElementById(errId);
  if (err) { err.classList.add('on'); err.style.display = 'block'; }
}
function clearError(fieldId, errId) {
  document.getElementById(fieldId).classList.remove('er');
  const err = document.getElementById(errId);
  if (err) { err.classList.remove('on'); err.style.display = 'none'; }
}

// ── Live field validation ──
['fn', 'ln', 'em', 'br', 'zi'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input',  () => clearError(id, id + '-e'));
    el.addEventListener('change', () => clearError(id, id + '-e'));
  }
});

// ── Form submit via Formspree ──
async function submitForm() {
  let valid = true;

  // Clear all errors first
  ['fn', 'ln', 'em', 'br', 'zi'].forEach(id => clearError(id, id + '-e'));
  const coe = document.getElementById('co-e');
  if (coe) { coe.style.display = 'none'; coe.classList.remove('on'); }

  // Validate
  if (!document.getElementById('fn').value.trim())  { setError('fn', 'fn-e'); valid = false; }
  if (!document.getElementById('ln').value.trim())  { setError('ln', 'ln-e'); valid = false; }

  const email = document.getElementById('em').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('em', 'em-e'); valid = false; }

  if (!document.getElementById('br').value) { setError('br', 'br-e'); valid = false; }
  if (!document.getElementById('zi').value) { setError('zi', 'zi-e'); valid = false; }

  if (!document.getElementById('co').checked) {
    if (coe) { coe.style.display = 'block'; coe.classList.add('on'); }
    valid = false;
  }

  if (!valid) return;

  // Build form data
  const formData = new FormData();
  formData.append('Vorname',   document.getElementById('fn').value.trim());
  formData.append('Nachname',  document.getElementById('ln').value.trim());
  formData.append('Email',     email);
  formData.append('Website',   document.getElementById('ws').value.trim());
  formData.append('Branche',   document.getElementById('br').value);
  formData.append('Ziel',      document.getElementById('zi').value);

  // Disable button while sending
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Wird gesendet …';

  try {
    const response = await fetch('https://formspree.io/f/movggzpl', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      document.getElementById('dfw').style.display = 'none';
      const success = document.getElementById('fsucc');
      success.classList.add('on');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      btn.disabled = false;
      btn.textContent = 'Jetzt Demo anfragen →';
      alert('Fehler beim Senden. Bitte versuche es erneut.');
    }
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Jetzt Demo anfragen →';
    alert('Netzwerkfehler. Bitte versuche es erneut.');
  }
}

// ── Mute Toggle ──
function toggleMute(videoId, btnId) {
  const vid = document.getElementById(videoId);
  const btn = document.getElementById(btnId);
  if (!vid) return;
  vid.muted = !vid.muted;
  const muteIcon  = btn.querySelector('[id$="-mute-icon"]');
  const soundIcon = btn.querySelector('[id$="-sound-icon"]');
  const label     = btn.querySelector('span');
  if (vid.muted) {
    if (muteIcon)  muteIcon.style.display  = '';
    if (soundIcon) soundIcon.style.display = 'none';
    if (label) label.textContent = 'Ton an';
  } else {
    if (muteIcon)  muteIcon.style.display  = 'none';
    if (soundIcon) soundIcon.style.display = '';
    if (label) label.textContent = 'Ton aus';
  }
}