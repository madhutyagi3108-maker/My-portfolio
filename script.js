/* ============================================================
   MADHU — Digital Marketing Portfolio
   script.js  (vanilla JS, no dependencies)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. SCROLL-REVEAL (fade-in / badge cloud) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in, .badge-cloud').forEach((el) => revealObserver.observe(el));

  /* Stagger the animation-delay of each skill badge so they pop in sequence */
  document.querySelectorAll('.badge-cloud').forEach((cloud) => {
    cloud.querySelectorAll('.skill-badge').forEach((badge, i) => {
      badge.style.animationDelay = `${i * 0.045}s`;
    });
  });

  /* ---------- 2. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 3. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((sec) => navObserver.observe(sec));
  }

  /* ---------- 4. SCROLL PROGRESS BAR ---------- */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- 5. BACK TO TOP BUTTON ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 6. TYPEWRITER ROLE ROTATOR ---------- */
  const roleEl = document.querySelector('.hero-role .typed-text');
  const roles = [
    'SEO & On-Page Specialist',
    'Social Media Marketer',
    'Meta Ads Campaign Planner',
    'Performance & Content Marketer',
    'AI-Assisted Web Builder'
  ];

  if (roleEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1400);
          return;
        }
      } else {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 35 : 65);
    };
    type();
  } else if (roleEl) {
    roleEl.textContent = roles[0];
  }

  /* ---------- 7. GRACEFUL IMAGE FALLBACK ---------- */
  /* If a project/ad thumbnail image is missing, hide it so the
     emoji + gradient placeholder underneath shows instead. */
  document.querySelectorAll('.ad-thumb img, .project-card img').forEach((img) => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    }, { once: true });
  });

  /* ---------- 8. CONTACT FORM (mailto fallback, no backend needed) ---------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim() || 'Portfolio Contact';
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in your name, email, and message.';
        formStatus.className = 'form-status error';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
      }

      const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
      const mailto = `mailto:madhutyagi3108@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      window.location.href = mailto;

      formStatus.textContent = 'Opening your email app to send this message…';
      formStatus.className = 'form-status success';
      contactForm.reset();
    });
  }

  /* ---------- 9. CURRENT YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
