/* Saint Germain — High-Conversion Menu JS */

// ── Search suggestions (top internal search terms from GA4) ──────────────
const POPULAR_SEARCHES = [
  { label: 'Óculos de Sol Feminino', href: '/oculos/oculos-de-sol/oculos-de-sol-feminino/' },
  { label: 'Relógio Feminino', href: '/relogios/relogio-feminino/' },
  { label: 'Relógio Masculino', href: '/relogios/relogio-masculino/' },
  { label: 'Tori', href: '/relogios/tori/' },
  { label: 'Napoli', href: '/relogios/napoli/' },
  { label: 'Mizu', href: '/relogios/mizu/' },
  { label: 'Chelsea Gold', href: '/relogios/chelsea-gold/' },
  { label: 'Bracelete', href: '/relogios/relogio-feminino/bracelete/' },
  { label: 'Anel', href: '/joias/anel/' },
  { label: 'Oval', href: '/oculos/oval/' },
  { label: 'Aviador', href: '/oculos/aviador/' },
  { label: 'Ibiza', href: '/relogios/ibiza/' },
  { label: 'Siena Tartaruga', href: '/oculos/siena/' },
  { label: 'Mini Belle', href: '/relogios/mini-belle/' },
  { label: 'Murray Full Black', href: '/relogios/murray-full-black/' },
];

// ── Desktop nav: hover open/close ────────────────────────────────────────
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

    // Keep open when re-entering submenu
    const panel = item.querySelector('.mega-menu, .dropdown');
    if (panel) {
      panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      items.forEach(i => {
        i.classList.remove('is-open');
        const l = i.querySelector('.nav__link');
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();

// ── Mobile drawer ─────────────────────────────────────────────────────────
(function initMobileDrawer() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('drawerClose');

  function open() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () =>
    drawer.classList.contains('is-open') ? close() : open()
  );
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
})();

// ── Mobile accordion ──────────────────────────────────────────────────────
(function initMobileAccordion() {
  const toggles = document.querySelectorAll('.mobile-nav__toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      // Close siblings
      toggles.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const s = other.nextElementSibling;
          if (s) s.hidden = true;
        }
      });
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (sub) sub.hidden = isOpen;
    });
  });
})();

// ── Search ─────────────────────────────────────────────────────────────────
(function initSearch() {
  const input = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('searchSuggestions');
  const suggestionsList = document.getElementById('suggestionsList');
  const clearBtn = document.getElementById('searchClear');

  if (!input) return;

  function renderSuggestions(items) {
    suggestionsList.innerHTML = items
      .map(s => `<li><a href="${s.href}" role="option">${highlight(s.label, input.value.trim())}</a></li>`)
      .join('');
  }

  function highlight(text, query) {
    if (!query) return text;
    const re = new RegExp(`(${escapeRe(query)})`, 'gi');
    return text.replace(re, '<mark style="background:transparent;font-weight:700;color:#111">$1</mark>');
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function showSuggestions(items) {
    renderSuggestions(items);
    suggestionsBox.hidden = false;
  }

  function hideSuggestions() {
    suggestionsBox.hidden = true;
  }

  input.addEventListener('focus', () => {
    const q = input.value.trim();
    const matches = q
      ? POPULAR_SEARCHES.filter(s => s.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
      : POPULAR_SEARCHES.slice(0, 8);
    showSuggestions(matches);
  });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearBtn.hidden = !q;
    if (!q) {
      showSuggestions(POPULAR_SEARCHES.slice(0, 8));
      return;
    }
    const matches = POPULAR_SEARCHES.filter(s =>
      s.label.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 8);

    if (matches.length) {
      showSuggestions(matches);
    } else {
      // No matches — show fallback best-sellers
      suggestionsList.innerHTML = `
        <li style="padding:8px 14px;font-size:13px;color:#999;">Sem sugestões — veja os <a href="/best-seller/" style="color:#c9a84c;font-weight:600;">Best Sellers</a></li>
      `;
      suggestionsBox.hidden = false;
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    showSuggestions(POPULAR_SEARCHES.slice(0, 8));
    input.focus();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) hideSuggestions();
  });

  // Keyboard navigation in suggestions
  input.addEventListener('keydown', e => {
    const items = [...suggestionsList.querySelectorAll('a')];
    const focused = document.activeElement;
    const idx = items.indexOf(focused);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      (items[idx + 1] || items[0])?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx <= 0) { input.focus(); return; }
      items[idx - 1]?.focus();
    } else if (e.key === 'Escape') {
      hideSuggestions();
      input.blur();
    }
  });
})();
