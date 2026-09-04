/* The Ancestors' Room — interactions & motion */

document.addEventListener('DOMContentLoaded', () => {
  const init = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      initAnimations();
    } else {
      initBasic();
    }
    initUI();
  };

  if (typeof gsap === 'undefined') {
    setTimeout(init, 120);
  } else {
    init();
  }
});

function initUI() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mobileToggle');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    sidebar.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) sidebar.classList.remove('open');
      });
    });
  }

  const soundBtn = document.getElementById('soundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const on = soundBtn.getAttribute('aria-pressed') === 'true';
      soundBtn.setAttribute('aria-pressed', String(!on));
      soundBtn.querySelector('.sound-label').textContent = on ? 'SOUND: OFF' : 'SOUND: ON';
    });
  }

  const sections = document.querySelectorAll('.section[data-nav]');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-nav');
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-10% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const tooltip = document.getElementById('tooltip');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = modalOverlay?.querySelector('.modal-title');
  const modalBody = modalOverlay?.querySelector('.modal-body');
  const modalClose = modalOverlay?.querySelector('.modal-close');

  document.querySelectorAll('.hotspot').forEach(btn => {
    const title = btn.dataset.title || '';
    const desc = btn.dataset.desc || '';

    btn.addEventListener('mouseenter', (e) => {
      if (!tooltip) return;
      tooltip.querySelector('.tooltip-title').textContent = title;
      tooltip.querySelector('.tooltip-desc').textContent = desc;
      tooltip.hidden = false;
      positionTooltip(e, tooltip);
      requestAnimationFrame(() => tooltip.classList.add('visible'));
    });

    btn.addEventListener('mousemove', (e) => positionTooltip(e, tooltip));

    btn.addEventListener('mouseleave', () => {
      if (!tooltip) return;
      tooltip.classList.remove('visible');
      setTimeout(() => { tooltip.hidden = true; }, 250);
    });

    btn.addEventListener('click', () => {
      if (!modalOverlay) return;
      modalTitle.textContent = title;
      modalBody.textContent = desc;
      modalOverlay.hidden = false;
      requestAnimationFrame(() => modalOverlay.classList.add('open'));
    });
  });

  function positionTooltip(e, el) {
    const pad = 16;
    let x = e.clientX + 18;
    let y = e.clientY + 14;
    const rect = el.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - pad) x = e.clientX - rect.width - 12;
    if (y + rect.height > window.innerHeight - pad) y = e.clientY - rect.height - 12;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    setTimeout(() => { modalOverlay.hidden = true; }, 350);
  }

  const form = document.getElementById('joinForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (!input.value) return;
      btn.textContent = 'WELCOME TO THE ROOM';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'JOIN THE ROOM';
        btn.disabled = false;
      }, 3200);
    });
  }
}

function initAnimations() {
  gsap.from('.hero-eyebrow, .hero-title, .hero-subtitle, .begin-btn', {
    y: 36,
    opacity: 0,
    duration: 1.15,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.2
  });

  gsap.from('.table-text > *', {
    scrollTrigger: { trigger: '.table-section', start: 'top 75%' },
    y: 28,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power2.out'
  });

  gsap.from('.hotspot', {
    scrollTrigger: { trigger: '.table-visual', start: 'top 70%' },
    scale: 0,
    opacity: 0,
    duration: 0.55,
    stagger: 0.07,
    ease: 'back.out(1.6)'
  });

  gsap.from('.info-card', {
    scrollTrigger: { trigger: '.cards-row', start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.95,
    stagger: 0.12,
    ease: 'power2.out'
  });

  gsap.from('.door-content > *', {
    scrollTrigger: { trigger: '.door-panel', start: 'top 75%' },
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power2.out'
  });

  gsap.from('.join-content > *', {
    scrollTrigger: { trigger: '.join-panel', start: 'top 75%' },
    y: 24,
    opacity: 0,
    duration: 0.85,
    stagger: 0.09,
    ease: 'power2.out'
  });

  gsap.to('.hero-image', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 80,
    ease: 'none'
  });
}

function initBasic() {
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 150 + i * 120);
  });
}
