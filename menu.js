/* Saint Germain — High-Conversion Menu JS */

// ── SVG icons por categoria ──────────────────────────────────────────────
const STROKE = '#555';
const CAT_SVG = {
  // Relógios
  'watch-gold':    watchSvg(STROKE),
  'watch-silver':  watchSvg(STROKE),
  'watch-rose':    watchSvg(STROKE),
  'watch-black':   watchSvg(STROKE),
  'watch-bicolor': watchSvg(STROKE),
  'watch-vintage': watchSvg(STROKE),
  'watch-leather': watchSvg(STROKE),
  // Óculos
  'glasses-sol-f':  glassesSvg(STROKE),
  'glasses-sol-m':  glassesSvg(STROKE),
  'glasses-grau-f': glassesSvg(STROKE),
  'glasses-grau-m': glassesSvg(STROKE),
  'glasses-oval':   glassesSvg(STROKE),
  'glasses-aviador':glassesSvg(STROKE),
  'glasses-boxy':   glassesSvg(STROKE),
  'glasses-round':  glassesSvg(STROKE),
  'glasses-cat':    glassesSvg(STROKE),
  'glasses-tort':   glassesSvg(STROKE),
  // Misc
  'gift-f':   giftSvg(STROKE),
  'gift-m':   giftSvg(STROKE),
  'gift-kit': giftSvg(STROKE),
  'new':      newSvg(),
  'star':     starSvg(),
  'sale':     saleSvg(),
};

function watchSvg(stroke) {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round">
    <rect x="5" y="7" width="14" height="10" rx="5"/>
    <polyline points="12 9.5 12 12 13.5 13"/>
    <line x1="9" y1="5" x2="9" y2="7"/><line x1="15" y1="5" x2="15" y2="7"/>
    <line x1="9" y1="17" x2="9" y2="19"/><line x1="15" y1="17" x2="15" y2="19"/>
  </svg>`;
}

function glassesSvg(stroke) {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round">
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <circle cx="8" cy="12" r="3.5"/>
    <circle cx="16" cy="12" r="3.5"/>
    <path d="M11.5 12h1"/>
  </svg>`;
}

function giftSvg(stroke) {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>`;
}

function newSvg() {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`;
}

