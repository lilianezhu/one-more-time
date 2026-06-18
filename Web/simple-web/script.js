document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.links-grid a');

  links.forEach((link, index) => {
    link.style.transitionDelay = `${index * 50}ms`;
  });

  window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card, .hero-card');
    const revealPoint = window.innerHeight * 0.85;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < revealPoint) {
        card.classList.add('reveal');
      }
    });
  });

  window.dispatchEvent(new Event('scroll'));
});
