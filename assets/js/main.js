$(document).ready(function() {
    initLoadingScreen();
    general_utils();
    blog_posts();
    initParticles();
    initAmbientGlow();
    initScrollReveal();
    initCountUp();
});

// ========================
// Loading Screen
// ========================
function initLoadingScreen() {
    let progress = 0;
    const bar = document.getElementById('loading-bar');
    const interval = setInterval(() => {
        progress += Math.random() * 25 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
            }, 300);
        }
        bar.style.width = progress + '%';
    }, 150);
}

// ========================
// Particle System (Game Dev Effect)
// ========================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse for interaction
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction - gentle push
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x += (dx / dist) * force * 0.8;
                this.y += (dy / dist) * force * 0.8;
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 92, 252, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles (responsive count)
    const count = Math.min(80, Math.floor(window.innerWidth * window.innerHeight / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 92, 252, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
}

// ========================
// Ambient Glow (follows mouse)
// ========================
function initAmbientGlow() {
    const glow = document.getElementById('ambient-glow');
    if (!glow) return;
    document.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    });
}

// ========================
// General Utils
// ========================
function general_utils() {
    $('.head-menu-wrap a').smoothScroll();
    $('.sticky-nav-links a').smoothScroll();
    $('.sticky-nav-brand').smoothScroll();
    $('.extra-link a').smoothScroll();
    $('.profile-pic-link').smoothScroll();

    // Skillbar animation on scroll
    function checkSkillbars() {
        $('.skillbar').each(function(){
            if (!$(this).hasClass('animated')) {
                var skillsSection = $('#skills');
                if (skillsSection.length === 0) return;
                var sectionTop = skillsSection.offset().top;
                var scrollPosition = $(window).scrollTop() + $(window).height();
                if (scrollPosition > sectionTop + 100) {
                    $(this).addClass('animated');
                    $(this).find('.skillbar-bar').animate({
                        width: $(this).attr('data-percent')
                    }, 1200, 'swing');
                }
            }
        });
    }
    checkSkillbars();
    $(window).scroll(checkSkillbars);

    // Sticky nav
    $(window).scroll(function() {
        var hero = $('#hero');
        if (hero.length === 0) return;
        var heroBottom = hero.offset().top + hero.outerHeight();
        if ($(window).scrollTop() > heroBottom - 100) {
            $('#sticky-nav').addClass('visible');
        } else {
            $('#sticky-nav').removeClass('visible');
        }
    });
}

// ========================
// Scroll Reveal
// ========================
function initScrollReveal() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe sections
    document.querySelectorAll('.section-wrapper').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = '0.1s';
        observer.observe(el);
    });

    // Experience items staggered
    document.querySelectorAll('.experience-item').forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// ========================
// Count Up Animation
// ========================
function initCountUp() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current) + '+';
                }, 16);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

// ========================
// Blog Posts
// ========================
function blog_posts() {
    let posts = [
        { url: 'https://muksal2000.tistory.com/', title: '최근 게임 개발 관련 포스트' },
        { url: 'https://muksal2000.tistory.com/', title: 'Unity 셰이더 프로그래밍' },
        { url: 'https://muksal2000.tistory.com/', title: 'C++ 게임 엔진 개발' },
        { url: 'https://muksal2000.tistory.com/', title: 'OpenGL 그래픽스 프로그래밍' },
        { url: 'https://muksal2000.tistory.com/', title: '게임 AI 구현 방법' },
    ];

    let post_html = posts.map(post => `
        <div class="blog-post" onclick="blog_link_click('${post.url}');">
            <div class="blog-link">
                <h3><a href="${post.url}">${post.title}</a></h3>
            </div>
            <div class="blog-goto-link">
                <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
            </div>
        </div>
    `);

    post_html.push(`
        <div class="blog-post more-blogs" onclick="blog_link_click('https://muksal2000.tistory.com');">
            <div class="blog-link">
                <h3><a href="https://muksal2000.tistory.com">블로그에서 더 많은 포스트 보기</a></h3>
            </div>
            <div class="blog-goto-link">
                <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
            </div>
        </div>
    `);

    $('#rss-feeds').html(post_html);
}

function blog_link_click(url) {
    window.location = url;
}