function starSvg() {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`;
}

function saleSvg() {
  return `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${STROKE}" stroke-width="1.2" stroke-linecap="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>`;
}

// ── Search suggestions ────────────────────────────────────────────────────
const POPULAR_SEARCHES = [
  { label: 'Oculos de Sol Feminino', href: '/oculos/oculos-de-sol/oculos-de-sol-feminino/' },
  { label: 'Relogio Feminino',       href: '/relogios/relogio-feminino/' },
  { label: 'Relogio Masculino',      href: '/relogios/relogio-masculino/' },
  { label: 'Tori',                   href: '/relogios/tori/' },
  { label: 'Napoli',                 href: '/relogios/napoli/' },
  { label: 'Mizu',                   href: '/relogios/mizu/' },
  { label: 'Chelsea Gold',           href: '/relogios/chelsea-gold/' },
  { label: 'Bracelete',              href: '/relogios/relogio-feminino/bracelete/' },
  { label: 'Anel',                   href: '/joias/anel/' },
  { label: 'Oval',                   href: '/oculos/oval/' },
  { label: 'Aviador',                href: '/oculos/aviador/' },
  { label: 'Ibiza',                  href: '/relogios/ibiza/' },
  { label: 'Siena Tartaruga',        href: '/oculos/siena/' },
  { label: 'Mini Belle',             href: '/relogios/mini-belle/' },
  { label: 'Murray Full Black',      href: '/relogios/murray-full-black/' },
];

// ── Desktop nav hover ─────────────────────────────────────────────────────
(function initDesktopNav() {
  const items = document.querySelectorAll('.nav__item.has-mega, .nav__item.has-dropdown');
  let closeTimer = null;
  items.forEach(item => {
    const link = item.querySelector('.nav__link');
    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      items.forEach(i => i !== item && i.classList.remove('is-open'));
      item.classList.add('is-open');
      if (link) link.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => {
        item.classList.remove('is-open');
        if (link) link.setAttribute('aria-expanded', 'false');
      }, 120);
    });
    const panel = item.querySelector('.mega-menu, .dropdown');
    if (panel) panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') items.forEach(i => {
      i.classList.remove('is-open');
      const l = i.querySelector('.nav__link');
      if (l) l.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── Mega-menu preview panels ──────────────────────────────────────────────
(function initPreview() {
  document.querySelectorAll('.mega-menu').forEach(menu => {
    const panel     = menu.querySelector('[data-preview-panel]');
    const imgEl     = menu.querySelector('[data-preview-img]');
    const labelEl   = menu.querySelector('[data-preview-label]');
    const subEl     = menu.querySelector('[data-preview-sub]');
    if (!panel) return;

    // Links com data-label dentro deste mega-menu
    const links = menu.querySelectorAll('[data-label]');
    let hideTimer = null;

    // Estado default: primeiro link com data-label
    function setDefault() {
      const first = links[0];
      if (!first) return;
      update(first.dataset.label, first.dataset.sub, first.dataset.cat);
    }
    setDefault();

    function update(label, sub, cat) {
      labelEl.textContent = label || '';
      subEl.textContent   = sub   || '';
      imgEl.setAttribute('data-cat', cat || '');
      imgEl.innerHTML = CAT_SVG[cat] || CAT_SVG['star'];
      panel.classList.add('is-active');
    }

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
        update(link.dataset.label, link.dataset.sub, link.dataset.cat);
      });
      link.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(() => {
          setDefault();
        }, 200);
      });
    });
  });
})();

// ── Mobile drawer ─────────────────────────────────────────────────────────
(function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const overlay   = document.getElementById('overlay');
  const closeBtn  = document.getElementById('drawerClose');
  function open()  { drawer.classList.add('is-open'); overlay.classList.add('is-visible'); hamburger.classList.add('is-open'); hamburger.setAttribute('aria-expanded','true'); drawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function close() { drawer.classList.remove('is-open'); overlay.classList.remove('is-visible'); hamburger.classList.remove('is-open'); hamburger.setAttribute('aria-expanded','false'); drawer.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  hamburger.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open());
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) close(); });
})();

// ── Mobile accordion ──────────────────────────────────────────────────────
(function initMobileAccordion() {
  const toggles = document.querySelectorAll('.mobile-nav__toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const sub    = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      toggles.forEach(other => { if (other !== btn) { other.setAttribute('aria-expanded','false'); const s = other.nextElementSibling; if (s) s.hidden = true; } });
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;
    });
  });
})();

// ── Photo manager ─────────────────────────────────────────────────────────
(function initPhotoManager() {
  const SLOTS = [
    { key: 'cat-rel-f',  cardIdx: 0 },
    { key: 'cat-rel-m',  cardIdx: 1 },
    { key: 'cat-oculos', cardIdx: 2 },
    { key: 'cat-lanc',   cardIdx: 3 },
    { key: 'cat-sale',   cardIdx: 4 },
  ];
  const cards = document.querySelectorAll('.mobile-cat-card');

  function applyPhoto(key, dataUrl) {
    const slot = SLOTS.find(s => s.key === key);
    if (!slot) return;
    const card = cards[slot.cardIdx];
    if (card) card.querySelector('img').src = dataUrl || '';
    const thumb = document.getElementById('thumb-' + key);
    if (thumb) {
      thumb.src = dataUrl || '';
      thumb.classList.toggle('has-photo', !!dataUrl);
      const emptyTxt = thumb.parentElement.querySelector('.photo-slot__empty-txt');
      if (emptyTxt) emptyTxt.style.display = dataUrl ? 'none' : '';
    }
  }

  // Apply stored photos on load
  SLOTS.forEach(({ key }) => {
    const stored = localStorage.getItem('sg_photo_' + key);
    if (stored) applyPhoto(key, stored);
  });

  // Panel open/close
  const overlay  = document.getElementById('photoMgrOverlay');
  const openBtn  = document.getElementById('photoMgrBtn');
  const closeBtn = document.getElementById('photoMgrClose');
  const closeBtn2= document.getElementById('photoMgrClose2');
  if (!overlay || !openBtn) return;

  openBtn.addEventListener('click',  () => overlay.classList.add('is-open'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('is-open'));
  closeBtn2.addEventListener('click',() => overlay.classList.remove('is-open'));
  overlay.addEventListener('click',  e => { if (e.target === overlay) overlay.classList.remove('is-open'); });

  // File inputs
  overlay.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      const file = input.files[0];
      const key  = input.dataset.slot;
      if (!file || !key) return;
      const reader = new FileReader();
      reader.onload = e => {
        const dataUrl = e.target.result;
        localStorage.setItem('sg_photo_' + key, dataUrl);
        applyPhoto(key, dataUrl);
      };
      reader.readAsDataURL(file);
      input.value = '';
    });
  });

  // Remove buttons
  overlay.querySelectorAll('.photo-slot__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.slot;
      localStorage.removeItem('sg_photo_' + key);
      applyPhoto(key, '');
    });
  });

  // Clear all
  document.getElementById('photoMgrClearAll').addEventListener('click', () => {
    SLOTS.forEach(({ key }) => {
      localStorage.removeItem('sg_photo_' + key);
      applyPhoto(key, '');
    });
  });
})();

// ── Search ────────────────────────────────────────────────────────────────
(function initSearch() {
  const input          = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('searchSuggestions');
  const suggestionsList= document.getElementById('suggestionsList');
  const clearBtn       = document.getElementById('searchClear');
  if (!input) return;

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlight(text, q) {
    if (!q) return text;
    return text.replace(new RegExp('(' + escapeRe(q) + ')', 'gi'), '<mark style="background:transparent;font-weight:700">$1</mark>');
  }
  function render(items) {
    suggestionsList.innerHTML = items.map(s =>
      `<li><a href="${s.href}" role="option">${highlight(s.label, input.value.trim())}</a></li>`
    ).join('');
  }
  function show(items)  { render(items); suggestionsBox.hidden = false; }
  function hide()       { suggestionsBox.hidden = true; }

  input.addEventListener('focus', () => {
    const q = input.value.trim();
    show(q ? POPULAR_SEARCHES.filter(s => s.label.toLowerCase().includes(q.toLowerCase())).slice(0,8) : POPULAR_SEARCHES.slice(0,8));
  });
  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearBtn.hidden = !q;
    if (!q) { show(POPULAR_SEARCHES.slice(0,8)); return; }
    const m = POPULAR_SEARCHES.filter(s => s.label.toLowerCase().includes(q.toLowerCase())).slice(0,8);
    if (m.length) { show(m); }
    else { suggestionsList.innerHTML = `<li style="padding:8px 14px;font-size:13px;color:#999">Sem sugestoes — veja os <a href="/best-seller/" style="color:#0d0d0d;text-decoration:underline">Best Sellers</a></li>`; suggestionsBox.hidden = false; }
  });
  clearBtn.addEventListener('click', () => { input.value = ''; clearBtn.hidden = true; show(POPULAR_SEARCHES.slice(0,8)); input.focus(); });
  document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) hide(); });
  input.addEventListener('keydown', e => {
    const items = [...suggestionsList.querySelectorAll('a')];
    const idx   = items.indexOf(document.activeElement);
    if      (e.key === 'ArrowDown') { e.preventDefault(); (items[idx+1] || items[0])?.focus(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); if (idx <= 0) { input.focus(); return; } items[idx-1]?.focus(); }
    else if (e.key === 'Escape')    { hide(); input.blur(); }
  });
})();
