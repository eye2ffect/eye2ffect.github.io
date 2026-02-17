
$(document).ready(function() {
    general_utils();
    blog_posts();
    initScrollAnimations();
})


function general_utils() {
    // smooth scrolling for nav links
    $('.head-menu-wrap a').smoothScroll();
    $('.sticky-nav-links a').smoothScroll();
    $('.sticky-nav-brand').smoothScroll();
    $('.extra-link a').smoothScroll();
    $('.profile-pic-link').smoothScroll();

    // 스크롤 이벤트로 스킬바 애니메이션 제어
    function checkSkillbars() {
        $('.skillbar').each(function(){
            if (!$(this).hasClass('animated')) {
                var skillsSection = $('#skills');
                var sectionTop = skillsSection.offset().top;
                var scrollPosition = $(window).scrollTop() + $(window).height();
                
                // Skills 섹션이 화면에 보일 때 애니메이션 실행
                if (scrollPosition > sectionTop + 100) {
                    $(this).addClass('animated');
                    $(this).find('.skillbar-bar').animate({
                        width: $(this).attr('data-percent')
                    }, 1200, 'swing');
                }
            }
        });
    }
    
    // 페이지 로드 시 한 번 체크
    checkSkillbars();
    
    // 스크롤 시 체크
    $(window).scroll(checkSkillbars);
    
    // Show/hide sticky nav based on scroll position
    $(window).scroll(function() {
        var heroBottom = $('#hero').offset().top + $('#hero').outerHeight();
        if ($(window).scrollTop() > heroBottom - 100) {
            $('#sticky-nav').addClass('visible');
        } else {
            $('#sticky-nav').removeClass('visible');
        }
    });
}

function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe experience items for staggered animation
    document.querySelectorAll('.experience-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(item);
    });
}

function blog_posts() {

    // keeping it static, can be fetched from a blog dynamically as well
    let posts = [
        {
            url: 'https://muksal2000.tistory.com/',
            title: '최근 게임 개발 관련 포스트',
        },
        {
            url: 'https://muksal2000.tistory.com/',
            title: 'Unity 셰이더 프로그래밍',
        },
        {
            url: 'https://muksal2000.tistory.com/',
            title: 'C++ 게임 엔진 개발',
        },
        {
            url: 'https://muksal2000.tistory.com/',
            title: 'OpenGL 그래픽스 프로그래밍',
        },
        {
            url: 'https://muksal2000.tistory.com/',
            title: '게임 AI 구현 방법',
        },
    ];

    let post_html = [];

    for(let post of posts) {

        let tags;
        
        if(post.tags) {
            tags = post.tags.map(tag => {
                return `<a href="https://muksal2000.tistory.com/tags#${tag}">${tag}</a>`
            })
        }

        let post_template = `
        <div class="blog-post" onclick="blog_link_click('${post.url}');">

            <div class="blog-link">
    
                <h3><a href="${post.url}">${post.title}</a></h3>            

            </div>
    
            <div class="blog-goto-link">
                <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
            </div>
        </div>
        `;

        post_html.push(post_template);
    }

    // for the more posts link
    let post_template = `
    <div class="blog-post more-blogs" onclick="blog_link_click('https://muksal2000.tistory.com');">

        <div class="blog-link">

            <h3><a href="https://muksal2000.tistory.com">블로그에서 더 많은 포스트 보기</a></h3>            

        </div>

        <div class="blog-goto-link">
            <img class="blog-arrow" src="/assets/images/right-open-mini.svg"/>
        </div>
    </div>
    `;

    post_html.push(post_template);

    $('#rss-feeds').html(post_html);

}

function blog_link_click(url) {
    window.location = url;
}