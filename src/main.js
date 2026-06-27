import Comment from './components/Comment.js'
import Archive from './components/Archive.js'

import './css/main.scss'

if ( document.getElementById("postArchive") ) {
  new Archive()
}

if ( document.getElementById("commentContainer") ) {
  new Comment()
}

initMermaid();
initTheme();

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
