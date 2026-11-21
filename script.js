/**
 * META IT SCHOOL — PROFESSIONAL IT EDUCATION WEBSITE
 * Full-Stack JavaScript Engine
 * Features: Responsive Navigation, Particles, Animated Counters,
 * Dynamic IT Battle with LocalStorage, Course Modals, Validation, Carousel, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. SCROLL PROGRESS & BACK-TO-TOP WITH PROGRESS RING
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('progress-circle');

  let circumference = 0;
  if (progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  function handleWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;

    // Top progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${progress * 100}%`;
    }

    // Header sticky styling
    const header = document.getElementById('header');
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button & circular ring
    if (backToTopBtn && progressCircle) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
        const offset = circumference - progress * circumference;
        progressCircle.style.strokeDashoffset = offset;
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy navigation highlight
    updateActiveNavLink();
  }

  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     2. NAVBAR SCROLLSPY & MOBILE DRAWER
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  function updateActiveNavLink() {
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Hamburger drawer
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ==========================================================================
     3. CUSTOM NEON CURSOR (DESKTOP)
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateCursorOutline() {
      // Smooth lerp
      outlineX += (mouseX - outlineX) * 0.16;
      outlineY += (mouseY - outlineY) * 0.16;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursorOutline);
    }
    requestAnimationFrame(animateCursorOutline);

    // Hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .tilt-card, .faq-question');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ==========================================================================
     4. BACKGROUND CANVAS PARTICLES (OPTIMIZED NEON NETWORK)
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
    const particles = [];
    const colors = ['#635BFF', '#00D4FF', '#38BDF8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 91, 255, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(renderParticles);
    }
    requestAnimationFrame(renderParticles);
  }

  /* ==========================================================================
     5. HERO CODE TERMINAL TYPING ANIMATION
     ========================================================================== */
  const codeOutputElem = document.getElementById('typing-code-output');
  if (codeOutputElem) {
    const phrases = [
      'student.level_up() -> Senior Developer 🚀',
      'student.build_portfolio() -> 5+ Real Projects ⚡',
      'student.get_offer() -> 1000$+ Monthly Salary 💼',
      'student.win_hackathon() -> META IT BATTLE Champion 🏆'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeCode() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        codeOutputElem.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        codeOutputElem.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new phrase
      }

      setTimeout(typeCode, typingSpeed);
    }
    typeCode();
  }

  /* ==========================================================================
     6. STATISTIKA SECTION ANIMATED COUNTERS
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out quad
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     7. KURSLAR FILTERING
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const courseCards = document.querySelectorAll('.course-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     8. COURSE DETAILS MODAL DATA & VIEW
     ========================================================================== */
  const courseDetailsData = {
    'frontend': {
      title: 'Frontend Development',
      badge: 'Eng Talabgir Dasturlash Kursi',
      icon: 'assets/images/frontend.svg',
      duration: '6 oy (Haftada 3 kun, 2 soatdan)',
      level: 'Boshlang‘ichdan Professional darajagacha',
      description: 'Web-saytlar va murakkab ilovalarning mijozga ko‘rinadigan interfeyslarini zamonaviy texnologiyalar yordamida mukammal dasturlash.',
      syllabus: [
        { title: '1-modul: Veb-texnologiyalar asosi', desc: 'HTML5 semantik teglari, CSS3 zamonaviy uslublari, Flexbox va CSS Grid tizimi.' },
        { title: '2-modul: Professional JavaScript (ES6+)', desc: 'DOM bilan ishlash, Async/Await, Fetch API, LocalStorage va murakkab funksional mantiq.' },
        { title: '3-modul: Git, GitHub va Jamoaviy ishlab chiqish', desc: 'Versiyalarni boshqarish, branching, pull requests va GitHub Pages/Vercel deploy.' },
        { title: '4-modul: React.js va Zamonaviy Ekosistema', desc: 'Components, Hooks (useState, useEffect, useMemo), Context API, React Router.' },
        { title: '5-modul: State Management va API Integratsiyasi', desc: 'Redux Toolkit, Tailwind CSS, REST API bilan ishlash va optimallashtirish.' },
        { title: '6-modul: Yakuniy Diplom Loyihasi', desc: 'To‘liq e-commerce yoki fintech dashboard loyihasini yaratish va portfolio himoyasi.' }
      ],
      projects: ['Personal Portfolio Site', 'Weather Forecast App', 'Crypto Dashboard', 'E-Commerce Marketplace Web App']
    },
    'backend': {
      title: 'Backend Development',
      badge: 'Yuqori Maoshli Arxitektura Kursi',
      icon: 'assets/images/backend.svg',
      duration: '6 oy (Haftada 3 kun, 2 soatdan)',
      level: 'O‘rta / Kengaytirilgan daraja',
      description: 'Server tizimlari, ma‘lumotlar bazasi, xavfsizlik va RESTful API ishlab chiqish bo‘yicha professional tayyorgarlik.',
      syllabus: [
        { title: '1-modul: Python chuqurlashtirilgan sintaksisi', desc: 'OOP tamoyillari, istisnolarni boshqarish, fayllar bilan ishlash va modullar.' },
        { title: '2-modul: Relyatsion Ma‘lumotlar Bazasi (SQL)', desc: 'PostgreSQL, jadvallar arxitekturasi, JOIN so‘rovlar, indeksatsiya va tranzaksiyalar.' },
        { title: '3-modul: Django Framework', desc: 'MVT arxitekturasi, Django ORM, authentication, admin panel va shablonlar.' },
        { title: '4-modul: Django REST Framework (DRF)', desc: 'Serializers, ViewSets, Token/JWT autentifikatsiyasi, Swagger API dokumentatsiyasi.' },
        { title: '5-modul: Asinxronlik va Keshlashtirish', desc: 'Redis, Celery fon vazifalari, Websockets (Django Channels).' },
        { title: '6-modul: Serverga joylash (DevOps Asoslari)', desc: 'Docker konteynerlash, Linux/Ubuntu server, Nginx, Gunicorn va CI/CD.' }
      ],
      projects: ['E-Payment Gateway API', 'Social Network Backend', 'CRM Management Platform', 'Dockerized High-load Service']
    },
    'python': {
      title: 'Python Programming',
      badge: 'Dasturlashga eng zo‘r kirish',
      icon: 'assets/images/python.svg',
      duration: '4 oy (Haftada 3 kun, 2 soatdan)',
      level: 'Noldan boshlovchilar uchun',
      description: 'Dasturlash asoslari, algoritmik fikrlash, Telegram botlar, ma‘lumotlarni avtomatlashtirish va skraping texnologiyalari.',
      syllabus: [
        { title: '1-modul: Dasturlash Asoslari', desc: 'O‘zgaruvchilar, operatorlar, shartlar, sikllar va asosiy ma‘lumotlar turlari.' },
        { title: '2-modul: Algoritmlar va Ma‘lumotlar Strukturasi', desc: 'Funksiyalar, rekursiya, qidirish va saralash algoritmlari, xotira samaradorligi.' },
        { title: '3-modul: Obyektga Yo‘naltirilgan Dasturlash (OOP)', desc: 'Klasslar, obyektlar, inkapsulyatsiya, polimorfizm va vorislik.' },
        { title: '4-modul: Telegram Botlar va Web Scraping', desc: 'Aiogram/Telebot kutubxonalari, BeautifulSoup, SQLite integratsiyasi va botlarni serverga qo‘yish.' }
      ],
      projects: ['Online Do‘kon Telegram Boti', 'Valyuta va Ob-havo Avto-Notifyer', 'Web Data Scraper Engine', 'Algoritmik mini-o‘yinlar']
    },
    'graphic-design': {
      title: 'Graphic Design',
      badge: 'Kreativ Vizual San‘at',
      icon: 'assets/images/graphic-design.svg',
      duration: '4 oy (Haftada 3 kun, 2 soatdan)',
      level: 'Boshlang‘ich / Ijodiy fikrlovchilar',
      description: 'Zamonaviy reklama grafikasi, brending, logotiplar yaratish, tipografika va ijtimoiy tarmoqlar uchun professional postlar dizayni.',
      syllabus: [
        { title: '1-modul: Dizayn Asoslari va Kompozitsiya', desc: 'Ranglar nazariyasi, tipografika qoidalari, vizual ierarxiya va kompozitsiya.' },
        { title: '2-modul: Adobe Photoshop', desc: 'Retush, kollaj yaratish, maskalar bilan ishlash, qatlamlar va reklama bannerlari.' },
        { title: '3-modul: Adobe Illustrator', desc: 'Vektorli grafika, logotiplar chizish, piktogrammalar va chop etishga tayyorlash.' },
        { title: '4-modul: Brending va Shaxsiy Portfolio', desc: 'Brandbook, firmaviy stil, Behance va Instagram uchun portfolio yaratish.' }
      ],
      projects: ['Kompaniya uchun to‘liq Brandbook', 'SMM Kreativ Posterlar To‘plami', 'Poligrafiya va Packaging Dizayni', 'Behance Portfolio']
    },
    'ui-ux': {
      title: 'UI/UX Design',
      badge: 'Eng Trend Dizayn Kasbi',
      icon: 'assets/images/ui-ux.svg',
      duration: '5 oy (Haftada 3 kun, 2 soatdan)',
      level: 'Boshlang‘ichdan Professionalgacha',
      description: 'Mijozlar uchun qulay va chiroyli veb-sayt hamda mobil ilovalar interfeyslarini tadqiqot asosida loyihalash.',
      syllabus: [
        { title: '1-modul: UX Tadqiqotlari (UX Research)', desc: 'User Persona, CJM (Customer Journey Map), raqobatchilar tahlili va intervyular.' },
        { title: '2-modul: Wireframing va Axborot Arxitekturasi', desc: 'Loyiha skeleti, low-fidelity sxemalar va foydalanuvchi yo‘llarini chizish.' },
        { title: '3-modul: Figma — Professional Asboblar', desc: 'Auto Layout, Components, Variants, Design Tokens va responsivlik.' },
        { title: '4-modul: Interaktiv Prototip va Animatsiya', desc: 'Smart Animate, mikro-interaksiyalar va usability testing o‘tkazish.' },
        { title: '5-modul: Real Keyslar va Karyera', desc: 'Mobil ilova va SaaS CRM loyihasini 0 dan yakunlash, Dribbble/Behance taqdimoti.' }
      ],
      projects: ['Bank Mobile App UI/UX', 'Smart Home IoT Dashboard', 'E-Learning Platform UX Audit', 'Design System Library']
    },
    'computer-literacy': {
      title: 'Computer Literacy (Savodxonlik)',
      badge: 'Mustahkam IT Poydevori',
      icon: 'assets/images/computer-literacy.svg',
      duration: '2 oy (Haftada 3 kun, 1.5 soatdan)',
      level: 'Har qanday yoshdagi boshlovchilar',
      description: 'Kompyuter bilan ishonchli ishlash, matn va jadvallarni professional tahrirlash, internet xavfsizligi va cloud vositalar.',
      syllabus: [
        { title: '1-modul: Kompyuter va OT Asoslari', desc: 'Windows/macOS tizimlari, fayl menejeri, klaviatura tez yozish texnikasi.' },
        { title: '2-modul: Microsoft Word & Google Docs', desc: 'Hujjatlar tayyorlash, shablonlar, rasmiy blanklar va formatlash.' },
        { title: '3-modul: Microsoft Excel & Google Sheets', desc: 'Jadvallar, hisob-kitob formulalari, diagrammalar va ma‘lumotlarni filtrlash.' },
        { title: '4-modul: Microsoft PowerPoint & Taqdimotlar', desc: 'Animatsiyali slaydlar, vizual taqdimotlar va omma oldida chiqish asoslari.' },
        { title: '5-modul: Internet, Email va Kiberxavfsizlik', desc: 'Google Drive, xavfsiz parollar, fishingdan himoyalanish va onlayn etiket.' }
      ],
      projects: ['Rasmiy Ish Hujjatlari Paketi', 'Moliya va Hisob-kitob Excel Jadvali', 'Kreativ PowerPoint Taqdimot']
    }
  };

  const courseDetailsModal = document.getElementById('courseDetailsModal');
  const courseModalContent = document.getElementById('course-modal-content');

  document.querySelectorAll('.btn-view-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.getAttribute('data-course-id');
      const data = courseDetailsData[courseId];

      if (data && courseModalContent) {
        courseModalContent.innerHTML = `
          <div class="course-modal-header">
            <img src="${data.icon}" alt="${data.title}" class="course-modal-icon">
            <div>
              <span class="modal-badge">${data.badge}</span>
              <h2 class="course-modal-title">${data.title}</h2>
              <div class="course-modal-meta">
                <span><i class="fa-regular fa-clock"></i> ${data.duration}</span>
                <span><i class="fa-solid fa-signal"></i> ${data.level}</span>
              </div>
            </div>
          </div>
          <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 1rem; line-height: 1.6;">
            ${data.description}
          </p>
          <h3 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 12px; font-weight: 800;">
            <i class="fa-solid fa-book-open"></i> O‘quv Dasturi Modullari:
          </h3>
          <div class="syllabus-modules-list">
            ${data.syllabus.map(mod => `
              <div class="syllabus-module-item">
                <div class="syllabus-module-title">${mod.title}</div>
                <div class="syllabus-module-desc">${mod.desc}</div>
              </div>
            `).join('')}
          </div>
          <div style="background: rgba(99, 91, 255, 0.1); border: 1px solid var(--surface-border); border-radius: var(--radius-md); padding: 16px; margin: 24px 0;">
            <h4 style="font-size: 0.95rem; color: var(--accent-cyan); margin-bottom: 8px;">
              <i class="fa-solid fa-laptop-code"></i> Bitiruvchining Portfoliosi:
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-primary);">
              ${data.projects.join(' • ')}
            </p>
          </div>
          <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-block btn-lg ripple-btn" onclick="openRegModalForCourse('${data.title}')">
              <i class="fa-solid fa-bolt"></i> Shu Kursga 480 000 So‘m bilan Yozilish
            </button>
          </div>
        `;

        openModal('courseDetailsModal');
      }
    });
  });

  window.openRegModalForCourse = function(courseName) {
    closeModal('courseDetailsModal');
    setTimeout(() => {
      openModal('registerModal');
      const regCourseSelect = document.getElementById('reg-course');
      if (regCourseSelect) {
        for (let i = 0; i < regCourseSelect.options.length; i++) {
          if (regCourseSelect.options[i].value.toLowerCase().includes(courseName.toLowerCase()) || 
              courseName.toLowerCase().includes(regCourseSelect.options[i].value.toLowerCase())) {
            regCourseSelect.selectedIndex = i;
            break;
          }
        }
      }
    }, 200);
  };

  /* ==========================================================================
     9. PROMO COUNTDOWN TIMER (480 000 SO‘M / OY)
     ========================================================================== */
  const daysElem = document.getElementById('days');
  const hoursElem = document.getElementById('hours');
  const minutesElem = document.getElementById('minutes');
  const secondsElem = document.getElementById('seconds');

  // Set target date: 7 days from now, persisted in localStorage
  let countdownTarget = localStorage.getItem('meta_promo_deadline');
  if (!countdownTarget || new Date(countdownTarget).getTime() < Date.now()) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6);
    targetDate.setHours(23, 59, 59, 0);
    countdownTarget = targetDate.toISOString();
    localStorage.setItem('meta_promo_deadline', countdownTarget);
  }

  const targetTime = new Date(countdownTarget).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      if (daysElem) daysElem.textContent = '00';
      if (hoursElem) hoursElem.textContent = '00';
      if (minutesElem) minutesElem.textContent = '00';
      if (secondsElem) secondsElem.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysElem) daysElem.textContent = d < 10 ? '0' + d : d;
    if (hoursElem) hoursElem.textContent = h < 10 ? '0' + h : h;
    if (minutesElem) minutesElem.textContent = m < 10 ? '0' + m : m;
    if (secondsElem) secondsElem.textContent = s < 10 ? '0' + s : s;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     10. META IT BATTLE INTERACTIVE VOTING PLATFORM
     ========================================================================== */
  const defaultBattleSchools = [
    { id: 'meta', name: 'META IT SCHOOL', logo: 'assets/images/battle-meta.svg', votes: 1420, type: 'Bosh Tashkilotchi & Zamonaviy IT Akademiya' },
    { id: 'alpha', name: 'Alpha Tech Academy', logo: 'assets/images/battle-alpha.svg', votes: 1180, type: 'Dasturlash Markazi (Demo)' },
    { id: 'nova', name: 'Nova Coding School', logo: 'assets/images/battle-nova.svg', votes: 940, type: 'IT Ta‘lim Markazi (Demo)' },
    { id: 'cyber', name: 'Cyber Future Hub', logo: 'assets/images/battle-cyber.svg', votes: 820, type: 'Texnologiya Akademiyasi (Demo)' },
    { id: 'vertex', name: 'Vertex IT Academy', logo: 'assets/images/battle-vertex.svg', votes: 750, type: 'Kreativ IT Markazi (Demo)' }
  ];

  function getBattleData() {
    const stored = localStorage.getItem('meta_battle_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return defaultBattleSchools;
      }
    }
    return defaultBattleSchools;
  }

  function saveBattleData(data) {
    localStorage.setItem('meta_battle_data', JSON.stringify(data));
  }

  function getUserVotedSchool() {
    return localStorage.getItem('meta_battle_user_voted');
  }

  function renderBattleArena() {
    const container = document.getElementById('battle-cards-container');
    const leaderNameElem = document.getElementById('current-leader-name');
    const leaderScoreElem = document.getElementById('current-leader-score');
    const userStatusElem = document.getElementById('battle-user-status');
    if (!container) return;

    const schools = getBattleData();
    // Sort descending by votes
    schools.sort((a, b) => b.votes - a.votes);

    // Calculate total votes for percentage
    const totalVotes = schools.reduce((acc, curr) => acc + curr.votes, 0);

    // Update Leader Spotlight
    if (schools.length > 0) {
      if (leaderNameElem) leaderNameElem.textContent = schools[0].name;
      if (leaderScoreElem) leaderScoreElem.textContent = schools[0].votes.toLocaleString('uz-UZ');
    }

    const votedSchoolId = getUserVotedSchool();

    if (userStatusElem) {
      if (votedSchoolId) {
        const votedSchool = schools.find(s => s.id === votedSchoolId);
        userStatusElem.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> Siz <b>${votedSchool ? votedSchool.name : 'maktab'}</b> uchun ovoz bergansiz! Natijalar jonli yangilandi.`;
      } else {
        userStatusElem.innerHTML = `<i class="fa-solid fa-circle-info"></i> Har bir foydalanuvchi bir marta ovoz berishi mumkin. Sevimli maktabingizni tanlang!`;
      }
    }

    container.innerHTML = schools.map((school, index) => {
      const rank = index + 1;
      const percent = totalVotes > 0 ? ((school.votes / totalVotes) * 100).toFixed(1) : 0;
      const isVoted = votedSchoolId === school.id;
      const hasVotedAny = Boolean(votedSchoolId);

      let rankDisplay = rank;
      if (rank === 1) rankDisplay = '<i class="fa-solid fa-crown" style="color: #080B18;"></i>';

      return `
        <div class="battle-card rank-${rank}">
          <div class="rank-badge">${rankDisplay}</div>
          <img src="${school.logo}" alt="${school.name}" class="battle-logo">
          <div class="battle-school-info">
            <h4 class="battle-school-title">${school.name}</h4>
            <span class="battle-school-type">${school.type}</span>
          </div>
          <div class="battle-meter">
            <div class="meter-header">
              <span class="meter-votes"><i class="fa-solid fa-thumbs-up"></i> ${school.votes.toLocaleString('uz-UZ')} ball</span>
              <span class="meter-percentage">${percent}%</span>
            </div>
            <div class="meter-bar-track">
              <div class="meter-bar-fill" style="width: ${percent}%;"></div>
            </div>
          </div>
          <div class="battle-action">
            <button class="btn-vote ${isVoted ? 'voted' : ''}" 
                    data-school-id="${school.id}" 
                    ${hasVotedAny ? 'disabled' : ''}>
              ${isVoted ? '<i class="fa-solid fa-check"></i> Ovoz berildi' : '<i class="fa-solid fa-bolt"></i> Ovoz berish'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach vote click handlers
    container.querySelectorAll('.btn-vote:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const schoolId = btn.getAttribute('data-school-id');
        handleBattleVote(schoolId);
      });
    });
  }

  function handleBattleVote(schoolId) {
    if (getUserVotedSchool()) {
      showToast('Siz allaqachon ovoz berib bo‘lgansiz!', 'info');
      return;
    }

    const schools = getBattleData();
    const targetSchool = schools.find(s => s.id === schoolId);

    if (targetSchool) {
      targetSchool.votes += 1;
      saveBattleData(schools);
      localStorage.setItem('meta_battle_user_voted', schoolId);

      showToast(`Rahmat! ${targetSchool.name} uchun ovozingiz muvaffaqiyatli qabul qilindi! 🎉`, 'success');
      renderBattleArena();
    }
  }

  // Reset button for demo testing
  const resetBattleVoteBtn = document.getElementById('btn-reset-battle-vote');
  if (resetBattleVoteBtn) {
    resetBattleVoteBtn.addEventListener('click', () => {
      localStorage.removeItem('meta_battle_user_voted');
      localStorage.removeItem('meta_battle_data');
      renderBattleArena();
      showToast('Ovoz berish holati demo uchun qayta tiklandi.', 'info');
    });
  }

  // Initial render of battle arena
  renderBattleArena();

  /* ==========================================================================
     11. TESTIMONIALS CAROUSEL
     ========================================================================== */
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  const dotsContainer = document.getElementById('carousel-dots');

  let currentSlide = 0;
  let carouselInterval = null;

  function updateCarousel(index) {
    if (!track || slides.length === 0) return;

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        if (i === currentSlide) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
      resetAutoPlay();
    });
  }

  if (dotsContainer) {
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const index = +dot.getAttribute('data-index');
        updateCarousel(index);
        resetAutoPlay();
      });
    });
  }

  function startAutoPlay() {
    carouselInterval = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(carouselInterval);
    startAutoPlay();
  }

  startAutoPlay();

  // Pause on hover
  const carouselWrapper = document.getElementById('carousel-track-container');
  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselWrapper.addEventListener('mouseleave', () => startAutoPlay());

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        // swipe left
        updateCarousel(currentSlide + 1);
        resetAutoPlay();
      } else if (touchEndX - touchStartX > 50) {
        // swipe right
        updateCarousel(currentSlide - 1);
        resetAutoPlay();
      }
    }, { passive: true });
  }

  /* ==========================================================================
     12. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================================================
     13. MODALS LOGIC
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Reset modal forms and success states after delay
      setTimeout(() => {
        const form = modal.querySelector('form');
        const successState = modal.querySelector('.modal-success-state');
        if (form) {
          form.style.display = 'flex';
          form.reset();
        }
        if (successState) successState.style.display = 'none';
      }, 300);
    }
  }

  // Open modal buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-open-modal');
      const targetCourse = btn.getAttribute('data-course');
      openModal(modalId);

      if (targetCourse) {
        const courseSelect = document.getElementById('reg-course');
        if (courseSelect) {
          for (let i = 0; i < courseSelect.options.length; i++) {
            if (courseSelect.options[i].value === targetCourse) {
              courseSelect.selectedIndex = i;
              break;
            }
          }
        }
      }
    });
  });

  // Close modal buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // Close modal on click outside backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        closeModal(modal.id);
      });
      closeDrawer();
    }
  });

  /* ==========================================================================
     14. FORM VALIDATION & PHONE MASKING & LOCALSTORAGE LEADS
     ========================================================================== */
  // Format Uzbek Phone Number (+998 (90) 123-45-67)
  const phoneInputs = document.querySelectorAll('.phone-mask');
  phoneInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!input.value) {
        input.value = '+998 ';
      }
    });

    input.addEventListener('input', (e) => {
      let val = input.value.replace(/\D/g, '');
      if (!val.startsWith('998')) {
        val = '998' + val;
      }
      val = val.substring(0, 12); // 998 + 9 digits

      let formatted = '+998';
      if (val.length > 3) {
        formatted += ' (' + val.substring(3, 5);
      }
      if (val.length >= 5) {
        formatted += ') ' + val.substring(5, 8);
      }
      if (val.length >= 8) {
        formatted += '-' + val.substring(8, 10);
      }
      if (val.length >= 10) {
        formatted += '-' + val.substring(10, 12);
      }

      input.value = formatted;
    });

    input.addEventListener('blur', () => {
      if (input.value === '+998 ' || input.value === '+998') {
        input.value = '';
      }
    });
  });

  // Registration Modal Form
  const regForm = document.getElementById('modal-registration-form');
  const regSuccessState = document.getElementById('modal-success-state');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('reg-name');
      const phoneInput = document.getElementById('reg-phone');
      const courseSelect = document.getElementById('reg-course');
      const ageInput = document.getElementById('reg-age');
      const noteInput = document.getElementById('reg-note');

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showFieldError(nameInput, 'reg-name-error', 'Iltimos, to‘liq ismingizni kiriting (kamida 3 ta harf).');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'reg-name-error');
      }

      // Validate phone (+998 (XX) XXX-XX-XX = 19 chars)
      const rawPhoneDigits = phoneInput.value.replace(/\D/g, '');
      if (rawPhoneDigits.length !== 12) {
        showFieldError(phoneInput, 'reg-phone-error', 'Iltimos, to‘liq telefon raqamingizni kiriting (+998 XX XXX-XX-XX).');
        isValid = false;
      } else {
        clearFieldError(phoneInput, 'reg-phone-error');
      }

      // Validate age
      const ageVal = parseInt(ageInput.value, 10);
      if (!ageVal || ageVal < 10 || ageVal > 75) {
        showFieldError(ageInput, 'reg-age-error', 'Yoshingizni to‘g‘ri kiriting (10 dan 75 gacha).');
        isValid = false;
      } else {
        clearFieldError(ageInput, 'reg-age-error');
      }

      if (isValid) {
        const lead = {
          id: Date.now(),
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          course: courseSelect.value,
          age: ageInput.value,
          note: noteInput ? noteInput.value.trim() : '',
          date: new Date().toLocaleString('uz-UZ'),
          promo: '480 000 SO‘M'
        };

        // Save to LocalStorage
        saveLead(lead);

        // UI Success
        regForm.style.display = 'none';
        if (regSuccessState) regSuccessState.style.display = 'block';

        showToast('Arizangiz muvaffaqiyatli qabul qilindi! 480 000 so‘mlik aksiya band qilindi.', 'success');
      }
    });
  }

  // In-page Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const phoneInput = document.getElementById('contact-phone');
      const courseSelect = document.getElementById('contact-course');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showFieldError(nameInput, 'contact-name-error', 'Ismingizni to‘liq kiriting.');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'contact-name-error');
      }

      const rawPhoneDigits = phoneInput.value.replace(/\D/g, '');
      if (rawPhoneDigits.length !== 12) {
        showFieldError(phoneInput, 'contact-phone-error', 'To‘g‘ri telefon raqam kiriting.');
        isValid = false;
      } else {
        clearFieldError(phoneInput, 'contact-phone-error');
      }

      if (isValid) {
        const lead = {
          id: Date.now(),
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          course: courseSelect.value,
          message: messageInput ? messageInput.value.trim() : '',
          date: new Date().toLocaleString('uz-UZ'),
          type: 'Aloqa Bo‘limi'
        };

        saveLead(lead);
        contactForm.reset();
        showToast('Xabaringiz qabul qilindi! Tez orada mutaxassisimiz bog‘lanadi.', 'success');
      }
    });
  }

  function showFieldError(inputElem, errorElemId, message) {
    inputElem.classList.add('input-invalid');
    const errorElem = document.getElementById(errorElemId);
    if (errorElem) {
      errorElem.textContent = message;
      errorElem.classList.add('visible');
    }
  }

  function clearFieldError(inputElem, errorElemId) {
    inputElem.classList.remove('input-invalid');
    const errorElem = document.getElementById(errorElemId);
    if (errorElem) {
      errorElem.textContent = '';
      errorElem.classList.remove('visible');
    }
  }

  function saveLead(lead) {
    try {
      const existingLeads = JSON.parse(localStorage.getItem('meta_it_leads') || '[]');
      existingLeads.push(lead);
      localStorage.setItem('meta_it_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  /* ==========================================================================
     15. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  window.showToast = function(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '<i class="fa-solid fa-circle-info"></i>';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === 'error') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animate in
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, duration);
  };

  /* ==========================================================================
     16. BUTTON RIPPLE EFFECT
     ========================================================================== */
  document.querySelectorAll('.ripple-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';

      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;

      const existingRipple = this.querySelector('.ripple-circle');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });

  /* ==========================================================================
     17. 3D CARD TILT EFFECT (VANILLA JS)
     ========================================================================== */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ==========================================================================
     18. INTERSECTION OBSERVER SCROLL REVEAL
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  console.log('%c META IT SCHOOL %c Veb-sayt muvaffaqiyatli yuklandi! 🚀', 'background: #635BFF; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;', 'color: #00D4FF; font-weight: bold;');
});
