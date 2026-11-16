/**
 * Novara — Links Page
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. Dynamic year in footer
     ----------------------------------------------- */
  const footer = document.querySelector('footer');
  if (footer) {
    footer.textContent = `\u00A9 ${new Date().getFullYear()} NOVARA`;
  }

  /* -----------------------------------------------
     2. Touch device: tap to expand, tap again to go
     ----------------------------------------------- */
  const cards = document.querySelectorAll('.card');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    document.body.classList.add('is-touch');

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('expanded')) {
          // First tap → expand this card, collapse others
          e.preventDefault();
          cards.forEach(c => {
            if (c !== card) c.classList.remove('expanded');
          });
          card.classList.add('expanded');
        }
        // Second tap → let the default navigation happen
      });
    });

    // Tap outside any card → collapse all
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.card')) {
        cards.forEach(c => c.classList.remove('expanded'));
      }
    });
  }

  /* -----------------------------------------------
     3. Parallax orbs on pointer move (desktop only)
     ----------------------------------------------- */
  const orbs = document.querySelectorAll('.orb');

  if (window.matchMedia('(pointer: fine)').matches && orbs.length) {
    const speeds = [0.03, -0.025, 0.018];

    document.addEventListener('mousemove', (e) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;

      orbs.forEach((orb, i) => {
        const s = speeds[i] || 0.02;
        orb.style.transform = `translate(${cx * s}px, ${cy * s}px)`;
      });
    });
  }

});
