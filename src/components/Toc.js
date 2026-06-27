/**
 * Table of Contents generator with scroll-spy.
 * Scans headings inside .post__content.content and builds a fixed left-side
 * outline navigation that highlights the currently visible section.
 */
export default class Toc {
  constructor() {
    this.container = document.querySelector('.post__content.content')
    if (!this.container) return

    this.headings = this.container.querySelectorAll('h1, h2, h3, h4')
    if (this.headings.length < 2) return

    this._ensureHeadingIds()
    this._buildNav()
    this._initScrollSpy()
  }

  /**
   * Generate slugified id attributes for headings that lack them.
   */
  _ensureHeadingIds() {
    const used = new Set()
    this.headings.forEach((h) => {
      if (!h.id) {
        let slug = h.textContent
          .trim()
          .toLowerCase()
          .replace(/[^\w一-鿿\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
        // Deduplicate
        let candidate = slug || 'section'
        let n = 1
        while (used.has(candidate)) {
          candidate = `${slug}-${n++}`
        }
        used.add(candidate)
        h.id = candidate
      } else {
        used.add(h.id)
      }
    })
  }

  /**
   * Build the <nav class="section-nav"> element and prepend to the content area.
   */
  _buildNav() {
    const nav = document.createElement('nav')
    nav.className = 'section-nav'

    const ul = document.createElement('ul')
    ul.className = 'section-nav__list'

    this.headings.forEach((h) => {
      const li = document.createElement('li')
      li.className = `section-nav__item section-nav__item--${h.tagName.toLowerCase()}`
      li.dataset.target = h.id

      const a = document.createElement('a')
      a.href = `#${h.id}`
      a.textContent = h.textContent.trim()
      a.addEventListener('click', (e) => {
        e.preventDefault()
        this._scrollToHeading(h)
      })

      li.appendChild(a)
      ul.appendChild(li)
    })

    nav.appendChild(ul)
    this.container.prepend(nav)

    this.nav = nav
    this.navItems = nav.querySelectorAll('.section-nav__item')
  }

  /**
   * Smooth-scroll to a heading, accounting for the fixed header offset.
   */
  _scrollToHeading(heading) {
    const top = heading.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  /**
   * Use IntersectionObserver to track which heading is currently in view
   * and highlight the corresponding TOC link.
   */
  _initScrollSpy() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = this.nav.querySelector(`[data-target="${entry.target.id}"]`)
          if (!item) return
          if (entry.isIntersecting) {
            // Remove active from all items, then add to the intersecting one
            this.navItems.forEach((el) => el.classList.remove('active'))
            item.classList.add('active')
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      }
    )

    this.headings.forEach((h) => observer.observe(h))
  }
}
