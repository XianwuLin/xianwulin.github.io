import Comment from './components/Comment.js'
import Archive from './components/Archive.js'
import Toc from './components/Toc.js'

import './css/main.scss'

if ( document.getElementById("postArchive") ) {
  new Archive()
}

if ( document.getElementById("commentContainer") ) {
  new Comment()
}

// Initialize table of contents on post/page layouts
if ( document.querySelector('.post__content.content') ) {
  new Toc()
}

initMermaid();
initTheme();
initWidthToggle();

/**
 * Dark/Light mode toggle with localStorage persistence.
 */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('.theme-toggle__icon');
  const html = document.documentElement;

  // Load saved preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  });
}

/**
 * Content width toggle with localStorage persistence.
 * Cycles: normal → wide → narrow → normal
 */
function initWidthToggle() {
  const toggle = document.getElementById('widthToggle');
  if (!toggle) return;

  const html = document.documentElement;

  const LABELS = {
    narrow: '窄栏 · 700px',
    normal: '默认 · 840px',
    wide:   '宽栏 · 1020px'
  };

  function getCurrent() {
    return html.getAttribute('data-content-width') || 'normal';
  }

  function updateUI(mode) {
    // Update tooltip to show current + hint for next
    const cycle = { normal: 'wide', wide: 'narrow', narrow: 'normal' };
    const next = cycle[mode];
    toggle.setAttribute('title', `${LABELS[mode]}  → 点击切换为${LABELS[next]}`);
  }

  // Load saved preference
  const savedWidth = localStorage.getItem('contentWidth');
  if (savedWidth && savedWidth !== 'normal') {
    html.setAttribute('data-content-width', savedWidth);
  }
  updateUI(getCurrent());

  toggle.addEventListener('click', () => {
    const current = getCurrent();
    const cycle = { normal: 'wide', wide: 'narrow', narrow: 'normal' };
    const next = cycle[current];

    if (next === 'normal') {
      html.removeAttribute('data-content-width');
      localStorage.setItem('contentWidth', 'normal');
    } else {
      html.setAttribute('data-content-width', next);
      localStorage.setItem('contentWidth', next);
    }
    updateUI(next);
  });
}

/**
 * Get all of the mermaid code block and transform them into the format can be parsed by mermaid.
 */
function initMermaid() {
  let codes = document.getElementsByClassName("language-mermaid");

  while( codes.length > 0 ) {
    let code = codes[0];
    let content = code.innerText;

    let chart = document.createElement("div");
    chart.className = "mermaid";
    chart.innerHTML = content;

    let p = code.parentNode;
    while( p.tagName != "DIV" ) {
      p = p.parentNode;
    }

    p.replaceChild(chart, code.parentNode);
  }
}
