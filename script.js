// The Ancestors' Room - subtle interactions

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll indicator dots based on scroll position
  const dots = document.querySelectorAll('.scroll-dots .dot');

  function updateScrollDots() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    
    let activeIndex = 0;
    if (scrollY > vh * 2.2) activeIndex = 3;
    else if (scrollY > vh * 1.4) activeIndex = 2;
    else if (scrollY > vh * 0.5) activeIndex = 1;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  window.addEventListener('scroll', updateScrollDots, { passive: true });
  updateScrollDots();

  // Parallax-ish feel on hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
      }
    }, { passive: true });
  }

  // Card hover glow enhancement
  document.querySelectorAll('.explore-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s';
    });
  });

  // Menu button placeholder (can expand later)
  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      // Future: open side navigation / object map of the room
      console.log('Menu opened - room object map coming soon');
    });
  }
});
