/* ================================================================
  OH YOU BIN — Portfolio JS v3
   ================================================================ */

$(document).ready(function () {
  initThemeToggle();
  initSmoothScroll();
  initStickyNav();
  initScrollReveal();
  initAboutPopup();
});

function initThemeToggle() {
  var buttons = document.querySelectorAll('[data-theme-toggle]');
  var root = document.documentElement;
  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!buttons.length) return;

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#06060c' : '#f7f8fc');
    }

    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
      button.innerHTML = isDark
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
    });
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      return;
    }
  }

  var initialTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  var savedTheme = getStoredTheme();
  applyTheme(savedTheme === 'dark' ? 'dark' : initialTheme);

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      setStoredTheme(nextTheme);
    });
  });
}

/* ================================================================
   Particle System — cyan themed, mouse interactive
   ================================================================ */
function initParticles() {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -9999, y: -9999 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.8 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.alpha = Math.random() * 0.4 + 0.08;
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 140 && dist > 0) {
      var force = (140 - dist) / 140;
      this.x += (dx / dist) * force * 0.6;
      this.y += (dy / dist) * force * 0.6;
    }

    if (this.x < -10 || this.x > canvas.width + 10 ||
        this.y < -10 || this.y > canvas.height + 10) {
      this.reset();
    }
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 212, 255, ' + this.alpha + ')';
    ctx.fill();
  };

  // Responsive particle count
  var count = Math.min(70, Math.floor(canvas.width * canvas.height / 18000));
  for (var i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.05 * (1 - dist / 130)) + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================================================================
   Ambient Glow — follows mouse
   ================================================================ */
function initAmbientGlow() {
  var glow = document.getElementById('ambient-glow');
  if (!glow) return;
  var posX = 0, posY = 0;
  var targetX = 0, targetY = 0;

  document.addEventListener('mousemove', function (e) {
    targetX = e.clientX - 250;
    targetY = e.clientY - 250;
  });

  function lerp() {
    posX += (targetX - posX) * 0.08;
    posY += (targetY - posY) * 0.08;
    glow.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    requestAnimationFrame(lerp);
  }
  lerp();
}

/* ================================================================
   Smooth Scroll
   ================================================================ */
function initSmoothScroll() {
  $('.sticky-nav-links a[href^="#"]').smoothScroll({ offset: -60 });
  $('.sticky-nav-brand').smoothScroll();
  $('.hero-btn').each(function () {
    var href = $(this).attr('href');
    if (href && href.startsWith('#')) {
      $(this).smoothScroll({ offset: -60 });
    }
  });
}

/* ================================================================
   Sticky Navigation — show after hero
   ================================================================ */
function initStickyNav() {
  $(window).scroll(function () {
    var hero = $('#hero');
    if (!hero.length) return;
    var threshold = hero.offset().top + hero.outerHeight() - 120;
    if ($(window).scrollTop() > threshold) {
      $('#sticky-nav').addClass('visible');
    } else {
      $('#sticky-nav').removeClass('visible');
    }
  });
}

/* ================================================================
   Scroll Reveal — IntersectionObserver
   ================================================================ */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  // Sections
  document.querySelectorAll('.section-wrapper').forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Experience items staggered
  document.querySelectorAll('.experience-item').forEach(function (item, idx) {
    item.classList.add('reveal');
    item.style.transitionDelay = (idx * 0.12) + 's';
    observer.observe(item);
  });
}

/* ================================================================
   About Popup
   ================================================================ */
function initAboutPopup() {
  var popup = document.getElementById('about-popup');
  if (!popup) return;

  var closeBtn = document.getElementById('about-popup-close');
  var popupBody = popup.querySelector('.about-popup-body');

  // Fallback visibility control to avoid broken rendering when CSS cache is stale.
  popup.style.display = 'none';
  popup.setAttribute('aria-hidden', 'true');

  function openAboutPopup() {
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function () {
      popup.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeAboutPopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      if (!popup.classList.contains('active')) {
        popup.style.display = 'none';
      }
    }, 240);
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-about="true"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openAboutPopup();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeAboutPopup);
  }

  popup.addEventListener('click', function (e) {
    if (e.target === popup) closeAboutPopup();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      closeAboutPopup();
    }
  });

  // Drag to scroll for long About content
  if (popupBody) {
    var isDragging = false;
    var startY = 0;
    var startScrollTop = 0;

    popupBody.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isDragging = true;
      startY = e.clientY;
      startScrollTop = popupBody.scrollTop;
      popupBody.classList.add('dragging');
    });

    popupBody.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var deltaY = e.clientY - startY;
      popupBody.scrollTop = startScrollTop - deltaY;
    });

    function stopDrag() {
      isDragging = false;
      popupBody.classList.remove('dragging');
    }

    popupBody.addEventListener('mouseup', stopDrag);
    popupBody.addEventListener('mouseleave', stopDrag);
    document.addEventListener('mouseup', stopDrag);
  }
}

