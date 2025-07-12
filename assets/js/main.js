
$(document).ready(function() {
    general_utils();
    blog_posts();
})


function general_utils() {
    // smooth scrolling for nav links
    $('.head-menu-wrap a').smoothScroll();
    $('.extra-link a').smoothScroll();
    $('.profile-pic-link').smoothScroll();

    // 스킬바 애니메이션 개선 - 버벅임 해결
    function animateSkillBars() {
        $('.skillbar').each(function(){
            var skillBar = $(this);
            var percent = skillBar.attr('data-percent');
            
            // 이미 애니메이션이 실행되었다면 스킵
            if (skillBar.hasClass('animated')) return;
            
            skillBar.addClass('animated');
            skillBar.find('.skillbar-bar').animate({
                width: percent
            }, {
                duration: 1200,
                easing: 'easeOutCubic'
            });
        });
    }
    
    // 페이지 로드시 즉시 실행
    animateSkillBars();
    
    // 스크롤 이벤트는 제거하고 페이지 로드시만 실행하도록 변경
}

function blog_posts() {

    // keeping it static, can be fetched from a blog dynamically as well
    let posts = [
        {
            url: 'https://www.nagekar.com/2017/02/trip-to-bramhatal-uttarakhand.html',
            title: 'Trek To Bramhatal (Uttarakhand)',
        },
        {
            url: 'https://www.nagekar.com/2017/08/privacy.html',
            title: 'Privacy - How I Converted',
        },
        {
            url: 'https://www.nagekar.com/2018/01/jagriti-yatra.html',
            title: 'Jagriti Yatra 2017',
        },
        {
            url: 'https://www.nagekar.com/2017/08/private-cloud-part-2.html',
            title: 'Private Cloud Part 2 | Encrypted Storage With NextCloud',
        },
        {
            url: 'https://www.nagekar.com/2018/07/eli5-how-https-works.html',
            title: 'ELI5 - How HTTPS Works',
        },
    ];

    let post_html = [];

    for(let post of posts) {

        let tags;
        
        if(post.tags) {
            tags = post.tags.map(tag => {
                return `<a href="https://www.nagekar.com/tags#${tag}">${tag}</a>`
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
    <div class="blog-post more-blogs" onclick="blog_link_click('https://www.nagekar.com');">

        <div class="blog-link">

            <h3><a href="https://www.nagekar.com">Visit the blog for more posts</a></h3>            

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